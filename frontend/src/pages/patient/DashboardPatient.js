// App.js
import React, { useEffect, useState, useRef } from 'react';
import ChatPopup from './ChatPopup';
import Dashboard from './Dashboard';
import chatBotIcon from './assets/Bouton chat robot.png';

function App() {
  const [patientId, setPatientId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("patientId");
    setPatientId(id || 'demo-patient');
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowChat(false);
      }
    }
    if (showChat) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showChat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3f2fd] to-[#d0e8f9] flex flex-col text-gray-800 relative">
      <header className="text-center py-6">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight">
          Mon Assistant Kiné
        </h1>
        <p className="text-base max-w-2xl mx-auto text-blue-900 leading-relaxed">
          Mon Assistant Kiné est un assistant intelligent conçu pour accompagner les kinésithérapeutes dans leur pratique
          et guider les patients dans leur rééducation. Posez-lui vos questions, il est là pour vous aider.
        </p>
      </header>

      <main className="flex flex-col items-center flex-1 w-full px-4 py-4 gap-4">
        <div className="w-full max-w-5xl mx-auto">
          <Dashboard />
        </div>
      </main>

      {showChat && (
        <div ref={chatRef} className="fixed bottom-20 right-6 w-full max-w-md z-50 shadow-2xl">
          {patientId ? (
            <ChatPopup patientId={patientId} />
          ) : (
            <p className="text-blue-600">Chargement...</p>
          )}
        </div>
      )}

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 z-50 focus:outline-none active:scale-95 transition-transform"
        style={{ borderRadius: '9999px', padding: 0 }}
        aria-label="Ouvrir ou fermer le chat"
      >
        {showChat ? (
          <div className="w-14 h-14 bg-white border border-blue-300 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xl text-blue-700 font-bold">✖</span>
          </div>
        ) : (
          <img
            src={chatBotIcon}
            alt="Bouton Une question avec robot"
            className="w-40 max-w-[30vw] h-auto shadow-lg"
          />
        )}
      </button>

      <footer className="text-center py-4 text-xs text-blue-900 opacity-60">
        © {new Date().getFullYear()} Mon Assistant Kiné. Tous droits réservés.
      </footer>
    </div>
  );
}

export default App;