export default function RewardLegend() {
  // Using the exact values from our Expected Value math
  const tiers = [
    { name: 'Legendary', points: '+1000', chance: '1%', color: 'text-amber-400' },
    { name: 'Epic', points: '+300', chance: '5%', color: 'text-purple-400' },
    { name: 'Rare', points: '+100', chance: '15%', color: 'text-blue-400' },
    { name: 'Uncommon', points: '+50', chance: '30%', color: 'text-emerald-400' },
    { name: 'Common', points: '+10', chance: '49%', color: 'text-slate-400' },
  ];

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg text-left w-full max-w-sm">
      <h3 className="text-lg font-black text-slate-300 mb-3 border-b border-slate-800 pb-2 uppercase tracking-wider">
        Drop Rates & Rewards
      </h3>
      
      {/* The House Edge Warning */}
      <div className="mb-4 bg-red-950/30 border border-red-900/50 rounded p-2 text-center">
        <p className="text-xs text-red-400 font-bold tracking-wide">
          COST PER PULL: -70 POINTS
        </p>
      </div>

      <div className="space-y-3">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2 last:border-0 last:pb-0">
            <span className={`font-bold w-24 ${tier.color}`}>{tier.name}</span>
            <span className="text-slate-500 font-mono text-xs">{tier.chance}</span>
            <span className="font-mono text-emerald-400 font-bold">{tier.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}