import React, { useState, useEffect, useRef } from 'react';
import { ATPSynthase } from './ATPSynthase';

const STAGES = [
  { n: "Citrate", c: 6, y: null, desc: "Acetyl-CoA (2C) joins Oxaloacetate (4C) to start the cycle." },
  { n: "Isocitrate", c: 6, y: null, desc: "Rearrangement protocol. Preparing for carbon extraction." },
  { n: "α-Ketoglutarate", c: 5, y: "NADH + CO2", desc: "First carbon stripped and vented. Carrier loaded." },
  { n: "Succinyl-CoA", c: 4, y: "NADH + CO2", desc: "Second carbon stripped. energy flux increasing." },
  { n: "Succinate", c: 4, y: "ATP", desc: "Direct energy harvest. 1 ATP molecule created." },
  { n: "Fumarate", c: 4, y: "FADH2", desc: "Secondary electron storage initialized." },
  { n: "Malate", c: 4, y: null, desc: "Pre-regeneration hydration cycle." },
  { n: "Oxaloacetate", c: 4, y: "NADH", desc: "Regeneration complete. Ready for next Acetyl group." }
];

export const KrebsCycle: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [turns, setTurns] = useState(0);
  const [isForging, setIsForging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startForge = () => {
    if (turns >= 2 || isForging) return;
    setIsForging(true);
    let cur = idx;
    timerRef.current = window.setInterval(() => {
      cur = (cur + 1) % 8;
      setIdx(cur);
      setRotation(r => r + 45);
      
      if (cur === 7) {
        clearInterval(timerRef.current!);
        const next = turns + 1;
        setTurns(next);
        setIsForging(false);
        if (next >= 2) setTimeout(onComplete, 1800);
      }
    }, 900);
  };

  return (
    <div className="stage-container">
      <div className="header-wrap text-center mb-6">
         <h2 className="text-hero text-white">THE <span className="text-emerald-500">MATRIX</span> FORGE</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center flex-1">
        <div className="space-y-10">
          <div className="glass-panel p-10 rounded-[3rem] border-emerald-500/20 space-y-8">
             <div className="flex justify-between items-center">
                <span className="text-[12px] font-black uppercase tracking-widest text-slate-500">Cycle Progression</span>
                <span className="text-emerald-400 font-black text-3xl italic">TURN {turns + 1} / 2</span>
             </div>
             <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(turns / 2) * 100}%` }}></div>
             </div>
             <div className="bg-emerald-500/10 p-8 rounded-3xl border-l-4 border-emerald-500 shadow-xl">
                <h4 className="text-[10px] font-black text-emerald-500 uppercase mb-3">Enzymatic Intel</h4>
                <p className="text-slate-200 italic text-2xl font-light leading-relaxed">
                   Currently forming: <strong>{STAGES[idx].n}</strong>.<br/> {STAGES[idx].desc}
                </p>
             </div>
          </div>

          <button 
            onClick={startForge} 
            disabled={isForging || turns >= 2} 
            className={`w-full py-12 rounded-[2.5rem] text-4xl font-black uppercase tracking-[0.2em] btn-neural shadow-4xl ${isForging ? 'bg-emerald-500 text-black animate-pulse' : 'bg-emerald-600 text-white'}`}
          >
            {isForging ? 'DECARBOXYLATING...' : turns >= 2 ? 'CORE SYNCED' : 'ENGAGE TURN ' + (turns + 1)}
          </button>
          
          <p className="text-center text-slate-500 italic text-sm">Every glucose molecule requires 2 turns of the forge to be fully processed.</p>
        </div>

        <div className="space-y-8">
          <div className="relative h-full min-h-[400px] flex items-center justify-center">
              <div className="relative z-10 w-[450px] h-[450px] transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)" style={{ transform: `rotate(${rotation}deg)` }}>
                  {STAGES.map((s, i) => {
                     const angle = i * 45 - 90;
                     const r = 180;
                     const x = 225 + r * Math.cos(angle * (Math.PI/180));
                     const y = 225 + r * Math.sin(angle * (Math.PI/180));
                     const active = idx === i;

                     return (
                       <div key={i} className={`absolute w-24 h-24 -ml-12 -mt-12 flex flex-col items-center justify-center transition-all duration-500 ${active ? 'scale-125 opacity-100' : 'opacity-20 scale-90'}`} style={{ left: x, top: y, transform: `rotate(-${rotation}deg)` }}>
                          <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-black text-2xl ${active ? 'bg-emerald-500 text-black border-white shadow-[0_0_40px_#10b981]' : 'bg-slate-900 border-white/10'}`}>
                             {s.c}C
                          </div>
                          <span className="text-[10px] font-black uppercase mt-3 whitespace-nowrap bg-black/60 px-3 py-1 rounded-full border border-white/5">{s.n}</span>
                       </div>
                     );
                  })}
              </div>
              
              <div className="absolute w-[350px] h-[350px] rounded-full border border-white/5 border-dashed animate-spin-slow opacity-10"></div>
              <div className="absolute glass-panel p-10 rounded-full border-white/5 bg-black/40 z-20 flex flex-col items-center">
                 <i className={`fas fa-sync text-5xl text-emerald-500 ${isForging ? 'fa-spin' : ''}`}></i>
              </div>
          </div>

          {/* ATP Synthase Diagram */}
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-black text-orange-500 uppercase tracking-widest">ATP Synthase</h3>
            <div className="flex items-center justify-center">
              <ATPSynthase isActive={turns >= 2} protonGradient={turns >= 2 ? 100 : 0} />
            </div>
            <p className="text-center text-slate-400 italic text-sm max-w-md">
              The final stage: Protons flow back through ATP synthase, powering ATP production from ADP + Pi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};