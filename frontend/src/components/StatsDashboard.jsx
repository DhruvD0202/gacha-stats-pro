import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export default function StatsDashboard({ counts, totalPulls }) {
  const probabilities = {
    Legendary: 0.01,
    Epic: 0.05,
    Rare: 0.15,
    Uncommon: 0.30,
    Common: 0.49
  };

  const chartData = Object.keys(counts).map(key => {
    const expected = totalPulls * probabilities[key];
    return {
      name: key,
      Observed: counts[key],
      Expected: Number(expected.toFixed(2))
    };
  });

  let chiSquareStat = 0;
  chartData.forEach(tier => {
    if (tier.Expected > 0) {
      chiSquareStat += Math.pow(tier.Observed - tier.Expected, 2) / tier.Expected;
    }
  });

  const p0 = probabilities.Legendary;
  const pHat = totalPulls > 0 ? counts.Legendary / totalPulls : 0;
  let zScore = 0;
  if (totalPulls > 0) {
    const standardError = Math.sqrt((p0 * (1 - p0)) / totalPulls);
    zScore = standardError > 0 ? (pHat - p0) / standardError : 0;
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col h-full">
      <h3 className="text-xl font-bold text-slate-100 mb-6 border-b border-slate-800 pb-2">Hypothesis Testing (Live)</h3>
      
      {totalPulls === 0 ? (
        <div className="flex-grow flex items-center justify-center text-slate-500 italic">
          Do some pulls to generate statistical data...
        </div>
      ) : (
        <>
          {/* Bypassed ResponsiveContainer for React 19 compatibility */}
          <div className="flex justify-center w-full mb-6 overflow-x-auto custom-scrollbar">
              <BarChart width={450} height={250} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }}/>
                <Bar dataKey="Expected" fill="#64748b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Observed" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Chi-Square ($ \chi^2 $)</span>
              <span className="text-2xl font-mono text-emerald-400">{chiSquareStat.toFixed(3)}</span>
              <p className="text-[10px] text-slate-500 mt-1">Goodness of Fit</p>
            </div>
            
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Z-Score (Legendary)</span>
              <span className={`text-2xl font-mono ${Math.abs(zScore) > 1.96 ? 'text-red-400' : 'text-blue-400'}`}>
                {zScore.toFixed(3)}
              </span>
              <p className="text-[10px] text-slate-500 mt-1">
                {Math.abs(zScore) > 1.96 ? "Significant Anomaly" : "Within Expected Variance"}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}