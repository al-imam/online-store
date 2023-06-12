import { NextApiResponse, NextApiRequest } from "next";
import { NextHandler } from "next-connect";

function wrap<T extends object = {}>(
  callback: (
    req: NextApiRequest & T,
    res: NextApiResponse,
    next: NextHandler
  ) => any | Promise<any>,
  code = "unknown"
) {
  return (req: NextApiRequest & T, res: NextApiResponse, next: NextHandler) => {
    return Promise.resolve(callback(req, res, next)).catch((e) => {
      console.log(e);
      res.status(500).json({ code, message: "Internal server error!" });
    });
  };
}

export default wrap;
