import React, { useState, useEffect } from 'react';
import { AppStage, GameState } from './types';
import { QUIZ_QUESTIONS } from './constants';
import { BiologyTutor } from './components/BiologyTutor';
import { CellMap } from './components/Simulator/CellMap';
import { Glycolysis } from './components/Simulator/Glycolysis';
import { ETCSimulator } from './components/Simulator/ETC';
import { LinkReaction } from './components/Simulator/LinkReaction';
import { Fermentation } from './components/Simulator/Fermentation';
import { KrebsCycle } from './components/Simulator/KrebsCycle';
import { GlobalSummary } from './components/Simulator/GlobalSummary';
import { StageSummary } from './components/Simulator/StageSummary';
import { LearningHub } from './components/LearningHub';

const ATPDiagram = () => (
  <div className="w-full max-w-2xl bg-black/80 p-10 rounded-[3rem] border border-amber-500/40 animate-in slide-in-from-top-6 duration-700 my-8 shadow-3xl">
    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
       <h4 className="text-2xl font-black text-amber-400 uppercase italic">Molecular Analysis: Adenine (Purine)</h4>
       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Chemical ID: C5H5N5</span>
    </div>
    <svg viewBox="0 0 700 350" className="w-full h-auto drop-shadow-2xl">
      <g stroke="#3b82f6" strokeWidth="3" fill="none" transform="translate(50, 100)">
        <path d="M40,50 L0,100 L40,150 L100,150 L140,100 L100,50 Z" />
        <path d="M140,100 L180,70 L220,100 L180,130 L140,100" />
        <line x1="15" y1="105" x2="35" y2="140" strokeWidth="1.5" />
        <line x1="105" y1="65" x2="130" y2="90" strokeWidth="1.5" />
        <line x1="175" y1="85" x2="205" y2="100" strokeWidth="1.5" />
        <line x1="50" y1="60" x2="90" y2="60" strokeWidth="1.5" />
        <g fill="#3b82f6" fontSize="14" fontWeight="bold" stroke="none">
          <text x="-15" y="105">N1</text>
          <text x="35" y="170">C2</text>
          <text x="100" y="170">N3</text>
          <text x="145" y="105">C4</text>
          <text x="95" y="45">C5</text>
          <text x="35" y="45">C6</text>
          <text x="180" y="60">N7</text>
          <text x="225" y="105">C8</text>
          <text x="180" y="150">N9</text>
        </g>
        <line x1="40" y1="50" x2="40" y2="10" stroke="#fff" strokeWidth="2" />
        <text x="30" y="5" fill="#fff" fontSize="14" fontWeight="bold" stroke="none">NH2</text>
      </g>
      <g transform="translate(300, 180)">
        <path d="M0,0 L40,-40 L100,-40 L120,0 L60,40 Z" stroke="#a855f7" strokeWidth="3" fill="none" />
        <text x="45" y="65" fill="#a855f7" fontSize="12" fontWeight="bold" stroke="none">Ribose Sugar</text>
        <line x1="-30" y1="50" x2="0" y2="0" stroke="white" strokeWidth="2" strokeDasharray="5 3" />
      </g>
      <g transform="translate(460, 180)">
        {[0, 85, 170].map((offset, i) => (
          <g key={i} transform={`translate(${offset}, 0)`}>
            <circle cx="0" cy="0" r="30" stroke="#fbbf24" strokeWidth="3" fill="rgba(251,191,36,0.1)" />
            <text x="-8" y="8" fill="#fbbf24" fontSize="20" fontWeight="black" stroke="none">P</text>
            {i < 2 && (
              <path d="M30,0 Q42,-25 55,0" stroke="#f43f5e" strokeWidth={i === 1 ? 4 : 2} fill="none" className={i === 1 ? "animate-pulse" : ""} />
            )}
          </g>
        ))}
      </g>
    </svg>
    <div className="mt-8 p-6 bg-white/5 rounded-2xl border-l-4 border-amber-500">
      <p className="text-slate-300 text-lg italic leading-relaxed">
        Energy is packed into the high-energy bonds between these phosphates. When your cell needs to work, it lets that third phosphate <strong>go away</strong>. This snapping action provides the power for every breath and heartbeat.
      </p>
    </div>
  </div>
);

