import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserMd, FaMoneyBillWave, FaGraduationCap, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import Spinner from "../../components/spinner";
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ShowDoctors = () => {
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const today = new Date();

  const generateDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      days.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
        date: date.getDate(),
        fullDate: date
      });
    }
    return days;
  };

  const weekDays = generateDays();

  const generateTimeSlots = (selectedDate) => {
    const startHour = 8;
    const endHour = 22;
    const slots = [];
    
    const now = new Date();
    const currentHour = now.getHours();
    const isToday = selectedDate && selectedDate.toDateString() === today.toDateString();
    
    for (let hour = startHour; hour <= endHour; hour++) {
      if (isToday && hour <= currentHour) continue;
      let formattedHour = hour > 12 ? hour - 12 : hour;
      let period = hour >= 12 ? "PM" : "AM";
      slots.push(`${formattedHour}:00 ${period}`);
    }
    return slots;
  };

  const timeSlots = selectedDay ? generateTimeSlots(selectedDay.fullDate) : [];

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/doctors/${id}`)
      .then((response) => {
        setDoctor(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleBookAppointment = () => {
    if (selectedDay && selectedTime) {
      navigate(`/booking?doctorId=${id}&day=${selectedDay.day}&date=${selectedDay.date}&time=${selectedTime}`);
    } else {
      alert("Please select a valid day and time slot.");
    }
  };

  return (
    <div>
      <Header />
      <div className="doctor-container">
        {loading ? (
          <Spinner />
        ) : (
          <div className="doctor-details">
            <div className="doctor-left">
              {doctor.image ? (
                <img src={`http://localhost:5555${doctor.image}`} alt={doctor.doctorName} className="doctor-image" />
              ) : (
                <p className="no-image">No Image Available</p>
              )}
            </div>
            <div className="doctor-right">
              <h2 className="doctor-name"><FaUserMd className="icon" /> {doctor.doctorName}</h2>
              <p className="doctor-detail"><strong className="category">{doctor.category || "Uncategorized"}</strong></p>
              <p className="doctor-detail"><FaGraduationCap className="icon" /> <strong>Degree:</strong> {doctor.degree || "Not Available"}</p>
              <p className="doctor-detail"><FaMapMarkerAlt className="icon" /> <strong>Address:</strong> {doctor.address || "Not Available"}</p>
              <p className="doctor-detail"><FaBriefcase className="icon" /> <strong>Experience:</strong> {doctor.experience} years</p>
              <p className="doctor-detail"><FaMoneyBillWave className="icon" /> <strong>Fee:</strong> {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(doctor.fee)}</p>
              <div className="booking-slots">
                <h3>Booking slots</h3>
                <div className="days">
                  {weekDays.map((dayObj, index) => (
                    <button 
                      key={index} 
                      className={`day ${selectedDay?.date === dayObj.date ? "selected" : ""}`} 
                      onClick={() => setSelectedDay(dayObj)}
                      disabled={dayObj.fullDate < today}
                    >
                      <span className="day-name">{dayObj.day}</span>
                      <span className="day-date">{dayObj.date}</span>
                    </button>
                  ))}
                </div>
                <div className="time-slots">
                  {timeSlots.map((time, index) => (
                    <button 
                      key={index} 
                      className={`time ${selectedTime === time ? "selected" : ""}`} 
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <button className="book-appointment" onClick={handleBookAppointment}>Book an appointment</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
   

      <style>{`
        .doctor-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 105vh;
          background-color: #f8f9fa;
          padding: 1rem;
        }
        .doctor-details {
          display: flex;
          gap: 3rem;
          max-width: 900px;
          width: 100%;
          padding: 3rem;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          text-align: left;
        }
        .doctor-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .doctor-image {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #028b74;
        }
        .no-image {
          color: #777;
        }
        .doctor-right {
          flex: 2;
        }
        .doctor-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 2rem;
          font-weight: bold;
          color: #330d0f;
        }
        .doctor-detail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1rem 0;
          font-size: 1rem;
          color: #333;
        }
        .category {
          font-size: 1.5rem;
          font-weight: bold;
          color: #028b74;
        }
        .icon {
          color: #330d0f;
          font-size: 1.5rem;
        }
        .days {
          display: flex;
          gap: 5px;
          justify-content: center;
          margin-bottom: 2px;
        }
        .day {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          border-radius: 20px;
          border: 1px solid #ccc;
          background: white;
          cursor: pointer;
          font-size: 1rem;
          text-align: center;
        }
        .day-name {
          font-weight: bold;
        }
        .day.selected {
          background: #028b74;
          color: white;
        }
        .day:hover {
          background-color: #28a745;
          color: white;
        }
        .time-slots {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 900px;
        }
        .time {
          padding: 8px 8px;
          border-radius: 15px;
          border: 1px solid #ccc;
          background: white;
          cursor: pointer;
          font-size: 1rem;
        }
        .time.selected {
          background: #028b74;
          color: white;
        }
        .time:hover {
          background-color: #28a745;
          color: white;
        }
        .book-appointment {
          width: 60%;
          padding: 1rem;
          background-color: #028b74;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: bold;
          text-transform: uppercase;
        }
        .book-appointment:hover {
          background-color: #28a745;
        }
      `}</style>
    </div>
  );
};

export default ShowDoctors;
