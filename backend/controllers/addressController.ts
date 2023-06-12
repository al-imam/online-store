import Address from "@/backend/models/address";
import { NextApiResponse } from "next";
import { MyRequest } from "@/types/NextApiResponse";
import { UserWithId } from "@/types/UserInterface";

export async function add(
  req: MyRequest<{ $user: UserWithId }>,
  res: NextApiResponse
) {
  const address = await Address.create({
    ...req.body.VALID_REQ,
    user: req.$user._id,
  });

  res.status(201).json(address);
}

export async function query(
  req: MyRequest<{ $user: UserWithId }>,
  res: NextApiResponse
) {
  const addresses = await Address.find({ user: req.$user._id });
  res.status(200).json(addresses);
}

export async function get(
  req: MyRequest<{ $user: UserWithId }>,
  res: NextApiResponse
) {
  const address = await Address.findOne({
    _id: req.body.VALID_ID.addressId,
    user: req.$user._id,
  });

  if (address === null) {
    return res.status(400).json({
      code: "not-found",
      message: "address not found",
    });
  }

  res.status(200).json(address);
}

export async function remove(
  req: MyRequest<{ $user: UserWithId }>,
  res: NextApiResponse
) {
  const address = await Address.findOneAndDelete({
    _id: req.body.VALID_ID.addressId,
    user: req.$user._id,
  });

  if (address === null) {
    return res.status(400).json({
      code: "not-found",
      message: "address not found",
    });
  }

  res.status(200).json(address);
}

export async function update(
  req: MyRequest<{ $user: UserWithId }>,
  res: NextApiResponse
) {
  const address = await Address.findOneAndUpdate(
    {
      _id: req.body.VALID_ID.addressId,
      user: req.$user._id,
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
