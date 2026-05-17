import { motion } from 'motion/react';
import { Heart, Shield, Users, MessageSquare, Star, Home } from 'lucide-react';
import { COLORS } from '../../constants';

export default function Navbar({ 
  onStart, 
  onAuth, 
  user, 
  onLogout, 
  isAdmin, 
  setActiveView 
}: { 
  onStart: () => void, 
  onAuth: () => void, 
  user: any, 
  onLogout: () => void, 
  isAdmin: boolean, 
  setActiveView: (view: string) => void 
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-1.5 md:px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-1.5 md:gap-2 cursor-pointer" onClick={() => setActiveView('home')}>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gold-500 rounded-lg flex items-center justify-center shrink-0">
            <Heart className="text-emerald-950 fill-emerald-950 w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-sm md:text-2xl font-serif font-bold text-white tracking-tight leading-tight">
            <span className="hidden xs:inline">International</span><span className="text-gold-500"> Marriage Bureau</span>
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
        
        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <button 
              onClick={onLogout}
              className="hidden sm:block px-6 py-2.5 rounded-full border border-red-500/20 text-red-400 text-xs md:text-sm font-semibold hover:bg-red-500/10 transition-all font-sans whitespace-nowrap"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={onAuth}
              className="hidden sm:block px-6 py-2.5 rounded-full border border-white/20 text-white text-xs md:text-sm font-semibold hover:bg-white/10 transition-all font-sans whitespace-nowrap"
            >
              Login
            </button>
          )}
          <button 
            onClick={onStart}
            className="px-4 md:px-6 py-2.5 rounded-full bg-gold-500 text-emerald-950 text-[10px] md:text-sm font-black md:font-semibold shadow-lg shadow-gold-500/20 hover:scale-105 active:scale-95 transition-all font-sans uppercase tracking-[0.1em] md:normal-case md:tracking-normal whitespace-nowrap"
          >
            Submit Your Proposal
          </button>
        </div>
      </div>
    </nav>
  );
}
