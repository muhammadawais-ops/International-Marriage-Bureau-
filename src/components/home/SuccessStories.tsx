import React from 'react';
import { motion } from 'motion/react';
import { Quote, ArrowLeft } from 'lucide-react';

const STORIES = [
  {
    couple: 'Ahmed & Fatima',
    location: 'Islamabad, Pakistan',
    story: 'We were both looking for someone who valued traditional family involvement. The verification process ensured we were both serious about our intentions.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=400'
  },
  {
    couple: 'Zaid & Sarah',
    location: 'Manchester, UK',
    story: 'Finding a practicing spouse in the West can be challenging. The filters for prayer level and sect helped us find alignment before we even spoke.',
    image: 'https://images.unsplash.com/photo-1549413182-08198fba3066?auto=format&fit=crop&q=80&w=400'
  },
  {
    couple: 'Omar & Leila',
    location: 'Dubai, UAE',
    story: 'We found each other across borders. The professional background check gave my family the peace of mind they needed to proceed with the proposal.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400'
  }
];

export default function SuccessStories({ onBack }: { onBack?: () => void }) {
  return (
    <section className="py-24 bg-emerald-950 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={onBack}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-gold-500 transition-all cursor-pointer group"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/20">Back to Home</span>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-tight italic">Marriage <span className="text-gold-500">Success</span> Stories</h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold">Joining Hearts across the globe</p>
          <div className="w-20 h-1 bg-gold-500 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STORIES.map((story, i) => (
            <motion.div 
              key={story.couple}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-[30px] md:rounded-[40px] overflow-hidden flex flex-col sm:flex-row shadow-2xl border border-white/5 group"
            >
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.couple} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="sm:w-3/5 p-6 md:p-10 lg:p-12 relative flex flex-col justify-center">
                <Quote className="absolute top-4 right-4 md:top-8 md:right-8 text-gold-500/10" size={40} md:size={60} />
                <h3 className="text-2xl font-serif text-white mb-1">{story.couple}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6">{story.location}</p>
                <p className="text-white/60 italic leading-relaxed font-light font-sans text-sm">"{story.story}"</p>
                
                <div className="mt-8 flex gap-1.5">
                   {[1,2,3,4,5].map(star => (
                     <div key={star} className="w-2 h-2 bg-gold-500 rounded-full" />
                   ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
