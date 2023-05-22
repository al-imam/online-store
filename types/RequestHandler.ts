import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

type RequestHandler<T extends object = {}> = (
  req: NextApiRequest & T,
  res: NextApiResponse,
  next: NextHandler
) => Promise<any> | any;

export default RequestHandler;
