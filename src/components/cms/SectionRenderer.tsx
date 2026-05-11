import React from 'react';
import { motion } from "motion/react";
import { ArrowRight, Play, Zap, CheckCircle2, ShoppingBag, FileText, Wallet, Repeat, Users, MessageSquare, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const ICON_MAP: any = {
  ShoppingBag, FileText, Wallet, Repeat, Users, MessageSquare, Zap
};

export function HeroSection({ data: section }: any) {
  const content = typeof section.data === 'string' ? JSON.parse(section.data) : (section.data || {});
  const data = { ...section, ...content };
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-50/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex-1 text-center lg:text-left"
          >
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full text-[#B91C1C] text-xs font-black uppercase tracking-[0.2em] mb-8">
                <Zap size={14} fill="currentColor" />
                <span>{data.tagline || 'Ecosystem Node'}</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
               {data.title}
             </h1>
             <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
               {data.subtitle}
             </p>
             <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                {data.buttons?.map((btn: any, i: number) => (
                  <Link 
                    key={i}
                    to={btn.url} 
                    className={`px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center gap-2 ${
                      i === 0 ? 'bg-[#B91C1C] text-white shadow-2xl shadow-red-500/40 hover:bg-[#991B1B]' : 'bg-white text-gray-900 border-2 border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    {btn.label}
                    {i === 0 && <ArrowRight size={20} />}
                  </Link>
                ))}
             </div>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex-1 relative"
          >
             <div className="relative z-10 bg-white p-2 rounded-[32px] shadow-2xl border border-gray-100">
                <img src={data.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"} className="rounded-[24px] w-full" alt="" />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FeatureGridSection({ data: section }: any) {
  const content = typeof section.data === 'string' ? JSON.parse(section.data) : (section.data || {});
  const data = { ...section, ...content };
  return (
    <section className="py-24">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">{data.title}</h2>
          <p className="text-gray-500 font-medium">{data.subtitle}</p>
       </div>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {data.features?.map((f: any, i: number) => (
               <div key={i} className="p-10 bg-white border border-gray-50 rounded-[40px] hover:shadow-2xl transition-all">
                  <div className="w-14 h-14 bg-red-50 text-[#B91C1C] rounded-2xl flex items-center justify-center mb-6">
                     <Zap size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-3">{f.title}</h3>
                  <p className="text-gray-500 font-medium">{f.desc}</p>
               </div>
             ))}
          </div>
       </div>
    </section>
  );
}

export function ProductPortfolioSection({ data: section }: any) {
  const content = typeof section.data === 'string' ? JSON.parse(section.data) : (section.data || {});
  const data = { ...section, ...content };
  return (
    <section className="py-24 bg-gray-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{data.title}</h2>
             <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">{data.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {data.products?.map((p: any, i: number) => {
               const Icon = ICON_MAP[p.icon] || ShoppingBag;
               return (
                 <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:translate-y-[-8px] transition-all group">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl transition-transform group-hover:rotate-12" style={{ backgroundColor: p.color || '#B91C1C' }}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black mb-4 text-gray-900">{p.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed mb-8">{p.desc}</p>
                    <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-900 group-hover:text-[#B91C1C] transition-colors">
                      Learn More
                      <ArrowRight size={18} />
                    </button>
                 </div>
               );
             }) || (
               <div className="col-span-full py-12 text-center text-gray-400">Add products in CMS to display them here</div>
             )}
          </div>
       </div>
    </section>
  );
}

export function FAQSection({ data: section }: any) {
  const content = typeof section.data === 'string' ? JSON.parse(section.data) : (section.data || {});
  const data = { ...section, ...content };
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black mb-4 tracking-tight">{data.title}</h2>
             <p className="text-gray-500 font-medium">{data.subtitle}</p>
          </div>
          <div className="space-y-4">
             {data.faqs?.map((faq: any, i: number) => (
               <div key={i} className="border border-gray-100 rounded-3xl overflow-hidden">
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-all"
                  >
                     <span className="font-black text-gray-900">{faq.question}</span>
                     <ChevronDown size={20} className={`text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openIndex === i && (
                    <div className="px-8 pb-8 text-gray-500 font-medium leading-relaxed animate-in fade-in slide-in-from-top-1">
                       {faq.answer}
                    </div>
                  )}
               </div>
             ))}
          </div>
       </div>
    </section>
  );
}

export function CTASection({ data: section }: any) {
  const content = typeof section.data === 'string' ? JSON.parse(section.data) : (section.data || {});
  const data = { ...section, ...content };
  return (
    <section className="py-24">
       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0A0A0A] rounded-[48px] p-12 lg:p-20 text-center relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">{data.title}</h2>
                <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-medium">{data.subtitle}</p>
                <div className="flex justify-center">
                   <Link to={data.buttonUrl || "/signup"} className="px-12 py-5 bg-white text-gray-900 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all">
                      {data.buttonLabel || "Get Started"}
                   </Link>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
}
