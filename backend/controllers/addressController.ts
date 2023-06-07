import Address from "@/backend/models/address";
import wrap from "@/utility/wrapHandler";
import { NextApiRequest, NextApiResponse } from "next";

export async function add(req: NextApiRequest, res: NextApiResponse) {
  const address = await Address.create({
    ...req.body.VALID_REQ,
    user: req.body.$USER._id,
  });

  res.status(201).json(address);
}

export async function query(req: NextApiRequest, res: NextApiResponse) {
  const addresses = await Address.find({ user: req.body.$USER._id });
  res.status(200).json(addresses);
}

export async function get(req: NextApiRequest, res: NextApiResponse) {
  const address = await Address.findOne({
    _id: req.body.VALID_ID.addressId,
    user: req.body.$USER._id,
  });

  if (address === null) {
    return res.status(400).json({
      code: "not-found",
      message: "address not found",
    });
  }

  res.status(200).json(address);
}

export async function remove(req: NextApiRequest, res: NextApiResponse) {
  const address = await Address.findOneAndDelete({
    _id: req.body.VALID_ID.addressId,
    user: req.body.$USER._id,
  });

  if (address === null) {
    return res.status(400).json({
      code: "not-found",
      message: "address not found",
    });
  }

  res.status(200).json(address);
}

export async function update(req: NextApiRequest, res: NextApiResponse) {
  const address = await Address.findOneAndUpdate(
    {
      _id: req.body.VALID_ID.addressId,
      user: req.body.$USER._id,
    },
    req.body.VALID_REQ
  );

  if (address === null) {
    return res.status(400).json({
      code: "not-found",
      message: "address not found",
    });
  }

  res.status(200).json(address);
}
