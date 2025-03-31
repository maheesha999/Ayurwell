import express from "express";
import multer from "multer";
import path from "path";
import Doctor from "../models/doctorModel.js";

const router = express.Router();

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Route to save a new doctor
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { doctorName, email, degree, address, fee, category, experience } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (!doctorName || !email || !degree || !address || !fee || !category || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a doctor with the same email or name exists
    const existingDoctor = await Doctor.findOne({ $or: [{ doctorName }, { email }] });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor with this name or email already exists" });
    }

    // Create a new doctor (doctorID is auto-generated)
    const newDoctor = new Doctor({ doctorName, email, degree, address, fee, category, experience, image });
    await newDoctor.save();

    return res.status(201).json(newDoctor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to get all doctors (with optional category filtering)
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const doctors = await Doctor.find(query);
    return res.status(200).json({ count: doctors.length, data: doctors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to get a doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to update a doctor
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorName, email, degree, address, fee, category, experience } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (!doctorName || !email || !degree || !address || !fee || !category || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if another doctor with the same name or email exists (excluding the current doctor being updated)
    const existingDoctor = await Doctor.findOne({ $or: [{ doctorName }, { email }], _id: { $ne: id } });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor with this name or email already exists" });
    }

    // Proceed with updating the doctor
    const updateData = { doctorName, email, degree, address, fee, category, experience };
    if (image) updateData.image = image;

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to delete a doctor
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
