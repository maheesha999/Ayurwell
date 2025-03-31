import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const EditDoctor = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    doctorName: '',
    email: '',
    fee: '',
    category: 'General',
    experience: '',
    degree: '',
    address: '',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/doctors/${id}`)
      .then((response) => {
        const { doctorName, email, fee, category, experience, degree, address } = response.data;
        setFormData({ doctorName, email, fee, category, experience, degree, address, image: null });
      })
      .catch(() => {
        enqueueSnackbar('Error loading doctor details', { variant: 'error' });
      })
      .finally(() => setLoading(false));
  }, [id, enqueueSnackbar]);

  const validate = (name, value) => {
    let error = '';
    if (name === 'doctorName') {
      if (!/^[A-Za-z.\s]+$/.test(value)) {
        error = 'Doctor name must contain only letters, spaces, and periods.';
      } else if (value.trim().split(/\s+/).length < 2) {
        error = 'Doctor name must contain at least two words.';
      }
    }
    if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Enter a valid email address.';
      }
    }
    if (name === 'fee') {
      if (value < 500 || value > 5000) {
        error = 'Fee must be between 500 and 5000.';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const errorMsg = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
    }
  };

  const handleUpdateDoctor = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    // Final validation check before submitting
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      enqueueSnackbar('Please fix the errors before submitting.', { variant: 'error' });
      return;
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:5555/doctors/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      enqueueSnackbar('Doctor updated successfully!', { variant: 'success' });
      navigate('/doctors');
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error updating doctor', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '2rem', backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', color: '#330D0F', fontWeight: '700' }}>Edit Doctor</h1>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#FFF', borderRadius: '8px' }}>
          {loading && <p>Loading...</p>}
          {['doctorName', 'email', 'fee', 'experience', 'degree', 'address'].map((field) => (
            <div key={field} style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: '600', color: '#330D0F' }}>{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type={field === 'fee' || field === 'experience' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #E1E1E1' }}
              />
              {errors[field] && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors[field]}</p>}
            </div>
          ))}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: '600', color: '#330D0F' }}>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '0.75rem' }}>
              <option value="General">General</option>
              <option value="ENT">ENT</option>
              <option value="Neurology">Neurology</option>
              <option value="Panchakarma">Panchakarma</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Pediatric">Pediatric</option>
              <option value="Gastrocardiac">Gastrocardiac</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: '600', color: '#330D0F' }}>Image</label>
            <input type="file" onChange={handleImageChange} style={{ width: '100%', padding: '0.75rem' }} />
          </div>
          <button
            onClick={handleUpdateDoctor}
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#028b74', color: '#FFF', cursor: 'pointer' }}
          >
            {loading ? 'Updating...' : 'Update Doctor'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditDoctor;
