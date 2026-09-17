import React, { useState, useRef, useEffect } from 'react';
import { askBiologyTutor } from '../services/geminiService';

interface BiologyTutorProps {
  currentStage: string;
  onBack: () => void;
}

export const BiologyTutor: React.FC<BiologyTutorProps> = ({ currentStage, onBack }) => {
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState<{ q: string; a: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    const q = question;
    setQuestion('');
    setLoading(true);
    try {
      const res = await askBiologyTutor(q, currentStage);
      setChat(prev => [...prev, { q, a: res }]);
    } catch (err) {
      setChat(prev => [...prev, { q, a: "Something went wrong with the cellular link. Ask me again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stage-container flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto h-full min-h-[70vh]">
      {/* HUD Info */}
      <div className="lg:w-1/4 space-y-6 shrink-0 flex flex-col">
         <div className="header-wrap lg:text-left lg:px-0"><h2 className="text-hero text-white leading-none">MR. CROSS</h2></div>
         <div className="glass-panel p-8 rounded-[2.5rem] border-blue-500/20 space-y-6 flex-grow-0">
            <div className="bg-blue-500/10 p-5 rounded-xl border-l-4 border-blue-500 text-xs">
               "Hey! I'm Mr. Cross. We're looking at <strong>{currentStage}</strong> right now. What's on your mind? No such thing as a bad question here."
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black text-center">Class Status: In Session</p>
            <button onClick={onBack} className="w-full py-5 glass-panel border-white/20 text-white font-black rounded-xl btn-neural text-xs tracking-widest hover:bg-white/5 transition-all">EXIT CLASS</button>
         </div>
      </div>

      {/* Main Chat Terminal */}
      <div className="flex-1 flex flex-col glass-panel rounded-[3rem] border-white/5 overflow-hidden shadow-4xl relative min-h-[500px]">
          <div className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth" ref={scrollRef}>
             <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"><i className="fas fa-chalkboard-teacher text-white"></i></div>
                <div className="bg-white/[0.03] p-7 rounded-3xl rounded-tl-none border border-white/10 max-w-[85%] shadow-xl">
                   <p className="text-xl text-slate-300 font-light italic leading-relaxed">"Hi there! I'm your virtual teacher, Mr. Cross. If you're confused about how ATP is made or why we need oxygen, just ask away."</p>
                </div>
             </div>

             {chat.map((m, i) => (
                <React.Fragment key={i}>
                   <div className="flex gap-4 items-start justify-end">
                      <div className="bg-blue-600/40 border border-blue-500/40 p-7 rounded-3xl rounded-tr-none max-w-[85%] shadow-md">
                         <p className="text-xl text-white font-bold">{m.q}</p>
                      </div>
                   </div>
                   <div className="flex gap-4 items-start">
                      <div className="w-14 h-14 bg-amber-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"><i className="fas fa-bolt text-white"></i></div>
                      <div className="bg-white/[0.03] p-8 rounded-3xl rounded-tl-none border border-white/10 max-w-[85%] shadow-2xl">
                         <p className="text-2xl text-slate-200 font-light italic leading-relaxed">{m.a}</p>
                      </div>
                   </div>
                </React.Fragment>
             ))}

             {loading && (
                <div className="flex gap-4 items-center text-blue-400 animate-pulse py-4">
                   <i className="fas fa-book-reader fa-spin text-3xl"></i>
                   <span className="text-sm font-black tracking-widest uppercase">Checking the textbook...</span>
                </div>
             )}
          </div>

          {/* Fixed Bottom Input */}
          <form onSubmit={handleSubmit} className="p-8 bg-black/60 border-t border-white/10 flex gap-4 shrink-0">
             <input 
                type="text" value={question} onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask Mr. Cross a question..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-10 py-6 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-800"
             />
             <button disabled={loading} className="px-14 py-6 bg-white text-black font-black text-xl rounded-2xl btn-neural disabled:opacity-50">ASK</button>
          </form>
      </div>
    </div>
  );
};