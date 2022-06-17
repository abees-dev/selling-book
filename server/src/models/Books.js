import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    unit: { type: String, default: "Books" },
    price: { type: Number },
    author: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    booksType: { type: String, default: "Books" },
    ratting: { type: Number, default: 4 },
  },
  { timestamps: true }
);

bookSchema.plugin(paginate);
module.exports = mongoose.model("Books", bookSchema);
