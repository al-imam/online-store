import Address from "@/backend/models/address";
import wrap from "@/utility/wrapHandler";

const addAddress = wrap(async (req, res) => {
  const address = await Address.create({
    ...req.body.VALID_REQ,
    user: req.body.ID,
  });

  res.status(201).json(address);
}, "add-address");

const getAddresses = wrap(async (req, res) => {
  const addresses = await Address.find({ user: req.body.ID });

  res.status(200).json(addresses);
}, "get-addresses");

export { addAddress, getAddresses };
