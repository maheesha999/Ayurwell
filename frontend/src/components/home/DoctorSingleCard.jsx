import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorSingleCard = ({ doctor }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      style={isSelected ? styles.cardSelected : styles.card}
      onClick={handleClick}
    >
      <Link to={`/doctors/${doctor._id}`} style={styles.link}>
        {/* Doctor Image */}
        <div style={styles.imageContainer}>
          <img
            src={`http://localhost:5555${doctor.image}`}
            alt={doctor.doctorName}
            style={styles.image}
          />
        </div>
        {/* Doctor Details */}
        <div style={styles.details}>
          <h2 style={styles.doctorName}>{doctor.doctorName}</h2>
          <p style={styles.category}><strong>{doctor.category || "Not Specified"}</strong> </p>
          <p style={styles.address}> {doctor.address || "Not Available"}</p>
        </div>
      </Link>
    </div>
  );
};

// Inline styles
const styles = {
  card: {
    borderRadius: '0.5rem',
    overflow: 'hidden',
    textAlign: 'center',
    margin: '1rem',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '230px', // Set a fixed width
  },
  cardSelected: {
    borderRadius: '0.5rem',
    overflow: 'hidden',
    textAlign: 'center',
    margin: '0.5rem',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    backgroundColor: '#e0d7c4',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '250px', // Set a fixed width
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
    height: '100%', // Fixed height
    overflow: 'hidden',
    backgroundColor: '#EFF6FF',
  },
  image: {
    width: '90%',
    height: '90%',
    //objectFit: 'cover', // Ensures the image fully covers the container
  },
  details: {
    padding: '1rem', // Reduced padding
    backgroundColor: '#fff',
  },
  doctorName: {
    margin: '0.3rem 0',
    fontSize: '1rem', // Slightly smaller font size
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: '0.875rem',
    color: '#555',
    marginBottom: '0.25rem',
  },
  address: {
    fontSize: '0.875rem',
    color: '#555',
  },
};

export default DoctorSingleCard;
