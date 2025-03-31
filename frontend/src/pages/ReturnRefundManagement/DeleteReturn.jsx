import React, { useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";

const DeleteReturn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteReturn = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this return?"
    );
    if (!confirmDelete) return; // Exit if user cancels

    setLoading(true);
    axios
      .delete(`http://localhost:5555/records/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/records"); // Redirect to homepage after successful deletion
      })
      .catch((error) => {
        setLoading(false);
        const message =
          error.response?.data?.message || "An unexpected error occurred.";
        alert(message); // More specific error message
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
      <div
  className="flex flex-col items-center justify-center min-h-screen bg-[#fff]"
  style={{ marginTop: '15px' }}
>
  <h1 className="text-3xl font-bold mb-8">Delete Return</h1>
  {loading && <Spinner />} {/* Display spinner during loading */}

  <div
    className="flex flex-col items-center bg-[#ffff] rounded-2xl shadow-lg p-8 w-[600px] mx-auto"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '20px',
      width: '600px',
      padding: '32px',
      margin: 'auto',
      marginTop: '86px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 4px 8px rgba(25, 255, 125, 0.9)',
      fontFamily: 'Poppins, sans-serif',
    }}
  >
    <h3 className="text-2xl font-semibold text-[#064521] mb-6">
      Are you sure you want to delete this return?
    </h3>
    <button
      className="w-full bg-[#064521] text-white text-lg py-4 rounded-lg mb-4 hover:bg-[#064521] transition duration-300"
      onClick={handleDeleteReturn}
    >
      Yes, Delete It
    </button>
    <button
      className="w-full bg-[#ffff] text-[#00000] text-lg py-4 rounded-lg border-2 border-[#064521] hover:bg-[#fff] transition duration-300"
      onClick={() => navigate(-1)} // Go back to the previous page when user cancels
    >
      No
    </button>
  </div>
</div>

<Footer />
</div>
  );
};

export default DeleteReturn;
