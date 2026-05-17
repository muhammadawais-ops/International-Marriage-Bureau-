import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, Camera, Mic, X, Shield } from 'lucide-react';
import { Gender, Sect, PrayerLevel, MaritalStatus } from '../../types';
import { SECTS, CASTES, PRAYER_LEVELS, EDUCATION_LEVELS, INCOME_RANGES } from '../../constants';

const STEPS = [
  'Media Upload',
  'Intent & Fees',
  'Personal Info',
  'Education & Job',
  'Religion & Property',
  'Family & Address',
  'Partner Requirements',
  'Final Declaration',
  'Payment & Verification'
];

export default function OnboardingWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    intentAccepted: false,
    gender: null,
    fullName: '',
    dob: '',
    age: '',
    maritalStatus: '',
    divorceReason: '',
    height: '',
    weight: '',
    disability: 'None',
    qualification: '',
    university: '',
    jobPosition: '',
    income: '',
    natureOfJob: '',
    futurePlans: '',
    religion: 'Islam',
    caste: '',
    language: 'Urdu',
    sect: '',
    homeStatus: '',
    homeSize: '',
    homeLocation: '',
    otherProperties: '',
    fatherOccupation: '',
    motherOccupation: '',
    brothersCount: 0,
    sistersCount: 0,
    marriedSiblingsCount: 0,
    currentCity: '',
    homeTown: '',
    addressLocation: '',
    reqAge: '',
    reqHeight: '',
    reqCity: '',
    reqCaste: '',
    reqQualification: '',
    reqSect: '',
    residenceAfterMarriage: '',
    otherDemands: '',
    isWitness: false,
    photos: [],
    phone: '',
    whatsapp: '',
    paymentScreenshot: null,
    status: 'pending'
  });

  const optimizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimensions
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.6 quality
          resolve(canvas.toDataURL('image/jpeg', 0.6));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    setLoading(true);
    try {
      const newPhotos = [...formData.photos];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (newPhotos.length < 3) {
          const base64 = await optimizeImage(file);
          newPhotos.push(base64);
        }
      }
      setFormData({...formData, photos: newPhotos});
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setLoading(false);
      // Reset input value to allow same file selection
      e.target.value = '';
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...formData.photos];
    newPhotos.splice(index, 1);
    setFormData({...formData, photos: newPhotos});
  };

  const nextStep = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      handleFinalSubmit();
    }
  };
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleFinalSubmit = async () => {
    if (!formData.isWitness) {
      alert("Please check the witness statement first.");
      return;
    }
    
    setLoading(true);
    // Prepare the submission
    const submission = {
      ...formData,
      id: `prop_${Date.now()}`,
      submittedAt: new Date().toISOString()
    };

    try {
      // Store in localStorage for Admin Panel
      const existingPending = JSON.parse(localStorage.getItem('pendingProposals') || '[]');
      localStorage.setItem('pendingProposals', JSON.stringify([...existingPending, submission]));

      setTimeout(() => {
        setLoading(false);
        onClose();
        // Show success message with next steps
        alert("Registration Successful. Please wait for admin approval. Once payment is verified, your profile will be pushed to the main listing.");
      }, 1000);
    } catch (err) {
      console.error("Storage error:", err);
      setLoading(false);
      alert("Error saving data: Storage quota exceeded. Please use smaller images.");
    }
  };

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const base64 = await optimizeImage(file);
        setFormData({ ...formData, paymentScreenshot: base64 });
      } catch (err) {
        console.error("Error uploading screenshot:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif text-white italic">Welcome Brother/Sister</h2>
              <p className="text-white/40 text-sm italic uppercase tracking-widest">First, Share your 2-3 recent decent pictures</p>
            </div>

            <div className="flex justify-center gap-4">
              {[0, 1, 2].map(i => (
                <div key={i} className="relative group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    id={`photo-upload-${i}`}
                    onChange={handleImageUpload}
                  />
                  {formData.photos[i] ? (
                    <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-gold-500 relative">
                      <img src={formData.photos[i]} className="w-full h-full object-cover" alt={`Upload ${i}`} />
                      <button 
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label 
                      htmlFor={`photo-upload-${i}`}
                      className="w-24 h-32 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 hover:border-gold-500/50 cursor-pointer transition-all"
                    >
                       <Camera className="text-white/20 mb-2" size={24} />
                       <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Upload Photo</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div className="p-6 bg-gold-500/5 rounded-2xl border border-gold-500/10">
               <p className="text-xs text-gold-500/60 leading-relaxed font-medium">
                 Your photos are kept highly confidential and are only shared with verified, high-intent profiles after your explicit permission.
               </p>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-900 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Shield className="text-gold-500" size={32} />
            </div>
            <h2 className="text-3xl font-serif italic text-white tracking-tight">Serious Marriage Context</h2>
            <div className="bg-white/5 p-6 rounded-2xl text-left space-y-4 text-sm border border-white/5">
              <h4 className="font-bold text-gold-500 uppercase tracking-widest text-xs">Registration Rules & Fees</h4>
              <ul className="space-y-2 text-white/70">
                <li>• Local: <span className="font-bold text-white">PKR 25,000 REG / PKR 180,000 SUCCESS</span></li>
                <li>• Overseas: <span className="font-bold text-white">PKR 50,000 REG / PKR 300,000 SUCCESS</span></li>
                <li>• High-profile (Doctors/Engineers) fees are <span className="font-bold underline">doubled</span>.</li>
                <li>• Registration fees are <span className="text-red-400 font-bold italic">non-refundable</span>.</li>
              </ul>
              <p className="border-t border-white/10 pt-4 text-xs italic text-white/40">
                By proceeding, you agree to pay the registration fee to activate your profile.
              </p>
            </div>
            <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-white/10 cursor-pointer hover:border-gold-500/50 transition-all text-left">
              <input 
                type="checkbox" 
                className="mt-1 accent-gold-500" 
                checked={formData.intentAccepted}
                onChange={(e) => setFormData({...formData, intentAccepted: e.target.checked})}
              />
              <span className="text-sm font-medium leading-relaxed text-white/80">I confirm my intent for Marriage and agree to the non-refundable registration fees.</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block text-left">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" 
                  placeholder="+92 300 0000000" 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  value={formData.phone} 
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block text-left">WhatsApp Number</label>
                <input 
                  type="tel" 
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" 
                  placeholder="+92 300 0000000" 
                  onChange={e => setFormData({...formData, whatsapp: e.target.value})} 
                  value={formData.whatsapp} 
                />
              </div>
              {['Male', 'Female'].map(g => (
                <button
                  key={g}
                  onClick={() => setFormData({...formData, gender: g})}
                  className={`p-4 rounded-xl border-2 transition-all font-bold ${formData.gender === g ? 'border-gold-500 bg-gold-500 text-emerald-950 shadow-lg' : 'border-white/10 text-white hover:border-gold-500/50'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-2xl font-serif text-white border-b border-white/5 pb-2">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Full Name</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Muhammad Ali" onChange={e => setFormData({...formData, fullName: e.target.value})} value={formData.fullName} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Age</label>
                <input type="number" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="25" onChange={e => setFormData({...formData, age: e.target.value})} value={formData.age} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Marital Status</label>
                <select className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" onChange={e => setFormData({...formData, maritalStatus: e.target.value})} value={formData.maritalStatus}>
                  <option value="" className="bg-emerald-950">Select Status</option>
                  <option className="bg-emerald-950">Never Married</option>
                  <option className="bg-emerald-950">Divorced</option>
                  <option className="bg-emerald-950">Widowed</option>
                </select>
              </div>
              {formData.maritalStatus === 'Divorced' && (
                <div className="col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Reason for Divorce</label>
                  <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Please mention briefly" onChange={e => setFormData({...formData, divorceReason: e.target.value})} value={formData.divorceReason} />
                </div>
              )}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Height</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="5'8''" onChange={e => setFormData({...formData, height: e.target.value})} value={formData.height} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Weight (kg)</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="70" onChange={e => setFormData({...formData, weight: e.target.value})} value={formData.weight} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Any Disability</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="None" onChange={e => setFormData({...formData, disability: e.target.value})} value={formData.disability} />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-2xl font-serif text-white border-b border-white/5 pb-2">Education & Career</h2>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Qualification</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Masters" onChange={e => setFormData({...formData, qualification: e.target.value})} value={formData.qualification} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">University</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="University of Karachi" onChange={e => setFormData({...formData, university: e.target.value})} value={formData.university} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Job Position</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Manager" onChange={e => setFormData({...formData, jobPosition: e.target.value})} value={formData.jobPosition} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Monthly Income</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="100,000 PKR" onChange={e => setFormData({...formData, income: e.target.value})} value={formData.income} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Nature of Job</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Government / Private / Business" onChange={e => setFormData({...formData, natureOfJob: e.target.value})} value={formData.natureOfJob} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Future Plans</label>
                <textarea className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500 h-20" placeholder="Your aims and goals..." onChange={e => setFormData({...formData, futurePlans: e.target.value})} value={formData.futurePlans} />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-2xl font-serif text-white border-b border-white/5 pb-2">Religion & Property</h2>
            <div className="grid grid-cols-2 gap-4 text-left">
               <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Religion</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none" value="Islam" readOnly />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Sect / Maslak</label>
                <select 
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500"
                  onChange={e => setFormData({...formData, sect: e.target.value})}
                  value={formData.sect}
                >
                  <option value="" className="bg-emerald-950">Select Sect</option>
                  {SECTS.map(s => (
                    <option key={s} value={s} className="bg-emerald-950">{s}</option>
                  ))}
                </select>
                {formData.sect === 'Other' && (
                  <input 
                    type="text" 
                    className="w-full p-3 mt-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" 
                    placeholder="Enter your sect..." 
                    onChange={e => setFormData({...formData, manualSect: e.target.value})} 
                    value={formData.manualSect} 
                  />
                )}
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Caste</label>
                <select 
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500"
                  onChange={e => setFormData({...formData, caste: e.target.value})}
                  value={formData.caste}
                >
                  <option value="" className="bg-emerald-950">Select Caste</option>
                  {CASTES.map(c => (
                    <option key={c} value={c} className="bg-emerald-950">{c}</option>
                  ))}
                </select>
                {formData.caste === 'Other' && (
                  <input 
                    type="text" 
                    className="w-full p-3 mt-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" 
                    placeholder="Enter your caste..." 
                    onChange={e => setFormData({...formData, manualCaste: e.target.value})} 
                    value={formData.manualCaste} 
                  />
                )}
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Language</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Urdu / Punjabi" onChange={e => setFormData({...formData, language: e.target.value})} value={formData.language} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Home Status</label>
                <select className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" onChange={e => setFormData({...formData, homeStatus: e.target.value})} value={formData.homeStatus}>
                  <option value="" className="bg-emerald-950">Select Status</option>
                  <option className="bg-emerald-950">Owned</option>
                  <option className="bg-emerald-950">Rental</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Home Size</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="5 Marla / 1 Kanal" onChange={e => setFormData({...formData, homeSize: e.target.value})} value={formData.homeSize} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Other Properties</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Agriculture land / Commercial shops" onChange={e => setFormData({...formData, otherProperties: e.target.value})} value={formData.otherProperties} />
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-2xl font-serif text-white border-b border-white/5 pb-2">Family & Address</h2>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Father's Occupation</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Retired / Business" onChange={e => setFormData({...formData, fatherOccupation: e.target.value})} value={formData.fatherOccupation} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Mother's Occupation</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Housewife" onChange={e => setFormData({...formData, motherOccupation: e.target.value})} value={formData.motherOccupation} />
              </div>
              <div className="col-span-2 flex gap-4">
                 <div className="flex-1">
                    <label className="text-xs font-bold text-white/40 mb-1 block">Brothers</label>
                    <input type="number" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" onChange={e => setFormData({...formData, brothersCount: parseInt(e.target.value) || 0})} value={formData.brothersCount} />
                 </div>
                 <div className="flex-1">
                    <label className="text-xs font-bold text-white/40 mb-1 block">Sisters</label>
                    <input type="number" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" onChange={e => setFormData({...formData, sistersCount: parseInt(e.target.value) || 0})} value={formData.sistersCount} />
                 </div>
                 <div className="flex-1">
                    <label className="text-xs font-bold text-white/40 mb-1 block">Married</label>
                    <input type="number" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" onChange={e => setFormData({...formData, marriedSiblingsCount: parseInt(e.target.value) || 0})} value={formData.marriedSiblingsCount} />
                 </div>
              </div>
               <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Current City</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Lahore" onChange={e => setFormData({...formData, currentCity: e.target.value})} value={formData.currentCity} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Home Town</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Faisalabad" onChange={e => setFormData({...formData, homeTown: e.target.value})} value={formData.homeTown} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Detailed Location</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Society name / Area" onChange={e => setFormData({...formData, addressLocation: e.target.value})} value={formData.addressLocation} />
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-2xl font-serif text-white border-b border-white/5 pb-2">Your Requirements</h2>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Age Limit</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="20 - 25" onChange={e => setFormData({...formData, reqAge: e.target.value})} value={formData.reqAge} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Height</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="5'5''+" onChange={e => setFormData({...formData, reqHeight: e.target.value})} value={formData.reqHeight} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">City</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Any" onChange={e => setFormData({...formData, reqCity: e.target.value})} value={formData.reqCity} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Caste Requirement</label>
                <select 
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500"
                  onChange={e => setFormData({...formData, reqCaste: e.target.value})}
                  value={formData.reqCaste}
                >
                  <option value="" className="bg-emerald-950">Any Caste</option>
                  {CASTES.map(c => (
                    <option key={c} value={c} className="bg-emerald-950">{c}</option>
                  ))}
                </select>
                {formData.reqCaste === 'Other' && (
                   <input type="text" className="w-full p-3 mt-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Enter caste requirement" onChange={e => setFormData({...formData, reqManualCaste: e.target.value})} value={formData.reqManualCaste} />
                )}
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Sect Requirement</label>
                <select 
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500"
                  onChange={e => setFormData({...formData, reqSect: e.target.value})}
                  value={formData.reqSect}
                >
                  <option value="" className="bg-emerald-950">Any Sect</option>
                  {SECTS.map(s => (
                    <option key={s} value={s} className="bg-emerald-950">{s}</option>
                  ))}
                </select>
                {formData.reqSect === 'Other' && (
                   <input type="text" className="w-full p-3 mt-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Enter sect requirement" onChange={e => setFormData({...formData, reqManualSect: e.target.value})} value={formData.reqManualSect} />
                )}
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Marriage Residence</label>
                <input type="text" className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500" placeholder="Joint / Separate" onChange={e => setFormData({...formData, residenceAfterMarriage: e.target.value})} value={formData.residenceAfterMarriage} />
              </div>
              <div className="col-span-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1 block">Other Demands</label>
                 <textarea className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-gold-500 h-20" placeholder="Any other detail..." onChange={e => setFormData({...formData, otherDemands: e.target.value})} value={formData.otherDemands} />
              </div>
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif text-white italic">Final Declaration</h2>
              <p className="text-white/40 text-sm">Please hold your witness before Allah that the provided information is accurate.</p>
            </div>

            <div className="bg-emerald-900 p-8 rounded-[40px] text-white text-left shadow-2xl relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-32 h-32 opacity-10 islamic-pattern translate-x-10 -translate-y-10" />
               <p className="text-lg font-serif italic mb-6 leading-relaxed">"I Hold Witness to Allah Almighty That Above Information is Correct to my Knowledge."</p>
               <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${formData.isWitness ? 'bg-gold-500 border-gold-500' : 'border-white/20 group-hover:border-white'}`}>
                    {formData.isWitness && <Check size={16} className="text-emerald-900" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={formData.isWitness}
                    onChange={(e) => setFormData({...formData, isWitness: e.target.checked})}
                  />
                  <span className="text-sm font-bold uppercase tracking-widest text-gold-500">I Bear Witness</span>
               </label>
            </div>
          </motion.div>
        );

      case 8:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif text-white italic">Payment Verification</h2>
              <p className="text-white/40 text-sm italic uppercase tracking-widest">Please pay your fee on the following accounts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-emerald-900/50 p-6 rounded-2xl border border-white/5 text-left">
                  <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest block mb-1">Easypaisa</span>
                  <p className="text-white font-mono text-lg">+923081168623</p>
                  <p className="text-white/40 text-xs mt-2 uppercase font-bold">NikahConnect Admin</p>
               </div>
               <div className="bg-emerald-900/50 p-6 rounded-2xl border border-white/5 text-left">
                  <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest block mb-1">HBL Bank</span>
                  <p className="text-white font-mono text-lg">12727900677503</p>
                  <p className="text-white/40 text-xs mt-2 uppercase font-bold">NikahConnect PVT LTD</p>
               </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-white/40 italic">Once paid, upload the screenshot for verification.</p>
              
              <div className="flex justify-center">
                <input 
                  type="file" 
                  accept="image/*" 
                  id="screenshot-upload" 
                  className="hidden" 
                  onChange={handleScreenshotUpload}
                />
                <label 
                  htmlFor="screenshot-upload"
                  className={`w-full max-w-sm rounded-[30px] border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all cursor-pointer ${formData.paymentScreenshot ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 bg-white/5 hover:border-gold-500/50'}`}
                >
                  {formData.paymentScreenshot ? (
                    <div className="flex items-center gap-4">
                       <Check className="text-emerald-500" size={32} />
                       <div className="text-left">
                          <p className="text-white font-bold uppercase tracking-widest text-xs">Screenshot Uploaded</p>
                          <p className="text-white/40 text-[10px]">Click to change</p>
                       </div>
                    </div>
                  ) : (
                    <>
                      <Camera className="text-white/20 mb-3" size={32} />
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Upload Screenshot</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-emerald-950 rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-white/10">
        {/* Left Panel */}
        <div className="md:w-1/3 bg-emerald-900 relative p-10 flex flex-col justify-end overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 islamic-pattern" />
          <div className="relative z-10">
             <div className="w-12 h-1 bg-gold-500 mb-6" />
             <h3 className="text-white text-4xl font-serif leading-tight">Your Profile <br/>is Your Trust.</h3>
             <p className="text-white/40 text-[10px] mt-6 font-bold uppercase tracking-[0.2em]">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>
          </div>
          
          <div className="flex flex-col gap-2 mt-8">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                 <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'bg-gold-500' : 'bg-white/20'}`} />
                 <span className={`text-[10px] uppercase tracking-widest font-bold ${i === step ? 'text-white' : 'text-white/20'}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Right */}
        <div className="md:w-2/3 p-12 flex flex-col relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
            <AnimatePresence mode="wait">
                {renderStepContent()}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
            {step > 0 ? (
              <button 
                onClick={prevStep}
                disabled={loading}
                className="flex items-center gap-2 text-white/40 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-30"
              >
                <ChevronLeft size={16} /> Previous
              </button>
            ) : <div />}
            
            <button 
              onClick={nextStep}
              disabled={loading || (step === 0 && formData.photos.length === 0) || (step === 1 && (!formData.intentAccepted || !formData.gender || !formData.phone))}
              className="flex items-center gap-3 bg-gold-500 text-emerald-950 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl shadow-gold-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : (step === STEPS.length - 1 ? 'Finish Submission' : 'Next Step')} 
              {!loading && step < STEPS.length - 1 && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
