import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/ne.jpg'; // Background image
import { BsAlignCenter } from 'react-icons/bs';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to the login page after 3 seconds
    setTimeout(() => {
      navigate('/login');
    }, 4000);
  }, [navigate]);

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',   // Align children (title & slogan) to the left
      textAlign: 'center', 
      color: '#ffff', // White text color
      backgroundImage: `url(${backgroundImage})`, // Background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    title: {
      fontSize: '7rem',
      fontWeight: 'bold',
      Align:'center', 
    maxWidth:'80%',   },
    slogan: {
      fontSize: '3rem',
      maxWidth: '80%',
      lineHeight: '1.5',
      color:'white',
      
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AyurWell HealthCare</h1>
      <p style={styles.slogan}>
      Ancient Secrets for a Healthier Life....
      </p>
    </div>
  );
};

export default Home;
