import React, { useState, useEffect } from 'react';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../../../components/headerfooter/Header';
import Footer from '../../../components/headerfooter/Footer';

function EditExpense() {
  const [eID, seteID] = useState('');
  const [name, setName] = useState('');
  const [expense, setExpense] = useState('');
  const [cost, setCost] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/expenses/${id}`)
    .then((response) => {
      seteID(response.data.eID)
      setName(response.data.name)
      setExpense(response.data.expense)
      setCost(response.data.cost)
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('An error happend. Please check console');
      console.log(error);
    });
  }, [])

 

  const validateForm = () => {
    const newErrors = {};

    if (!eID) {
        newErrors.eID = 'ID is required.';
      }
  
      if (!name) {
        newErrors.name = 'Name is required.';
      } else if (name.length <= 2) { 
          newErrors.name = 'Name must be more than 2 letters.';
      }else if (/\d/.test(name)) {
          newErrors.name = 'Name must not contain numbers.';
      }
  
      if (!expense) {
          newErrors.expense = 'Name is required.';
      } else if (expense.length <= 2) { 
          newErrors.expense = 'Must be more than 2 letters.';
      }else if (/\d/.test(expense)) {
          newErrors.expense = 'Must not contain numbers.';
      }
  
      if (!cost) {
          newErrors.cost = 'Amount is required.';
        }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditExpense = () => {

    if (!validateForm()) {
      return;
    }

    const data = {
      eID,
      name,
      expense,
      cost, 
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/expenses/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Expense details edited successfully', { variant: 'success' });
        navigate(`/expenses/details/${id}`);
      })
      .catch((error) => {
        setLoading(false);
      //alert('An error occurred. Please check the console.');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      })
  };

  const handleCostChange = (e) => {
    const value = e.target.value;
    // Ensure only numbers are typed
    if (/^\d*$/.test(value)) {
      setCost(value);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Ensure only letters and spaces are typed
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
    }
  };

  return (
    <div>
      <Header/>
    <div style={styles.container}>
      <h1 style={styles.title}>Edit your payment details</h1>
      {loading && <Spinner />}
      <div style={styles.formContainer}>

        <div style={styles.inputGroup}>
          <label style={styles.label}>ID :</label>
          <input
            type='text'
            value={eID}
            onChange={(e) => {seteID(e.target.value);  validateForm();}}
            style={styles.input}
          />
          {errors.eID && <div style={styles.error}>{errors.eID}</div>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Name :</label>
          <input
            type='text'
            value={name}
            onChange={handleNameChange}
            style={styles.input}
          />
          {errors.name && <div style={styles.error}>{errors.name}</div>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Expense :</label>
          <input
            type='text'
            value={expense}
            onChange={(e) => {setExpense(e.target.value);  validateForm();}}
            style={styles.input}
          />
          {errors.expense && <div style={styles.error}>{errors.expense}</div>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Amount (LKR) :</label>
          <input
            type='text'
            value={cost}
            onChange={handleCostChange}
            style={styles.input}
          />
          {errors.cost && <div style={styles.error}>{errors.cost}</div>}
        </div>

          <button style={styles.button} onClick={handleEditExpense}>
            Save
          </button>
          {errors.form && <div style={styles.error}>{errors.form}</div>}
        </div>
      </div>
      <Footer/>
      </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#fff',
    minHeight: '110vh',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 2rem 0',
    color: '#330D0F',
    textAlign: 'center', // Center the title
  },
  formContainer: {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 9.2)',
  },
  label: {
    display: 'block',
    fontSize: '1.1rem',
    marginBottom: '.5rem',
    color: '#330D0F',
   fontWeight:'bold',
  },
  input: {
    width: '100%',
    padding: '.75rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '3px solid #330D0F',
    boxSizing: 'border-box',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem', // Adds space between the inputs
  },
  inputGroup: {
    marginBottom: '1rem',
    flex: 1, // Allows inputs to take equal space
  },
  textarea: {
    width: '100%',
    padding: '.75rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '3px solid #330D0F',
    boxSizing: 'border-box',
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '.5rem',
  },
  button: {
    backgroundColor: '#330D0F',
    width: '430px',
    color: '#fff',
    padding: '.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '50px',
  },
  cardTypeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  cardTypeLabel: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
  },
  cardImage: {
    width: '60px',
    height: 'auto',
    marginLeft: '0.5rem',
  },
  radio: {
    marginRight: '0.5rem',
  },
  hr: {
    border: '1px solid #ddd',
    margin: '20px 0',
  },
};


export default EditExpense;
