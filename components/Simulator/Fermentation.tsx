import React, { useState, useEffect } from 'react';

export const Fermentation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [nadRefreshed, setNadRefreshed] = useState(0);
  const [strain, setStrain] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    const timer = setInterval(() => {
      setStrain(prev => Math.min(prev + 1.8, 100));
    }, 100);
    return () => clearInterval(timer);
  }, [hasStarted]);

  const handleOxidation = () => {
    if (!hasStarted) setHasStarted(true);
    const newCount = nadRefreshed + 1;
    setNadRefreshed(newCount);
    setStrain(prev => Math.max(prev - 8, 0));
    
    if (newCount >= 15) {
      setTimeout(onComplete, 500);
    }
  };

  return (
    <div className="stage-container py-12 px-6 animate-in zoom-in-95 duration-1000 overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto w-full">
        <div className="space-y-12">
            <div className="directive-card p-6 border-rose-500 bg-rose-500/10 shadow-2xl">
              <p className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
                <i className="fas fa-exclamation-triangle mr-2"></i> Current Goal:
                <br/> 1. Click 'Recycle carriers' to convert NADH back to NAD+.
                <br/> 2. Keep the Lactic Acid level from reaching 100%.
                <br/> 3. Recycle 15 times to survive the anaerobic shift.
              </p>
            </div>
            <h2 className="text-hero text-white leading-tight uppercase">ANAEROBIC <span className="text-rose-500">FERMENTATION</span></h2>
            <p className="text-3xl text-slate-400 font-light italic leading-snug">
                Oxygen is gone. The ETC has stopped. To keep making ATP, we must recycle NAD+ so glycolysis can continue splitting glucose. This results in the production of lactic acid.
            </p>
            
            <div className="glass-panel p-12 border-rose-500/20 bg-rose-950/5 rounded-[3.5rem] space-y-10 shadow-3xl">
                <div className="flex justify-between items-end">
                    <span className="text-[12px] font-black uppercase text-rose-500 tracking-widest">Lactic Acid Level</span>
                    <span className="text-7xl font-black formula text-rose-500 leading-none">{Math.floor(strain)}%</span>
                </div>
                <div className="w-full h-6 bg-black rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
                    <div 
                        className="h-full bg-gradient-to-r from-orange-500 via-rose-500 to-red-600 rounded-full transition-all duration-150 shadow-[0_0_30px_#f43f5e]"
                        style={{ width: `${strain}%` }}
                    ></div>
                </div>
            </div>
        </div>

        <div className="relative h-[750px] glass-panel border-white/10 rounded-[5rem] flex flex-col items-center justify-center overflow-hidden shadow-inner-3xl membrane-texture">
            <div className={`absolute inset-0 transition-opacity duration-700 ${strain > 75 ? 'bg-red-500/20 animate-pulse' : 'bg-transparent'}`}></div>
            
            <div className="relative w-96 h-96 flex items-center justify-center scale-110">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-rose-500/40 animate-spin-slow"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-10">
                    <div className="flex flex-col items-center gap-6">
                        <span className="text-xs font-black text-sky-400 tracking-widest uppercase bg-sky-950/40 px-3 py-1 rounded">NADH</span>
                        <div className="w-2 h-32 bg-gradient-to-b from-sky-500 via-white to-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.5)]"></div>
                        <span className="text-xs font-black text-rose-400 tracking-widest uppercase bg-rose-950/40 px-3 py-1 rounded">NAD+</span>
                    </div>
                </div>
            </div>

            <div className="mt-20 w-full px-20 space-y-8 z-20">
                <button 
                    onClick={handleOxidation}
                    disabled={nadRefreshed >= 15}
                    className="w-full py-12 bg-rose-600 text-white font-black text-4xl rounded-[2.5rem] shadow-4xl hover:scale-105 active:scale-95 transition-all btn-neural border-2 border-white/20 uppercase"
                >
                    {nadRefreshed >= 15 ? 'SURVIVAL SECURED' : `RECYCLE CARRIERS (${nadRefreshed}/15)`}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};