const EnzymeGraph = () => (
  <div className="w-full max-w-2xl bg-black/70 p-10 rounded-[3rem] border border-blue-500/40 animate-in slide-in-from-top-6 duration-700 my-8 shadow-3xl">
    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
       <h4 className="text-2xl font-black text-blue-400 uppercase italic">Energy Profiles</h4>
       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Enzyme Catalysis</span>
    </div>
    <svg viewBox="0 0 500 300" className="w-full h-auto">
      <line x1="50" y1="250" x2="450" y2="250" stroke="#fff" strokeWidth="2" />
      <line x1="50" y1="250" x2="50" y2="50" stroke="#fff" strokeWidth="2" />
      <text x="210" y="280" fill="white" className="text-[11px] uppercase font-bold">Progress</text>
      <text x="15" y="150" fill="white" className="text-[11px] uppercase font-bold" transform="rotate(-90, 15, 150)">Free Energy</text>
      <path d="M50,200 Q150,20 250,200 L450,225" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6 4" />
      <path d="M50,200 Q150,130 250,200 L450,225" fill="none" stroke="#10b981" strokeWidth="4" />
      <circle cx="50" cy="200" r="6" fill="#fff" />
      <circle cx="450" cy="225" r="6" fill="#fff" />
    </svg>
    <div className="mt-8 p-6 bg-white/5 rounded-2xl border-l-4 border-emerald-500">
      <p className="text-slate-300 text-lg italic leading-relaxed">
        Think of enzymes as a friendly boost. They lower the energy "hump" so life happens fast enough to sustain your 37°C body temperature. Without them, you'd literally stall out.
      </p>
    </div>
  </div>
);

