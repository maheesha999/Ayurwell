import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const CreateDoctor = () => {
  const [formData, setFormData] = useState({
    doctorName: '',
    email: '',
    degree: '',
    address: '',
    fee: '',
    category: 'General',
    experience: '',
    image: null,
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'doctorName':
        if (!value.trim()) error = 'Doctor name is required';
        else if (!/^[A-Za-z.\s]+$/.test(value)) error = 'Doctor name must contain only letters, spaces, and periods';
        else if (value.length < 3) error = 'Name must be at least 3 characters';
        break;
      

      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Enter a valid email';
        break;

        case 'degree':
          if (!value.trim()) error = 'Degree is required';
          break;
  
        case 'address':
          if (!value.trim()) error = 'Address is required';
          else if (value.length < 5) error = 'Address must be at least 5 characters';
          break;

      case 'fee':
        if (!value || isNaN(value)) error = 'Enter a valid fee amount';
        else if (value < 500 || value > 5000) error = 'Fee must be between 500 and 5000';
        break;
   case 'experience':
        if (!value || isNaN(value) || parseInt(value) < 0) error = 'Enter a valid experience (0 or more)';
        break;

      case 'image':
        if (!value) {
          error = 'Image is required';
        } else {
          const validImageTypes = ['image/jpeg', 'image/png'];
          if (!validImageTypes.includes(value.type)) error = 'Only JPEG and PNG images are allowed';
        }
        break;

      default:
        break;
    }

    return error;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (step < Object.keys(formData).indexOf(name)) {
      return;
    }
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
    if (!error) {
      setStep(step + 1);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const error = validateField('image', file);
    setErrors({ ...errors, image: error });

    if (!error) {
      setStep(step + 1);
      setFormData({ ...formData, image: file });
    }
  };

  const handleCreateDoctor = async () => {
    let validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    setLoading(true);
    try {
      await axios.post('http://localhost:5555/doctors', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      enqueueSnackbar('Doctor created successfully!', { variant: 'success' });
      navigate('/doctors');
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error creating doctor', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '2rem', backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', color: '#330D0F', fontWeight: '700' }}>Create Doctor</h1>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#FFF', borderRadius: '8px' }}>
          {loading && <div>Loading...</div>}
          {['doctorName', 'email', 'degree', 'address', 'fee', 'experience'].map((field, index) => (
            <div key={field} style={{ margin: '1rem 0' }}>
              <label style={{ fontWeight: '600', color: '#330D0F' }}>{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type={field === 'fee' || field === 'experience' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                disabled={step < index}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #E1E1E1' }}
              />
              {errors[field] && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors[field]}</span>}
            </div>
          ))}
            <div style={{ margin: '1rem 0' }}>
            <label style={{ fontWeight: '600', color: '#330D0F' }}>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '0.75rem' }} disabled={step < 6}>
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

          <div style={{ margin: '1rem 0' }}>
            <label style={{ fontWeight: '600', color: '#330D0F' }}>Image</label>
            <input type="file" onChange={handleImageChange} disabled={step < 7} style={{ width: '100%', padding: '0.75rem' }} />
            {errors.image && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.image}</span>}
          </div>
          
          <button
            onClick={handleCreateDoctor}
            disabled={step < 8}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: ' #028b74', color: '#FFF', cursor: 'pointer' }}
          >
            {loading ? 'Creating...' : 'Create Doctor'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateDoctor;
