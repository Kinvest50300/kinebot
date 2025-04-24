// ChatPopup.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ChatPopup({ patientId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(`chat-${patientId}`);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          sender: 'bot',
          text: getWelcomeMessage(),
        },
      ]);
    }
  }, [patientId]);

  useEffect(() => {
    sessionStorage.setItem(`chat-${patientId}`, JSON.stringify(messages));
  }, [messages, patientId]);

  function getWelcomeMessage() {
    const heure = new Date().getHours();
    const salutation =
      heure < 12 ? 'Bonjour' : heure < 18 ? 'Bon après-midi' : 'Bonsoir';
    return `${salutation} ! Je suis MAK, ton assistant IA. Pose ta question.`;
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
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderMessageText = (text) => {
    const lines = text.split(/\n|(?=\d+\.\s)/g).filter(Boolean);
    return lines.map((line, idx) => (
      <p key={idx} className="mb-1 leading-relaxed whitespace-pre-wrap break-words">
        {line.trim()}
      </p>
    ));
  };

  return (
    <div className="w-full md:max-w-md bg-white rounded-2xl shadow-xl flex flex-col border border-gray-200 text-black transition-all duration-300 ease-in-out transform scale-100 opacity-100 translate-y-0 motion-reduce:transform-none motion-reduce:transition-none">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-2xl font-semibold text-center text-lg">
        Mon Assistant Kiné
      </div>

      {/* Messages */}
      <div className="min-h-[300px] max-h-[400px] overflow-y-auto p-4 space-y-3 bg-[#ffffffaa] pb-12">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
            {msg.sender === 'bot' && index === 0 && (
              <div className="text-xs text-gray-500 mb-1 ml-10">MAK</div>
            )}
            {msg.sender === 'user' && (
              <div className="text-xs text-gray-500 mb-1 mr-10">Vous</div>
            )}
            <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2 w-full`}>
              {msg.sender === 'bot' && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                  alt="Avatar MAK"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] w-fit text-sm border ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white border-blue-800'
                    : 'bg-gray-100 text-gray-800 border-gray-300'
                }`}
              >
                {renderMessageText(msg.text)}
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
