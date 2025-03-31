import React, { useEffect, useState } from "react";
import axios from "axios";
import EventSingleCard from "../../components/home/EventSingleCard"; 
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";


const EFurniturePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5555/events"); // Fetch all events
        setEvents(response.data.data); 
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div>
      <Header />
    <div className="p-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
        {events.length > 0 ? (
          events.map((item) => (
            <EventSingleCard key={item._id} event={item} />
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>

    </div>
  );
};

export default EFurniturePage;
