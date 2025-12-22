import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: String,
    phone: String,
    productName: String,
    quantity: Number,
    notes: String,
    status: {
      type: String,
      enum: ["New", "Contacted", "Completed"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
