import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  year: Number
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
