
import mongoose from "mongoose";
import config from "config";

mongoose
  .connect(`${config.get("MONGODB_URI")}/ecom`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const dbConnection = mongoose.connection;
export default dbConnection;