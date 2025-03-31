import React, { useEffect, useState } from "react";
import axios from "axios";
import EventSingleCard from "../../components/home/EventSingleCard";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";


const ESculpturesPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(""); // State to manage error messages

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetching all events without category filtering
        const response = await axios.get("http://localhost:5555/events");
        setEvents(response.data.data); // Assuming the response structure is correct
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching events."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>; // Loading state

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
          <p>No events available.</p> // Message for no events
        )}
      </div>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>} {/* Display error message */}
    </div>

    </div>
  );
};

export default ESculpturesPage;
