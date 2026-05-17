import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, Zap, Plane, Eye, ShieldCheck, UserPlus } from 'lucide-react';

const PLANS = [
  {
    name: 'Silver',
    price: 'PKR 1,500',
    period: '/month',
    color: 'bg-gray-100',
    textColor: 'text-gray-900',
    features: ['30 Likes per day', '10 Active chats', 'Basic filters', 'Voice notes'],
    icon: ShieldCheck
  },
  {
    name: 'Gold',
    price: 'PKR 3,500',
    period: '/month',
    color: 'bg-gold-500',
    textColor: 'text-emerald-900',
    popular: true,
    features: ['Unlimited Likes', 'Unlimited Active chats', 'See who liked you', 'Incognito mode', 'Travel mode'],
    icon: Star
  },
  {
    name: 'Platinum',
    price: 'PKR 7,000',
    period: '/month',
    color: 'bg-emerald-900',
    textColor: 'text-white',
    features: ['Everything in Gold', 'Daily Profile Boost', 'Personal Matchmaker', 'Featured Profile'],
    icon: Zap
  }
];

export default function PremiumScreen() {
  return (
    <div className="min-h-screen pt-32 pb-32 islamic-pattern bg-beige-100/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-emerald-900 mb-4">Choose Your Path to <span className="text-gold-600 italic">Nikah</span>.</h2>
          <p className="text-emerald-900/60 max-w-2xl mx-auto">Investment in your future. Our premium plans are designed to help you find your partner faster while maintaining the highest levels of privacy and respect.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-[40px] shadow-xl flex flex-col ${plan.color} ${plan.textColor}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-900 text-gold-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-6">
                 <plan.icon size={32} />
                 <h3 className="text-2xl font-serif font-bold">{plan.name}</h3>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="opacity-60 text-sm font-medium">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium">
                    <Check size={18} className="flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-lg ${plan.name === 'Gold' ? 'bg-emerald-900 text-white' : (plan.name === 'Platinum' ? 'bg-gold-500 text-emerald-900' : 'bg-white text-emerald-900')}`}>
                Upgrade Now
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
            <h4 className="text-emerald-900/30 font-bold uppercase tracking-[0.3em] text-xs mb-8">Trusted by families worldwide</h4>
            <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.png" alt="mastercard" className="h-10" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Stripe_logo.svg" alt="stripe" className="h-8" />
            </div>
        </div>
      </div>
    </div>
  );
}
