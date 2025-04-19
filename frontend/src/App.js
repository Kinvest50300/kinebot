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
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center justify-center px-4">
      {/* Header de présentation */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">KinéBot – Assistant IA</h1>
        <p className="text-gray-700 text-base max-w-xl">
          KinéBot est un assistant intelligent conçu pour accompagner les kinésithérapeutes dans leur pratique
          et guider les patients dans leur rééducation. Posez-lui vos questions, il est là pour vous aider.
        </p>
      </header>

      {/* Zone de chat centrale */}
      {patientId ? (
        <ChatPopup patientId={patientId} />
      ) : (
        <p className="text-gray-600">Chargement...</p>
      )}
    </div>
  );
}

export default App;
