import getEnv from "@/utility/getEnv";
import mongoose from "mongoose";

function dbConnect(): void {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose
    .connect(getEnv("mongodb_uri"), { family: 4 })
    .then(() => console.log("mongodb connected!"))
    .catch((e) => console.log(e));
}

export default dbConnect;
