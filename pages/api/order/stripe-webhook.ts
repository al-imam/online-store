import dbConnect from "@/backend/config/dbConnect";
import createRouter from "next-connect";

dbConnect();

const router = createRouter();

router.post((req, res) => {
  console.log(req);
  // @ts-ignore
  res.json(req.headers);
});

export default router;
