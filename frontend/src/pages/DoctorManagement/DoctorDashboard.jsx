import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
import { Link, useNavigate } from "react-router-dom";
import DoctorsTable from "../../components/home/DoctorsTable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../components/doctorCss/DoctorDashboard.css";
import logo from '../../components/images/logo.png'; // Adjust the path if necessary
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [searchQuery, setSearchQuery] = useState(""); // For combined search

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/doctors")
      .then((response) => {
        setDoctors(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Filter doctors based on search query for both doctorName and category
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format the experience as a number representing years
  const formatExperience = (experience) => {
    if (experience && !isNaN(experience)) {
      return `${experience} years`;
    }
    return "N/A";
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Load logo image
    const img = new Image();
    img.src = logo; // The path to the image
    img.onload = function () {
      // Add logo image on the right side
      doc.addImage(img, 'png', doc.internal.pageSize.getWidth() - 44, 10, 30, 30);

      // Align Report title to the left
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Specialists", 14, 20);

      doc.setFontSize(16);
      doc.text("Doctor Report", 14, 30);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`${date}`, 14, 40);

      // Draw a solid horizontal line below the date
      const lineStartX = 14;
      const lineEndX = doc.internal.pageSize.getWidth() - 14;
      const lineY = 44;
      doc.line(lineStartX, lineY, lineEndX, lineY);

      let currentY = lineY + 10;

      const categories = Array.from(new Set(filteredDoctors.map((doctor) => doctor.category)));

      categories.forEach((category) => {
        const categoryDoctors = filteredDoctors.filter(
          (doctor) => doctor.category === category
        );

        const tableData = categoryDoctors.map((doctor) => [
          doctor.doctorName,
          doctor.degree,
          doctor.fee,
          formatExperience(doctor.experience),  // Format the experience in years
          doctor.category,
          doctor.address
        ]);

        doc.setFontSize(14);
        doc.text(category, 14, currentY);
        currentY += 10;

        doc.autoTable({
          startY: currentY,
          head: [["Doctor Name", "Degree", "Fee", "Experience", "Category", "Address"]],
          body: tableData,
          theme: 'grid',
          headStyles: { 
            fillColor: '#A5D6A7', 
            textColor: '#000000' // Header text color
          },
          margin: { top: 10 },
        });

        currentY = doc.autoTable.previous.finalY + 10;
      });

      doc.save("Doctor_Report.pdf");
    };
  };

  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="header-container">
          <h1 className="text-3xl">Doctor Management</h1>
        </div>

        {/* Search and Buttons Section */}
        <div className="search-button-container">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search by doctor name or category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="button-group">
            <button className="report-button" onClick={generatePDFReport}>
              Generate Report
            </button>
            <Link to="/doctors/create">
              <button className="add-button">Add</button>
            </Link>
            <button className="button button-card" onClick={() => navigate("/doctors/card")}>
              Card
            </button>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <DoctorsTable
            doctors={filteredDoctors.map(doctor => ({
              ...doctor,
              experience: formatExperience(doctor.experience), // Format experience for display
            }))}
          />
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
