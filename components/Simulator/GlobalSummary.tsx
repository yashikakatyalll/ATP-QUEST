import React from 'react';
import { GameState } from '../../types';

interface GlobalSummaryProps {
  state: GameState;
  onContinue: () => void;
  onBackHome: () => void;
}

export const GlobalSummary: React.FC<GlobalSummaryProps> = ({ state, onContinue, onBackHome }) => {
  const yields = [
    { name: "Glycolysis", y: "+2 ATP", i: "fa-vials", c: "text-indigo-400" },
    { name: "Link Protocol", y: "+2 NADH", i: "fa-sign-in-alt", c: "text-orange-400" },
    { name: "Krebs Engine", y: "+2 ATP", i: "fa-recycle", c: "text-emerald-400" },
    { name: "Chemiosmosis", y: "~28 ATP", i: "fa-bolt", c: "text-amber-400" },
  ];

  const analogies = [
    { title: "Exam Power", icon: "fa-brain", val: "Brain Fuel", desc: "This ATP is why you're able to understand this sentence right now." },
    { title: "Physical Move", icon: "fa-running", val: "Muscles", desc: "One molecule of glucose powers about 1,000 muscle twitches." },
    { title: "Cell Repair", icon: "fa-dna", val: "Maintenance", desc: "Energy spent fixing your DNA while you're asleep." }
  ];

  const funFacts = [
    "Your heart burns its own weight in ATP every single day.",
    "Losing weight? You're actually breathing out most of that mass as CO2 gas.",
    "A single snickers bar can power a 10km run, thanks to this efficiency."
  ];

  return (
    <div className="flex flex-col items-center py-10 px-4 animate-in fade-in zoom-in-95 duration-1000 w-full max-w-7xl mx-auto overflow-visible min-h-screen">
      <div className="text-center mb-10 space-y-4">
        <div className="text-amber-500 tracking-[0.4em] mb-2 uppercase text-[10px] font-black">Mission Concluded</div>
        <h2 className="text-hero leading-tight text-white uppercase italic font-black">SYSTEMS<br/><span className="bg-gradient-to-r from-amber-400 via-white to-sky-400 bg-clip-text text-transparent">OPTIMIZED</span></h2>
        <p className="text-lg md:text-xl text-slate-500 font-light italic max-w-2xl mx-auto leading-tight mt-2">The sugar is broken. Your cells are charged. Here is your final report.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-10">
        {yields.map((s, i) => (
          <div key={i} className="glass-panel p-6 rounded-[2rem] border-white/5 flex flex-col items-center text-center transition-all hover:bg-white/5">
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 ${s.c}`}>
              <i className={`fas ${s.i} text-xl`}></i>
            </div>
            <h3 className="text-[9px] font-black uppercase text-white mb-1 tracking-widest">{s.name}</h3>
            <div className={`font-black text-xs ${s.c}`}>{s.y}</div>
          </div>
        ))}
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 glass-panel p-10 rounded-[2.5rem] border-amber-500/10 bg-amber-950/5 flex flex-col sm:flex-row items-center gap-10 shadow-2xl overflow-hidden">
            <div className="shrink-0 relative">
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-amber-500 flex flex-col items-center justify-center bg-black shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                  <span className="text-[8px] font-black text-amber-500 tracking-widest uppercase mb-1">Total</span>
                  <span className="text-5xl md:text-7xl font-black text-white formula leading-none">{Math.floor(state.atpMade)}</span>
                  <span className="text-[8px] font-black text-amber-500 tracking-widest uppercase mt-1">ATP</span>
               </div>
            </div>
            <div className="flex-1 space-y-4 text-left">
                <h4 className="text-2xl font-black uppercase italic text-white tracking-tight">Efficiency Verified</h4>
                <p className="text-slate-400 text-base md:text-xl font-light leading-relaxed italic">
                   One molecule of glucose (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>) yields roughly {Math.floor(state.atpMade)} ATP units. Trillions of these power your life every second. This is how you stay warm on a cold day.
                </p>
                <div className="pt-4 space-y-2">
                   {funFacts.map((fact, idx) => (
                      <div key={idx} className="flex gap-3 items-center text-sm text-slate-300 italic">
                         <i className="fas fa-check-circle text-amber-500 text-[10px]"></i>
                         <span>{fact}</span>
                      </div>
                   ))}
                </div>
            </div>
        </div>

        <div className="glass-panel p-8 rounded-[2.5rem] border-sky-500/10 bg-sky-950/5 flex flex-col justify-center space-y-6 shadow-xl">
            <h4 className="text-base font-black uppercase italic text-sky-400 text-center tracking-widest">Real World Impact</h4>
            <div className="space-y-4">
                {analogies.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-400 shrink-0 border border-sky-500/10">
                      <i className={`fas ${c.icon} text-sm`}></i>
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] font-black text-white uppercase leading-none mb-1">{c.val}</span>
                      <p className="text-[10px] text-slate-500 italic leading-tight">{c.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mb-16">
          <button onClick={onContinue} className="flex-1 py-6 bg-white text-black font-black text-xl rounded-2xl hover:scale-105 transition-all shadow-xl uppercase tracking-widest btn-neural">
            Final Quiz
          </button>
          <button onClick={onBackHome} className="flex-1 py-6 glass-panel border-white/10 text-white font-black text-xl rounded-2xl hover:scale-105 transition-all uppercase tracking-widest btn-neural">
            Dashboard
          </button>
      </div>
    </div>
  );
};