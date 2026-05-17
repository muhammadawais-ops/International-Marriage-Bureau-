import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Heart, ChevronRight } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Logic for login
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        onLoginSuccess(user);
        onClose();
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Logic for signup
      if (!fullName || !email || !password) {
        setError('All fields are required');
        return;
      }

      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      if (users.find((u: any) => u.email === email)) {
        setError('Email already registered');
        return;
      }

      const newUser = {
        id: `user_${Date.now()}`,
        fullName,
        email,
        password, // In real app, never store plain text passwords
        createdAt: new Date().toISOString().split('T')[0],
        gender: 'Not specified',
        city: 'Not specified',
        isPaymentVerified: false
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      onLoginSuccess(newUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-emerald-950/80 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-emerald-900 rounded-[40px] shadow-2xl overflow-hidden border border-white/10"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 islamic-pattern pointer-events-none" />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-50 cursor-pointer p-2"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12 relative z-10">
          <div className="flex flex-col items-center mb-10">
             <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-gold-500/20">
                <Heart className="text-emerald-950 fill-emerald-950" size={32} />
             </div>
             <h2 className="text-3xl font-serif text-white italic">
               {isLogin ? 'Welcome Back' : 'Join Our Community'}
             </h2>
             <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
               {isLogin ? 'Continue your marriage journey' : 'Start your search for a life partner'}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500/50 transition-all"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold-500" size={20} />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500/50 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold-500" size={20} />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500/50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-bold uppercase tracking-wider text-center pt-2">
                {error}
              </p>
            )}

            <button 
              type="submit"
              className="w-full py-5 bg-gold-500 text-emerald-950 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-gold-500/10 hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
            >
              {isLogin ? 'Login' : 'Create Account'}
              <ChevronRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/40 hover:text-gold-500 text-sm font-medium transition-all"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
