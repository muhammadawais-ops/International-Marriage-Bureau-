import React from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, Lock, MessageSquare, AlertCircle, PhoneIncoming } from 'lucide-react';

export default function WaliDashboard() {
  return (
    <div className="min-h-screen bg-off-white pt-32 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-emerald-900 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="text-gold-500" size={24} />
              </div>
              <h1 className="text-4xl font-serif text-emerald-900 italic">Wali Guardian Panel</h1>
            </div>
            <p className="text-emerald-900/50">Protecting and guiding <span className="text-emerald-900 font-bold">Fatima Ahmed's</span> journey.</p>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-red-900 text-white rounded-full font-bold text-sm shadow-lg hover:bg-red-800 transition-all flex items-center gap-2">
              <Lock size={16} /> Emergency Pause
            </button>
            <button className="px-6 py-3 bg-emerald-900 text-white rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2">
              <PhoneIncoming size={16} /> Contact Support
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Matches Queue */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-serif font-bold text-emerald-900 flex items-center gap-2">
              <Eye className="text-gold-600" size={20} />
              Recent Match Requests
            </h2>
            
            {[1, 2].map(i => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-900/5 flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={`https://i.pravatar.cc/200?u=${i + 10}`} alt="suitor" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-emerald-900">Omar Khalid, 28</h3>
                  <p className="text-sm text-emerald-900/50 mb-3">Civil Engineer • Karachi • Sunni</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-emerald-900/5 rounded-full text-[10px] font-bold uppercase text-emerald-900">ID Verified</span>
                    <span className="px-3 py-1 bg-blue-500/5 rounded-full text-[10px] font-bold uppercase text-blue-700">Career Verified</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2 rounded-full border border-red-200 text-red-500 font-bold text-xs uppercase hover:bg-red-50 transition-all">Decline</button>
                  <button className="px-6 py-2 rounded-full bg-emerald-900 text-gold-500 font-bold text-xs uppercase shadow-lg hover:scale-105 transition-all">Approve</button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat Insights / Sidebar */}
          <div className="space-y-8">
            <div className="bg-emerald-900 p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 islamic-pattern" />
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-4 italic">Guardian Insights</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10 text-sm">
                    <span className="text-white/60">Active Chats</span>
                    <span className="font-bold">3 / 5</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10 text-sm">
                    <span className="text-white/60">Matches Approved</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10 text-sm">
                    <span className="text-white/60">Protection Level</span>
                    <span className="text-gold-500 font-bold">MAXIMUM</span>
                  </div>
                </div>
                <button className="w-full mt-8 py-3 bg-gold-500 text-emerald-900 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-all">
                  Request Chat Audit
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-900/5">
              <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <AlertCircle size={18} className="text-gold-600" />
                Community Safety Guide
              </h4>
              <p className="text-xs text-emerald-900/70 leading-relaxed">
                As a Wali, you have the right to intervene at any point. Always look for consistency in profiles and behavior. 
                Reports from your dashboard are prioritized by our human moderation team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
