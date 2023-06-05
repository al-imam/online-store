import wrap from "@/utility/wrapHandler";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const base = "http://localhost:3000";

const checkout = wrap(async (req, res) => {
  const items = req.body.VALID_REQ as {
    price: number;
    quantity: number;
    picture: string;
    name: string;
  }[];

  const session = await stripe.checkout.sessions.create({
    success_url: base,
    cancel_url: `${base}/shipping`,
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: "alimam01828@mail.com",
    client_reference_id: "alimam01828@mail.com",

    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "USD",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          images: [item.picture],
        },
      },
    })),
  });

  res.json(session.url);
}, "checkout");

export { checkout };
