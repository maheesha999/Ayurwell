import React, { useState, useEffect, useRef } from 'react';
import doctorData from '../data/doctorData.jsx';
import assistantIcon from '../assets/MediAssistant.png';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "👋 Hello! Tell me your district and I’ll suggest nearby Ayurvedic doctors." }
  ]);
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const messageEndRef = useRef(null);

  const handleSend = () => {
    const userInput = input.trim();
    if (!userInput) return;

    setMessages(prev => [...prev, { from: 'user', text: userInput }]);
    setInput('');

    const words = userInput.toLowerCase().split(' ');
    const knownDistricts = Object.keys(doctorData);
    const matchedDistrict = words.find(word => knownDistricts.includes(word));

    setIsBuffering(true); // Show spinner

    setTimeout(() => {
      setIsBuffering(false); // Hide spinner

      if (matchedDistrict) {
        const doctors = doctorData[matchedDistrict];
        doctors.forEach((doc, index) => {
          setTimeout(() => {
            const message = `🧑‍⚕️ ${doc.name}
📍 Address: ${doc.address}
📞 Phone: ${doc.phone}
🌿 Specialization: ${doc.specialization}`;
            setMessages(prev => [...prev, { from: 'bot', text: message }]);
          }, index * 700); // Show one doctor every 700ms
        });
      } else {
        setMessages(prev => [...prev, { from: 'bot', text: "❌ Sorry, I couldn't find doctors for that district." }]);
      }
    }, 1500); // Initial buffering time
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isBuffering]);

  const toggleChatbox = () => {
    setShowChat(!showChat);
    if (!showChat) {
      setMessages([
        { from: 'bot', text: "👋 Hello! Tell me your district and I’ll suggest nearby Ayurvedic doctors." }
      ]);
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <div className="fixed bottom-12 right-12 z-50">
        <button
          onClick={toggleChatbox}
          className="w-[70px] h-[120px] bg-center bg-cover hover:scale-110 transition-transform shadow-xl rounded-full animate-pop"
          style={{ backgroundImage: `url(${assistantIcon})` }}
          aria-label="Smart Assistant"
        />
      </div>

      {/* Chat Box */}
      {showChat && (
        <div className="fixed bottom-28 right-12 w-[420px] max-h-[540px] bg-white rounded-2xl shadow-2xl z-50 animate-slide-in border border-gray-300">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 bg-gray-100 rounded-t-2xl">
            <h2 className="font-bold text-gray-800 text-sm">Ayurvedic Medi Helper</h2>
            <button
              onClick={toggleChatbox}
              className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-base hover:scale-125 transition-transform hover:animate-ping-slow"
              title="Close"
            >
              ×
            </button>
          </div>

          <div className="overflow-y-scroll h-[360px] p-4 bg-white rounded-b-2xl">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-3 whitespace-pre-line text-sm leading-snug text-gray-800 animate-fade-in">
                <strong>{msg.from === 'bot' ? 'Medi Helper' : 'You'}:</strong> {msg.text}
              </div>
            ))}
            {isBuffering && (
              <div className="flex items-center justify-center py-2 animate-fade-in">
                <div className="w-6 h-6 border-4 border-blue-400 border-dotted rounded-full animate-spin"></div>
                <span className="ml-2 text-sm text-gray-600">Searching doctors...</span>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <div className="flex gap-2 p-3 border-t border-gray-300 bg-gray-50 rounded-b-2xl">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
              placeholder="Enter your district..."
              disabled={isBuffering}
            />
            <button
              onClick={handleSend}
              disabled={isBuffering}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md text-sm transition shadow-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in-out;
        }
        .animate-pop {
          animation: pop 0.5s ease-in-out;
        }
        .animate-slide-in {
          animation: slideInUp 0.5s ease-in-out;
        }
        .hover\\:animate-ping-slow:hover {
          animation: ping 1s infinite;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default ChatBox;
