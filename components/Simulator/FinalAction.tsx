
import React, { useEffect, useState } from 'react';

export const FinalAction: React.FC<{ atpTotal: number, onComplete: () => void }> = ({ atpTotal, onComplete }) => {
  const [stage, setStage] = useState<'intro' | 'recap' | 'ready'>('intro');

  useEffect(() => {
    setTimeout(() => setStage('recap'), 3000);
  }, []);

  const energyStats = [
    { label: "Brain Power", val: `${(atpTotal * 0.8).toFixed(1)} Wh`, desc: "Total neural energy potential harnessed.", icon: "fa-brain" },
    { label: "Mechanical Work", val: `${(atpTotal * 12).toFixed(0)} Steps`, desc: "Equivalent distance in bipedal locomotion.", icon: "fa-running" },
    { label: "Efficiency", val: "Optimal", desc: "Oxidative phosphorylation protocol verified.", icon: "fa-check-circle" }
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000 relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.05),transparent_70%)]"></div>
      
      {stage === 'intro' && (
        <div className="space-y-8 animate-in zoom-in-95 duration-1000">
           <div className="stat-label text-amber-500 animate-pulse tracking-[1em]">Metabolic Saturation Reached</div>
           <h2 className="text-hero leading-none">THE<br/><span className="bg-gradient-to-r from-amber-400 via-white to-sky-400 bg-clip-text text-transparent">SYNTHESIS</span></h2>
           <p className="text-3xl text-slate-400 font-light italic max-w-2xl mx-auto">Glucose has been completely deconstructed. Every electron accounted for.</p>
        </div>
      )}

      {stage === 'recap' && (
        <div className="w-full max-w-6xl space-y-12 animate-in slide-in-from-bottom-10 duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {energyStats.map((s, i) => (
                    <div key={i} className="glass-panel p-10 border-white/5 bg-white/[0.01]">
                        <i className={`fas ${s.icon} text-3xl text-amber-500 mb-6`}></i>
                        <span className="stat-label block mb-2">{s.label}</span>
                        <div className="text-5xl font-black text-white formula mb-4">{s.val}</div>
                        <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-widest">{s.desc}</p>
                    </div>
                ))}
            </div>

            <div className="glass-panel p-10 border-amber-500/20 bg-amber-950/5 text-left flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <h3 className="text-4xl font-black italic uppercase tracking-tighter">Mission Summary</h3>
                    <ul className="space-y-4 text-slate-400 text-lg font-light italic">
                        <li className="flex gap-4"><i className="fas fa-check text-emerald-500 mt-1"></i> Glycolysis: Successfully split Glucose (6C) in the Cytosol.</li>
                        <li className="flex gap-4"><i className="fas fa-check text-emerald-500 mt-1"></i> Krebs: Fully oxidized Acetyl-CoA and vented CO2.</li>
                        <li className="flex gap-4"><i className="fas fa-check text-emerald-500 mt-1"></i> ETC: Maximized chemiosmotic potential for 28+ ATP.</li>
                    </ul>
                </div>
                <div className="shrink-0 text-center space-y-2">
                    <span className="stat-label text-amber-500 text-[10px]">Total ATP UNITS</span>
                    <div className="text-8xl font-black text-white formula">~{atpTotal}</div>
                    <div className="text-[10px] font-black text-emerald-500 uppercase">Grade: EXCELLENT</div>
                </div>
            </div>

            <button 
                onClick={onComplete}
                className="px-24 py-8 bg-white text-black font-black text-2xl rounded-full hover:scale-105 transition-all shadow-2xl uppercase tracking-widest btn-action"
            >
                Launch Final Evaluation
            </button>
        </div>
      )}
    </div>
  );
};
