import React, { useState, useEffect, useRef } from 'react';
import { ATPSynthase } from './ATPSynthase';

interface Particle {
  id: number;
  x: number;
  y: number;
  type: 'electron' | 'proton';
  progress?: number;
}

const COMPLEXES = [
  { id: 'CI', name: 'Complex I', x: 12, p: true, color: '#3b82f6', icon: 'fa-microchip', detail: 'NADH Entry' },
  { id: 'CII', name: 'Complex II', x: 28, p: false, color: '#10b981', icon: 'fa-cube', detail: 'FADH2 Entry' },
  { id: 'CIII', name: 'Complex III', x: 48, p: true, color: '#f43f5e', icon: 'fa-bolt', detail: 'Proton Pump' },
  { id: 'CIV', name: 'Complex IV', x: 65, p: true, color: '#6366f1', icon: 'fa-shield-virus', detail: 'Oxygen Terminal' },
];

export const ETCSimulator: React.FC<{ onComplete: (atp: number) => void }> = ({ onComplete }) => {
  const [carriers, setCarriers] = useState({ nadh: 10, fadh2: 2 });
  const [protonGradient, setProtonGradient] = useState(0);
  const [atpYield, setAtpYield] = useState(0);
  const [isSynthActive, setIsSynthActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const next = prev.map(p => {
          if (p.type === 'electron') {
            const nextProgress = (p.progress || 0) + 0.025;
            COMPLEXES.forEach(c => {
               const cx = c.x / 100;
               if (nextProgress >= cx && (p.progress || 0) < cx && c.p) {
                  spawnProton(c.x);
               }
            });
            return { ...p, progress: nextProgress };
          } else if (p.type === 'proton') {
            return { ...p, y: p.y - 6 };
          }
          return p;
        }).filter(p => (p.type === 'electron' ? (p.progress || 0) < 0.95 : p.y > -30));
        return next;
      });

      if (isSynthActive && protonGradient > 0) {
        setProtonGradient(prev => Math.max(0, prev - 0.8));
        setAtpYield(prev => Math.min(28, prev + 0.6));
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isSynthActive, protonGradient]);

  const spawnProton = (startX: number) => {
    setProtonGradient(prev => Math.min(250, prev + 3.5));
    setParticles(prev => [...prev, { id: idCounter.current++, x: startX, y: 320, type: 'proton' }]);
  };

  const fireCarrier = (type: 'nadh' | 'fadh2') => {
    if (carriers[type] <= 0) return;
    setCarriers(prev => ({ ...prev, [type]: prev[type] - 1 }));
    setParticles(prev => [...prev, { id: idCounter.current++, x: 0, y: 350, type: 'electron', progress: type === 'nadh' ? 0.05 : 0.25 }]);
  };

  return (
    <div className="stage-container space-y-4 pb-20 pt-4 overflow-visible">
      {/* HUD METRICS */}
      <div className="grid lg:grid-cols-4 gap-4 shrink-0 relative z-20">
        <div className="glass-panel p-5 rounded-[2rem] text-center border-blue-500/20 shadow-2xl">
           <span className="text-[9px] font-black uppercase text-blue-400 block mb-1 tracking-widest leading-none">Proton Gradient</span>
           <div className="text-5xl font-black formula leading-none mt-1">{Math.floor(protonGradient)}</div>
        </div>
        <div className="glass-panel p-5 rounded-[2rem] flex gap-3 border-white/5">
           <button onClick={() => fireCarrier('nadh')} disabled={carriers.nadh === 0} className="flex-1 glass-panel hover:bg-blue-500/10 rounded-xl border-blue-500/30 flex flex-col items-center justify-center transition-all group shadow-lg">
              <span className="text-[9px] font-black uppercase text-blue-400 group-hover:scale-110">NADH</span>
              <span className="text-3xl font-black leading-none">{carriers.nadh}</span>
           </button>
           <button onClick={() => fireCarrier('fadh2')} disabled={carriers.fadh2 === 0} className="flex-1 glass-panel hover:bg-emerald-500/10 rounded-xl border-emerald-500/30 flex flex-col items-center justify-center transition-all group shadow-lg">
              <span className="text-[9px] font-black uppercase text-emerald-400 group-hover:scale-110">FADH2</span>
              <span className="text-3xl font-black leading-none">{carriers.fadh2}</span>
           </button>
        </div>
        <div className="lg:col-span-2 glass-panel p-5 rounded-[2rem] border-amber-500/30 flex items-center justify-around shadow-4xl relative overflow-hidden">
           <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>
           <div className="text-center z-10">
              <span className="text-[9px] font-black uppercase text-amber-500 block mb-1 tracking-widest leading-none">ATP Harvested</span>
              <div className="text-6xl font-black formula leading-none mt-1">{Math.floor(atpYield)} <span className="text-xs">U</span></div>
           </div>
           <button 
             onClick={() => setIsSynthActive(!isSynthActive)} 
             disabled={protonGradient < 15 && !isSynthActive}
             className={`px-10 py-5 rounded-xl font-black text-xl btn-neural z-10 ${isSynthActive ? 'bg-amber-400 text-black animate-pulse shadow-[0_0_50px_#fbbf24]' : 'bg-white/5 border border-amber-500/30 text-amber-500'}`}
           >
             {isSynthActive ? 'SYNTHASE ON' : 'START SYNTHASE'}
           </button>
        </div>
      </div>

      {/* INSTRUCTIONS */}
      <div className="grid md:grid-cols-2 gap-4 relative z-10">
          <div className="glass-panel p-6 rounded-[2.5rem] border-sky-500/20 bg-black/60 shadow-2xl flex items-center gap-6 border-l-8 border-l-sky-500">
              <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center shrink-0 border border-sky-500/20"><i className="fas fa-terminal text-sky-400 text-xl"></i></div>
              <div className="flex-1">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">How to play</h4>
                  <p className="text-slate-300 italic text-sm leading-snug">Click NADH or FADH2 to release electrons. Electrons pump protons into the intermembrane space. When the gradient is high, click 'Start Synthase' to make ATP.</p>
              </div>
          </div>
          <div className="glass-panel p-6 rounded-[2.5rem] border-amber-500/20 bg-black/60 shadow-2xl flex items-center gap-6 border-l-8 border-l-amber-500">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20"><i className="fas fa-bolt text-amber-500 text-xl"></i></div>
              <div className="flex-1">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Bio Concept</h4>
                  <p className="text-slate-300 italic text-sm leading-snug">This stage is called Chemiosmosis. Oxygen acts as the final electron acceptor, pulling electrons through the complexes and forming water.</p>
              </div>
          </div>
      </div>

      {/* DYNAMIC SIMULATION AREA */}
      <div className="flex-1 min-h-[500px] relative glass-panel rounded-[5rem] border-white/5 overflow-hidden membrane-texture shadow-inner-3xl">
         <div className="absolute top-[35%] w-full h-44 bg-white/[0.04] border-y border-white/10 z-0"></div>

         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <path d="M 0 350 L 1400 350" stroke="white" strokeWidth="2" fill="none" strokeDasharray="15 10" />
         </svg>

         {COMPLEXES.map(c => (
           <div key={c.id} className="absolute top-[35%] flex flex-col items-center group" style={{ left: `${c.x}%`, transform: 'translateX(-50%)' }}>
             <div className="w-24 h-44 glass-panel border-4 rounded-[2rem] flex flex-col items-center justify-center transition-all group-hover:scale-110 shadow-2xl" style={{ borderColor: c.color }}>
                <i className={`fas ${c.icon} text-4xl mb-4 opacity-70`}></i>
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">{c.id}</span>
             </div>
             <p className="text-[9px] text-white/30 uppercase mt-4 max-w-[90px] text-center font-black leading-tight group-hover:text-white transition-colors">{c.detail}</p>
           </div>
         ))}

         <div className="absolute top-[10%] right-[10%] flex flex-col items-center group">
            <ATPSynthase isActive={isSynthActive} protonGradient={protonGradient} />
            <span className="text-[12px] font-black uppercase text-orange-500 mt-4 tracking-[0.5em] leading-none">ATP Synthase</span>
         </div>

         {particles.map(p => (
           <div 
             key={p.id} 
             className={`absolute rounded-full z-50 transition-all ${p.type === 'electron' ? 'w-10 h-10 bg-red-600 shadow-[0_0_35px_red]' : 'w-6 h-6 bg-blue-400 shadow-[0_0_20px_#3b82f6]'}`}
             style={p.type === 'electron' ? { left: `${(p.progress || 0) * 100}%`, top: '42.5%' } : { left: `${p.x}%`, top: `${p.y}px` }}
           >
             {p.type === 'electron' && <i className="fas fa-bolt text-[11px] text-white flex items-center justify-center h-full"></i>}
           </div>
         ))}
      </div>

      {atpYield >= 28 && (
        <div className="absolute inset-0 bg-black/95 z-[100] flex items-center justify-center animate-in zoom-in duration-700">
           <div className="text-center p-20 glass-panel border-amber-500/30 rounded-[5rem] shadow-4xl max-w-3xl border-t-8 border-t-amber-500">
              <h3 className="text-7xl font-black italic uppercase text-amber-500 mb-8 leading-none">OXIDATIVE HARVEST COMPLETE</h3>
              <p className="text-3xl text-slate-400 italic mb-14">You have successfully produced 28 ATP through chemiosmosis.</p>
              <button onClick={() => onComplete(28)} className="px-28 py-12 bg-white text-black font-black text-5xl rounded-[2.5rem] btn-neural shadow-4xl animate-bounce uppercase tracking-tighter">FINALIZE MISSION</button>
           </div>
        </div>
      )}
    </div>
  );
};