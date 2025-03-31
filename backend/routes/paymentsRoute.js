import express from "express";
import Payment from "../models/paymentModel.js";

const router = express.Router();

// Route to create a new payment
router.post("/", async (req, res) => {
  try {
    const { doctorId, patientName, fee, email, cardType, cardHolderName, cardNumber, cvv } = req.body;

    if (!doctorId || !patientName || !fee || !email || !cardType || !cardHolderName || !cardNumber || !cvv ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new payment record
    const newPayment = new Payment({ doctorId, patientName, fee, email, cardType, cardHolderName, cardNumber, cvv });
    await newPayment.save();

    return res.status(201).json({ message: "Payment successful", payment: newPayment });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to get all payments
router.get("/:id", async (req, res) => {
  try {
    const doctor = await doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Route to get a payment by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to update a payment
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorId, patientName, fee, email, cardType, cardHolderName, cardNumber, cvv } = req.body;

    if (!doctorId || !patientName || !fee || !email || !cardType || !cardHolderName || !cardNumber || !cvv ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { doctorId, patientName, fee, email, cardType, cardHolderName, cardNumber, cvv },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({ message: "Payment updated successfully", payment: updatedPayment });
  } catch (error) {
    console.error("Error updating payment:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to delete a payment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;