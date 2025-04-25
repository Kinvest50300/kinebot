// Dashboard.js
import React, { useState } from 'react';
import exoPompes from './assets/Exercice Pompes.png';

function Dashboard({ exercises = [], remark = '' }) {
  const isEven = exercises.length % 2 === 0;
  const getGridCols = () => {
    return 'grid-cols-1 sm:grid-cols-2';
  };

  const [painInput, setPainInput] = useState(null);
  const [painLevel, setPainLevel] = useState(null);
  const [feedback, setFeedback] = useState(
    exercises.map(() => ({ validated: false, difficulty: 5, showConfirm: false }))
  );

  const handleToggle = (index) => {
    const updated = [...feedback];
    updated[index].showConfirm = true;
    setFeedback(updated);
  };

  const handleConfirm = (index, confirm) => {
    const updated = [...feedback];
    updated[index].validated = confirm;
    updated[index].showConfirm = false;
    setFeedback(updated);
  };

  const handleSliderChange = (index, value) => {
    const updated = [...feedback];
    updated[index].difficulty = value;
    setFeedback(updated);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-6 relative">
      <div className="w-full mb-6">
        <div className="bg-blue-600 text-white w-full py-3 rounded-md font-bold text-2xl shadow text-center">
          Dashboard
        </div>
      </div>

      {painLevel === null && (
        <div className="flex flex-col items-center justify-center space-y-4 my-6">
          <p className="text-center font-medium text-gray-800 text-sm">Quel est votre niveau de douleur avant de commencer ?</p>
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-gray-600">0</span>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={painInput ?? 5}
              onChange={(e) => setPainInput(parseInt(e.target.value))}
              className="flex-grow h-2 rounded-full appearance-none bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
            />
            <span className="text-xs text-gray-600">10</span>
          </div>
          <button
            onClick={() => setPainLevel(painInput)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
            disabled={painInput === null}
          >
            Valider
          </button>
        </div>
      )}

      {painLevel !== null && (
        <div className={`relative z-10 ${feedback.some(f => f.showConfirm) ? 'blur-sm pointer-events-none select-none' : ''}`}>
          {remark && (
            <div className="w-full bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-3 rounded-lg mb-6 shadow-sm">
              <p className="text-sm font-medium">{remark}</p>
            </div>
          )}

          <div className={`grid gap-4 ${getGridCols()}`}>
            {exercises.map((exo, index) => {
              const isLastOdd = !isEven && index === exercises.length - 1;
              const isDone = feedback[index].validated;
              return (
                <div
                  key={index}
                  className={`relative bg-white border border-gray-300 rounded-xl overflow-hidden shadow ${
                    isLastOdd ? 'col-span-full sm:col-span-2 sm:mx-auto sm:w-1/2' : ''
                  } ${isDone ? 'opacity-60 pointer-events-none' : ''}`}
                >
                  <div className="relative w-full h-48">
                    <img
                      src={exo.image || 'https://via.placeholder.com/400x300'}
                      alt={exo.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60"></div>

                    <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                      <div className="text-center text-2xl font-extrabold uppercase text-white/90 drop-shadow-md">
                        {exo.title}
                      </div>

                      <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-md text-sm text-white font-medium shadow-md w-fit">
                        <p><span className="font-bold">{exo.series}</span> Séries</p>
                        <p><span className="font-bold">{exo.repetitions}</span> Répétitions</p>
                        <p><span className="font-bold">{exo.rest}</span> Pause</p>
                      </div>
                    </div>

                    {isDone && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white/60 transform -rotate-45 select-none">TERMINE</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
                    <div className="flex items-center gap-2 w-full sm:w-1/2">
                      <span className="text-xs text-gray-600">Facile</span>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={feedback[index].difficulty}
                        onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                        className="flex-grow h-2 rounded-full appearance-none bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                      />
                      <span className="text-xs text-gray-600">Difficile</span>
                    </div>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={feedback[index].validated}
                        onChange={() => handleToggle(index)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium">Validation {exo.title}</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {feedback.map((f, i) =>
        f.showConfirm ? (
          <div key={i} className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 text-center">
              <p className="text-lg font-semibold text-gray-800">Valider l'exercice ?</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleConfirm(i, true)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
                >
                  Confirmer la validation
                </button>
                <button
                  onClick={() => handleConfirm(i, false)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

export default function Example() {
  return <Dashboard
    remark="REMARQUES KINE : N'APPARAIT PAS SI PAS DE REMARQUE"
    exercises={[
      { title: "Pompes", series: 3, repetitions: 12, rest: "30s", image: exoPompes },
      { title: "Fentes", series: 4, repetitions: 10, rest: "45s", image: "https://via.placeholder.com/400x300?text=Fentes" },
      { title: "Gainage", series: 2, repetitions: 1, rest: "1min", image: "https://via.placeholder.com/400x300?text=Gainage" },
    ]}
  />;
}
