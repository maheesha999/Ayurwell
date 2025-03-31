
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../components/home/EventCard";
import Header from "../../components/headerfooter/Header";
import Footer from "../../components/headerfooter/Footer";


const EventCardPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/events")
      .then((response) => {
        setEvents(response.data); // Adjust if response structure is different
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
    <div className="p-4">
      {/* Simply check loading state or render event cards */}
      {!loading && <EventCard events={events} />} 
    </div>
    <Footer />
    </div>
  );
};

export default EventCardPage;
