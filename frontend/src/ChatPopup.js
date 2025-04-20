// ChatPopup.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ChatPopup({ patientId }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: getWelcomeMessage(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  function getWelcomeMessage() {
    const heure = new Date().getHours();
    const salutation =
      heure < 12 ? 'Bonjour' : heure < 18 ? 'Bon après-midi' : 'Bonsoir';
    return `${salutation} ! Je suis KinéBot, ton assistant IA. Pose ta question.`;
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('https://kinebot-dqwi.onrender.com/api/chat', {
        message: input,
        patientId,
      });

      const botMessage = {
        sender: 'bot',
        text: res.data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        sender: 'bot',
        text: "Erreur : impossible de contacter l'assistant.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col border border-gray-200 text-black">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-2xl font-semibold text-center text-lg">
        KinéBot
      </div>

      {/* Messages */}
      <div className="min-h-[300px] max-h-[400px] overflow-y-auto p-4 space-y-3 bg-[#ffffffaa] pb-12">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
            {msg.sender === 'bot' && index === 0 && (
              <div className="text-xs text-gray-500 mb-1 ml-10">KinéBot</div>
            )}
            {msg.sender === 'user' && (
              <div className="text-xs text-gray-500 mb-1 mr-10">Vous</div>
            )}
            <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2 w-full`}>
              {msg.sender === 'bot' && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                  alt="KinéBot Avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] w-fit text-sm leading-relaxed text-left ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-1" role="alert">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex p-3 border-t border-gray-200 bg-white gap-2">
        <input
          type="text"
          placeholder="Écris ton message..."
          className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Zone de saisie du message"
          value={input}
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 text-sm font-medium"
          aria-label="Envoyer le message"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default ChatPopup;