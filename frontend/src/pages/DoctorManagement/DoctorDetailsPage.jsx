import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/DoctorCss/DoctorDetailsPage.css'; 
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Doctor not found");
        } else {
          setError("An error occurred while fetching the doctor details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBookAppointment = () => {
    navigate(`/appointments/create/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div>
      <Header />
      <div className="container">
        <div className="doctor-details-container">
          <div className="doctor-image-container">
            <img
              src={`http://localhost:5555${doctor.image}`}
              alt={doctor.doctorName}
              className="doctor-image"
            />
          </div>

          <div className="doctor-info-container">
            <h1 className="title">{doctor.doctorName}</h1>
            <p className="category"><strong>Category:</strong> {doctor.category}</p>
            <p className="experience"><strong>Experience:</strong> {doctor.experience} years</p>
            <p className="degree"><strong>Degree:</strong> {doctor.degree}</p>
            <p className="address"><strong>Address:</strong> {doctor.address}</p>
            <p className="fee"><strong>Consultation Fee:</strong> LKR {doctor.fee}</p>
            <button
              className="button book-button"
              onClick={handleBookAppointment}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorDetailsPage;
