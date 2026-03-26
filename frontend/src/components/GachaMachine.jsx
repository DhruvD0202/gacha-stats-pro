export default function GachaMachine({ pity, results, history, onPull, pullsRemaining }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
        
        {/* NEW: Display Pulls Remaining Banner */}
        <div className="absolute top-0 right-0 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
          {pullsRemaining} Pulls Left
        </div>

        <h2 className="text-xl font-semibold text-slate-100 mb-4 text-center">Summoning Altar</h2>
        
        <div className="min-h-40 bg-slate-950 rounded-lg border border-slate-700 p-4 mb-6 transition-all">
          {results.length > 0 ? (
            <div className={`grid ${results.length > 1 ? 'grid-cols-5' : 'grid-cols-1'} gap-2`}>
              {results.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-2 rounded text-center text-xs font-bold border flex items-center justify-center h-12
                    ${item.result.includes('Legendary') ? 'bg-amber-900/20 border-amber-500 text-amber-400 animate-bounce' : 
                      item.result.includes('Epic') ? 'bg-fuchsia-900/20 border-fuchsia-500 text-fuchsia-400' : 
                      item.result.includes('Rare') ? 'bg-purple-900/20 border-purple-500 text-purple-400' : 
                      item.result.includes('Uncommon') ? 'bg-emerald-900/20 border-emerald-500 text-emerald-400' : 
                      'bg-slate-900 border-slate-800 text-slate-300'}`}
                >
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

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-slate-400 text-sm">Pity: <span className="text-indigo-400 font-mono font-bold">{pity}</span></span>
          <div className="flex gap-2">
            {/* NEW: Disabled states for buttons */}
            <button 
              onClick={() => onPull(1)}
              disabled={pullsRemaining < 1}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${pullsRemaining < 1 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600 text-white active:scale-95'}`}
            >
              Pull x1
            </button>
            <button 
              onClick={() => onPull(10)}
              disabled={pullsRemaining < 10}
              className={`px-6 py-2 rounded-lg font-bold transition-all shadow-lg ${pullsRemaining < 10 ? 'bg-indigo-900 text-indigo-400/50 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 shadow-indigo-900/40'}`}
            >
              Pull x10
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Recent Pull History</h3>
        <div className="max-h-40 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
          {history.length > 0 ? history.map((item, index) => (
            <div key={index} className="flex justify-between text-xs py-1 border-b border-slate-800/30">
              <span className={
                item.result.includes('Legendary') ? 'text-amber-400 font-bold' : 
                item.result.includes('Epic') ? 'text-fuchsia-400 font-semibold' : 
                item.result.includes('Rare') ? 'text-purple-400' : 
                item.result.includes('Uncommon') ? 'text-emerald-400' : 
                'text-slate-400'
              }>
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