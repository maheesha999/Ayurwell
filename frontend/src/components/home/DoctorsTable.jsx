import React from "react";
import { Link } from "react-router-dom";
import "../DoctorCss/DoctorTable.css";

const DoctorsTable = ({ doctors }) => {
  return (
    <table className="doctors-table">
      <thead>
        <tr>
          <th className="table-header">No</th>
          <th className="table-header">Doctor Name</th>
          <th className="table-header hidden-md">Category</th>
          <th className="table-header hidden-md">Image</th>  
          <th className="table-header hidden-md">Fee</th>
          <th className="table-header hidden-md">Experience</th>
          <th className="table-header hidden-md">Degree</th>
          <th className="table-header hidden-md">Address</th>
          <th className="table-header operations-column">Operations</th>
        </tr>
      </thead>
      <tbody>
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <tr key={doctor._id} className="table-row">
              <td className="table-data">{index + 1}</td>
              <td className="table-data">{doctor.doctorName}</td>
              <td className="table-data hidden-md">{doctor.category}</td>
              <td className="table-data hidden-md">
                {doctor.image ? (
                  <img
                    src={`http://localhost:5555${doctor.image}`}
                    alt={doctor.doctorName}
                    className="doctor-image"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </td>
             
              <td className="table-data hidden-md">
                {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(doctor.fee)}
              </td>
              <td className="table-data hidden-md">{doctor.experience || 0}</td>
              <td className="table-data hidden-md">{doctor.degree || "N/A"}</td>
              <td className="table-data hidden-md">{doctor.address || "N/A"}</td>
              <td className="table-data operations-column">
                <div className="actions">
                  <Link to={`/doctors/details/${doctor._id}`}>
                    <button className="view-button">View</button>
                  </Link>
                  <Link to={`/doctors/edit/${doctor._id}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  <Link to={`/doctors/delete/${doctor._id}`}>
                    <button className="delete-button">Delete</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10" className="table-data"> 
              No doctors available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DoctorsTable;