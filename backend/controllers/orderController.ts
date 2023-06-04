import wrap from "@/utility/wrapHandler";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const checkout = wrap((req, res) => {
  console.log(
    JSON.stringify(
      stripe,
      (key, value) => (key.includes("_stripe") ? undefined : value),
      4
    ),
    req.body
  );
}, "checkout");

export { checkout };