const Quiz: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const q = QUIZ_QUESTIONS[idx];
  const isCorrect = selected === q.correctAnswer;

  const handleSelect = (optionIdx: number) => {
    if (showFeedback) return;
    setSelected(optionIdx);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (idx + 1 < QUIZ_QUESTIONS.length) {
      setIdx(idx + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 space-y-12 animate-in slide-in-from-bottom-5">
      <div className="text-center">
        <span className="text-[12px] font-black text-amber-500 uppercase tracking-[1.2em]">Mastery Check {idx + 1}/{QUIZ_QUESTIONS.length}</span>
        <div className="header-wrap mt-8"><h3 className="text-hero text-white">{q.text}</h3></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {q.options.map((opt, i) => {
          let styles = "p-10 glass-panel rounded-[3rem] text-left border-white/10 transition-all shadow-xl group";
          if (showFeedback) {
            if (i === q.correctAnswer) {
              styles = "p-10 rounded-[3rem] text-left border-emerald-500 bg-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)] scale-105 z-10";
            } else if (i === selected) {
              styles = "p-10 rounded-[3rem] text-left border-rose-500 bg-rose-500/10 opacity-60";
            } else {
              styles = "p-10 glass-panel rounded-[3rem] text-left border-white/5 opacity-30 grayscale";
            }
          } else {
            styles += " hover:border-white/50 hover:bg-white/5 active:scale-95";
          }

          return (
            <button key={i} onClick={() => handleSelect(i)} className={styles}>
              <div className="flex items-center gap-6">
                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${showFeedback && i === q.correctAnswer ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white'}`}>
                  {showFeedback && i === q.correctAnswer ? <i className="fas fa-check"></i> : String.fromCharCode(65 + i)}
                </span>
                <span className={`text-2xl font-black italic uppercase leading-tight ${showFeedback && i === q.correctAnswer ? 'text-emerald-400' : 'text-white'}`}>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="animate-in slide-in-from-top-4 duration-500">
          <div className={`p-10 rounded-[3rem] border-2 flex flex-col md:flex-row items-center gap-10 shadow-4xl ${isCorrect ? 'border-emerald-500/30 bg-emerald-950/5' : 'border-rose-500/30 bg-rose-950/5'}`}>
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-2xl ${isCorrect ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'}`}>
              <i className={`fas ${isCorrect ? 'fa-star' : 'fa-lightbulb'} text-4xl`}></i>
            </div>
            <div className="flex-1 space-y-4">
              <h4 className={`text-3xl font-black uppercase italic tracking-tight ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isCorrect ? "Spot on! Mr. Cross is proud." : "Not quite, but don't sweat it!"}
              </h4>
              <p className="text-xl text-slate-300 italic font-light leading-relaxed">
                {q.explanation}
              </p>
            </div>
            <button onClick={handleNext} className="px-16 py-8 bg-white text-black font-black text-xl rounded-[2rem] btn-neural shadow-4xl uppercase tracking-widest shrink-0">
              {idx + 1 === QUIZ_QUESTIONS.length ? "FINISH MISSION" : "NEXT QUESTION"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.HOME);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [prepDetail, setPrepDetail] = useState<'atp' | 'enzyme' | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    atpUsed: 0,
    atpMade: 0,
    nadh: 0,
    fadh2: 0,
    glucoseCount: 1,
    pyruvateCount: 0,
    oxygenAvailable: true,
    unlockedBadges: [],
  });
  const [activeOrgan, setActiveOrgan] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage]);

  const resetGame = () => {
    setGameState({ atpUsed: 0, atpMade: 0, nadh: 0, fadh2: 0, glucoseCount: 1, pyruvateCount: 0, oxygenAvailable: true, unlockedBadges: [] });
    setStage(AppStage.HOME);
    setActiveOrgan(null);
    setPrepDetail(null);
  };

  const openLearn = (topic: string) => {
    setSelectedTopic(topic);
    setStage(AppStage.LEARNING_HUB);
  };

  const renderStage = () => {
    switch (stage) {
      case AppStage.HOME:
        return (
          <div className="stage-container items-center justify-center text-center animate-in fade-in duration-1000">
            <div className="header-wrap mb-10">
              <h1 className="text-hero text-white">ATP <span className="text-amber-400">QUEST</span></h1>
            </div>
            <div className="glass-panel p-12 rounded-[4rem] border-amber-500/20 max-w-5xl mb-16 bg-amber-500/5 shadow-2xl">
                <p className="text-4xl text-white font-black uppercase italic tracking-tight mb-6">Cellular Respiration</p>
                <div className="bg-black/60 p-8 rounded-3xl mb-8 border border-white/10 shadow-inner">
                  <p className="text-3xl font-mono text-amber-400">C6H12O6 + 6O2 → 6CO2 + 6H2O + ATP + Heat</p>
                </div>
                <p className="text-2xl text-slate-300 font-light italic leading-relaxed max-w-4xl mx-auto">
                  Every move you make—scrolling this screen, thinking about lunch, your heart pumping as you breathe—is powered by a chain reaction inside your trillions of cells. We're about to explore the journey of how you break down sugar and capture its energy. 
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8">
              <button onClick={() => setStage(AppStage.PREP)} className="px-20 py-8 bg-blue-600 text-white font-black text-3xl rounded-[2.5rem] btn-neural shadow-4xl uppercase tracking-widest transition-all">START PREP</button>
              <button onClick={() => setStage(AppStage.BIO_LIBRARY)} className="px-20 py-8 glass-panel text-white font-black text-3xl rounded-[2.5rem] btn-neural uppercase tracking-widest transition-all">HUMAN ANATOMY</button>
            </div>
          </div>
        );

      case AppStage.PREP:
        return (
          <div className="stage-container space-y-16 pb-32 animate-in slide-in-from-right-10 duration-700">
            <div className="text-center space-y-4">
              <h2 className="text-hero text-white leading-none uppercase">THE <span className="text-amber-400">BASICS</span></h2>
              <p className="text-2xl text-slate-400 italic max-w-4xl mx-auto leading-relaxed">Before we step inside the cell, let's meet the main characters of the energy refinery.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto items-stretch">
              <div className="glass-panel p-12 rounded-[4rem] border-white/10 space-y-8 shadow-2xl flex flex-col justify-between hover:border-amber-400/30 transition-all">
                <div>
                  <h3 className="text-4xl font-black text-amber-400 uppercase italic leading-tight">1. ATP: The Cell's Cash</h3>
                  <p className="text-slate-300 text-xl leading-relaxed italic mt-6">
                    Adenosine Triphosphate (ATP) is the molecule you use to "buy" work. It's like a universal battery. It has three phosphates; when your cell needs power, it lets that third phosphate <strong>go away</strong>, releasing a burst of energy and leaving you with ADP. 
                  </p>
                </div>
                <div className="space-y-6">
                  <button 
                    onClick={() => setPrepDetail(prepDetail === 'atp' ? null : 'atp')}
                    className={`w-full py-6 rounded-3xl font-black text-lg uppercase tracking-widest transition-all ${prepDetail === 'atp' ? 'bg-amber-500 text-black shadow-[0_0_40px_#fbbf24]' : 'bg-white/5 border border-amber-500/40 text-amber-500 hover:bg-amber-500/10'}`}
                  >
                    {prepDetail === 'atp' ? 'CLOSE STRUCTURE' : 'VIEW ATOMIC STRUCTURE'}
                  </button>
                  {prepDetail === 'atp' && <ATPDiagram />}
                </div>
              </div>

              <div className="glass-panel p-12 rounded-[4rem] border-white/10 space-y-8 shadow-2xl flex flex-col justify-between hover:border-blue-400/30 transition-all">
                <div>
                  <h3 className="text-4xl font-black text-blue-400 uppercase italic leading-tight">2. Enzymes: The Helpers</h3>
                  <p className="text-slate-300 text-xl leading-relaxed italic mt-6">
                    Without enzymes, breaking down your breakfast would take years. They are specialized proteins that "grab" glucose and lower the energy barrier. Think of them as a friendly tunnel through a mountain—they make the journey possible.
                  </p>
                </div>
                <div className="space-y-6">
                  <button 
                    onClick={() => setPrepDetail(prepDetail === 'enzyme' ? null : 'enzyme')}
                    className={`w-full py-6 rounded-3xl font-black text-lg uppercase tracking-widest transition-all ${prepDetail === 'enzyme' ? 'bg-blue-600 text-white shadow-[0_0_40px_#3b82f6]' : 'bg-white/5 border border-blue-600/40 text-blue-400 hover:bg-blue-600/10'}`}
                  >
                    {prepDetail === 'enzyme' ? 'CLOSE GRAPH' : 'VIEW ENERGY GRAPH'}
                  </button>
                  {prepDetail === 'enzyme' && <EnzymeGraph />}
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto p-16 glass-panel border-white/5 rounded-[5rem] text-center shadow-4xl">
              <h3 className="text-3xl font-black uppercase mb-6 text-sky-400 italic">Mitochondria: The Powerhouse</h3>
              <p className="text-slate-300 text-2xl italic mb-10 leading-relaxed max-w-3xl mx-auto">
                Those deep folds (cristae) provide extra surface area to fit thousands of tiny turbines called ATP Synthase. It's a high-efficiency refinery designed to keep your heart beating and your brain firing.
              </p>
              <button onClick={() => setStage(AppStage.CELL_MAP)} className="px-24 py-10 bg-white text-black font-black text-3xl rounded-[2.5rem] btn-neural shadow-4xl uppercase tracking-widest transition-transform hover:scale-105">ENTER THE CELL</button>
            </div>
          </div>
        );

      case AppStage.BIO_LIBRARY:
        return (
          <div className="stage-container space-y-12 pb-24 animate-in slide-in-from-bottom-10">
            <div className="text-center space-y-4">
              <div className="header-wrap"><h2 className="text-hero text-white leading-none">THE <span className="text-rose-500">HUMAN</span> SIDE</h2></div>
              <p className="text-2xl text-slate-400 italic max-w-4xl mx-auto leading-relaxed">
                Metabolism isn't just for tests. It's why you have the energy to watch this. Pick an organ to see the real-life cost of being alive.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-16 items-start justify-center max-w-7xl mx-auto w-full h-full">
               <div className="relative w-full max-w-[440px] h-[800px] bg-gradient-to-b from-white/[0.05] to-transparent rounded-[8rem] border border-white/10 flex flex-col items-center py-12 shadow-2xl shrink-0">
                  <div className="absolute inset-0 p-16 opacity-20 pointer-events-none scale-105">
                    <svg viewBox="0 0 100 200" className="w-full h-full text-white fill-current">
                      <path d="M50,10 C60,10 70,20 70,35 C70,50 60,60 50,60 C40,60 30,50 30,35 C30,20 40,10 50,10 M50,60 L50,130 M50,70 L20,110 M50,70 L80,110 M50,130 L35,195 M50,130 L65,195" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>
                  
                  <div className="relative w-full h-full flex flex-col items-center justify-between py-10 px-6 z-10">
                    <button onClick={() => setActiveOrgan('brain')} className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${activeOrgan === 'brain' ? 'bg-blue-600 scale-125 z-20 shadow-[0_0_100px_#3b82f6]' : 'bg-white/5 border border-white/10 hover:bg-white/10 pulse-organ'}`}>
                       <i className="fas fa-brain text-white text-4xl mb-1"></i>
                       <span className="text-[10px] font-black uppercase">Thinking</span>
                    </button>
                    
                    <button onClick={() => setActiveOrgan('heart')} className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${activeOrgan === 'heart' ? 'bg-rose-600 scale-125 z-20 shadow-[0_0_100px_#f43f5e]' : 'bg-white/5 border border-white/10 hover:bg-white/10 pulse-organ'}`}>
                       <i className="fas fa-heart text-white text-4xl mb-1"></i>
                       <span className="text-[10px] font-black uppercase">Heartbeat</span>
                    </button>

                    <button onClick={() => setActiveOrgan('muscle')} className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${activeOrgan === 'muscle' ? 'bg-emerald-600 scale-125 z-20 shadow-[0_0_100px_#10b981]' : 'bg-white/5 border border-white/10 hover:bg-white/10 pulse-organ'}`}>
                       <i className="fas fa-running text-white text-4xl mb-1"></i>
                       <span className="text-[10px] font-black uppercase">Gym Class</span>
                    </button>
                  </div>
               </div>

               <div className="flex-1 w-full h-full min-h-[600px]">
                  {activeOrgan ? (
                    <div className="glass-panel p-16 rounded-[4rem] border-white/10 animate-in slide-in-from-right-10 space-y-12 shadow-4xl h-full flex flex-col justify-center">
                       {activeOrgan === 'brain' && (
                         <>
                            <h3 className="text-6xl font-black italic text-blue-400 uppercase leading-none">The Exam Drain</h3>
                            <p className="text-2xl text-slate-300 font-light italic leading-relaxed">Your brain is an energy hog. Even though it's small, it uses 20% of your daily sugar. It uses ATP to fire signals so you can think and dream. This is why you feel "wiped out" after a long math test—your brain literally burned its fuel.</p>
                            <div className="bg-white/5 p-10 rounded-3xl border-l-8 border-blue-500 shadow-xl">
                               <h4 className="text-2xl font-black text-blue-400 uppercase mb-4 tracking-widest">Mr. Cross Says:</h4>
                               <p className="text-xl italic text-slate-400 leading-relaxed">Neurons use most of their ATP just to pump ions back and forth to reset themselves. When you're hungry, those pumps slow down, which is why you get "hangry" and can't focus.</p>
                            </div>
                         </>
                       )}
                       {activeOrgan === 'heart' && (
                         <>
                            <h3 className="text-6xl font-black italic text-rose-500 uppercase leading-none">The No-Rest Engine</h3>
                            <p className="text-2xl text-slate-300 font-light italic leading-relaxed">Your heart never takes a break. Heart cells are packed with more mitochondria than almost any other cell to ensure a non-stop supply of ATP. It relies completely on the full aerobic process to keep you alive from your first breath to your last.</p>
                            <div className="bg-white/5 p-10 rounded-3xl border-l-8 border-rose-500 shadow-xl">
                               <h4 className="text-2xl font-black text-rose-500 uppercase mb-4 tracking-widest">Life Fact</h4>
                               <p className="text-xl italic text-slate-400 leading-relaxed">A sudden jump scare makes your heart race because your body just flooded your cells with extra sugar to make emergency ATP, prepping you to run or fight.</p>
                            </div>
                         </>
                       )}
                       {activeOrgan === 'muscle' && (
                         <>
                            <h3 className="text-6xl font-black italic text-emerald-500 uppercase leading-none">The Lactic Burn</h3>
                            <p className="text-2xl text-slate-300 font-light italic leading-relaxed">Sprinting for the bus? Your lungs can't keep up with your muscles' demand. Your cells switch to fermentation for fast energy, producing lactic acid. That agonizing burn in your legs is your body's survival backup plan in action.</p>
                            <div className="bg-white/5 p-10 rounded-3xl border-l-8 border-emerald-500 shadow-xl">
                               <h4 className="text-2xl font-black text-emerald-400 uppercase mb-4 tracking-widest">Mr. Cross's Note</h4>
                               <p className="text-xl italic text-slate-400 leading-relaxed">"Jelly legs" after a heavy workout means your body is busy cleaning up that acid and "paying back the oxygen debt" to recharge your ATP batteries.</p>
                            </div>
                         </>
                       )}
                    </div>
                  ) : (
                    <div className="glass-panel p-24 rounded-[4rem] border-dashed border-white/20 flex flex-col items-center justify-center text-center opacity-50 h-full">
                       <i className="fas fa-hand-pointer text-[10rem] mb-12 text-slate-800 animate-pulse"></i>
                       <h3 className="text-4xl font-black italic uppercase text-slate-500 tracking-tighter leading-tight">Click an anatomical system<br/>to analyze its energy demand.</h3>
                    </div>
                  )}
               </div>
            </div>
            
            <button onClick={() => setStage(AppStage.HOME)} className="max-w-md mx-auto w-full py-10 bg-white text-black font-black text-2xl rounded-3xl btn-neural shadow-4xl mb-12 uppercase tracking-widest">RETURN TO MENU</button>
          </div>
        );

      case AppStage.LEARNING_HUB:
        return <LearningHub topic={selectedTopic || 'GLYCOLYSIS'} onBack={() => setStage(AppStage.HOME)} />;

      case AppStage.CO_PILOT:
        return <BiologyTutor currentStage={stage} onBack={() => setStage(AppStage.HOME)} />;

      case AppStage.CELL_MAP:
        return (
          <div className="stage-container items-center space-y-12">
            <CellMap />
            <div className="max-w-xl text-center">
              <p className="text-slate-400 italic mb-6 text-2xl leading-relaxed">Ready to break some bonds? Click the button to start glycolysis in the cytoplasm.</p>
              <button onClick={() => setStage(AppStage.GLYCOLYSIS)} className="px-28 py-10 bg-blue-600 text-white font-black text-4xl rounded-[2.5rem] btn-neural shadow-4xl animate-bounce uppercase tracking-tighter">INITIATE GLYCOLYSIS</button>
            </div>
          </div>
        );

      case AppStage.GLYCOLYSIS:
        return <Glycolysis onComplete={(m, n) => { setGameState(prev => ({ ...prev, atpMade: m, nadh: n })); setStage(AppStage.SUMMARY_GLYCOLYSIS); }} />;

      case AppStage.SUMMARY_GLYCOLYSIS:
        return <StageSummary 
          title="Glycolysis Harvest" subtitle="PHASE 1: Cytoplasm" 
          yields={[
            { label: "Net ATP Profit", value: 2, color: "text-amber-400" }, 
            { label: "NADH Loaded", value: 2, color: "text-blue-400" },
            { label: "Pyruvate (3C)", value: 2, color: "text-orange-500" }
          ]} 
          bioFact="Glucose is split into two fragments. We spend 2 ATP molecules to start the fire, and get 4 back, leaving us with a net profit of 2." 
          realWorld="This is the only way your red blood cells get energy. Since they have no mitochondria, they rely 100% on this ancient pathway."
          icon="fa-flask" onNext={() => setStage(AppStage.OXYGEN_CHECK)}
        />;

      case AppStage.OXYGEN_CHECK:
        return (
          <div className="stage-container justify-center text-center space-y-12">
             <div className="header-wrap"><h2 className="text-hero text-white">THE <span className="text-sky-400">CHOICE</span></h2></div>
             <p className="text-3xl text-slate-400 italic font-light">Does the cell have enough oxygen (O2) to proceed?</p>
             <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto w-full">
                <button 
                  onClick={() => setStage(AppStage.LINK_REACTION)} 
                  className="glass-panel p-20 rounded-[4rem] text-left border-sky-500/20 hover:border-sky-500 hover:scale-105 transition-all group shadow-2xl"
                >
                  <h3 className="text-5xl font-black text-sky-400 mb-6 uppercase italic tracking-tighter">YES (AEROBIC)</h3>
                  <p className="text-slate-400 text-2xl font-light italic leading-relaxed">Enter the mitochondria for maximum energy harvest. This is how you spend most of your day.</p>
                  <span className="block mt-6 text-xs font-black uppercase text-sky-500 tracking-widest">Potential Yield: ~32 ATP</span>
                </button>
                <button 
                  onClick={() => setStage(AppStage.ANAEROBIC)} 
                  className="glass-panel p-20 rounded-[4rem] text-left border-rose-500/20 hover:border-rose-500 hover:scale-105 transition-all group shadow-2xl"
                >
                  <h3 className="text-5xl font-black text-rose-400 mb-6 uppercase italic tracking-tighter">NO (ANAEROBIC)</h3>
                  <p className="text-slate-400 text-2xl font-light italic leading-relaxed">Oxygen is low. Stay in the cytoplasm and initiate fermentation. Prepare for the "burn."</p>
                  <span className="block mt-6 text-xs font-black uppercase text-rose-500 tracking-widest">Yield: 2 ATP total</span>
                </button>
             </div>
          </div>
        );

      case AppStage.LINK_REACTION:
        return <LinkReaction onComplete={() => setStage(AppStage.KREBS_CYCLE)} />;

      case AppStage.KREBS_CYCLE:
        return <KrebsCycle onComplete={() => { setGameState(prev => ({ ...prev, nadh: 10, fadh2: 2, atpMade: 4 })); setStage(AppStage.SUMMARY_KREBS); }} />;

      case AppStage.SUMMARY_KREBS:
        return <StageSummary 
          title="Krebs Cycle Harvest" subtitle="PHASE 2: Matrix" 
          yields={[
            { label: "NADH Carriers", value: 6, color: "text-blue-400" }, 
            { label: "FADH2 Carriers", value: 2, color: "text-emerald-400" },
            { label: "ATP Harvest", value: 2, color: "text-amber-400" }
          ]} 
          bioFact="We dismantle the carbon chains and release CO2 as waste. The main goal here is to load up electron carriers for the big finish." 
          realWorld="When you lose weight, you aren't 'sweating' it out. You are literally breathing out your breakfast as CO2 gas produced in this cycle!"
          icon="fa-recycle" onNext={() => setStage(AppStage.ETC)}
        />;

      case AppStage.ETC:
        return <ETCSimulator onComplete={(atp) => { setGameState(prev => ({ ...prev, atpMade: atp + 4 })); setStage(AppStage.SUMMARY_ETC); }} />;

      case AppStage.SUMMARY_ETC:
        return <StageSummary 
          title="Final ATP Harvest" subtitle="PHASE 3: Inner Membrane" 
          yields={[
            { label: "Oxidative ATP", value: 28, color: "text-amber-400" }, 
            { label: "Water Molecules", value: 6, color: "text-sky-400" },
            { label: "Net Total ATP", value: 32, color: "text-white" }
          ]} 
          bioFact="Electrons power pumps that create a 'waterfall' of protons, which then spins a turbine called ATP Synthase to generate massive energy." 
          realWorld="This is the whole reason you breathe! Oxygen is the 'drain' at the end that catches electrons. Without it, the energy factory stops in seconds."
          icon="fa-bolt" onNext={() => setStage(AppStage.GLOBAL_SUMMARY)}
        />;

      case AppStage.ANAEROBIC:
        return <Fermentation onComplete={() => { setGameState(prev => ({ ...prev, atpMade: 2 })); setStage(AppStage.SUMMARY_FERMENTATION); }} />;

      case AppStage.SUMMARY_FERMENTATION:
        return <StageSummary 
          title="Survival Shift" subtitle="ANAEROBIC: Emergency" 
          yields={[
            { label: "Net ATP Yield", value: 2, color: "text-amber-400" }, 
            { label: "Lactic Acid", value: 2, color: "text-rose-500" },
            { label: "NAD+ Refreshed", value: 2, color: "text-sky-400" }
          ]} 
          bioFact="When oxygen is missing, the mitochondria shuts down. We produce lactic acid just to recycle our carriers and keep glycolysis alive for a little longer." 
          realWorld="Ever been out of breath after a sprint and felt your legs go 'numb'? That's your cells frantically performing this emergency backup plan."
          icon="fa-running" onNext={() => setStage(AppStage.GLOBAL_SUMMARY)}
        />;

      case AppStage.GLOBAL_SUMMARY:
        return <GlobalSummary state={gameState} onContinue={() => setStage(AppStage.QUIZ)} onBackHome={resetGame} />;

      case AppStage.QUIZ:
        return <div className="stage-container"><Quiz onComplete={() => setStage(AppStage.CERTIFICATE)} /></div>;

      case AppStage.CERTIFICATE:
        return (
          <div className="stage-container items-center justify-center text-center space-y-12">
             <i className="fas fa-medal text-amber-500 text-[14rem] animate-bounce"></i>
             <h2 className="text-hero text-white leading-none">ENERGY MASTER</h2>
             <p className="text-4xl text-slate-400 italic font-light max-w-4xl mx-auto">You've mastered the journey of life! From one molecule of sugar, you've extracted the power to think, move, and exist. Mission complete.</p>
             <button onClick={resetGame} className="px-32 py-10 bg-white text-black font-black text-3xl rounded-[2.5rem] btn-neural shadow-4xl uppercase tracking-widest">RESTART QUEST</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 h-28 bg-black/95 border-b border-white/10 px-10 flex items-center justify-between backdrop-blur-3xl shadow-2xl">
        <div className="flex items-center gap-6 cursor-pointer" onClick={resetGame}>
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg"><i className="fas fa-dna text-black text-2xl"></i></div>
          <span className="hidden sm:block text-3xl font-black italic uppercase tracking-tighter">ATP QUEST</span>
        </div>

        <div className="hidden lg:flex items-center gap-6">
           {['GLYCOLYSIS', 'LINK', 'KREBS', 'ETC', 'FERMENTATION'].map(topic => (
              <button key={topic} onClick={() => openLearn(topic)} className="px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all text-slate-400 hover:text-white">
                 {topic} INFO
              </button>
           ))}
        </div>

        <div className="flex items-center gap-6">
           <button onClick={() => setStage(AppStage.CO_PILOT)} className={`px-12 py-6 bg-blue-600 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all shadow-xl ${stage === AppStage.CO_PILOT ? 'bg-white text-black' : 'text-white'}`}>
              <i className="fas fa-chalkboard-teacher text-lg mr-3"></i> TALK TO MR. CROSS
           </button>
        </div>
      </nav>
      <main className="pt-28 flex-grow">{renderStage()}</main>
    </div>
  );
};

export default App;