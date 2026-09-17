import React from 'react';

interface StageSummaryProps {
  title: string;
  subtitle: string;
  yields: { label: string; value: string | number; color: string }[];
  bioFact: string;
  realWorld: string;
  onNext: () => void;
  icon: string;
}

export const StageSummary: React.FC<StageSummaryProps> = ({ title, subtitle, yields, bioFact, realWorld, onNext, icon }) => {
  return (
    <div className="flex flex-col items-center py-10 px-6 animate-in fade-in duration-1000 w-full max-w-7xl mx-auto compact-viewport overflow-visible">
      <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-10 shadow-3xl transform hover:rotate-12 transition-transform shrink-0">
        <i className={`fas ${icon} text-4xl text-white`}></i>
      </div>
      
      <div className="space-y-6 mb-16 text-center w-full">
        <div className="header-wrap">
            <h2 className="text-hero text-white">{title}</h2>
        </div>
        <p className="font-mono text-slate-500 font-black italic tracking-[0.6em] text-lg uppercase leading-none">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full mb-20">
        {yields.map((y, i) => (
          <div key={i} className={`glass-panel p-12 rounded-[3rem] border-white/10 flex flex-col items-center group shadow-4xl hover:border-white/30 transition-all ${i === 2 && yields.length === 3 ? 'sm:col-span-2 md:col-span-1' : ''}`}>
            <span className="font-mono text-[11px] opacity-60 uppercase tracking-[0.4em] leading-none mb-8 text-center font-black whitespace-nowrap">{y.label}</span>
            <div className={`text-7xl md:text-8xl font-black formula ${y.color} transition-transform group-hover:scale-110 leading-none tracking-tighter`}>{y.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-20">
          <div className="glass-panel p-12 rounded-[3.5rem] border-amber-500/15 bg-amber-950/5 text-left flex flex-col sm:flex-row gap-8 items-start shadow-2xl group hover:border-amber-500/40 transition-all">
            <div className="w-20 h-20 rounded-[1.5rem] bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-xl group-hover:scale-110 transition-transform">
               <i className="fas fa-microscope text-amber-500 text-4xl"></i>
            </div>
            <div>
               <span className="font-black text-amber-500 uppercase text-[12px] block mb-4 tracking-[0.2em] leading-none">Biological Mechanism</span>
               <p className="text-slate-200 italic leading-relaxed text-2xl font-light">{bioFact}</p>
            </div>
          </div>

          <div className="glass-panel p-12 rounded-[3.5rem] border-sky-500/15 bg-sky-950/5 text-left flex flex-col sm:flex-row gap-8 items-start shadow-2xl group hover:border-sky-500/40 transition-all">
            <div className="w-20 h-20 rounded-[1.5rem] bg-sky-500/10 flex items-center justify-center shrink-0 border border-sky-500/20 shadow-xl group-hover:scale-110 transition-transform">
               <i className="fas fa-fingerprint text-sky-500 text-4xl"></i>
            </div>
            <div>
               <span className="font-black text-sky-400 uppercase text-[12px] block mb-4 tracking-[0.2em] leading-none">Human Connection</span>
               <p className="text-slate-200 italic leading-relaxed text-2xl font-light">{realWorld}</p>
            </div>
          </div>
      </div>

      <button onClick={onNext} className="px-32 py-10 bg-white text-black font-black text-3xl rounded-[2rem] hover:scale-105 transition-all shadow-4xl btn-neural shrink-0 mb-16 uppercase tracking-widest leading-none">
        PROCEED TO NEXT MISSION SECTOR <i className="fas fa-chevron-right ml-4"></i>
      </button>
    </div>
  );
};