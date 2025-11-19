

import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/ecom")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const dbConnection = mongoose.connection;
export default dbConnection;