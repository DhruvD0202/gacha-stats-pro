import GachaMachine from './components/GachaMachine';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      {/* Header */}
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          GACHA STATS PRO
        </h1>
        <div className="flex gap-4">
          <span className="px-3 py-1 bg-slate-800 rounded-full text-xs border border-slate-700">v1.0-Phase1</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Gacha Interaction */}
        <div className="md:col-span-2">
          <GachaMachine />
        </div>

        {/* Right Side: Stats Preview */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-slate-100 mb-4 text-center">Session Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500">Total Pulls</span>
              <span className="font-mono text-indigo-400">0</span>
            </div>
            <p className="text-xs text-slate-600 italic mt-4">
              *Full Chi-Square analysis module will unlock in Phase 2.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;