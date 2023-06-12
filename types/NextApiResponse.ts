import { NextApiRequest } from "next";

export type MyRequest<T extends object = {}> = NextApiRequest & T;
