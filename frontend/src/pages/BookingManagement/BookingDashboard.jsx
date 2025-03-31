import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
import { Link, useNavigate } from "react-router-dom";
import BookingsTable from "../../components/home/BookingsTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../components/doctorCss/BookingDashboard.css";
import logo from '../../components/images/logo.png';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5555/booking")
      .then((response) => {
        setBookings(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, []);

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    const img = new Image();
    img.src = logo;
    img.onload = function () {
      doc.addImage(img, 'png', doc.internal.pageSize.getWidth() - 44, 10, 30, 30);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Appointment Bookings", 14, 20);
      doc.setFontSize(16);
      doc.text("Booking Report", 14, 30);
      doc.setFontSize(12);
      doc.text(`${date}`, 14, 40);
      doc.line(14, 44, doc.internal.pageSize.getWidth() - 14, 44);
      doc.autoTable({
        startY: 50,
        head: [["Patient Name", "Doctor Name", "Date", "Time", "Contact"]],
        body: filteredBookings.map(booking => [
          booking.patientName,
          booking.doctorName,
          booking.date,
          booking.time,
          booking.contact
        ]),
        theme: 'grid',
        headStyles: { fillColor: '#A5D6A7', textColor: '#000000' }
      });
      doc.save("Booking_Report.pdf");
    };
  };

  return (
    <div>
      <Header />
      <div className="booking-dashboard-container">
        <div className="header-container">
          <h1>Booking Management</h1>
        </div>
        <div className="search-button-container">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search by patient or doctor name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="button-group">
            <button className="report-button" onClick={generatePDFReport}>Generate Report</button>
            <Link to="/booking">
              <button className="add-button">Add Booking</button>
            </Link>
          </div>
        </div>
        {loading ? <Spinner /> : <BookingsTable bookings={filteredBookings} />}
      </div>
      <Footer />
    </div>
  );
};

export default BookingDashboard;
