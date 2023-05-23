import User from "@/backend/models/user";
import RequestHandler from "@/types/RequestHandler";

const singup: RequestHandler = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

export { singup };
