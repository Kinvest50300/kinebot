import React from 'react';

import ChatPopup from './ChatPopup';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Programme du jour</h1>
        <p className="text-lg mb-8">
          Liste d'exercices, échelle de douleur, etc...
        </p>

        <ChatPopup />
      </div>
    </div>
  );
}

export default Dashboard;
