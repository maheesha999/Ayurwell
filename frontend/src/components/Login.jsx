import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const dashboardRoutes = {
        maheesha: '/create/payments',
        dasun: '/products',
        dilu: '/feedback',
        diluka: '/mchats',
        nesha: '/deliverys',
        dasu: '/ayurvedicTips',
        nesh: '/records',
        customer: '/homepage',
        mahee: '/doctors'
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const users = {
            maheesha: 'payment123',
            dasun: 'product123',
            dilu: 'feedback123',
            diluka: 'chat123',
            nesha: 'delivery123',
            dasu: 'ayurvedicTips123',
            nesh: 'return123',
            customer: 'cus123',
            mahee: 'doctors123'
        };

        if (users[username] === password) {
            navigate(dashboardRoutes[username]);
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.headerText}>Welcome to the System</h1>
            </header>
            <div style={styles.container}>
                <div style={styles.loginContainer}>
                   <h2 style={styles.loginHeader}>Login</h2>
                    <form onSubmit={handleLogin} style={styles.form}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <button type="submit" style={styles.button}>Login</button>
                    </form>
                </div>
            </div>
            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2024 Your Company Name</p>
            </footer>
        </div>
    );
};

const styles = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    header: {
        backgroundColor: '#064521',
        padding: '30px',
        textAlign: 'center',
    },
    headerText: {
        color: '#fff',
    },
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        margin: '20px 0',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
        width: '400px',
        height: '400px', // Set a fixed height
        overflow: 'auto',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    loginHeader: {
        marginBottom: '50px', // Adjust this value as needed
        marginTop: '0', // Optional: remove any top margin
        fontWeight: 'bold', 
        fontSize: '25px'
    },
    input: {
        padding: '10px',
        fontSize: '18px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
    },
    button: {
        marginTop: '20px',
        padding: '10px',
        fontSize: '18px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#064521',
        color: '#fff',
        cursor: 'pointer',
    },
    footer: {
        backgroundColor: '#064521',
        padding: '30px',
        textAlign: 'center',
    },
    footerText: {
        color: '#fff',
    },
};

export default Login;
