import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, CreditCard, CheckCircle, XCircle, Search, Filter, Shield, Eye, Trash2, ArrowLeft, Phone, Share2, Image as ImageIcon } from 'lucide-react';
import { ADMIN_EMAILS, ADMIN_PASSWORD } from '../../constants';

// Mock data as simulated from database
const MOCK_USERS_DATA = [
  { id: '1', fullName: 'Zoya Ahmed', email: 'zoya@example.com', gender: 'Female', city: 'Lahore', isPaymentVerified: true, createdAt: '2023-10-25' },
  { id: '2', fullName: 'Sara Khan', email: 'sara@example.com', gender: 'Female', city: 'London', isPaymentVerified: false, createdAt: '2023-10-26' },
  { id: '3', fullName: 'Ahmed Ali', email: 'ahmed@example.com', gender: 'Male', city: 'Islamabad', isPaymentVerified: true, createdAt: '2023-10-27' },
  { id: '4', fullName: 'Fatima Zahra', email: 'fatima@example.com', gender: 'Female', city: 'Karachi', isPaymentVerified: false, createdAt: '2023-10-28' },
];

export default function AdminPanel({ onBack }: { onBack: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [users, setUsers] = useState(MOCK_USERS_DATA);
  const [pendingProposals, setPendingProposals] = useState<any[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem('pendingProposals') || '[]');
    setPendingProposals(pending);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ADMIN_EMAILS.includes(email) && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials or unauthorized email.');
    }
  };

  const togglePaymentStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, isPaymentVerified: !u.isPaymentVerified } : u));
  };

  const pushToHome = (proposal: any) => {
    // 1. Mark as live
    const approvedProposal = { ...proposal, status: 'live' };

    // 2. Add to approved list
    const existingApproved = JSON.parse(localStorage.getItem('approvedProposals') || '[]');
    localStorage.setItem('approvedProposals', JSON.stringify([...existingApproved, approvedProposal]));

    // 3. Remove from pending
    const newPending = pendingProposals.filter(p => p.id !== proposal.id);
    setPendingProposals(newPending);
    localStorage.setItem('pendingProposals', JSON.stringify(newPending));
    
    setSelectedProposal(null);
    alert("Proposal Pushed to Home Page!");
  };

  const deletePending = (id: string) => {
    const newPending = pendingProposals.filter(p => p.id !== id);
    setPendingProposals(newPending);
    localStorage.setItem('pendingProposals', JSON.stringify(newPending));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 p-10 rounded-[40px] shadow-2xl border border-white/10 text-center backdrop-blur-xl"
        >
          <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gold-500/20">
             <Shield className="text-emerald-950" size={32} />
          </div>
          <h2 className="text-3xl font-serif text-white mb-2 italic">Admin Access</h2>
          <p className="text-white/40 text-sm mb-8 font-medium uppercase tracking-[0.2em]">Authorized Personnel Only</p>
          
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Email Address</label>
              <input 
                type="email" 
                className="w-full p-4 rounded-xl border border-white/10 bg-white/5 focus:border-gold-500 outline-none text-white text-sm" 
                placeholder="admin@nikahconnect.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Password</label>
              <input 
                type="password" 
                className="w-full p-4 rounded-xl border border-white/10 bg-white/5 focus:border-gold-500 outline-none text-white text-sm" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-400 text-xs font-bold">{error}</p>}
            <button className="w-full py-4 bg-gold-500 text-emerald-950 rounded-xl font-bold shadow-xl shadow-gold-500/10 active:scale-95 transition-all text-sm uppercase tracking-widest outline-none">
              Login to Console
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 hover:text-gold-500 hover:bg-white/10 transition-all border border-white/5"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-4xl font-serif text-white italic">Command Center</h1>
              <p className="text-gold-500/60 text-xs font-bold uppercase tracking-[0.2em] mt-2">Managing the future of Nikkah</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl shadow-xl border border-white/10">
             <div className="bg-white/5 p-4 rounded-xl flex items-center gap-4">
                <Users className="text-gold-500" size={20} />
                <div>
                   <p className="text-[10px] uppercase font-bold text-white/40">Total Members</p>
                   <p className="text-lg font-bold text-white">{users.length}</p>
                </div>
             </div>
             <div className="bg-white/5 p-4 rounded-xl flex items-center gap-4 border border-white/5">
                <CreditCard className="text-gold-500" size={20} />
                <div>
                   <p className="text-[10px] uppercase font-bold text-white/40">Pending Approval</p>
                   <p className="text-lg font-bold text-white">{pendingProposals.length}</p>
                </div>
             </div>
          </div>
        </header>

        <div className="space-y-12">
          {/* Real Pending Proposals */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-white italic flex items-center gap-3">
              <Shield className="text-gold-500" size={24} /> 
              Pending Approvals 
              <span className="text-xs bg-gold-500 text-emerald-950 px-3 py-1 rounded-full font-bold ml-2">New</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {pendingProposals.length === 0 ? (
                 <div className="col-span-full py-20 text-center bg-white/5 rounded-[40px] border border-white/5">
                    <p className="text-white/20 font-bold uppercase tracking-widest text-sm">No pending proposals yet</p>
                 </div>
               ) : (
                 pendingProposals.map((prop) => (
                   <motion.div 
                    layoutId={prop.id}
                    key={prop.id} 
                    className="glass border border-white/10 rounded-[32px] overflow-hidden group hover:border-gold-500/50 transition-all"
                   >
                     <div className="aspect-[4/3] relative">
                        <img src={prop.photos[0]} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                           <span className="bg-emerald-950/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                              {prop.gender}
                           </span>
                           <span className="bg-emerald-950/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-gold-500 uppercase tracking-widest border border-white/10">
                              {prop.maritalStatus}
                           </span>
                           {prop.paymentScreenshot && (
                             <span className="bg-emerald-950/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/30 flex items-center gap-1">
                               <ImageIcon size={10} /> Paid
                             </span>
                           )}
                        </div>
                     </div>
                     <div className="p-6 space-y-4">
                        <div>
                           <h4 className="text-white font-bold text-xl">{prop.fullName}</h4>
                           <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em]">{prop.currentCity}, {prop.age} Years</p>
                        </div>

                        <div className="flex items-center justify-between text-xs font-bold text-white/60 pt-4 border-t border-white/5">
                           <div className="flex items-center gap-2">
                             <Phone size={14} className="text-gold-500" />
                             {prop.phone}
                           </div>
                           {prop.paymentScreenshot && (
                             <div 
                               className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 cursor-pointer hover:scale-110 transition-transform"
                               onClick={() => setSelectedProposal(prop)}
                             >
                                <img src={prop.paymentScreenshot} className="w-full h-full object-cover" />
                             </div>
                           )}
                           <button 
                             onClick={() => setSelectedProposal(prop)}
                             className="text-gold-500 hover:underline"
                           >
                              View Details
                           </button>
                        </div>
                        
                        <button 
                          onClick={() => pushToHome(prop)}
                          className="w-full py-3 bg-gold-500 text-emerald-950 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-gold-500/10 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          Push to Home
                        </button>
                     </div>
                   </motion.div>
                 ))
               )}
            </div>
          </div>

          <div className="bg-white/5 rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-8 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input 
                type="text" 
                placeholder="Search candidates..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:border-gold-500 outline-none text-white text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">Member Details</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">Location</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">Gender</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono">Payment Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.filter(u => u.fullName.toLowerCase().includes(search.toLowerCase())).map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-bold text-gold-500 border border-white/10">
                          {user.fullName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-white tracking-tight">{user.fullName}</p>
                          <p className="text-xs text-white/40 font-mono">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm text-white/60 font-medium">{user.city}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${user.gender === 'Male' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-pink-500/10 text-pink-400 border border-pink-500/20'}`}>
                        {user.gender}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {user.isPaymentVerified ? (
                          <div className="flex items-center gap-2 text-green-400 font-bold text-[10px] uppercase tracking-widest bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                            <CheckCircle size={14} /> Verified Member
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-amber-400 font-bold text-[10px] uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                            <XCircle size={14} /> Pending Payment
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => togglePaymentStatus(user.id)}
                          className={`p-2 rounded-lg transition-all ${user.isPaymentVerified ? 'text-red-400 hover:bg-red-500/10' : 'text-green-400 hover:bg-green-500/10'}`}
                          title={user.isPaymentVerified ? 'Revoke Payment' : 'Verify Payment'}
                        >
                          <CreditCard size={18} />
                        </button>
                        <button className="p-2 text-white/20 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Proposal Details Modal */}
      <AnimatePresence>
        {selectedProposal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xl" 
              onClick={() => setSelectedProposal(null)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-emerald-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
            >
               {/* Left: Metadata & Screenshot */}
               <div className="md:w-1/3 bg-black/20 p-8 overflow-y-auto space-y-8">
                  <div className="text-center">
                     <span className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.3em] block mb-4">Payment Verification</span>
                     {selectedProposal.paymentScreenshot ? (
                       <div className="relative group rounded-3xl overflow-hidden border border-white/10">
                          <img src={selectedProposal.paymentScreenshot} className="w-full h-auto" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Eye className="text-white" />
                          </div>
                       </div>
                     ) : (
                       <div className="aspect-[3/4] bg-white/5 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-white/10 text-white/20">
                          <ImageIcon size={40} className="mb-4" />
                          <p className="text-xs font-bold uppercase tracking-widest">No Screenshot</p>
                       </div>
                     )}
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Primary Details</h4>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <p className="text-[10px] text-white/40 uppercase">Gender</p>
                           <p className="text-white font-medium">{selectedProposal.gender}</p>
                        </div>
                         <div>
                           <p className="text-[10px] text-white/40 uppercase">Age</p>
                           <p className="text-white font-medium">{selectedProposal.age}</p>
                        </div>
                        <div className="col-span-2">
                           <p className="text-[10px] text-white/40 uppercase">WhatsApp</p>
                           <p className="text-gold-500 font-bold">{selectedProposal.whatsapp}</p>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={() => deletePending(selectedProposal.id)}
                    className="w-full py-4 bg-red-500/10 text-red-400 rounded-2xl font-bold text-xs uppercase tracking-widest border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                  >
                    Reject Proposal
                  </button>
               </div>

               {/* Right: Full Form Data */}
               <div className="md:w-2/3 p-10 overflow-y-auto bg-emerald-950">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-3xl font-serif text-white italic">Full Proposal Details</h3>
                     <button onClick={() => setSelectedProposal(null)} className="text-white/20 hover:text-white"><XCircle /></button>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                     {Object.entries(selectedProposal).map(([key, value]: [string, any]) => {
                        if (['photos', 'paymentScreenshot', 'id', 'status', 'isWitness', 'intentAccepted'].includes(key)) return null;
                        return (
                          <div key={key} className="border-b border-white/5 pb-2">
                             <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                             <p className="text-white font-medium">{value?.toString() || '—'}</p>
                          </div>
                        );
                     })}
                  </div>

                  <div className="mt-12 flex gap-4">
                     <button 
                       onClick={() => pushToHome(selectedProposal)}
                       className="flex-1 py-4 bg-gold-500 text-emerald-950 rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-gold-500/10 hover:scale-[1.02] active:scale-95 transition-all outline-none"
                     >
                       Approve & Push to Home
                     </button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  </div>
  );
}
