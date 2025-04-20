// Dashboard.js
import React from 'react';

function Dashboard() {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col border border-gray-200 text-black">
      <div className="bg-blue-600 text-white p-4 rounded-t-2xl font-semibold text-center text-lg">
        Dashboard
      </div>
      <div className="p-4 space-y-4 bg-[#f9fafb]">
        <p className="text-sm">
          Liste d'exercices, échelle de douleur, etc...
        </p>
      </div>
    </div>
  );
}

export default Dashboard;