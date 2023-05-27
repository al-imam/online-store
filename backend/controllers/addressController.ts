import RequestHandler from "@/types/RequestHandler";
import Address from "@/backend/models/address";

const addAddress: RequestHandler = async (req, res) => {
  const address = await Address.create(req.body);

  res.status(201).json(address);
};

export { addAddress };
