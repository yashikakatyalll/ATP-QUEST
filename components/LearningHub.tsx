import React from 'react';

interface LearningHubProps {
  topic: string;
  onBack: () => void;
}

const CONTENT: Record<string, any> = {
  GLYCOLYSIS: {
    title: "Glycolysis: Splitting Glucose",
    location: "Cytoplasm",
    details: [
      { h: "The Overall Equation", p: "C6H12O6 + 2 NAD+ + 2 ADP + 2 Pi → 2 Pyruvate + 2 NADH + 2 ATP. No oxygen is required for this phase." },
      { h: "Investment Phase", p: "The cell spends 2 ATP molecules to phosphorylate glucose, making it unstable and reactive. This step is controlled by enzymes like Hexokinase." },
      { h: "Payoff Phase", p: "Energy is harvested by producing 4 ATP and 2 NADH. The net gain for the cell is 2 ATP and 2 NADH per glucose molecule." },
      { h: "Substrate-Level Phosphorylation", p: "The ATP in glycolysis is made directly by transferring a phosphate group from a high-energy substrate to ADP using an enzyme." }
    ]
  },
  LINK: {
    title: "Pyruvate Oxidation: Mitochondrial Entry",
    location: "Mitochondrial Matrix",
    details: [
      { h: "The Transport Step", p: "Pyruvate is moved from the cytoplasm into the mitochondrial matrix through a transport protein." },
      { h: "Decarboxylation", p: "One carbon is removed from pyruvate and released as CO2. This is why we exhale carbon dioxide." },
      { h: "Reduction of NAD+", p: "Electrons are transferred to NAD+ to form NADH, which will be used in the final stage of respiration." },
      { h: "Coenzyme A Attachment", p: "The remaining 2-carbon group attaches to Coenzyme A to form Acetyl-CoA, the ticket to enter the Krebs cycle." }
    ]
  },
  KREBS: {
    title: "Citric Acid Cycle: Electron Harvest",
    location: "Mitochondrial Matrix",
    details: [
      { h: "The Two-Turn Rule", p: "Since one glucose makes two pyruvates, the cycle must turn twice for every glucose molecule originally processed." },
      { h: "Acetyl-CoA Entry", p: "Acetyl-CoA (2C) combines with Oxaloacetate (4C) to form Citrate (6C). This starts the series of 8 enzymatic reactions." },
      { h: "Carbon Loss", p: "Per turn, two carbons are lost as CO2. By the end of this stage, all carbons from the original glucose are gone." },
      { h: "High Energy Carriers", p: "The main goal is to load up 3 NADH and 1 FADH2 per turn. These molecules carry high-energy electrons to the ETC." }
    ]
  },
  ETC: {
    title: "Electron Transport and Chemiosmosis",
    location: "Inner Membrane (Cristae)",
    details: [
      { h: "The Electron Chain", p: "NADH and FADH2 donate electrons to protein complexes in the inner membrane. Electrons move down the chain, releasing energy." },
      { h: "Proton Pumping", p: "The energy from electrons is used to pump H+ ions (protons) from the matrix into the intermembrane space, creating a gradient." },
      { h: "Oxygen's Role", p: "Oxygen sits at the end of the chain, catching electrons and forming water. This pull keeps the entire chain moving." },
      { h: "ATP Synthase", p: "Protons flow back into the matrix through a turbine called ATP Synthase. This mechanical motion fuses ADP and Pi to make ATP." }
    ]
  },
  FERMENTATION: {
    title: "Fermentation: The Backup Plan",
    location: "Cytoplasm",
    details: [
      { h: "Anaerobic Conditions", p: "When oxygen is absent, the ETC stops. Fermentation allows the cell to keep making a small amount of ATP." },
      { h: "NAD+ Regeneration", p: "The primary purpose is to recycle NAD+ from NADH. This allows glycolysis to continue splitting glucose." },
      { h: "Lactic Acid (Animals)", p: "In animal cells, pyruvate is converted to lactate. This is what causes the 'burn' during heavy exercise." },
      { h: "Alcoholic (Yeast)", p: "In yeast, pyruvate is converted into ethanol and CO2. This process is used in baking and brewing." }
    ]
  }
};

export const LearningHub: React.FC<LearningHubProps> = ({ topic, onBack }) => {
  const data = CONTENT[topic] || CONTENT.GLYCOLYSIS;

  return (
    <div className="stage-container max-w-5xl mx-auto space-y-12 py-12 pb-32 animate-in slide-in-from-right-10 duration-700">
       <div className="flex justify-between items-end border-b border-white/10 pb-8">
          <div className="space-y-2">
             <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Educational Resource // {data.location}</span>
             <h2 className="text-6xl font-black italic uppercase text-white tracking-tighter">{data.title}</h2>
          </div>
          <button onClick={onBack} className="px-8 py-4 glass-panel rounded-xl text-xs font-black uppercase text-slate-400 hover:text-white transition-all">Close Protocol</button>
       </div>

       <div className="grid md:grid-cols-2 gap-8">
          {data.details.map((item: any, i: number) => (
             <div key={i} className="glass-panel p-10 rounded-[3rem] border-white/5 space-y-4 hover:border-white/20 transition-all">
                <h4 className="text-xl font-black text-amber-400 uppercase tracking-tight italic">{item.h}</h4>
                <p className="text-2xl text-slate-300 font-light italic leading-relaxed">{item.p}</p>
             </div>
          ))}
       </div>

       <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 text-center space-y-6">
          <i className="fas fa-microscope text-4xl text-sky-400"></i>
          <h5 className="text-2xl font-black italic uppercase">Metabolic Synthesis</h5>
          <p className="text-xl text-slate-400 italic max-w-3xl mx-auto leading-relaxed">
             This stage represents an essential step in extracting chemical energy from organic molecules to sustain eukaryotic life.
          </p>
       </div>
    </div>
  );
};