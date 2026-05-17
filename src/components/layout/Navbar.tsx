import { motion } from 'motion/react';
import { Heart, Shield, Users, MessageSquare, Star, Home } from 'lucide-react';
import { COLORS } from '../../constants';

export default function Navbar({ onStart, isAdmin, setActiveView }: { onStart: () => void, isAdmin: boolean, setActiveView: (view: string) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('home')}>
          <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
            <Heart className="text-emerald-950 fill-emerald-950" size={24} />
          </div>
          <span className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight">
            International<span className="text-gold-500"> Marriage Bureau VHR</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold"
          >
            <Home size={16} /> Home
          </button>
          <button 
            onClick={() => setActiveView('stories')}
            className="hover:text-white transition-colors uppercase tracking-[0.2em] font-bold"
          >
            Success Stories
          </button>
          {isAdmin && (
            <button 
              onClick={() => setActiveView('admin')}
              className="flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-all font-bold"
            >
              <Shield size={18} /> Admin Panel
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onStart}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-all font-sans"
          >
            Login
          </button>
          <button 
            onClick={onStart}
            className="px-6 py-2.5 rounded-full bg-gold-500 text-emerald-950 text-sm font-semibold shadow-lg shadow-gold-500/20 hover:scale-105 active:scale-95 transition-all font-sans"
          >
            Create Your Proposal
          </button>
        </div>
      </div>
    </nav>
  );
}
