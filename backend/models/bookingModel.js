import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientName: { type: String, required: true },
  contact: { type: String, required: true },
  day: { type: String, required: true },
  date: { type: String, required: true }, // Stored as string for simplicity (e.g., "2025-03-30")
  time: { type: String, required: true }, // Stored as string (e.g., "10:30 AM")
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
