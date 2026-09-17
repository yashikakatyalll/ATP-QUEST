import React, { useState, useEffect } from 'react';

export const LinkReaction: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'decarb' | 'attach' | 'finish'>('decarb');
  const [cycle, setCycle] = useState(1);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy - 0.25,
      })).filter(p => Math.abs(p.y) < 600));
    }, 16);
    return () => clearInterval(interval);
  }, [particles]);

  const handleAction = () => {
    if (phase === 'decarb') {
      const burst = Array.from({ length: 30 }).map((_, i) => ({
        id: Date.now() + i,
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15 - 5
      }));
      setParticles(prev => [...prev, ...burst]);
      setPhase('attach');
    } else if (phase === 'attach') {
      setPhase('finish');
      setTimeout(() => {
        if (cycle < 2) {
          setCycle(2);
          setPhase('decarb');
        } else {
          onComplete();
        }
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 flex flex-col lg:flex-row gap-20 items-center animate-in fade-in duration-1000 compact-viewport">
      <div className="lg:w-1/2 space-y-10">
        <div className="space-y-6">
          <div className="directive-card py-2 shadow-xl"><p className="text-[11px] font-bold uppercase tracking-widest text-amber-500"><i className="fas fa-sign-in-alt mr-2"></i> Mission: Vent the Carboxyl group and latch Coenzyme A to Enter the Matrix.</p></div>
          <h2 className="text-hero leading-tight uppercase">GATEWAY <span className="text-amber-500">PROTOCOL</span></h2>
          <div className="flex items-center gap-6 text-slate-400 font-mono text-2xl py-6 border-y border-white/5 italic">
             <span className="text-orange-500 font-black uppercase">Pyruvate (3C)</span>
             <i className="fas fa-chevron-right text-slate-800"></i>
             <span className="text-sky-400 font-black uppercase">Acetyl-CoA (2C)</span>
          </div>
          <p className="text-3xl font-light text-slate-400 italic leading-snug">
            We must <span className="text-white font-bold underline decoration-amber-500/30 underline-offset-8">strip the carbon carboxyl</span> to fit through the mitochondrial gate.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="glass-panel p-10 border-sky-500/10 bg-sky-950/5 rounded-[2.5rem] flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">NADH Harvest</span>
            <div className="text-6xl font-black text-sky-400 formula">+1 <span className="text-xs uppercase opacity-50">Unit</span></div>
          </div>
          <div className="glass-panel p-10 border-rose-500/10 bg-rose-950/5 rounded-[2.5rem] flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">CO2 Exhaust</span>
            <div className="text-6xl font-black text-rose-500 formula">+1 <span className="text-xs uppercase opacity-50">Unit</span></div>
          </div>
        </div>

        <button 
          onClick={handleAction}
          disabled={phase === 'finish'}
          className={`w-full py-10 text-3xl font-black rounded-[2.5rem] transition-all duration-500 uppercase tracking-widest active:scale-95 shadow-4xl btn-neural ${
            phase === 'decarb' ? 'bg-amber-600 text-white shadow-amber-900/40' :
            phase === 'attach' ? 'bg-sky-600 text-white shadow-sky-900/40 animate-pulse' :
            'bg-emerald-500 text-black'
          }`}
        >
          {phase === 'decarb' ? 'VENT CARBON (CO2)' :
           phase === 'attach' ? 'DOCK COENZYME A' :
           'FINALIZING SYNC...'}
        </button>
        
        <div className="text-center">
            <span className="text-[11px] font-black text-slate-600 uppercase tracking-[1em]">Molecular Turn {cycle}/2</span>
        </div>
      </div>

      <div className="lg:w-1/2 h-[750px] glass-panel border-white/5 flex items-center justify-center relative overflow-hidden rounded-[4rem] shadow-inner-3xl membrane-texture">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.08),transparent_70%)]"></div>
        
        {particles.map(p => (
            <div 
                key={p.id} 
                className="absolute w-10 h-10 rounded-full bg-white/20 blur-md pointer-events-none"
                style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
            ></div>
        ))}

        <div className="relative z-10 flex flex-col items-center gap-24 scale-125">
            <div className="flex flex-col gap-10 items-center">
                <div className="w-24 h-24 rounded-3xl border-2 border-white/40 flex items-center justify-center font-black text-3xl bg-orange-600 shadow-3xl text-white">C</div>
                <div className="w-24 h-24 rounded-3xl border-2 border-white/40 flex items-center justify-center font-black text-3xl bg-orange-600 shadow-3xl text-white">C</div>
                
                {phase === 'decarb' ? (
                  <div className="w-24 h-24 rounded-3xl border-2 border-rose-500/50 border-dashed flex items-center justify-center font-black text-3xl bg-rose-900/40 animate-pulse relative shadow-2xl">
                    C
                    <div className="absolute -right-32 text-[9px] font-black text-rose-500 uppercase tracking-widest whitespace-nowrap bg-black/50 px-3 py-1 rounded">Unstable Carboxyl</div>
                  </div>
                ) : (
                  <div className="absolute -bottom-40 flex flex-col items-center animate-in zoom-in duration-700">
                      <div className="w-1 h-20 bg-gradient-to-b from-transparent to-sky-500"></div>
                      <div className="px-12 py-5 bg-sky-600 rounded-3xl text-[14px] font-black shadow-[0_0_80px_#0ea5e9] border border-white/30 text-white uppercase italic">Coenzyme A</div>
                  </div>
                )}
            </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-white/5 rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
};