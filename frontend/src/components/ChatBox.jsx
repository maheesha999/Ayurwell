import React, { useState } from 'react';
import doctorData from '../data/doctorData.jsx';
import assistantIcon from '../assets/MediAssistant.png'; // ⬅️ You can update path as needed

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hello, tell me your district then I suggest nearest doctors details." }
  ]);
  const [input, setInput] = useState('');
  const [hasAsked, setHasAsked] = useState(false);
  const [showChat, setShowChat] = useState(false); // <-- controls visibility

  const handleSend = () => {
    const userInput = input.trim();
    if (!userInput) return;

    setMessages([...messages, { from: 'user', text: userInput }]);
    setInput('');

    if (!hasAsked) {
      setHasAsked(true);
      const districtKey = userInput.toLowerCase();
      const doctors = doctorData[districtKey];

      if (doctors) {
        const response = doctors.map(doc =>
          `${doc.name}, ${doc.address}, ${doc.phone}, Specialization: ${doc.specialization}`
        ).join('\n\n');
        setMessages(prev => [...prev, { from: 'bot', text: response }]);
      } else {
        setMessages(prev => [...prev, { from: 'bot', text: "Sorry, I couldn't find doctors for that district." }]);
      }
    }
  };

  const toggleChatbox = () => {
    setShowChat(!showChat);
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <div className="fixed bottom-12 right-12 z-50">
        <button
          onClick={toggleChatbox}
          className="w-[60px] h-[110px] bg-center bg-cover hover:scale-105 transition-transform"
          style={{
            backgroundImage: `url(${assistantIcon})`,
          }}
          aria-label="Smart Assistant"
        />
      </div>

      {/* Chat Box */}
      {showChat && (
        <div className="fixed bottom-28 right-12 w-[300px] max-h-[400px] bg-white shadow-xl border border-gray-300 rounded-xl p-3 z-50">
          <div className="overflow-y-scroll h-[250px] mb-2 px-2">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-2">
                <strong>{msg.from === 'bot' ? 'Bot' : 'You'}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 px-2 py-1 border rounded"
              placeholder="Enter district..."
            />
            <button onClick={handleSend} className="px-3 py-1 bg-green-600 text-white rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
