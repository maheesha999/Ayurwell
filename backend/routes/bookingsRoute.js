import express from "express";
import Booking from "../models/bookingModel.js";

const router = express.Router();

// Route to create a new booking
router.post("/", async (req, res) => {
  try {
    const { doctorId, patientName, contact, day, date, time } = req.body;

    if (!doctorId || !patientName || !contact || !day || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new booking
    const newBooking = new Booking({ doctorId, patientName, contact, day, date, time });
    await newBooking.save();

    return res.status(201).json({ message: "Appointment booked successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("doctorId", "doctorName category"); // Populate doctor details
    return res.status(200).json({ count: bookings.length, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to get a booking by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate("doctorId", "doctorName category");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to update a booking
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { patientName, contact, day, date, time } = req.body;

    if (!patientName || !contact || !day || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { patientName, contact, day, date, time },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to delete a booking
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
