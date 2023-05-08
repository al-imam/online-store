import mongoose from "mongoose";

function dbConnect(uri: string): void {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.connect(uri).then(() => {
    console.log("mongodb connected!");
  });
}

export default dbConnect;
