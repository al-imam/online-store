import Address from "@/backend/models/address";
import { NextApiResponse } from "next";
import { MyRequest } from "@/types/NextApiResponse";
import { UserWithId } from "@/types/UserInterface";
import colorLog from "@/utility/colorLog";

type AddressRequest<T extends object = {}> = MyRequest<{
  $user: UserWithId;
  $data: { addressId: string } & T;
}>;

export async function add(
  req: MyRequest<{ $user: UserWithId; $data: Record<string, any> }>,
  res: NextApiResponse
) {
  colorLog(req);
  const address = await Address.create({
    ...req.$data,
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

export async function get(req: AddressRequest, res: NextApiResponse) {
  const doc = await Address.findOne({
    _id: req.$data.addressId,
    user: req.$user._id,
  });

  if (doc === null) {
    return res.status(404).json({
      code: "not-found",
      message: "address not found",
    });
  }

  res.status(200).json(doc);
}

export async function remove(req: AddressRequest, res: NextApiResponse) {
  const doc = await Address.findOne({
    _id: req.$data.addressId,
    user: req.$user._id,
  });

  if (doc === null) {
    return res.status(404).json({
      code: "not-found",
      message: "address not found",
    });
  }

  await doc.deleteOne();

  res.status(200).json({ success: true });
}

export async function update(
  req: AddressRequest<Record<string, any>>,
  res: NextApiResponse
) {
  const doc = await Address.findOne({
    _id: req.$data.addressId,
    user: req.$user._id,
  });

  if (doc === null) {
    return res.status(404).json({
      code: "not-found",
      message: "address not found",
    });
  }

  await doc.updateOne(req.$data);

  res.status(200).json({ success: true });
}
