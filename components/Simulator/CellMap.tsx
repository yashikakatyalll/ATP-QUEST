import React, { useState, useEffect } from 'react';

const SECTORS = [
  {
    id: 'cytosol',
    name: 'Sector 01: Cytosol',
    title: 'The Primordial Arena',
    desc: 'The viscous cytosol where anaerobic combustion begins. Glycolysis splits glucose into high-energy fragments here.',
    icon: 'fa-vials',
    color: 'from-blue-600 to-indigo-700',
    stat: 'Investment Mode'
  },
  {
    id: 'matrix',
    name: 'Sector 02: Matrix',
    title: 'Molecular Furnace',
    desc: 'Deep mitochondrial core. Pyruvate is oxidized, CO2 is vented, and the Krebs cycle initiates carbon-stripping.',
    icon: 'fa-fire',
    color: 'from-emerald-600 to-teal-700',
    stat: 'Enzymatic Peak'
  },
  {
    id: 'cristae',
    name: 'Sector 03: Inner Membrane',
    title: 'Turbine Array',
    desc: 'Highly folded cristae maximize surface area for the ETC—the cell\'s massive chemiosmotic battery.',
    icon: 'fa-bolt',
    color: 'from-amber-500 to-orange-700',
    stat: 'Harvest Potential'
  }
];

export const CellMap: React.FC = () => {
  const [active, setActive] = useState<string | null>('cytosol');
  const [scanPulse, setScanPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setScanPulse(p => (p + 1) % 100), 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-16 items-center justify-center py-12 px-8 max-w-7xl mx-auto">
      {/* Visual Interface */}
      <div className="relative w-full max-w-xl aspect-square flex items-center justify-center animate-in zoom-in duration-1000">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)] rounded-full border border-white/5"></div>
        
        {/* The Scan Hub */}
        <div className="relative w-[90%] h-[90%] rounded-full border border-white/10 p-16 flex items-center justify-center animate-spin-slow">
            <div className="w-full h-full border border-dashed border-white/20 rounded-full"></div>
        </div>

        {/* Bio-Scanner SVG - High Fidelity Mitochondrial Topology */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <svg viewBox="0 0 200 200" className="w-[85%] h-[85%] drop-shadow-[0_0_50px_rgba(56,189,248,0.2)]">
            {/* Cytosol Background */}
            <circle cx="100" cy="100" r="95" fill="rgba(30,58,138,0.05)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            
            {/* Outer Membrane */}
            <ellipse cx="100" cy="100" rx="80" ry="50" fill="rgba(15,15,30,0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" transform="rotate(-15 100 100)" />
            
            {/* Inner Membrane (Cristae) */}
            <path 
              d="M45,100 Q55,75 65,100 Q75,125 85,100 Q95,75 105,100 Q115,125 125,100 Q135,75 145,100 Q155,125 165,100" 
              fill="none" 
              stroke={active === 'cristae' ? '#fbbf24' : '#64748b'} 
              strokeWidth={active === 'cristae' ? '4' : '2'} 
              strokeLinecap="round"
              className="transition-all duration-500 cursor-pointer pointer-events-auto"
              onMouseEnter={() => setActive('cristae')}
              transform="rotate(-15 100 100)"
            />

            {/* Matrix Sites */}
            <circle cx="85" cy="95" r="12" fill={active === 'matrix' ? '#10b981' : '#334155'} className="transition-all duration-500 cursor-pointer pointer-events-auto" onMouseEnter={() => setActive('matrix')} transform="rotate(-15 100 100)" />
            <circle cx="120" cy="105" r="10" fill={active === 'matrix' ? '#10b981' : '#334155'} className="transition-all duration-500 cursor-pointer pointer-events-auto" onMouseEnter={() => setActive('matrix')} transform="rotate(-15 100 100)" />
          </svg>
        </div>

        {/* HUD Markers */}
        <div className="absolute top-4 left-4 glass-panel px-6 py-3 rounded-xl border-blue-500/20 text-[10px] font-black tracking-widest text-blue-400 uppercase">SYS: SCANNING...</div>
        <div className="absolute bottom-4 right-4 glass-panel px-6 py-3 rounded-xl border-amber-500/20 text-[10px] font-black tracking-widest text-amber-400 uppercase">YIELD: OPTIMAL</div>
        
        {/* Dynamic Scan Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
            <div className="w-full h-1 bg-sky-500/30 absolute blur-lg shadow-[0_0_20px_#0ea5e9]" style={{ top: `${scanPulse}%` }}></div>
        </div>
      </div>

      {/* Info Interface */}
      <div className="flex-1 max-w-xl space-y-8">
        <div className="space-y-4">
            <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">THE <span className="text-sky-400">NEXUS</span></h2>
            <p className="text-slate-400 text-xl font-light leading-snug italic">Calibrate your neural interface by hovering over metabolic sectors. Each region represents a critical phase of the energy conversion protocol.</p>
        </div>

        <div className="space-y-4">
          {SECTORS.map(s => (
            <button
              key={s.id}
              onMouseEnter={() => setActive(s.id)}
              className={`w-full p-8 glass-panel text-left border transition-all flex items-start gap-8 group relative overflow-hidden rounded-[2rem] ${
                active === s.id ? 'border-white/40 translate-x-4 bg-white/[0.05] shadow-2xl' : 'border-white/5 opacity-60'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-12 transition-all`}>
                <i className={`fas ${s.icon} text-white text-xl`}></i>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-xl uppercase italic tracking-tight">{s.name}</h4>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${active === s.id ? 'text-white' : 'text-slate-600'}`}>{s.stat}</span>
                </div>
                {active === s.id ? (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                    <p className="text-white font-bold text-base mb-1 italic opacity-80">"{s.title}"</p>
                    <p className="text-slate-400 text-sm font-light leading-snug">{s.desc}</p>
                  </div>
                ) : (
                  <div className="h-1 w-24 bg-white/5 rounded-full mt-2"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};