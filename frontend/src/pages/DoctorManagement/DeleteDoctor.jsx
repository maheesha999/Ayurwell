import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const DeleteDoctor = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteDoctor = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/doctors/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Doctor deleted successfully!', { variant: 'success' });
        navigate('/doctors');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting doctor', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '2rem', backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', color: '#330D0F', fontWeight: '700' }}>Delete Doctor</h1>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#FFF', borderRadius: '8px' }}>
          {loading && <div>Loading...</div>}
          <h3 style={{ textAlign: 'center', fontWeight: '600' }}>Are you sure you want to delete this doctor?</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button
              onClick={handleDeleteDoctor}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#C82333',
                color: '#FFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              {loading ? 'Deleting...' : 'Yes, Delete It'}
            </button>
            <button
              onClick={() => navigate('/doctors')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#E9ECEF',
                color: '#495057',
                border: '2px solid #CED4DA',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeleteDoctor;
