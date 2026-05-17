/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import SuccessStories from './components/home/SuccessStories';
import OnboardingWizard from './components/onboarding/OnboardingWizard';
import DiscoveryFeed from './components/home/DiscoveryFeed';
import AdminPanel from './components/dashboard/AdminPanel';
import PremiumScreen from './components/premium/PremiumScreen';
import BottomNav from './components/layout/BottomNav';
import { Heart, Shield } from 'lucide-react';
import { ADMIN_EMAILS } from './constants';

export default function App() {
  const [showWizard, setShowWizard] = useState(false);
  const [activeView, setActiveView] = useState('home');
  
  // In a real app, this would come from auth state
  const currentUserEmail = "muhammadawais@carpediem.company"; 
  const isAdmin = ADMIN_EMAILS.includes(currentUserEmail);

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <div key="home-view">
            <Hero onStart={() => setShowWizard(true)} />
            <DiscoveryFeed key={`feed-home-${activeView}`} />
            <SuccessStories />
          </div>
        );
      case 'discover':
        return <DiscoveryFeed key={`feed-discover-${activeView}`} />;
      case 'stories':
        return (
          <div className="pt-24 min-h-screen">
             <SuccessStories onBack={() => setActiveView('home')} />
          </div>
        );
      case 'admin':
        return <AdminPanel onBack={() => setActiveView('home')} />;
      case 'messages':
        return (
          <div className="min-h-screen flex items-center justify-center pt-20 islamic-pattern px-4">
            <div className="text-center p-12 glass rounded-[40px] max-w-md border border-emerald-900/10">
              <div className="w-20 h-20 bg-emerald-900/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-emerald-900/20" size={40} />
              </div>
              <h3 className="text-3xl font-serif text-white mb-4">No Matches Yet</h3>
              <p className="text-white/50 leading-relaxed">Start discovering and liking profiles to find your future partner and unlock the chat system.</p>
              <button 
                onClick={() => setActiveView('discover')}
                className="mt-8 px-8 py-3 bg-emerald-900 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-all"
              >
                Find Matches
              </button>
            </div>
          </div>
        );
      case 'profile':
      case 'likes':
        return <PremiumScreen />;
      default:
        return <Hero onStart={() => setShowWizard(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-emerald-950 pb-24">
      {(activeView === 'home' || activeView === 'stories') && (
        <Navbar onStart={() => setShowWizard(true)} isAdmin={isAdmin} setActiveView={setActiveView} />
      )}
      
      <main>
        {renderContent()}
      </main>
      
      {showWizard && <OnboardingWizard onClose={() => setShowWizard(false)} />}
      
      {activeView !== 'home' && (
        <BottomNav activeView={activeView} setActiveView={setActiveView} />
      )}
      
      {activeView === 'home' && (
        <footer className="bg-emerald-900 text-off-white py-20 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-gold-500 rounded flex items-center justify-center">
                    <Heart className="text-emerald-900 fill-emerald-900" size={18} />
                  </div>
                  <span className="text-xl font-serif font-bold tracking-tight text-white">International Marriage Bureau VHR</span>
                </div>
                <p className="text-off-white/60 max-w-sm mb-8">
                  Building the future of international matrimonial connections. Trust, privacy, and family at the heart of every match.
                </p>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-6 text-gold-500">Platform</h4>
              <ul className="space-y-4 text-off-white/50 text-sm font-medium tracking-wider">
                <li><button onClick={() => setActiveView('stories')} className="hover:text-gold-500 transition-colors">Success Stories</button></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-6 text-gold-500">Legal</h4>
              <ul className="space-y-4 text-off-white/50 text-sm font-medium tracking-wider">
                <li><a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Islamic Guidelines</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-xs text-off-white/30 uppercase tracking-[0.2em]">
            &copy; 2026 International Marriage Bureau VHR. All Rights Reserved. Built for serious marriage seekers.
          </div>
        </footer>
      )}
    </div>
  );
}


