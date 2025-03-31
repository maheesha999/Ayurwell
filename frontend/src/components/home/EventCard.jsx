import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventSingleCard from './EventSingleCard';
import axios from 'axios';

const EventCard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Fetch all events initially
    axios.get('http://localhost:5555/api/events')
      .then((response) => {
        const eventData = response.data; // Adjust based on your API response structure
        setEvents(eventData);
        setFilteredEvents(eventData); // Set initial filtered events to all events
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/events/${category}`);
    const filtered = events.filter(event => event.category === category);
    setFilteredEvents(filtered);
  };

  return (
    <div 
      className="p-4 bg-cover bg-center" 
      //style={{ backgroundImage: "url('http://localhost:5555/uploads/backround-image.jpg')" }} // Updated URL
    >
      {/* Description Section */}
      <div className="mb-8 text-center text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Discover the Beauty of Sri Lankan Handmade Art</h2>
        <p className="text-lg">
          Embark on a journey through the beauty and tradition of Sri Lankan handmade art. Our carefully curated experiences will open the doors to a world where each item tells a story, from the intricate details of finely carved masks to the timeless elegance of handcrafted furniture and sculptures.
          <br /><br />
          Discover how these extraordinary creations come to life, and engage with the artisans who pour their skill and passion into every piece. Whether you're looking to witness their craft in real-time, delve into the rich history behind these works, or connect with others who share your love for fine craftsmanship, our events offer something truly unique.
          <br /><br />
          By attending, you’ll not only experience the heart of Sri Lankan artistry but also enjoy special opportunities to bring these one-of-a-kind treasures into your home. These experiences provide a closer look at the craftsmanship while giving you the chance to support and celebrate our talented artisans.
          <br /><br />
          Don’t miss your opportunity to be a part of these unforgettable experiences, where tradition meets creativity in a space designed to inspire and captivate.
        </p>
      </div>

      {/* Category Buttons Container (now horizontal) */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-4" style={{ backgroundColor: '#330D0F', padding: '20px', borderRadius: '8px' }}> {/* Removed fixed width to allow dynamic sizing */}
          <button
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition duration-300"
            onClick={() => handleCategoryClick("masks")}
          >
            Masks
          </button>
          <button
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition duration-300"
            onClick={() => handleCategoryClick("sculptures")}
          >
            Sculptures
          </button>
          <button
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition duration-300"
            onClick={() => handleCategoryClick("furniture")}
          >
            Furniture
          </button>
        </div>
      </div>

      {/* Display All Events */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
        {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
          filteredEvents.map((item) => (
            <EventSingleCard key={item._id} event={item} />
          ))
        ) : null} {/* No message for no events */}
      </div>
    </div>
  );
};

export default EventCard;
