import mongoose from "mongoose";

function dbConnect(): void {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose
    .connect(process.env.MONGO_URI as string, { family: 4 })
    .then(() => console.log("mongodb connected!"))
    .catch((e) => console.log(e));
}

export default dbConnect;
