import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo2 from '../../components/images/logo2.png';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';


const DeliveryDashboard = () => {
  const [deliverys, setDeliverys] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDeliverys, setFilteredDeliverys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/deliverys')
      .then((response) => {
        setDeliverys(response.data.data);
        setFilteredDeliverys(response.data.data); // Initialize with all orders
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    const results = deliverys.filter((delivery) =>
      delivery.Address.toLowerCase().includes(e.target.value.toLowerCase()) ||
      delivery.SenderName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDeliverys(results);
  };
  
  const generatePDF = () => {
    if (!filteredDeliverys || filteredDeliverys.length === 0) {
        alert("No delivery data available for the report.");
        return;
    }

    const doc = new jsPDF();
    const img = new Image();
    img.src = logo2; // The path to the image

    img.onload = function () {
        // Add logo image on the right side
        doc.addImage(img, 'PNG', doc.internal.pageSize.getWidth() - 44, 10, 30, 30);

        // Set font styles
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        // Set and align the company name
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("AyurWell", 14, 20); // Left-align company name

        // Set and align the report title
        doc.setFontSize(16);
        doc.text("Delivery Report", 14, 30); // Left-align report title

        // Set and align the current date
        const date = new Date().toLocaleDateString();
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(date, 14, 40); // Left-align the date

        // Draw a solid horizontal line below the date
        const lineStartX = 14; // Starting point on the left
        const lineEndX = doc.internal.pageSize.getWidth() - 14; // Ending point on the right
        const lineY = 44;
        doc.line(lineStartX, lineY, lineEndX, lineY); // Draw horizontal line

        // Prepare the table columns
        const tableColumn = [
            'DID', 'Product Name', 'Price', 'Quantity', 'Address', 'Postal Code', 'Sender Name', 'Contact Number'
        ];

        // Prepare the table rows
        const tableRows = filteredDeliverys.map((delivery, index) => [
            `DID_${index + 1}`,
            delivery?.ProductName || delivery?.productName || "Unknown",
            delivery?.Price ? `$${parseFloat(delivery.Price).toFixed(2)}` : 
            delivery?.price ? `$${parseFloat(delivery.price).toFixed(2)}` : "$0.00",
            delivery?.Quantity || delivery?.quantity || "0",
            delivery?.Address || delivery?.address || "Not Provided",
            delivery?.PostalCode || delivery?.postalCode || "00000",
            delivery?.SenderName || delivery?.senderName || "Unknown",
            delivery?.ContactNumber || delivery?.contactNumber || "No Contact"
        ]);

        // Add the table to the PDF
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: lineY + 6,
          styles: { fontSize: 10 },
          headStyles: {
              fillColor: '#A5D6A7', // Set header background color
              textColor: 255, // Set header text color to white
              fontSize: 8, // Set header font size
              fontStyle: 'bold', // Make header text bold
              halign: 'center', // Center-align header text
              valign: 'middle' // Vertically center header text
          }
        });

        // Save the PDF
        doc.save('Delivery_Report.pdf');
    };

    // Handle image loading errors
    img.onerror = function () {
        alert("Failed to load the logo image.");
    };
};


  

  return (
    <div>
      <Header />
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Shipping and Delivery Management </h1>
          
        </div>

        <div style={styles.searchContainer}>
        <input
  type="text"
  placeholder="Search by Address or Sender Name"
  value={searchQuery}
  onChange={handleSearchInputChange}
  style={styles.searchInput}
/>

        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {filteredDeliverys.length > 0 ? (
              <>
                <button
                  onClick={generatePDF}
                  style={{ ...styles.downloadButton, ...styles.downloadButtonHover }}
                >
                  Download Orders Reports
                </button>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ ...styles.th, ...styles.columnWidths.no }}>Delivery ID</th>
                      <th style={{ ...styles.th, ...styles.columnWidths.productName }}>ProductName</th>
                      <th style={{ ...styles.th, ...styles.columnWidths.price }}>Price</th>
                      <th style={{ ...styles.th, ...styles.columnWidths.quantity }}>Quantity</th>
                      <th style={{ ...styles.th, ...styles.columnWidths.address }}>Address</th>
                      <th style={{ ...styles.th, ...styles.columnWidths.postalCode }}>Postal Code</th>
                      <th style={{ ...styles.th, ...styles.columnWidths.senderName }}>Sender Name</th>
                      <th style={{ ...styles.th, ...styles.columnWidths.contactNumber }}>Contact Number</th>
                      <th style={{ ...styles.th, ...styles.columnWidths.operations, ...styles.thLast }}>Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeliverys.map((delivery, index) => (
                      <tr key={delivery._id} style={{ height: '2rem' }}>
                        <td style={{ ...styles.td, ...styles.columnWidths.no }}>DID_{index + 1}</td>
                        <td style={{ ...styles.td, ...styles.columnWidths.productname}}>{delivery.ProductName}</td>
                        <td style={{ ...styles.td, ...styles.columnWidths.price}}>{delivery.Price}</td>
                        <td style={{ ...styles.td, ...styles.columnWidths.quantity}}>{delivery.Quantity}</td>
                        <td style={{ ...styles.td, ...styles.columnWidths.address }}>{delivery.Address}</td>
                        <td style={{ ...styles.td, ...styles.columnWidths.postalCode }}>{delivery.PostalCode}</td>
                        <td style={{ ...styles.td, ...styles.columnWidths.senderName }}>{delivery.SenderName}</td>
                        <td style={{ ...styles.td, ...styles.columnWidths.contactNumber }}>{delivery.ContactNumber}</td>
                        <td style={styles.td}>
                          <div style={styles.operations}>
                            <Link to={`/deliverys/details/${delivery._id}`}>
                              <BsInfoCircle style={{ ...styles.icon, color: '#047857' }} />
                            </Link>
                            <Link to={`/deliverys/edit/${delivery._id}`}>
                              <AiOutlineEdit style={{ ...styles.icon, color: '#d97706' }} />
                            </Link>
                            <Link to={`/deliverys/delete/${delivery._id}`}>
                              <MdOutlineDelete style={{ ...styles.icon, color: '#dc2626' }} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p style={{ textAlign: 'center', fontSize: '1.25rem', color: '#064521', marginTop: '2rem' }}>No deliverys found.</p>
            )}
          </>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};
// CSS styles
const styles = {
  page: {
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },

  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Poppins, sans-serif',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  title: {
    fontSize: '1.875rem',
    margin: '2rem 0',
    fontFamily: 'Poppins, sans-serif',
    color: '#063e1e',
  },

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
    border: '1px solid #D3D3D3',
  },

  th: {
    borderTop: '1px solid #D3D3D3',
    borderBottom: '1px solid #D3D3D3',
    borderLeft: '1px solid #D3D3D3',
    borderRight: '1px solid #D3D3D3',
    backgroundColor: '#A5D6A7',
    color: '#333333',
    height: '3rem',
    fontFamily: 'Poppins, sans-serif',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    padding: '0.5rem',
  },

  thLast: {
    borderTop: '1px solid #D3D3D3',
    borderBottom: '1px solid #D3D3D3',
    borderLeft: '1px solid #D3D3D3',
    borderRight: '1px solid #D3D3D3',
    fontFamily: 'Poppins, sans-serif',
  },

  td: {
    borderTop: '1px solid #D3D3D3',
    borderBottom: '1px solid #D3D3D3',
    borderLeft: '1px solid #D3D3D3',
    borderRight: '1px solid #D3D3D3',
    height: '2.8rem',
    textAlign: 'left',
    color: '#063e1e',
    fontFamily: 'Poppins, sans-serif',
    wordWrap: 'break-word',
    backgroundColor: '#f3fefb',
    padding: '1rem',
  },

  tableRow: {
    transition: 'background-color 0.3s ease',
    borderBottom: '1px solid black',
  },

  // Fixed nth-child selectors for even and odd rows
  'tr:nth-child(even)': {
    backgroundColor: '#f3fefb',
  },

  'tr:nth-child(odd)': {
    backgroundColor: '#FFFFFF',
  },

  tableData: {
    padding: '0.5rem',
    border: '1px solid #D3D3D3',
    textAlign: 'left',
    verticalAlign: 'middle',
    fontSize: '1rem',
    color: '[#D3D3D3]',
  },

  columnWidths: {
    no: { width: '8%' },
    invoiceID: { width: '17%' },
    customer: { width: '15%' },
    productName: { width: '10%' },
    price: { width: '10%' },
    quantity: { width: '7%' },
    totalPrice: { width: '8%' },
    operations: { width: '10%' },
    descriptionColumn: { width: '25%' },
  },

  operations: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },

  icon: {
    fontSize: '1.5rem',
    fontFamily: 'Poppins, sans-serif',
  },
};


export default DeliveryDashboard;
