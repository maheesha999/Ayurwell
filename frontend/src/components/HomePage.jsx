import React from 'react';
import { useNavigate } from 'react-router-dom';
import hom11 from '../assets/Hom11.jpg';
import mainAyurveda from '../assets/Main-Ayurveda.jpg';
import banner3 from '../assets/banner-3.jpg';
import assistantIcon from '../assets/MediAssistant.png';
import Header from "./headerfooter/Header";
import Footer from "./headerfooter/Footer";

const HomePage = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/doctors/${category.toLowerCase()}`);
    };

    return (
        <div className="bg-gray-100 relative">
            <Header />

            {/* Appointment Section */}
            <div className="bg-white">
                <div className="relative w-11/12 mx-auto h-96 md:h-[480px] bg-cover bg-center overflow-hidden my-16 transition-transform hover:scale-105"
                    style={{ backgroundImage: `url(${banner3})` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Book an Appointment</h2>
                        <p className="text-lg md:text-xl mt-2">With 100+ Trusted Ayurvedic Doctors</p>
                        <button onClick={() => navigate('/doctors/card')}
                            className="bg-white text-gray-800 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>

            {/* Ayurvedic Category Section */}
            <div style={styles.pageContainer}>
                <h2 style={styles.sectionTitle}>Find by Speciality</h2>
                <p style={styles.sectionDescription}>
                    Browse our extensive list of trusted Ayurvedic doctors, find the nearest specialist,<br />and book your appointment hassle-free.
                </p>

                <div style={styles.categoryContainer}>
                    {['General', 'Panchakarma', 'Orthopedic', 'Gynecology', 'Pediatric', 'ENT', 'Neurology', 'Gastrocardiac'].map((name) => (
                        <div
                            key={name}
                            style={styles.categoryButton}
                            onClick={() => handleCategoryClick(name)}
                        >
                            <img
                                src={`http://localhost:5555/uploads/${name.toLowerCase()}.png`}
                                alt={name}
                                style={styles.buttonImage}
                            />
                            <span style={styles.buttonText}>{name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Find Nearest Doctor Section */}
            <div className="relative w-11/12 mx-auto h-96 md:h-[480px] bg-cover bg-center overflow-hidden my-16 transition-transform hover:scale-105"
                style={{ backgroundImage: `url(${hom11})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-bold">Nearest Doctor</h2>
                    <p className="text-lg md:text-xl mt-2">Connect with the nearest expert Ayurvedic doctor for personalized care</p>
                    <button onClick={() => navigate('/doctors')} className="mt-4 px-6 py-2 bg-white text-gray-800 rounded-full hover:scale-105 transition-all">
                        Find Now
                    </button>
                </div>
            </div>

            {/* Top Doctors Section */}
            <div style={styles.pageContainer}>
                <h2 style={styles.sectionTitle}>Top Doctors</h2>
                <p style={styles.sectionDescription}>
                    Simply browse through our extensive list of trusted Ayurvedic doctors and <br /> find the right specialist near you.
                </p>

                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { name: "Dr.Raj Verma ", category: "General", district: "Anuradhapura", img: "src/assets/doc1.png" },
                            { name: "Dr. Bhagya Waidyaratne", category: "Panchakarma", district: "Kalutara", img: "src/assets/doc2.png" },
                            { name: "Dr. Andrew Williams", category: "ENT", district: "Ratnapura", img: "src/assets/doc3.png" },
                            { name: "Dr. Suresh Patel", category: "Neurology", district: "Kurunegala", img: "src/assets/doc4.png" },
                            { name: "Dr. Priya Nair ", category: "Gastrocardiac", district: "Galle", img: "src/assets/doc5.png" },
                            { name: "Dr. Vinod Mehta", category: "Gynecology", district: "Colombo", img: "src/assets/doc6.png" },
                            { name: "Dr. Ramesh Chandra", category: "Pediatric", district: "Batticaloa", img: "src/assets/doc7.png" },
                            { name: "Dr. Chloe Evans", category: "Orthopedic", district: "Trincomalee", img: "src/assets/doc8.png" },
                            { name: "Dr. Anjali Sharma", category: "General", district: "Badulla", img: "src/assets/doc9.png" },
                            { name: "Dr. Raj Verma", category: "Panchakarma", district: "Matara", img: "src/assets/doc10.png" },
                        ].map((doctor, index) => (
                            <div key={index} className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all" style={{ height: "340px", width: "230px", backgroundColor: "white" }}>
                                <div className="w-full flex justify-center items-center p-3" style={{ backgroundColor: "#EFF6FF", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                                    <img src={doctor.img} alt={doctor.name} className="w-30 h-30 object-cover rounded-lg" />
                                </div>
                                <div className="p-3 text-center">
                                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                                    <p className="text-gray-600">{doctor.category} Specialist</p>
                                    <p className="text-black">{doctor.district}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Herbal Store Section */}
            <div className="relative w-11/12 mx-auto h-96 md:h-[480px] bg-cover bg-center overflow-hidden my-16 transition-transform hover:scale-105"
                style={{ backgroundImage: `url(${mainAyurveda})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-bold">Herbal Store</h2>
                    <p className="text-lg md:text-xl mt-2">Discover natural remedies and herbal products</p>
                    <button onClick={() => navigate('/products/card')}
                        className="bg-white text-gray-800 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all">
                        Explore Now
                    </button>
                </div>
            </div>

            {/* Herbal Products Section */}
            <div style={styles.pageContainer}>
                <h2 style={styles.sectionTitle}>Our Products</h2>
                <p style={styles.sectionDescription}>
                    Explore our wide range of high-quality herbal products, and support your health,<br /> all sourced from trusted ingredients.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { title: "Herbal Tea", img: "src/assets/pro5.jpg" },
                        { title: "Aloe Herbal Shampoo", img: "src/assets/pro2.jpg" },
                        { title: "Organic Turmeric", img: "src/assets/pro4.jpg" },
                        { title: "Organic Turmeric", img: "src/assets/pro5.jpg" }
                    ].map((product, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-all" style={{ height: "300px", width: "250px" }}>
                            <img src={product.img} alt={product.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Assistant Button */}
            <div className="fixed bottom-12 right-12 z-50">
                <button
                    onClick={() => navigate('/assistant')}
                    className="w-16 h-16 bg-center bg-cover hover:scale-105 transition-transform"
                    style={{
                        backgroundImage: `url(${assistantIcon})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '60px',
                        height: '110px',
                    }}
                    aria-label="Smart Assistant"
                />
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    pageContainer: {
        backgroundColor: 'white',
        minHeight: '5vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
    },
    sectionTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1rem',
    },
    sectionDescription: {
        textAlign: 'center',
        fontSize: '1rem',
        marginBottom: '1rem',
    },
    categoryContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    categoryButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        width: '120px',
    },
    buttonImage: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
    },
    buttonText: {
        marginTop: '10px',
        fontSize: '1rem',
        textAlign: 'center',
    },
};

export default HomePage;
