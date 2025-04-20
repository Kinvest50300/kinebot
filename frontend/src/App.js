// src/App.js
import React, { useEffect, useState } from 'react';
import ChatPopup from './ChatPopup';

function App() {
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("patientId");
    setPatientId(id || 'demo-patient'); // Fallback si aucun ID fourni
  }, []);

  return (
    <div className="min-h-screen bg-[#e3f2fd] flex flex-col items-center justify-start pt-10 px-4 text-gray-800">
      {/* Header de présentation */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-3 tracking-tight">
          KinéBot
        </h1>
        <p className="text-base max-w-xl text-blue-900 leading-relaxed">
          KinéBot est un assistant intelligent conçu pour accompagner les kinésithérapeutes dans leur pratique
          et guider les patients dans leur rééducation. Posez-lui vos questions, il est là pour vous aider.
        </p>
      </header>

      {/* Zone de chat centrale */}
      {patientId ? (
        <ChatPopup patientId={patientId} />
      ) : (
        <p className="text-blue-600">Chargement...</p>
      )}

      {/* Footer discret */}
      <footer className="mt-10 text-xs text-blue-900 opacity-60">
        © {new Date().getFullYear()} KinéBot. Tous droits réservés.
      </footer>
    </div>
  );
}

export default App;
