import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';
import DoctorSingleCard from '../../components/home/DoctorSingleCard';
import Spinner from '../../components/spinner';

const DoctorsCardPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/doctors')
      .then((response) => {
        setDoctors(response.data.data);
        setFilteredDoctors(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = doctors.filter((doctor) =>
      doctor.doctorName.toLowerCase().includes(e.target.value.toLowerCase()) ||
      doctor.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleCategoryClick = (category) => {
    navigate(`/doctors/${category.toLowerCase()}`);
  };

  return (
    <div>
      <Header />
      <div style={styles.pageContainer}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h2 style={styles.sectionTitle}>Find by Speciality</h2>
            <p style={styles.sectionDescription}>
              Browse our extensive list of trusted Ayurvedic doctors, find the nearest specialist, <br/>and book your appointment hassle-free.
            </p>

            <div style={styles.categoryContainer}>
              {[ 'General', 'Panchakarma', 'Orthopedic', 'Gynecology', 'Pediatric', 'ENT', 'Neurology', 'Gastrocardiac' ].map((name) => (
                <div
                  key={name}
                  style={styles.categoryButton}
                  onClick={() => handleCategoryClick(name)}
                >
                  <img
                    src={`http://localhost:5555/uploads/${name.toLowerCase()}.png`}
                    alt={name}
                    style={styles.buttonImage}
                  />
                  <span style={styles.buttonText}>{name}</span>
                </div>
              ))}
            </div>

            <div style={styles.searchButtonContainer}>
              <div style={styles.searchInputContainer}>
                <FaSearch style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search by doctor name or category"
                  value={searchQuery}
                  onChange={handleSearch}
                  style={styles.searchInput}
                />
              </div>
            </div>

            <div style={styles.doctorGrid}>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((item) => (
                  <DoctorSingleCard key={item._id} doctor={item} />
                ))
              ) : (
                <p style={styles.noDoctors}>No doctors available.</p>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};


  const styles = {
    pageContainer: {
      backgroundColor: 'white',
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    sectionDescription: {
      textAlign: 'center',
      fontSize: '1rem',
      marginBottom: '1rem',
    },
    categoryContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      marginTop: '1rem',
      marginBottom: '3rem', // Increased margin to create space below the category section
    },
    categoryButton: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      width: '120px',
    },
    buttonImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    buttonText: {
      marginTop: '10px',
      fontSize: '1rem',
      textAlign: 'center',
    },
    searchButtonContainer: {
      width: '100%',
      maxWidth: '600px',
      marginBottom: '2rem',
      marginTop: '2rem', // Added margin-top to add space between category and search bar
      display: 'flex',
      justifyContent: 'center',
    },
    searchInputContainer: {
      position: 'relative',
      width: '100%',
    },
    searchInput: {
      width: '100%',
      padding: '1rem 1rem 1rem 40px',
      borderRadius: '30px',
      backgroundColor: '#fff',
      fontSize: '1.1rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: '2px solid #007bff',
      outline: 'none',
    },
    searchIcon: {
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#007bff',
      fontSize: '1.2rem',
    },
    doctorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1.5rem',
      width: '90%',
    },
    noDoctors: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#666',
    },
  };
  
export default DoctorsCardPage;
