import React from 'react';
import './Header.css';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo2.png';
import cartIcon from '../images/cart.png';

const Header = () => {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <header>
            <div className="logo2">
                <img src={logo} alt="Logo" className="logo-img" />
            </div>

            <nav>
                <ul>
                    <li><Link to="/doctors/card">Doctors</Link></li>
                    <li><Link to="/products/card">Herbal Store</Link></li>
                    <li><Link to="/deliverys">My Orders</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/feedback">Feedback</Link></li>
                </ul>
            </nav>

            <div className="search-login">
                <input type="text" placeholder="Search..." />
                <button className="search-btn">Search</button>
                <img
                    src={cartIcon}
                    alt="Cart"
                    className="cart-icon"
                    onClick={handleCartClick}
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
