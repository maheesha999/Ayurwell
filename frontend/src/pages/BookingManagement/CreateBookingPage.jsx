import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({ patientName: "", contact: "" });
  const [loading, setLoading] = useState(false);

  // Extract query params from URL
  const searchParams = new URLSearchParams(location.search);
  const doctorId = searchParams.get("doctorId");
  const fee = searchParams.get("fee");
  const day = searchParams.get("day");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://localhost:5555/doctors/${doctorId}`)
        .then((response) => {
          setDoctor(response.data);
        })
        .catch((error) => {
          console.error("Error fetching doctor details:", error);
        });
    }
  }, [doctorId]);

  // Validate Patient Name
  const validateName = (name) => {
    if (!name) {
      return "Patient name is required.";
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
      return "Name can only contain letters and spaces.";
    }
    if (name.length < 3) {
      return "Name must be at least 3 characters long.";
    }
    return "";
  };

  // Validate Contact Number
  const validateContact = (num) => {
    if (!num) {
      return "Contact number is required.";
    }
    if (!/^\d{10}$/.test(num)) {
      return "Enter a valid 10-digit contact number.";
    }
    return "";
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setPatientName(value);
    setErrors((prev) => ({ ...prev, patientName: validateName(value) }));
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    setContact(value);
    setErrors((prev) => ({ ...prev, contact: validateContact(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameError = validateName(patientName);
    const contactError = validateContact(contact);

    if (nameError || contactError) {
      setErrors({ patientName: nameError, contact: contactError });
      return;
    }

    setLoading(true);

    const bookingData = {
      doctorId,
      patientName,
      contact,
      fee,
      day,
      date,
      time,
    };

    try {
      await axios.post("http://localhost:5555/booking", bookingData);
      alert("Appointment booked successfully!");
      navigate(
        `/payment?doctorId=${doctorId}&doctorName=${doctor.doctorName}&fee=${fee}`
      );
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <h2>Confirm Your Appointment</h2>
      {doctor ? (
        <div className="booking-details">
          <p>
            <strong>Doctor:</strong> {doctor.doctorName}
          </p>
          <p>
            <strong>Category:</strong> {doctor.category}
          </p>
          <p>
            <strong>Fee: </strong>LRK {doctor.fee}
          </p>
          <p>
            <strong>Day:</strong> {day}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>

          <form onSubmit={handleSubmit}>
            <label>Patient Name:</label>
            <input
              type="text"
              value={patientName}
              onChange={handleNameChange}
              required
            />
            {errors.patientName && (
              <span className="error">{errors.patientName}</span>
            )}

            <label>Contact Number:</label>
            <input
              type="tel"
              value={contact}
              onChange={handleContactChange}
              required
              disabled={!patientName} // Prevent contact entry if name is empty
            />
            {errors.contact && <span className="error">{errors.contact}</span>}

            <button type="submit" disabled={loading}>
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>
        </div>
      ) : (
        <p>Loading doctor details...</p>
      )}

      <style>{`
        .booking-container {
          max-width: 400px;
          margin: auto;
          padding: 2rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .booking-details p {
          font-size: 1rem;
          margin: 0.5rem 0;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        input {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }
        input:disabled {
          background: #f0f0f0;
          cursor: not-allowed;
        }
        button {
          padding: 0.75rem;
          background: #028b74;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          border-radius: 5px;
        }
        button:hover {
          background: #026c5a;
        }
        .error {
          color: red;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default CreateBookingPage;
