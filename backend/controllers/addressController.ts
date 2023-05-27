import Address from "@/backend/models/address";
import wrap from "@/utility/wrapHandler";

const addAddress = wrap(async (req, res) => {
  const address = await Address.create(req.body);

  res.status(201).json(address);
}, "add-address");

export { addAddress };
