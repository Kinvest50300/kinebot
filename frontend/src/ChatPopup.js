import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatPopup({ patientId }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Bienvenue dans le chat. Pose ta question, je suis là pour t'aider." }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('https://kinebot-dqwi.onrender.com/api/chat', {
        message: input,
        patientId
      });

      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { sender: 'bot', text: "Erreur : impossible de contacter l'assistant." };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xl mx-auto text-black">
      <div className="h-64 overflow-y-auto space-y-2 mb-4 border rounded p-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}
          >
            <div
              className={
                msg.sender === 'user'
                  ? 'px-4 py-2 rounded-lg max-w-xs text-sm bg-blue-600 text-white'
                  : 'px-4 py-2 rounded-lg max-w-xs text-sm bg-gray-300 text-black'
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none"
          placeholder="Ecris ton message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default ChatPopup;
