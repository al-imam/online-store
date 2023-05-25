import User from "@/backend/models/user";
import wrap from "@/utility/wrapHandler";

const singup = wrap(async (req, res) => {
  const user = await User.create(req.body._valid_object);
  res.status(201).json(remove(user));
}, "singup");

function remove({
  name,
  email,
  avatar,
  _id,
  created,
  role,
}: {
  [key: string]: any;
}) {
  return { name, email, avatar, _id, created, role };
}

export { singup };
