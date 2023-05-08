import axios from "axios";

const req = axios.create({ baseURL: "http://localhost:3000/api/" });

export const Get = req.get;
export const Post = req.post;
