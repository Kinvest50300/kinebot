import React, { useState } from 'react';
import axios from 'axios';

function ChatPopup({ patientId }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Bienvenue dans le chat. Pose ta question, je suis là pour t'aider.",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('https://kinebot-dqwi.onrender.com/api/chat', {
        message: input,
        patientId,
      });

      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        sender: 'bot',
        text: "Erreur : impossible de contacter l'assistant.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f4f8] px-4">
      <div className="w-full max-w-md h-[600px] bg-white rounded-2xl shadow-xl flex flex-col border border-gray-200 text-black">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-2xl font-semibold text-center text-lg">
          KinéBot – Assistant IA
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f9fafb]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex p-3 border-t border-gray-200 bg-white gap-2">
          <input
            type="text"
            placeholder="Écris ton message..."
            className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 text-sm font-medium"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPopup;
