import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  doctorID: { type: mongoose.Schema.Types.ObjectId, unique: true, default: () => new mongoose.Types.ObjectId() },
  doctorName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  degree: {type: String, required: true },
  address: { type: String, required: true },
  fee: { type: Number, required: true },
  category: { type: String, required: true },
  experience: { type: Number, required: true },
  image: { type: String },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
