import { useState } from 'react';
import GachaMachine from './components/GachaMachine';
import StatsDashboard from './components/statsDashboard'; 
import Login from './components/Login'; 
import Leaderboard from './components/LeaderBoard'; 

function App() {
  // --- User Auth & Game Limits State ---
  const [username, setUsername] = useState(null);
  const [score, setScore] = useState(0);
  const [pullsRemaining, setPullsRemaining] = useState(100); 

  // --- Core Gacha State ---
  const [results, setResults] = useState([]);
  const [pity, setPity] = useState(0);
  const [history, setHistory] = useState([]);
  const [totalPulls, setTotalPulls] = useState(0);
  
  // --- Statistical Tracking State ---
  const [counts, setCounts] = useState({
    Legendary: 0, Epic: 0, Rare: 0, Uncommon: 0, Common: 0
  });

  const handlePull = (num) => {
    // Safety check to prevent pulling past the limit
    if (pullsRemaining < num) return;

    const newResults = [];
    let currentPity = pity;
    const newCounts = { ...counts }; 
    let sessionPoints = 0; 

    for (let i = 0; i < num; i++) {
      currentPity++;
      sessionPoints -= 70; // The Entry Fee (Negative EV mechanic)
      
      // Soft Pity Math Engine
      let legendaryChance = 1; 
      if (currentPity >= 90) legendaryChance = 100; 
      else if (currentPity > 70) legendaryChance = 1 + (currentPity - 70) * 5; 

      const rand = Math.random() * 100;
      let pullResult = "";
      
      // Probability & Reward Distribution
      if (rand <= legendaryChance) {
        pullResult = "Legendary 🌟";
        currentPity = 0; // Reset pity
        newCounts.Legendary++;
        sessionPoints += 1000;
      } else if (rand <= legendaryChance + 5) {
        pullResult = "Epic 🔮";
        newCounts.Epic++;
        sessionPoints += 500;
      } else if (rand <= legendaryChance + 20) { 
        pullResult = "Rare ✨";
        newCounts.Rare++;
        sessionPoints += 100;
      } else if (rand <= legendaryChance + 50) { 
        pullResult = "Uncommon 🟢";
        newCounts.Uncommon++;
        sessionPoints += 50;
      } else {
        pullResult = "Common ⚪"; 
        newCounts.Common++;
        sessionPoints += 10;
      }
      
      newResults.push({ result: pullResult, time: new Date().toLocaleTimeString() });
    }

    // Batch update all React states
    setResults(newResults);
    setPity(currentPity);
    setTotalPulls(prev => prev + num);
    setPullsRemaining(prev => prev - num); 
    setHistory(prev => [...newResults, ...prev].slice(0, 15));
    setCounts(newCounts); 
    setScore(prev => prev + sessionPoints); 
  };

  // --- UI Routing (Conditional Rendering) ---

  // Screen 1: If the user hasn't logged in, show the Login screen
  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  // Screen 3: If the user has exhausted their pulls, show the Leaderboard
  if (pullsRemaining === 0) {
    return <Leaderboard username={username} finalScore={score} />;
  }

  // Screen 2: Main Dashboard Rendering
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      <header className="max-w-6xl mx-auto flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Gacha Simulation
          </h1>
          <p className="text-slate-400 text-sm mt-1">Logged in as: <span className="font-bold text-indigo-400">{username}</span></p>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total Score</p>
          <p className={`text-3xl font-mono font-black leading-none ${score < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
            {score.toLocaleString()}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <GachaMachine 
            pity={pity} 
            results={results} 
            history={history} 
            onPull={handlePull} 
            pullsRemaining={pullsRemaining} 
          />
        </div>
        <div>
          <StatsDashboard counts={counts} totalPulls={totalPulls} />
        </div>
      </main>
    </div>
  );
}

export default App;