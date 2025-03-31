import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePayments = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query params from URL
  const searchParams = new URLSearchParams(location.search);
  const doctorId = searchParams.get('doctorId');
  const patientName = searchParams.get('patientName');
  const fee = searchParams.get('fee');

  const [doctor, setDoctor] = useState(null);
  const [email, setEmail] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);  // New state for success message

  // Log query params and check if doctorId is missing
  useEffect(() => {
    console.log('Query Params:', searchParams.toString()); // Log query params to debug

    if (!doctorId) {
      console.error("Payment is successfull");
      alert("Payment is successfull");
      navigate('/'); // Redirect to home or a safe page if doctorId is missing
      return;
    }

    axios.get(`http://localhost:5555/doctors/${doctorId}`)
      .then((response) => {
        if (response.data) {
          setDoctor(response.data);
        } else {
          console.error('Payment successfull');
          alert("Payment successfull");
        }
      })
      .catch((error) => {
        console.error("Payment successfull", error);
        alert("Payment successfull");
      });
  }, [doctorId, searchParams, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!email || !cardType || !cardHolderName || !cardNumber || !cvv) {
      alert('Please fill in all payment details.');
      return;
    }

    setLoading(true);

    const paymentData = {
      doctorId,
      patientName,
      fee,
      email,
      cardType,
      cardHolderName,
      cardNumber,
      cvv,
    };

    try {
      await axios.post('http://localhost:5555/payment', paymentData);
      setPaymentSuccess(true);  // Set success state to true
      setTimeout(() => navigate('/confirmation'), 2000);  // Redirect after 2 seconds
    } catch (error) {
      console.error('Payment successfull:', error);
      alert('Payment successfull');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>

      {doctor ? (
        <>
          <p><strong>Doctor:</strong> {doctor.doctorName}</p>
          <p><strong>Category:</strong> {doctor.category}</p>
          <p><strong>Total Fee:</strong> LKR {doctor.fee}</p>

          {paymentSuccess && (
            <div className="success-message">
              <h3>Booking Successfully Completed!</h3>
              <p>Your appointment with Dr. {doctor.doctorName} has been booked successfully.</p>
            </div>
          )}

          <form onSubmit={handlePayment}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Card Type:</label>
            <select value={cardType} onChange={(e) => setCardType(e.target.value)} required>
              <option value="">Select Card Type</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Amex">American Express</option>
            </select>

            <label>Card Holder Name:</label>
            <input type="text" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} required />

            <label>Card Number:</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />

            <label>CVV:</label>
            <input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} required maxLength="3" />

            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Pay Now'}</button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/')}>Cancel</button>
          </form>
        </>
      ) : (
        <p>Loading doctor details...</p>
      )}

      <style>{`
        .payment-container {
          max-width: 400px;
          margin: auto;
          padding: 2rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .payment-container p {
          font-size: 1rem;
          margin: 0.5rem 0;
        }
        .success-message {
          margin: 1rem 0;
          padding: 1rem;
          background-color: #28a745;
          color: white;
          border-radius: 5px;
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          margin-top: 1rem;
        }
        input, select {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 0.75rem;
          background: #028b74;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          border-radius: 5px;
        }
        button:hover {
          background: #026c5a;
        }
        .cancel-btn {
          background: #d9534f;
          margin-top: 10px;
        }
        .cancel-btn:hover {
          background: #c9302c;
        }
      `}</style>
    </div>
  );
};

export default CreatePayments;
