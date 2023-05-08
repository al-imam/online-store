import mongoose from "mongoose";

function dbConnect(uri: string): void {
  mongoose
    .connect(uri, { family: 4 })
    .then(() => console.log("mongodb connected!"))
    .catch((e) => console.log(e));
}

export default dbConnect;
