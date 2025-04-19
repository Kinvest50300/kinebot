import React, { useEffect, useState } from 'react';
import ChatPopup from './components/ChatPopup';

function App() {
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("patientId");
    if (id) {
      setPatientId(id);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {patientId ? (
        <ChatPopup patientId={patientId} />
      ) : (
        <p className="text-gray-700 text-lg">Aucun identifiant patient trouvé dans l’URL.</p>
      )}
    </div>
  );
}

export default App;
