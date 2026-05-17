import React from 'react';
import { Search, Heart, MessageSquare, User, Shield } from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function BottomNav({ activeView, setActiveView }: BottomNavProps) {
  const navItems = [
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'likes', icon: Heart, label: 'Likes' },
    { id: 'messages', icon: MessageSquare, label: 'Chat' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-emerald-900/10 px-4 pb-6 pt-3 md:pb-3">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-emerald-900' : 'text-emerald-900/40'}`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-emerald-900/5' : ''}`}>
                <Icon size={24} className={isActive ? 'fill-gold-500 text-emerald-900' : ''} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
