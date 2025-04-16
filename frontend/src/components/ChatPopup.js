
import React, { useState } from 'react';
import './ChatPopup.css';
import axios from 'axios';

function ChatPopup() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ID patient fixe pour test - à rendre dynamique plus tard
  const patientId = "PATIENT001";

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const res = await axios.post("https://kinebot-dqwi.onrender.com/api/chat", {
        message: input,
        patientId: patientId
      });

      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMsg = { sender: "bot", text: "Erreur de connexion au chatbot." };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  return (
    <>
      <button className="chat-toggle" onClick={toggleChat}>💬</button>
      {open && (
        <div className="chat-popup">
          <div className="chat-header">
            <span>Assistant IA</span>
            <button onClick={toggleChat}>✖</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={\`chat-message \${msg.sender}\`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Posez votre question..."
            />
            <button onClick={sendMessage}>Envoyer</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatPopup;
