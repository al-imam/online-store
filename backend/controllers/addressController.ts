import Address from "@/backend/models/address";
import wrap from "@/utility/wrapHandler";

const addAddress = wrap(async (req, res) => {
  const address = await Address.create(req.body);

  res.status(201).json(address);
}, "add-address");

const getAddresses = wrap(async (_, res) => {
  const addresses = await Address.find({});

  res.status(200).json(addresses);
}, "get-addresses");

export { addAddress, getAddresses };
