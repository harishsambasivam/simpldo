import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export default mongoose.model("User", UserSchema);
