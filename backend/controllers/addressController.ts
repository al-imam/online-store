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

const getAddress = wrap(async (req, res) => {
  const address = await Address.findById(req.body.VALID_ID.addressId);

  if (address === null) {
    return res.status(400).json({
      code: "not-found",
      message: "address not found",
    });
  }

  res.status(200).json(address);
}, "get-address");

const removeAddress = wrap(async (req, res) => {
  const address = await Address.findByIdAndDelete(req.body.VALID_ID.addressId);

  if (address === null) {
    return res.status(400).json({
      code: "not-found",
      message: "address not found",
    });
  }

  res.status(200).json(address);
}, "remove-address");

const updateAddress = wrap(async (req, res) => {
  const address = await Address.findByIdAndUpdate(
    req.body.VALID_ID.addressId,
    req.body.VALID_REQ
  );

  if (address === null) {
    return res.status(400).json({
      code: "not-found",
      message: "address not found",
    });
  }

  res.status(200).json(address);
}, "update-address");

export { addAddress, getAddresses, getAddress, removeAddress, updateAddress };
