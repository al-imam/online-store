/// <reference types="stripe-event-types" />

import { UserWithId } from "@/types/UserInterface";
import getRawBody from "raw-body";
import Stripe from "stripe";
import { Modify } from "@/types/Modify";
import Order from "@/backend/models/order";
import { isValidObjectId } from "mongoose";
import { RequiredAndNotNull } from "@/types/RequiredAndNotNull";
import { NextApiRequest, NextApiResponse } from "next";
import Address from "@/backend/models/address";
import User from "@/backend/models/user";
import Product from "@/backend/models/product";
import { MyRequest } from "@/types/NextApiResponse";
import product from "@/backend/models/product";
import colorLog from "@/utility/colorLog";
import round from "@/utility/round";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  maxNetworkRetries: 2,
});

const base = "http://localhost:3000";

const single = 2;

function calculateSkipNumber(num: string, fallback: number = 0) {
  const n = parseInt(num as string);
  if (isNaN(n)) return fallback;

  return n === 0 ? 0 : n * single - single;
}

export async function get(
  req: MyRequest<{ $user: UserWithId }>,
  res: NextApiResponse
) {
  const query = { user: req.$user._id };

  const orders = await Order.find(query, undefined, {
    limit: single,
    skip: calculateSkipNumber(req.query.page as string),
  }).populate([
    {
      model: Address,
      path: "address",
      select: "-__v -_id -user",
    },
    {
      model: User,
      path: "user",
      select: "name email -_id",
    },
    {
      path: "order.product",
      model: Product,
      select: "rating seller category created -_id",
    },
  ]);

  const count = await Order.find(query).countDocuments();

  res.status(200).json({ orders, single, count });
}

export async function checkout(
  req: MyRequest<{
    $user: UserWithId;
    $data: {
      items: {
        price: number;
        quantity: number;
        imageURL: string;
        name: string;
        id: string;
      }[];
      addressId: string;
    };
  }>,
  res: NextApiResponse
) {
  const session = await stripe.checkout.sessions.create({
    success_url: `${base}/me/orders/?success=true&id=${req.$user._id.toString()}`,
    cancel_url: `${base}/shipping`,
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: req.$user.email,
    client_reference_id: req.$user._id.toString(),

    shipping_options: [{ shipping_rate: "shr_1NKOayDAmKh5IENMXOovXHLW" }],
    metadata: { addressId: req.$data.addressId },

    line_items: req.$data.items.map((item) => ({
      quantity: item.quantity,
      tax_rates: ["txr_1NJbKiDAmKh5IENMxMW32K5n"],
      price_data: {
        currency: "USD",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          images: [item.imageURL],
          metadata: { id: item.id },
        },
      },
    })),
  });

  res.json(session.url);
}

interface Suborder {
  product: string;
  name: string;
  price: number;
  quantity: number;
  imageURL: string;
}

type ModifiedLineItems = Modify<
  Stripe.LineItem,
  {
    price: Modify<
      Stripe.Price,
      {
        product: string;
        unit_amount: number;
      }
    >;
    quantity: number;
  }
>;

export async function webhook(req: NextApiRequest, res: NextApiResponse) {
  const raw = await getRawBody(req);
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEB_HOOK_SECRET as string;

  const event = stripe.webhooks.constructEvent(
    raw,
    sig,
    endpointSecret
  ) as Stripe.DiscriminatedEvent;

  if (
    event.type !== "checkout.session.completed" ||
    event.data.object.metadata === null ||
    !isValidObjectId(event.data.object.metadata.addressId)
  ) {
    return res.send(`Unhandled event type ${event.type}`);
  }

  const session = event.data
    .object as RequiredAndNotNull<Stripe.Checkout.Session>;

  const lineItems = await stripe.checkout.sessions.listLineItems(
    event.data.object.id
  );

  const orders = await parseItems(lineItems.data as any);

  const products = await product.find({
    $or: orders.map((o) => ({ _id: o.product })),
  });

  const sortProductIdByUser = products.reduce((accumulator, value) => {
    if (Object.hasOwn(accumulator, value.user.toString())) {
      accumulator[value.user.toString()].push(
        orders.find((o) => o.product === value._id.toString())
      );

      return accumulator;
    }

    accumulator[value.user.toString()] = [
      orders.find((o) => o.product === value._id.toString()),
    ];

    return accumulator;
  }, {} as Record<string, (Suborder | undefined)[]>);

  const orderDocs = Object.keys(sortProductIdByUser).map((key) => {
    const subOrders = sortProductIdByUser[key].filter(
      (product) => product !== undefined
    ) as Suborder[];

    const total = subOrders.reduce((a, v) => a + v.price * v.quantity, 0);

    return {
      seller: key,
      user: session.client_reference_id,
      order: subOrders,
      payment: {
        id: session.payment_intent,
        status: session.payment_status,
        amount: round(total),
        tax: round(total * 1.05 - total),
      },
      address: session.metadata.addressId,
    };
  });

  await Order.create(orderDocs);

  res.json({ success: true });
}

async function parseItems(lineItems: ModifiedLineItems[]): Promise<Suborder[]> {
  return new Promise(async (resolve) => {
    const items = await Promise.all(
      lineItems.map(async (item) => {
        const product = (await stripe.products.retrieve(
          item.price.product
        )) as RequiredAndNotNull<Stripe.Response<Stripe.Product>>;
        return {
          product: product.metadata.id,
          name: product.name,
          price: item.price.unit_amount / 100,
          quantity: item.quantity,
          imageURL: product.images[0],
        };
      })
    );

    resolve(items);
  });
}
