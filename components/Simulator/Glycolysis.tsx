import React, { useState } from 'react';

export const Glycolysis: React.FC<{ onComplete: (atpMade: number, nadh: number) => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'investment' | 'lysis' | 'payoff'>('investment');
  const [atpUsed, setAtpUsed] = useState(0);
  const [harvested, setHarvested] = useState(0);

  const handleInvestment = () => {
    if (atpUsed < 2) {
      setAtpUsed(prev => prev + 1);
      if (atpUsed === 1) setTimeout(() => setPhase('lysis'), 1200);
    }
  };

  const handleLysis = () => setPhase('payoff');

  const handlePayoff = () => {
    if (harvested < 2) {
      setHarvested(prev => prev + 1);
      if (harvested === 1) setTimeout(() => onComplete(4, 2), 1500);
    }
  };

  return (
    <div className="stage-container grid lg:grid-cols-2 gap-16 items-start py-8 pb-32">
      {/* MISSION CONTROL */}
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="directive-card p-6 border-indigo-500 bg-indigo-500/10 rounded-2xl shadow-xl">
             <p className="text-xs font-black uppercase tracking-widest text-indigo-400">
               <i className="fas fa-info-circle mr-2"></i> How to Operate:
               <br/> 1. Click the 'Invest ATP' button twice to spend 2 ATP.
               <br/> 2. Click 'Fracture Molecule' to split the glucose chain.
               <br/> 3. Click 'Harvest Yield' twice to collect your 4 ATP molecules.
             </p>
          </div>
          <h2 className="text-hero leading-tight">GLYCO <span className="text-indigo-400">LYSIS</span></h2>
          <p className="text-2xl text-slate-400 italic leading-relaxed">
            This is the first stage of respiration. It occurs in the cytoplasm and does not require oxygen. We begin by spending 2 ATP to prime the glucose molecule for splitting.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
           <div className="glass-panel p-10 rounded-[2.5rem] border-indigo-500/20 text-center shadow-2xl">
              <span className="text-[10px] font-black uppercase text-indigo-400 block mb-4 tracking-widest leading-none">Investment Phase</span>
              <div className="text-7xl font-black formula leading-none">-{atpUsed} <span className="text-sm">ATP</span></div>
           </div>
           <div className="glass-panel p-10 rounded-[2.5rem] border-amber-500/20 text-center shadow-2xl">
              <span className="text-[10px] font-black uppercase text-amber-500 block mb-4 tracking-widest leading-none">Payoff Phase</span>
              <div className="text-7xl font-black formula leading-none">+{harvested * 2} <span className="text-sm">ATP</span></div>
           </div>
        </div>

        <div className="bg-white/5 p-10 rounded-[3rem] border-l-4 border-indigo-500 shadow-2xl space-y-6">
           <div>
              <h4 className="text-[12px] font-black uppercase text-indigo-400 mb-2 tracking-[0.2em] leading-none">Enzyme: Hexokinase</h4>
              <p className="text-lg text-slate-300 italic font-light leading-relaxed">Hydrolyzes the first ATP to trap glucose inside the cell. This lowers the activation energy for the next steps.</p>
           </div>
           <div className="h-px bg-white/5"></div>
           <div>
              <h4 className="text-[12px] font-black uppercase text-indigo-400 mb-2 tracking-[0.2em] leading-none">Enzyme: PFK</h4>
              <p className="text-lg text-slate-300 italic font-light leading-relaxed">Adds a second phosphate group. This is the main regulatory step of glycolysis.</p>
           </div>
        </div>

        <div className="pt-6">
          {phase === 'investment' && (
            <button onClick={handleInvestment} className="w-full py-12 bg-indigo-600 text-white font-black rounded-3xl text-4xl shadow-4xl btn-neural uppercase tracking-tighter">
              INVEST ATP ({atpUsed}/2)
            </button>
          )}
          {phase === 'lysis' && (
            <button onClick={handleLysis} className="w-full py-12 bg-white text-black font-black rounded-3xl text-4xl shadow-4xl btn-neural animate-pulse uppercase tracking-tighter">
              FRACTURE MOLECULE
            </button>
          )}
          {phase === 'payoff' && (
            <button onClick={handlePayoff} className="w-full py-12 bg-amber-500 text-black font-black rounded-3xl text-4xl shadow-4xl btn-neural uppercase tracking-tighter">
              HARVEST YIELD ({harvested}/2)
            </button>
          )}
        </div>
      </div>

      {/* DYNAMIC VISUALIZER */}
      <div className="min-h-[700px] glass-panel border-white/5 rounded-[5rem] relative flex items-center justify-center overflow-hidden shadow-inner-3xl membrane-texture">
         {phase === 'investment' && (
           <div className="flex flex-wrap w-80 justify-center gap-10">
             {[...Array(6)].map((_, i) => (
               <div key={i} className={`w-24 h-24 rounded-full border-2 flex items-center justify-center font-black text-3xl transition-all duration-700 ${atpUsed > (i < 3 ? 0 : 1) ? 'bg-indigo-600 border-white shadow-[0_0_50px_#6366f1]' : 'bg-slate-900 border-white/10 text-slate-700'}`}>
                 {atpUsed > (i < 3 ? 0 : 1) ? 'P' : 'C'}
               </div>
             ))}
           </div>
         )}

         {phase === 'lysis' && (
           <div className="flex gap-28 items-center scale-150">
             <div className="flex flex-col gap-6 animate-in slide-in-from-left-20 duration-1000">
               {[1, 2, 3].map(i => <div key={i} className="w-18 h-18 rounded-full bg-indigo-700 border-2 border-white flex items-center justify-center font-black text-white">C</div>)}
             </div>
             <div className="flex flex-col gap-6 animate-in slide-in-from-right-20 duration-1000">
               {[1, 2, 3].map(i => <div key={i} className="w-18 h-18 rounded-full bg-indigo-700 border-2 border-white flex items-center justify-center font-black text-white">C</div>)}
             </div>
           </div>
         )}

         {phase === 'payoff' && (
           <div className="flex flex-col items-center gap-12">
              <div className="flex gap-28">
                {[1, 2].map(m => (
                  <div key={m} className="flex flex-col gap-12 items-center">
                    <div className="flex flex-col gap-6">
                      {[1, 2, 3].map(i => <div key={i} className="w-20 h-20 rounded-full bg-orange-600 border-2 border-white flex items-center justify-center font-black text-white text-2xl">C</div>)}
                    </div>
                    <div className={`px-8 py-3 glass-panel border-sky-400 text-sky-400 text-xs font-black rounded-full transition-all duration-1000 ${harvested >= m ? 'opacity-100 translate-y-0 shadow-[0_0_30px_#3b82f6]' : 'opacity-0 translate-y-12'}`}>NADH HARVESTED</div>
                  </div>
                ))}
              </div>
           </div>
         )}
      </div>
    </div>
  );
};