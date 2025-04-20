// App.js
import React, { useEffect, useState } from 'react';
import ChatPopup from './ChatPopup';
import Dashboard from './Dashboard';

function App() {
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("patientId");
    setPatientId(id || 'demo-patient');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3f2fd] to-[#d0e8f9] flex flex-col text-gray-800">
      {/* Header de présentation */}
      <header className="text-center py-6">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight">
          KinéBot
        </h1>
        <p className="text-base max-w-2xl mx-auto text-blue-900 leading-relaxed">
          KinéBot est un assistant intelligent conçu pour accompagner les kinésithérapeutes dans leur pratique
          et guider les patients dans leur rééducation. Posez-lui vos questions, il est là pour vous aider.
        </p>
      </header>

      {/* Contenu principal responsive */}
      <main className="flex flex-col md:flex-row flex-1 w-full px-4 py-4 gap-4 justify-center">
        <div className="w-full md:max-w-md border-r border-gray-300 md:pr-6">
          <Dashboard />
        </div>
        <div className="w-full md:max-w-md md:pl-6">
          {patientId ? (
            <ChatPopup patientId={patientId} />
          ) : (
            <p className="text-blue-600">Chargement...</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-blue-900 opacity-60">
        © {new Date().getFullYear()} KinéBot. Tous droits réservés.
      </footer>
    </div>
  );
}

export default App;