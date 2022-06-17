import mongoose from "mongoose";
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    users: { type: Schema.Types.ObjectId, ref: "users" },
    books: [{ type: Schema.Types.ObjectId, ref: "Books" }],
    quantity: { type: Number },
    total: { type: Number },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
