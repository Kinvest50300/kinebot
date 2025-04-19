// src/App.js
import React from 'react';
import ChatPopup from './ChatPopup';

function App() {
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
      <ChatPopup patientId="demo-patient" />
    </div>
  );
}

export default App;
