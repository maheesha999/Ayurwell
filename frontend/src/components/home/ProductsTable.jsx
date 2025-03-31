import React from "react";
import { Link } from "react-router-dom";
import "../ProductCss/ProductTable.css";

const ProductsTable = ({ products }) => {
  return (
    <table className="products-table">
      <thead>
        <tr>
          <th className="table-header">No</th>
          <th className="table-header">Product Name</th>
          <th className="table-header hidden-md">Category</th>
          <th className="table-header hidden-md">Image</th>
          <th className="table-header hidden-md description-column">Description</th>
          <th className="table-header hidden-md">Price</th>
          <th className="table-header hidden-md">Stock</th>
          <th className="table-header operations-column">Operations</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product, index) => (
            <tr key={product._id} className="table-row">
              <td className="table-data">{index + 1}</td>
              <td className="table-data">{product.productName}</td>
              <td className="table-data hidden-md">{product.category}</td>
              <td className="table-data hidden-md">
                {product.image ? (
                  <img
                    src={`http://localhost:5555${product.image}`}
                    alt={product.productName}
                    className="product-image"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </td>
              <td className="table-data hidden-md description-column">{product.description}</td>
              <td className="table-data hidden-md">
                {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(product.price)}
              </td>
              <td className="table-data hidden-md">{product.stock || 0}</td>
              <td className="table-data operations-column">
                <div className="actions">
                  <Link to={`/products/details/${product._id}`}>
                    <button className="view-button">View</button>
                  </Link>
                  <Link to={`/products/edit/${product._id}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  <Link to={`/products/delete/${product._id}`}>
                    <button className="delete-button">Delete</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="table-data"> 
              No products available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductsTable;
