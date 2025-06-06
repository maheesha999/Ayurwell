import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import hom11 from '../assets/Hom11.jpg';
import mainAyurveda from '../assets/Main-Ayurveda.jpg';
import banner3 from '../assets/banner-3.jpg';

// Top Doctors images
import doc1 from '../assets/doc1.png';
import doc2 from '../assets/doc2.png';
import doc3 from '../assets/doc3.png';
import doc4 from '../assets/doc4.png';
import doc5 from '../assets/doc5.png';
import doc6 from '../assets/doc6.png';
import doc7 from '../assets/doc7.png';
import doc8 from '../assets/doc8.png';
import doc9 from '../assets/doc9.png';
import doc10 from '../assets/doc10.png';

// Product images
import pro2 from '../assets/pro2.jpg';
import pro4 from '../assets/pro4.jpg';
import pro5 from '../assets/pro5.jpg';

import Header from './headerfooter/Header';
import Footer from './headerfooter/Footer';
import FeedbackSection from './FeedbackSection';
import ChatBox from './ChatBox';



const doctorData = [
    { name: "Dr. Raj Verma", category: "General", district: "Anuradhapura", img: doc1 },
    { name: "Dr. Bhagya Waidyaratne", category: "Panchakarma", district: "Kalutara", img: doc2 },
    { name: "Dr. Andrew Williams", category: "ENT", district: "Ratnapura", img: doc3 },
    { name: "Dr. Suresh Patel", category: "Neurology", district: "Kurunegala", img: doc4 },
    { name: "Dr. Priya Nair", category: "Gastrocardiac", district: "Galle", img: doc5 },
    { name: "Dr. Vinod Mehta", category: "Gynecology", district: "Colombo", img: doc6 },
    { name: "Dr. Ramesh Chandra", category: "Pediatric", district: "Batticaloa", img: doc7 },
    { name: "Dr. Chloe Evans", category: "Orthopedic", district: "Trincomalee", img: doc8 },
    { name: "Dr. Anjali Sharma", category: "General", district: "Badulla", img: doc9 },
    { name: "Dr. Raj Verma", category: "Panchakarma", district: "Matara", img: doc10 },
];

const productData = [
    { title: "Herbal Tea", img: pro5 },
    { title: "Aloe Herbal Shampoo", img: pro2 },
    { title: "Organic Turmeric", img: pro4 },
    { title: "Organic Turmeric", img: pro5 },
];

const HomePage = () => {
    const [isChatboxOpen, setIsChatboxOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/doctors/${category.toLowerCase()}`);
    };

    const toggleChatbox = () => {
        setIsChatboxOpen(!isChatboxOpen);
    };

    // Auto-scroll to bottom of chat when new messages arrive
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    // Handle user message submission
    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!userInput.trim()) return;
        
        const newMessage = userInput.trim();
        setUserInput('');
        
        // Add user message to chat
        setChatMessages([...chatMessages, { sender: 'user', text: newMessage }]);
        setIsLoading(true);
        
        try {
            // Call your backend API - Using your existing OpenAI endpoint
            const response = await axios.post('/api/openai', { message: newMessage });
            
            // Add AI response to chat
            setChatMessages(prev => [...prev, { sender: 'ai', text: response.data.reply }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setChatMessages(prev => [...prev, { 
                sender: 'ai', 
                text: 'Sorry, I encountered an error. Please try again later.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 relative font-poppins">
            <Header />

            {/* Appointment Section */}
            <div className="bg-white">
                <div className="relative w-11/12 mx-auto h-96 md:h-[480px] bg-cover bg-center overflow-hidden my-16 transition-transform hover:scale-105"
                    style={{ backgroundImage: `url(${banner3})` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Book an Appointment</h2>
                        <p className="text-lg md:text-xl mt-2">With 100+ Trusted Ayurvedic Doctors</p>
                        <button
                            onClick={() => navigate('/doctors/card')}
                            className="bg-white text-gray-800 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Section */}
            <section className="bg-white py-10 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-2">Find by Speciality</h2>
                <p className="text-center text-gray-600 mb-6">
                    Browse our extensive list of trusted Ayurvedic doctors, find the nearest specialist,<br />and book your appointment hassle-free.
                </p>
                <div className="flex flex-wrap justify-center gap-5">
                    {['General', 'Panchakarma', 'Orthopedic', 'Gynecology', 'Pediatric', 'ENT', 'Neurology', 'Gastrocardiac'].map((name) => (
                        <div
                            key={name}
                            onClick={() => handleCategoryClick(name)}
                            className="cursor-pointer flex flex-col items-center w-[120px] hover:scale-105 transition-all"
                        >
                            <img
                                src={`http://localhost:5555/uploads/${name.toLowerCase()}.png`}
                                alt={name}
                                className="w-[100px] h-[100px] object-cover"
                            />
                            <span className="mt-2 text-center">{name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Nearest Doctor Section */}
            <section className="relative w-11/12 mx-auto h-96 md:h-[480px] bg-cover bg-center overflow-hidden my-16 transition-transform hover:scale-105"
                style={{ backgroundImage: `url(${hom11})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-bold">Nearest Doctor</h2>
                    <p className="text-lg md:text-xl mt-2">Connect with the nearest expert Ayurvedic doctor for personalized care</p>
                    <button
                        onClick={() => navigate('/doctors')}
                        className="mt-4 px-6 py-2 bg-white text-gray-800 rounded-full hover:scale-105 transition-all"
                    >
                        Find Now
                    </button>
                </div>
            </section>

            {/* Top Doctors Section */}
            <section className="bg-white py-10 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-2">Top Doctors</h2>
                <p className="text-center text-gray-600 mb-6">
                    Simply browse through our extensive list of trusted Ayurvedic doctors and <br /> find the right specialist near you.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {doctorData.map((doctor, index) => (
                        <div key={index} className="shadow-md rounded-lg bg-white overflow-hidden hover:shadow-lg transition-all w-[230px] h-[340px]">
                            <div className="flex justify-center items-center bg-blue-50 p-3">
                                <img src={doctor.img} alt={doctor.name} className="w-28 h-28 object-cover rounded-lg" />
                            </div>
                            <div className="p-3 text-center">
                                <h3 className="text-lg font-semibold">{doctor.name}</h3>
                                <p className="text-gray-600">{doctor.category} Specialist</p>
                                <p className="text-black">{doctor.district}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Herbal Store Section */}
            <section className="relative w-11/12 mx-auto h-96 md:h-[480px] bg-cover bg-center overflow-hidden my-16 transition-transform hover:scale-105"
                style={{ backgroundImage: `url(${mainAyurveda})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-bold">Herbal Store</h2>
                    <p className="text-lg md:text-xl mt-2">Discover natural remedies and herbal products</p>
                    <button
                        onClick={() => navigate('/products/card')}
                        className="bg-white text-gray-800 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
                    >
                        Explore Now
                    </button>
                </div>
            </section>

            {/* Our Products Section */}
            <section className="bg-white py-10 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-2">Our Products</h2>
                <p className="text-center text-gray-600 mb-6">
                    Explore our wide range of high-quality herbal products, and support your health,<br /> all sourced from trusted ingredients.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {productData.map((product, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition-all w-[250px] h-[300px]">
                            <img src={product.img} alt={product.title} className="w-full h-48 object-cover" />
                            <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
                        </div>
                    ))}
                </div>
            </section>
            <ChatBox/>
            <FeedbackSection />
            <Footer />
        </div>
    );
};

export default HomePage;