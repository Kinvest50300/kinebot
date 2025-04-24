// Dashboard.js
import React from 'react';
import exoPompes from './assets/Exercice Pompes.png';

function Dashboard({ exercises = [] }) {
  const isEven = exercises.length % 2 === 0;
  const getGridCols = () => {
    return 'grid-cols-1 sm:grid-cols-2';
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
      <div className="w-full mb-6">
        <div className="bg-blue-600 text-white w-full py-3 rounded-md font-bold text-2xl shadow text-center">
          Dashboard
        </div>
      </div>

      {/* Grilles pour bases d’exercices */}
      <div className={`grid gap-4 ${getGridCols()}`}>
        {exercises.map((exo, index) => {
          const isLastOdd = !isEven && index === exercises.length - 1;
          return (
            <div
              key={index}
              className={`relative bg-white border border-gray-300 rounded-xl overflow-hidden shadow ${
                isLastOdd ? 'col-span-full sm:col-span-2 sm:mx-auto sm:w-1/2' : ''
              }`}
            >
              <div className="relative w-full h-48">
                <img
                  src={exo.image || 'https://via.placeholder.com/400x300'}
                  alt={exo.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60"></div>

                {/* Text overlay */}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Example() {
  return <Dashboard exercises={[
    { title: "Pompes", series: 3, repetitions: 12, rest: "30s", image: exoPompes },
    { title: "Fentes", series: 4, repetitions: 10, rest: "45s", image: "https://via.placeholder.com/400x300?text=Fentes" },
    { title: "Gainage", series: 2, repetitions: 1, rest: "1min", image: "https://via.placeholder.com/400x300?text=Gainage" },
  ]} />;
}
