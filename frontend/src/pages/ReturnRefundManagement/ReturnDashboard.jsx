import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";

const ReturnDashboard = () => {
  const [records, setReturns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5555/records");
        setReturns(response.data.data);
      } catch (error) {
        setError("Failed to load records. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  
  
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-[#063e1e]">Return & Refund Management</h1>
          
        </div>
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/records/create"
            className="bg-[#063e1e] text-white px-4 py-2 rounded-md hover:bg-[#042b13] transition"
          >
            Add New Return
          </Link>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="p-4 rounded-3xl border-2 border-[#1E90FF] text-black mb-8 w-2/6"

          />
        </div>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full border border-collapse shadow-md text-sm">
              <thead>
                <tr className="bg-[#A5D6A7] text-black">
                  <th className="border p-2">Payment ID</th>
                  <th className="border p-2">Product Name</th>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Reason</th>
                  <th className="border p-2">Operation</th>
                </tr>
              </thead>
              <tbody>
                {records
                  .filter((record) =>
                    search.toLowerCase() === ""
                      ? true
                      : record.pid?.toLowerCase().includes(search.toLowerCase()) ||
                        record.productName?.toLowerCase().includes(search.toLowerCase()) ||
                        record.description?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((record) => (
                    <tr key={record._id} className="bg-[#f3fefb] text-black border">
                      <td className="border p-4 text-center">{record.pid}</td>
                      <td className="border p-2 text-center">{record.productName}</td>
                      <td className="border p-2 text-center">
                        {record.uploadImage ? (
                          <img
                            src={record.uploadImage}
                            alt={record.productName || "Product Image"}
                            className="h-16 w-16 object-cover rounded-md"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "fallback-image-url.png";
                            }}
                          />
                        ) : (
                          <div className="h-16 w-16 bg-gray-300 rounded-md flex items-center justify-center">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="border p-2 text-center">{record.description}</td>
                      <td className="border p-2 text-center">
                        <div className="flex justify-center gap-x-6">
                          <Link to={`/records/details/${record._id}`}>
                            <BsInfoCircle className="text-3xl text-green-600 hover:text-green-800 transition-colors duration-300" />
                          </Link>
                          <Link to={`/records/edit/${record._id}`}>
                            <AiOutlineEdit className="text-3xl text-yellow-500 hover:text-yellow-700 transition-colors duration-300" />
                          </Link>
                          <Link to={`/records/delete/${record._id}`}>
                            <MdOutlineDelete className="text-3xl text-red-600 hover:text-red-800 transition-colors duration-300" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
const styles = {
downloadButton: {
  marginBottom: '10px',
  backgroundColor: '#063e1e',
  borderColor: '#063e1e',
  color: '#00000', 
  padding: '0.5rem 1rem',
  fontSize: '0.88rem',
  fontWeight: 'bold',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  border: '2px solid #063e1e',
  fontFamily: 'Poppins, sans-serif',
  transition: 'background-color 0.3s, border-color 0.3s',
},

downloadButtonHover: {
  backgroundColor: '#dee4e1', 
  borderColor: '#000000',
},

searchContainer: {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: '2rem',
},

searchInput: {
  width: '40%',
  padding: '0.75rem 2.5rem 0.75rem 3rem', // Adjust padding for the icon
  border: '2px solid #1E90FF', // Blue border color
  borderRadius: '4rem',
  fontSize: '1rem',
},

searchInputPlaceholder: {
  color: '#888',
},

searchButton: {
  marginLeft: '0.7rem',
  padding: '0.5rem 1rem',
  fontSize: '0.88rem',
  fontWeight: 'bold',
  color: '#FFFFFF',
  backgroundColor: '#063e1e',
  border: '2px solid #063e1e',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  fontFamily: 'Poppins, sans-serif',
},

table: {
  width: '100%',
  borderSpacing: '0.5rem',
  fontFamily: 'Poppins, sans-serif',
  backgroundColor: 'transparent',
  tableLayout: 'fixed',
  border: '3px solid black',
},

};
export default ReturnDashboard;
