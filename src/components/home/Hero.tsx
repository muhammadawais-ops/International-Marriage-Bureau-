import { motion } from 'motion/react';
import { Search, Filter, ShieldCheck, UserCheck, HeartHandshake } from 'lucide-react';
import { useState } from 'react';

export default function Hero({ onStart }: { onStart: () => void }) {
  const [selectedGender, setSelectedGender] = useState<'Male' | 'Female'>('Female');

  return (
    <section className="relative pt-32 pb-40 overflow-hidden bg-emerald-900">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 islamic-pattern" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-emerald-950 rounded-t-[100px] z-10" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            Pakistan's Most Trusted Marriage Service
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight mb-8 md:mb-12 italic">
            Connecting Hearts for <br className="hidden md:block" />
            <span className="text-gold-500 not-italic">Eternal Marriage Journey</span>
          </h1>

          {/* Zameen-Style Toggle & Search */}
          <div className="max-w-2xl mx-auto mt-8 md:mt-12 bg-white p-1.5 md:p-2 rounded-[30px] md:rounded-[40px] shadow-2xl flex flex-col items-center">
             <div className="w-full flex p-1 bg-gray-100 rounded-[25px] md:rounded-[35px] mb-2">
                {(['Male', 'Female'] as const).map(gender => (
                  <button
                    key={gender}
                    onClick={() => setSelectedGender(gender)}
                    className={`flex-1 py-3 md:py-4 rounded-[20px] md:rounded-[30px] text-base md:text-lg font-black transition-all ${
                      selectedGender === gender 
                      ? 'bg-emerald-900 text-gold-500 shadow-xl' 
                      : 'text-gray-400 hover:text-emerald-900'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
             </div>
             
             <div className="w-full relative flex items-center p-1 md:p-2">
                <Search className="absolute left-5 md:left-6 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="City, Caste or Profession..."
                  className="w-full pl-12 md:pl-16 pr-12 md:pr-4 py-4 md:py-6 rounded-[25px] md:rounded-[35px] bg-white outline-none text-emerald-950 text-base md:text-xl font-medium placeholder:text-gray-300"
                />
                <button 
                  onClick={() => {
                    const el = document.getElementById('discovery-feed');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="absolute right-2 md:right-4 w-10 h-10 md:w-14 md:h-14 bg-gold-500 rounded-full flex items-center justify-center text-emerald-950 hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <Search size={20} strokeWidth={3} className="md:w-6 md:h-6" />
                </button>
             </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={onStart}
              className="px-8 py-5 bg-gold-500 text-emerald-950 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-gold-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              Submit Your Proposal
            </button>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto pt-8 md:pt-10 border-t border-white/10">
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <ShieldCheck className="text-gold-500 w-6 h-6 md:w-8 md:h-8" />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-white">Privacy First</span>
              </div>
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <UserCheck className="text-gold-500 w-6 h-6 md:w-8 md:h-8" />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-white">ID Verified</span>
              </div>
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <HeartHandshake className="text-gold-500 w-6 h-6 md:w-8 md:h-8" />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-white">No Dating</span>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
