import React from 'react';
import './Header.css'; // Add CSS in separate file
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo2.png';
import cartIcon from '../images/cart.png'

const Header = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCartClick = () => {
        navigate('/cart'); // Navigate to cart page
    };
    return (
        <header>
            <div className="logo2">
                <img src={logo} alt=" Logo" className="logo-img" />
                
            </div>
            <nav>
                <ul>
                <li><a href="/doctors/card">Doctors</a></li>
                <li><a href="/products/card">Herbal Store</a></li>
                <li><a href="/deliverys">My Orders</a></li>
                    <li><a href="/about">About Us</a></li>
    
                    
                </ul>
            </nav>
            <div className="search-login">
                <input type="text" placeholder="Search..." />
                <button classname="search-btn">Search</button>
                <img 
                    src={cartIcon} 
                    alt="Cart" 
                    className="cart-icon" 
                    onClick={handleCartClick} // Add onClick handler here
                />             
            </div>
            <button
              className='login'
              onClick={() => navigate('/login')}
            >
               LogOut
            </button>
        </header>
    );
};

export default Header;
