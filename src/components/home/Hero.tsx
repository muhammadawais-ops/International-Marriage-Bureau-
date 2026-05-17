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
          
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-12 italic">
            Connecting Hearts for <br />
            <span className="text-gold-500 not-italic">Eternal Marriage Journey</span>
          </h1>

          {/* Zameen-Style Toggle & Search */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-2 rounded-[40px] shadow-2xl flex flex-col items-center">
             <div className="w-full flex p-1 bg-gray-100 rounded-[35px] mb-2">
                {(['Male', 'Female'] as const).map(gender => (
                  <button
                    key={gender}
                    onClick={() => setSelectedGender(gender)}
                    className={`flex-1 py-4 rounded-[30px] text-lg font-black transition-all ${
                      selectedGender === gender 
                      ? 'bg-emerald-900 text-gold-500 shadow-xl' 
                      : 'text-gray-400 hover:text-emerald-900'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
             </div>
             
             <div className="w-full relative flex items-center p-2">
                <Search className="absolute left-6 text-gray-400" size={24} />
                <input 
                  type="text"
                  placeholder="Search by city, caste or profession..."
                  className="w-full pl-16 pr-4 py-6 rounded-[35px] bg-white outline-none text-emerald-950 text-xl font-medium placeholder:text-gray-300"
                />
                <button 
                  onClick={() => {
                    const el = document.getElementById('discovery-feed');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="absolute right-4 w-14 h-14 bg-gold-500 rounded-full flex items-center justify-center text-emerald-950 hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <Search size={24} strokeWidth={3} />
                </button>
             </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-10 border-t border-white/10">
              <div className="flex flex-col items-center gap-3">
                <ShieldCheck className="text-gold-500" size={32} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Privacy First</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <UserCheck className="text-gold-500" size={32} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">ID Verified</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <HeartHandshake className="text-gold-500" size={32} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">No Dating</span>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
