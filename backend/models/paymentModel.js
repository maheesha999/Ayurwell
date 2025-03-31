import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Doctor" },
  patientName: { type: String, required: true },
  fee: { type: Number, required: true },
  email: { type: String, required: true },
  cardType: { type: String, required: true, enum: ["Visa", "MasterCard", "American Express"] },
  cardHolderName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cvv: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
