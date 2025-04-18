import React, { useState } from 'react';

function ChatPopup() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bienvenue sur KinéBot 👋 Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const botReply = { sender: 'bot', text: "Merci pour votre message !" }; // réponse statique temporaire

    setMessages([...messages, userMessage, botReply]);
    setInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xl mx-auto text-black">
      <div className="h-64 overflow-y-auto space-y-2 mb-4 border rounded p-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
              msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none"
          placeholder="Écris ton message..."
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
