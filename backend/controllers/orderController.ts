import { UserWithId } from "@/types/UserInterface";
import wrap from "@/utility/wrapHandler";
import Stripe from "stripe";

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
    client_reference_id: $user._id as unknown as string,

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

export { checkout };
