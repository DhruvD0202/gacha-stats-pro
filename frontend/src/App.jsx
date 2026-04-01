// ... (imports remain the same)

function App() {
  // ... (all state and handlePull logic remains exactly the same)

  // --- UI Routing ---

  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  if (pullsRemaining === 0) {
    // 🚀 FIXED: Added counts and pity props so your DB actually saves the data!
    return (
      <Leaderboard 
        username={username} 
        finalScore={score} 
        counts={counts} 
        pity={pity} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      <header className="max-w-7xl mx-auto flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Gacha Simulation
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Logged in as: <span className="font-bold text-indigo-400">{username}</span>
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total Score</p>
          <p className={`text-3xl font-mono font-black leading-none ${score < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
            {score.toLocaleString()}
          </p>
        </div>
      </header>

      {/* 🚀 LAYOUT UPDATE: Changed grid to 3 columns on large screens */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: The Machine (Takes up 5/12) */}
        <div className="lg:col-span-5">
          <GachaMachine 
            pity={pity} 
            results={results} 
            history={history} 
            onPull={handlePull} 
            pullsRemaining={pullsRemaining} 
          />
        </div>

        {/* Middle Column: Stats (Takes up 4/12) */}
        <div className="lg:col-span-4">
          <StatsDashboard counts={counts} totalPulls={totalPulls} />
        </div>

        {/* Right Column: The Side Panel Legend (Takes up 3/12) */}
        <div className="lg:col-span-3">
          <RewardLegend />
        </div>

      </main>
    </div>
  );
}

export default App;