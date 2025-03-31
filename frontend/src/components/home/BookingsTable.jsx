import React from "react";
import { Link } from "react-router-dom";
import "../doctorCss/BookingTable.css";

const BookingTable = ({ bookings }) => {
  return (
    <table className="bookings-table">
      <thead>
        <tr>
          <th className="table-header">No</th>
          <th className="table-header">Customer Name</th>
          <th className="table-header hidden-md">Doctor</th>
          <th className="table-header hidden-md">Date</th>
          <th className="table-header hidden-md">Time</th>
          <th className="table-header hidden-md">Fee</th>
          <th className="table-header hidden-md">Status</th>
          <th className="table-header operations-column">Operations</th>
        </tr>
      </thead>
      <tbody>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <tr key={booking._id} className="table-row">
              <td className="table-data">{index + 1}</td>
              <td className="table-data">{booking.customerName}</td>
              <td className="table-data hidden-md">{booking.doctorName}</td>
              <td className="table-data hidden-md">{booking.date}</td>
              <td className="table-data hidden-md">{booking.time}</td>
              <td className="table-data hidden-md">
                {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(booking.fee)}
              </td>
              <td className="table-data hidden-md">{booking.status}</td>
              <td className="table-data operations-column">
                <div className="actions">
                  <Link to={`/bookings/details/${booking._id}`}>
                    <button className="view-button">View</button>
                  </Link>
                  <Link to={`/bookings/edit/${booking._id}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  <Link to={`/bookings/delete/${booking._id}`}>
                    <button className="delete-button">Delete</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="table-data"> 
              No bookings available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BookingTable;
