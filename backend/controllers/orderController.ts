/// <reference types="stripe-event-types" />

import { UserWithId } from "@/types/UserInterface";
import wrap from "@/utility/wrapHandler";
import getRawBody from "raw-body";
import Stripe from "stripe";
import Prettify from "@/types/Prettify";
import Order from "@/backend/models/order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  maxNetworkRetries: 2,
});

const base = "http://localhost:3000";

const checkout = wrap(async (req, res) => {
  const $user = req.body.$USER as UserWithId;
  const items = req.body.VALID_REQ.items as {
    price: number;
    quantity: number;
    imageURL: string;
    name: string;
    id: string;
  }[];

  const session = await stripe.checkout.sessions.create({
    success_url: base,
    cancel_url: `${base}/shipping`,
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: $user.email,
    client_reference_id: $user._id.toString(),

    shipping_options: [{ shipping_rate: "shr_1NJbJkDAmKh5IENM1luB3jJS" }],
    metadata: { addressId: req.body.VALID_REQ.addressId },

    line_items: items.map((item) => ({
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
}, "checkout");

const webhook = wrap(async (req, res) => {
  const raw = await getRawBody(req);
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEB_HOOK_SECRET as string;

  const event = stripe.webhooks.constructEvent(
    raw,
    sig,
    endpointSecret
  ) as Stripe.DiscriminatedEvent;

  if (event.type === "checkout.session.completed" && event.data.object) {
    const session = event.data.object as Remove<Stripe.Checkout.Session>;

    const lineItems = await stripe.checkout.sessions.listLineItems(
      event.data.object.id
    );

    await Order.create({
      user: session.client_reference_id,
      order: await parseItems(lineItems.data as any),
      payment: {
        id: session.payment_intent,
        status: session.payment_status,
        amount: session.amount_total / 100,
        tax: session.total_details.amount_tax / 100,
      },
      address: session.metadata.addressId,
    });

    res.status(201).json({ success: true });
  }
}, "stripe-webhook");

type Modify<T extends object, U extends Partial<T>> = Prettify<
  Omit<T, keyof U> & U
>;

type Remove<T extends object> = {
  [key in keyof T]: Exclude<T[key], null | undefined>;
};

async function parseItems(
  lineItems: Modify<
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
  >[]
): Promise<
  {
    product: string;
    name: string;
    price: number;
    quantity: number;
    imageURL: string;
  }[]
> {
  return new Promise(async (resolve) => {
    const items = await Promise.all(
      lineItems.map(async (item) => {
        const product = (await stripe.products.retrieve(
          item.price.product
        )) as Remove<Stripe.Response<Stripe.Product>>;
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

export { checkout, webhook };
