import { useState, useEffect } from 'react';

export default function Leaderboard({ username, finalScore }) {
  // 1. Mock Database (We will replace this with an axios call to MongoDB later)
  const [rankedPlayers, setRankedPlayers] = useState([]);
  const [playerRank, setPlayerRank] = useState(0);

  useEffect(() => {
    // Simulated data from other "players"
    const mockDatabase = [
      { name: "RNG_God_99", score: 8500 },
      { name: "Pity_Builder", score: 2100 },
      { name: "Average_Joe", score: -100 },
      { name: "Unlucky_Roller", score: -4500 },
    ];

    // Add the current player to the list
    const updatedBoard = [...mockDatabase, { name: username, score: finalScore }];
    
    // Sort the array from highest score to lowest
    updatedBoard.sort((a, b) => b.score - a.score);
    
    setRankedPlayers(updatedBoard);

    // Find the player's exact ranking (Index + 1)
    const rankIndex = updatedBoard.findIndex(player => player.name === username);
    setPlayerRank(rankIndex + 1);
  }, [username, finalScore]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-2xl text-center relative overflow-hidden">
        
        {/* Background Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none"></div>

        <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2 relative z-10">
          SIMULATION COMPLETE
        </h1>
        <p className="text-slate-400 mb-8 relative z-10">100 pulls exhausted. Here is how you stack up against the server.</p>

        {/* Player's Final Stats Card */}
        <div className="bg-slate-950 border border-slate-700 rounded-xl p-6 mb-8 flex justify-around items-center relative z-10 shadow-lg">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Player</p>
            <p className="text-xl font-bold text-indigo-400">{username}</p>
          </div>
          <div className="w-px h-12 bg-slate-800"></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Final Score</p>
            <p className={`text-3xl font-mono font-black ${finalScore < 0 ? 'text-red-500' : 'text-emerald-400'}`}>
              {finalScore.toLocaleString()}
            </p>
          </div>
          <div className="w-px h-12 bg-slate-800"></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Rank</p>
            <p className="text-3xl font-black text-amber-400">#{playerRank}</p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative z-10 text-left">
          <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-800 grid grid-cols-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Rank</span>
            <span>Username</span>
            <span className="text-right">Score</span>
          </div>
          
          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            {rankedPlayers.map((player, index) => (
              <div 
                key={index} 
                className={`px-6 py-4 border-b border-slate-800/50 grid grid-cols-3 items-center transition-colors
                  ${player.name === username ? 'bg-indigo-900/20 border-l-4 border-l-indigo-500' : 'hover:bg-slate-900/50'}`}
              >
                <span className="font-bold text-slate-500">
                  {index === 0 ? '🥇 1' : index === 1 ? '🥈 2' : index === 2 ? '🥉 3' : `${index + 1}`}
                </span>
                <span className={`font-semibold ${player.name === username ? 'text-indigo-400' : 'text-slate-300'}`}>
                  {player.name}
                </span>
                <span className={`text-right font-mono ${player.score < 0 ? 'text-red-400/80' : 'text-emerald-400/80'} ${player.name === username ? 'font-bold' : ''}`}>
                  {player.score.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}