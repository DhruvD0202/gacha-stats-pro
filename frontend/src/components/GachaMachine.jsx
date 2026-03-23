import { useState } from 'react';

export default function GachaMachine() {
  const [results, setResults] = useState([]); // Changed to an array for multi-pulls
  const [pity, setPity] = useState(0);
  const [history, setHistory] = useState([]);

  const handlePull = (num) => {
    const newResults = [];
    let currentPity = pity;

    for (let i = 0; i < num; i++) {
      const rand = Math.random() * 100;
      let pullResult = "Common";
      
      // Basic Logic: 1% Legendary, 10% Rare
      if (rand <= 1) {
        pullResult = "Legendary 🌟";
        currentPity = 0; // Reset pity on Legendary
      } else if (rand <= 11) {
        pullResult = "Rare ✨";
        currentPity++;
      } else {
        currentPity++;
      }
      
      newResults.push({ result: pullResult, time: new Date().toLocaleTimeString() });
    }

    setResults(newResults);
    setPity(currentPity);
    // Add all new results to the top of history and keep last 15
    setHistory(prev => [...newResults, ...prev].slice(0, 15));
  };

  return (
    <div className="space-y-6">
      {/* The Machine Card */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-100 mb-4 text-center">Summoning Altar</h2>
        
        {/* Result Display Area */}
        <div className="min-h-40 bg-slate-950 rounded-lg border border-slate-700 p-4 mb-6 transition-all">
          {results.length > 0 ? (
            <div className={`grid ${results.length > 1 ? 'grid-cols-5' : 'grid-cols-1'} gap-2`}>
              {results.map((item, idx) => (
                <div key={idx} className={`p-2 rounded text-center text-xs font-bold border ${item.result.includes('Legendary') ? 'bg-amber-900/20 border-amber-500 text-amber-400 animate-bounce' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                  {results.length > 1 ? item.result.split(' ')[0] : item.result}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-slate-500 italic">Ready for summon...</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-slate-400 text-sm">Pity: <span className="text-indigo-400 font-mono font-bold">{pity}</span></span>
          <div className="flex gap-2">
            <button 
              onClick={() => handlePull(1)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-bold transition-all active:scale-95"
            >
              Pull x1
            </button>
            <button 
              onClick={() => handlePull(10)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold transition-all active:scale-95 shadow-lg shadow-indigo-900/40"
            >
              Pull x10
            </button>
          </div>
        </div>
      </div>

      {/* History Log */}
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Recent Pull History</h3>
        <div className="max-h-40 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
          {history.length > 0 ? history.map((item, index) => (
            <div key={index} className="flex justify-between text-xs py-1 border-b border-slate-800/30">
              <span className={item.result.includes('Legendary') ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                {item.result}
              </span>
              <span className="text-slate-600 font-mono">{item.time}</span>
            </div>
          )) : (
            <p className="text-slate-700 text-sm italic">No history yet...</p>
          )}
        </div>
      </div>
    </div>
  );
}