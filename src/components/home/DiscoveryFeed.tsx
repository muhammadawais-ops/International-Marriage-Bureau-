import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MapPin, Briefcase, GraduationCap, Star, Shield, Lock, CreditCard, ChevronDown, Globe, User } from 'lucide-react';
import { PROPOSALS } from '../../data/proposals';
import { SECTS, CASTES } from '../../constants';

export default function DiscoveryFeed() {
  const [selectedGender, setSelectedGender] = useState<'Male' | 'Female'>('Female');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [allProposals, setAllProposals] = useState<any[]>(PROPOSALS);
  const [filters, setFilters] = useState({
minAge: '',
maxAge: '',
city: '',
country: '',
sect: 'Any',
manualSect: '',
caste: 'Any',
manualCaste: '',
religion: 'Muslim'
  });

  useEffect(() => {
    const loadApproved = () => {
      // Load approved proposals from localStorage
      const approved = JSON.parse(localStorage.getItem('approvedProposals') || '[]');
      const hiddenStatic = JSON.parse(localStorage.getItem('hiddenStaticIds') || '[]');

      // Transform them to match the expected structure
      const transformed = approved.map((p: any) => ({
        id: p.id || `apprv_${Math.random()}`,
        fullName: p.fullName || 'Member',
        age: parseInt(p.age?.toString()) || 25,
        gender: p.gender || 'Female',
        profession: p.jobPosition || p.profession || 'Professional',
        city: p.currentCity || p.city || 'Pakistan',
        country: p.homeTown || p.country || 'Pakistan',
        sect: p.sect || 'Any',
        caste: p.caste || p.caste || 'Any',
        religion: p.religion || 'Muslim',
        isVerified: true,
        isNew: true,
        photos: (p.photos && p.photos.length > 0) ? p.photos : ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'],
        about: p.futurePlans || p.about || 'Serious marriage seeker.',
        expectations: p.otherDemands || p.expectations || 'No specific requirements.',
        education: p.qualification || p.education || 'Graduate',
        whatsapp: p.whatsapp || '',
        phone: p.phone || ''
      }));

      const visibleStatic = PROPOSALS.filter(p => !hiddenStatic.includes(p.id));
      setAllProposals([...transformed, ...visibleStatic]);
    };

    loadApproved();
    
    // Listen for storage changes
    window.addEventListener('storage', loadApproved);
    // Also listen for custom events if navigation happens in-app
    window.addEventListener('proposalsUpdated', loadApproved);
    
    return () => {
      window.removeEventListener('storage', loadApproved);
      window.removeEventListener('proposalsUpdated', loadApproved);
    };
  }, []);

  const filteredProfiles = allProposals.filter(p => {
    const matchesGender = p.gender === selectedGender;
    const matchesSearch = p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.caste && p.caste.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesAge = (!filters.minAge || p.age >= parseInt(filters.minAge)) && 
                       (!filters.maxAge || p.age <= parseInt(filters.maxAge));
    
    const matchesReligion = !filters.religion || p.religion === filters.religion;
    
    const effectiveSect = filters.sect === 'Other' ? filters.manualSect : filters.sect;
    const matchesSect = !effectiveSect || effectiveSect === 'Any' || p.sect.toLowerCase().includes(effectiveSect.toLowerCase());

    const effectiveCaste = filters.caste === 'Other' ? filters.manualCaste : filters.caste;
    const matchesCaste = !effectiveCaste || effectiveCaste === 'Any' || (p.caste && p.caste.toLowerCase().includes(effectiveCaste.toLowerCase()));

    const matchesCity = !filters.city || p.city.toLowerCase().includes(filters.city.toLowerCase());

    return matchesGender && matchesSearch && matchesAge && matchesReligion && matchesSect && matchesCaste && matchesCity;
  });

  return (
    <div id="discovery-feed" className="max-w-7xl mx-auto px-4 py-12">
      {/* Zameen-Style Header & Toggle */}
      <div className="flex flex-col items-center mb-20">
        <div className="w-full max-w-4xl bg-emerald-900 rounded-[30px] md:rounded-[40px] p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 islamic-pattern" />
          
          <div className="relative z-10 w-full">
            {/* Toggle Switch */}
            <div className="inline-flex w-full md:w-auto bg-white/10 p-1 rounded-full mb-8 md:mb-10 shadow-inner overflow-hidden">
              {(['Male', 'Female'] as const).map(gender => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`flex-1 md:px-12 py-3 rounded-full text-sm md:text-base font-bold transition-all ${
                    selectedGender === gender 
                    ? 'bg-white text-emerald-950 shadow-lg' 
                    : 'text-white/60 hover:text-white'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-950/40" size={24} />
                <input 
                  type="text"
                  placeholder="Search by Name, Caste, City..."
                  className="w-full pl-16 pr-6 py-6 rounded-[20px] bg-white outline-none text-emerald-950 text-lg font-medium placeholder:text-emerald-950/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gold-500 text-emerald-950 px-10 py-6 rounded-[20px] font-black text-lg hover:bg-gold-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-gold-500/20 active:scale-95"
              >
                <Filter size={24} /> Filters
              </button>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">Age Range</label>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          placeholder="Min" 
                          className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-gold-500"
                          value={filters.minAge}
                          onChange={(e) => setFilters({...filters, minAge: e.target.value})}
                        />
                        <input 
                          type="number" 
                          placeholder="Max" 
                          className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-gold-500"
                          value={filters.maxAge}
                          onChange={(e) => setFilters({...filters, maxAge: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">City</label>
                      <input 
                        type="text" 
                        placeholder="Lahore, Karachi..." 
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-gold-500"
                        value={filters.city}
                        onChange={(e) => setFilters({...filters, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">Sect</label>
                      <select 
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-gold-500 appearance-none"
                        value={filters.sect}
                        onChange={(e) => setFilters({...filters, sect: e.target.value})}
                      >
                        <option value="Any" className="bg-emerald-950">Any</option>
                        {SECTS.map(s => (
                          <option key={s} value={s} className="bg-emerald-950">{s}</option>
                        ))}
                      </select>
                      {filters.sect === 'Other' && (
                        <input 
                          type="text" 
                          placeholder="Type your sect..." 
                          className="w-full p-4 mt-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-gold-500"
                          value={filters.manualSect}
                          onChange={(e) => setFilters({...filters, manualSect: e.target.value})}
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">Caste</label>
                      <select 
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-gold-500 appearance-none"
                        value={filters.caste}
                        onChange={(e) => setFilters({...filters, caste: e.target.value})}
                      >
                        <option value="Any" className="bg-emerald-950">Any</option>
                        {CASTES.map(c => (
                          <option key={c} value={c} className="bg-emerald-950">{c}</option>
                        ))}
                      </select>
                      {filters.caste === 'Other' && (
                        <input 
                          type="text" 
                          placeholder="Type your caste..." 
                          className="w-full p-4 mt-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-gold-500"
                          value={filters.manualCaste}
                          onChange={(e) => setFilters({...filters, manualCaste: e.target.value})}
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">Country</label>
                      <input 
                        type="text" 
                        placeholder="Pakistan, UAE..." 
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-gold-500"
                        value={filters.country}
                        onChange={(e) => setFilters({...filters, country: e.target.value})}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif text-white italic">Available Proposals</h2>
          <p className="text-white/40 text-sm mt-1">{filteredProfiles.length} verified {selectedGender.toLowerCase()} candidates found</p>
        </div>
      </div>

      {/* Results Grid - Row of 3 on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProfiles.map((p) => (
          <motion.div 
            key={p.id}
            whileHover={{ y: -12 }}
            className="group cursor-pointer"
            onClick={() => setSelectedProfile(p)}
          >
            <div className="bg-white/5 rounded-[40px] overflow-hidden border border-white/5 shadow-2xl relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={p.photos[0]} 
                  alt={p.fullName} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-90" />
                
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {p.isVerified && (
                    <div className="w-10 h-10 bg-gold-500/90 backdrop-blur rounded-2xl flex items-center justify-center text-emerald-950 shadow-xl border border-white/20">
                      <Shield size={20} fill="currentColor" />
                    </div>
                  )}
                  {p.isNew && (
                    <div className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg border border-white/20">
                      Newly Added
                    </div>
                  )}
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-serif text-white mb-2 leading-tight">{p.fullName}, {p.age}</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-gold-500/80 text-sm font-bold uppercase tracking-widest">
                       <Briefcase size={14} />
                       {p.profession}
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <MapPin size={14} />
                      {p.city}, {p.country}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-2 text-white/40 text-xs">
                    <Star size={14} className="text-gold-500" />
                    {p.sect}
                 </div>
                 <div className="flex items-center gap-2 text-white/40 text-xs justify-end">
                    <Globe size={14} className="text-gold-500" />
                    {p.caste || 'Open Caste'}
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredProfiles.length === 0 && (
        <div className="py-20 text-center">
           <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-white/20" size={40} />
           </div>
           <h3 className="text-2xl font-serif text-white mb-2">No matching proposals found</h3>
           <p className="text-white/40">Try adjusting your filters or search keywords.</p>
        </div>
      )}

      {/* Unlock Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <UnlockModal 
            profile={selectedProfile} 
            onClose={() => setSelectedProfile(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function UnlockModal({ profile, onClose }: { profile: any, onClose: () => void }) {
  const [step, setStep] = useState<'info' | 'instructions' | 'payment_form' | 'account_details'>('info');
  const [paymentData, setPaymentData] = useState({ name: '', phone: '' });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xl pointer-events-auto" 
        onClick={onClose} 
      />
      <motion.div 
        layoutId={profile.id}
        className="relative w-full max-w-5xl bg-[#081a08] rounded-[30px] md:rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-0 md:min-h-[700px] z-[101] border border-white/10 max-h-[95vh] md:max-h-[90vh]"
      >
        <div className="md:w-5/12 bg-emerald-900 relative p-8 md:p-16 flex flex-col justify-end overflow-hidden shrink-0 h-48 md:h-auto">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 islamic-pattern" />
          <img 
            src={profile.photos[0]} 
            className="absolute inset-0 w-full h-full object-cover opacity-60" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-900 to-transparent" />
          
          <div className="relative z-10">
             <div className="w-12 md:w-16 h-1 md:h-1.5 bg-gold-500 mb-4 md:mb-8 rounded-full" />
             <h3 className="text-white text-3xl md:text-5xl font-serif leading-tight">{profile.fullName}, {profile.age}</h3>
             <p className="text-gold-500 font-bold text-[10px] md:text-sm uppercase tracking-[0.2em] mt-3 md:mt-6 flex items-center gap-2 md:gap-3">
               <MapPin size={16} className="md:w-5 md:h-5" />
               {profile.city}, {profile.country}
             </p>
          </div>
        </div>

        <div className="md:w-7/12 p-6 md:p-16 flex flex-col text-left overflow-y-auto">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12">
              <h4 className="text-3xl font-serif text-white italic">Detailed Proposal</h4>
              <button onClick={onClose} className="p-3 bg-white/5 rounded-full text-white/50 hover:text-white transition-colors">
                <ChevronDown size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <DetailItem icon={<Briefcase size={20} />} label="Profession" value={profile.profession} />
              <DetailItem icon={<GraduationCap size={20} />} label="Education" value={profile.education} />
              <DetailItem icon={<Star size={20} />} label="Sect / Maslak" value={profile.sect} />
              <DetailItem icon={<User size={20} />} label="Caste" value={profile.caste || 'N/A'} />
            </div>

            <div className="mt-12 space-y-8">
              <div>
                <h5 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-3">About Candidate</h5>
                <p className="text-white/60 leading-relaxed font-light italic">"{profile.about}"</p>
              </div>
              <div>
                <h5 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-3">Requirements</h5>
                <p className="text-white/60 leading-relaxed font-light italic">"{profile.expectations}"</p>
              </div>
            </div>

            <div className="mt-8 md:mt-16 p-6 md:p-10 bg-white/5 rounded-[30px] md:rounded-[40px] border border-white/10 space-y-6 md:space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xl md:text-2xl text-white">Contact Access</h5>
                  <p className="text-white/30 text-[10px] md:text-sm italic mt-1">Verified phone number and home address</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-500 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-950 shadow-xl shadow-gold-500/20">
                   <Lock size={20} className="md:w-6 md:h-6" />
                </div>
              </div>

              {step === 'info' && (
                <div className="space-y-6">
                  <div className="flex gap-3 text-gold-400 items-start">
                    <Shield size={20} className="mt-1" />
                    <p className="text-sm text-white/70 leading-relaxed">
                      To maintain the sanctity of marriage and protect our members, verified contact details are only available to high-intent seekers.
                    </p>
                  </div>
                  <button 
                    onClick={() => setStep('instructions')}
                    className="w-full py-5 bg-gold-500 text-emerald-950 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-gold-500/20 hover:scale-[1.02] active:scale-95 transition-all outline-none"
                  >
                    Unlock Official Contact
                  </button>
                </div>
              )}

              {step === 'instructions' && (
                <div className="space-y-6">
                  <div className="p-6 bg-gold-500/10 rounded-2xl border border-gold-500/20">
                    <p className="text-white/90 font-medium leading-relaxed">
                      Please pay your registration fee and send a screenshot to our official WhatsApp number for verification.
                    </p>
                  </div>
                  <button 
                    onClick={() => setStep('payment_form')}
                    className="w-full py-5 bg-gold-500 text-emerald-950 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-gold-500/20 hover:scale-[1.02] active:scale-95 transition-all outline-none"
                  >
                    Get Payment Account
                  </button>
                  <button onClick={() => setStep('info')} className="w-full text-xs font-bold text-white/20 uppercase tracking-widest hover:text-white transition-all">Back</button>
                </div>
              )}

              {step === 'payment_form' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1 block">Your Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your name"
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500"
                        value={paymentData.name}
                        onChange={e => setPaymentData({...paymentData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1 block">WhatsApp Number (to send screenshot from)</label>
                      <input 
                        type="text" 
                        placeholder="+92 3XX XXXXXXX"
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500"
                        value={paymentData.phone}
                        onChange={e => setPaymentData({...paymentData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    disabled={!paymentData.name || !paymentData.phone}
                    onClick={() => setStep('account_details')}
                    className="w-full py-5 bg-gold-500 text-emerald-950 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-gold-500/20 hover:scale-[1.02] active:scale-95 transition-all outline-none disabled:opacity-50"
                  >
                    Next: View Account Details
                  </button>
                  <button onClick={() => setStep('instructions')} className="w-full text-xs font-bold text-white/20 uppercase tracking-widest hover:text-white transition-all">Back</button>
                </div>
              )}

              {step === 'account_details' && (
                <div className="space-y-8 pt-6 border-t border-white/5">
                   <div className="grid gap-4">
                      <div className="p-8 bg-gold-500/10 rounded-3xl border border-gold-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                        <p className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2">Direct Local Payment</p>
                        <p className="text-4xl font-mono font-black text-white tracking-widest mb-4">03081168623</p>
                        <div className="flex items-center gap-2 px-3 py-1 bg-gold-500 text-emerald-950 rounded text-[10px] font-bold w-fit mb-4 uppercase">
                          JAZZCASH / EASYPAISA
                        </div>
                        <p className="text-xs italic text-white/40 leading-relaxed max-w-sm">
                          Send payment screenshot from <span className="text-gold-500 font-bold">{paymentData.phone}</span> to the above number on WhatsApp. 
                          Access granted within 2-4 hours.
                        </p>
                      </div>
                   </div>

                   <button 
                    onClick={() => setStep('info')}
                    className="text-xs text-center w-full font-bold text-white/20 uppercase tracking-[0.3em] hover:text-gold-500 transition-colors"
                  >
                    Back to Proposal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-5 group">
      <div className="w-14 h-14 bg-white/5 rounded-3xl flex items-center justify-center text-white/20 group-hover:bg-gold-500 group-hover:text-emerald-950 transition-all border border-white/5 shadow-xl">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
