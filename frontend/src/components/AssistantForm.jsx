import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const AssistantForm = () => {
  const [location, setLocation] = useState("");
  const [disease, setDisease] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to New York
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isConsentChecked, setIsConsentChecked] = useState(false); // Track checkbox state
  const [symptomsError, setSymptomsError] = useState(""); // Track symptoms error message

  const navigate = useNavigate();  // Initialize useNavigate

  // Fetch current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
          setMapCenter({ lat: latitude, lng: longitude });
          setSelectedLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (symptoms.length < 10) {
      setSymptomsError("Symptoms must be at least 10 characters long.");
      return; // Stop submission if validation fails
    }

    setSymptomsError(""); // Clear error if validation passes
    setLoading(true);

    const requestData = { location, disease, symptoms };

    try {
      const response = await fetch("http://localhost:5555/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestedDoctors(data.doctors);

        // Navigate to the DoctorSuggestions page with the doctors data
        navigate("/doctor-suggestions", { state: { doctors: data.doctors } });
      } else {
        console.error("Error fetching data from server");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle map click to update location
  const handleMapClick = (e) => {
    const newLocation = `${e.latLng.lat()}, ${e.latLng.lng()}`;
    setLocation(newLocation);
    setSelectedLocation(e.latLng);
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setIsConsentChecked(!isConsentChecked);
  };

  useEffect(() => {
    // Fetch current location on page load
    getCurrentLocation();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('./src/assets/Assistant page background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
          zIndex: "0",
        }}
      ></div>

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full relative z-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Smart Medi Helper</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your location"
              required
            />
          </div>

          <LoadScript googleMapsApiKey="AIzaSyDU32d-LxhW9iO53-bLYqT3cANmv2GSIAE">
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
              center={mapCenter}
              zoom={12}
              onClick={handleMapClick}
            >
              {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
          </LoadScript>

          <div>
            <label className="block text-sm font-medium text-gray-700">Disease Name (Optional)</label>
            <input
              type="text"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              placeholder="Enter disease name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Symptoms *</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              placeholder="Describe your symptoms (at least 10 characters)"
              required
            ></textarea>
            {symptomsError && <p className="text-red-500 text-sm">{symptomsError}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="consent"
              className="w-4 h-4"
              checked={isConsentChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              I agree with the{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                terms and conditions
              </a>
            </label>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 text-white rounded transition bg-green-500 hover:bg-green-700"
              disabled={loading || !isConsentChecked}
              style={{
                opacity: isConsentChecked ? 1 : 0.5,
                cursor: isConsentChecked ? "pointer" : "not-allowed",
              }}
            >
              {loading ? "Loading..." : "Get Treatment Suggestions"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssistantForm;
