import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, ArrowRight, Zap, ShieldCheck, Headphones, Database, Users, Globe, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const { data: plansData, isLoading } = useQuery({
    queryKey: ["pricing-plans"],
    queryFn: async () => {
      const res = await fetch("/api/pricing");
      if (!res.ok) throw new Error("Failed to fetch pricing");
      return res.json();
    }
  });

  const fallbackPlans = [
    { 
      id: "1", 
      name: "Starter", 
      priceMonth: 1990, 
      priceYear: 19100, 
      description: "Perfect for small businesses starting their digital journey.",
      features: "[\"Up to 5 Users\", \"5 Core Apps Included\", \"5GB Secure Cloud Storage\", \"Standard Email Support\", \"Real-time Basic Analytics\"]",
      isPopular: false
    },
    { 
      id: "2", 
      name: "Business", 
      priceMonth: 4990, 
      priceYear: 47900, 
      description: "For growing companies that need advanced toolsets.",
      features: "[\"Up to 20 Users\", \"25 Apps Included\", \"50GB Secure Cloud Storage\", \"Priority 24/7 Chat Support\", \"Advanced AI Assistant\", \"Custom Reporting\"]",
      isPopular: true
    },
    { 
      id: "3", 
      name: "Enterprise", 
      priceMonth: 12990, 
      priceYear: 124700, 
      description: "Comprehensive solution for large organizations.",
      features: "[\"Unlimited Users\", \"Unlimited App Access\", \"1TB Secure Cloud Storage\", \"Dedicated Account Manager\", \"Custom API Integration\", \"White Label Options\"]",
      isPopular: false
    }
  ];

  const plans = plansData && plansData.length > 0 ? plansData : fallbackPlans;

  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <p className="text-eurosia-red font-black uppercase tracking-[0.4em] text-xs mb-4">Scalable Ecosystem Pricing</p>
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-tight mb-8">
             Invest in your <span className="text-eurosia-red">Business Growth</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed">
             Simple, transparent pricing for any stage of your company. No hidden fees, no complex contracts. Start your free trial today.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-16 inline-flex items-center gap-6 p-2 bg-gray-50 rounded-[24px] border border-gray-100">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${!isYearly ? 'bg-white shadow-xl text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${isYearly ? 'bg-white shadow-xl text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Yearly <span className="bg-green-50 text-green-500 px-2 py-0.5 rounded-md text-[8px]">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {plans.map((plan: any, i: number) => {
            const features = JSON.parse(plan.features || "[]");
            const price = isYearly ? plan.priceYear / 12 : plan.priceMonth;
            
            return (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col p-12 rounded-[56px] border transition-all ${
                  plan.isPopular 
                    ? "border-eurosia-red ring-8 ring-red-50 bg-white scale-105 shadow-2xl relative z-10" 
                    : "border-gray-100 hover:border-eurosia-red bg-white"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-eurosia-red text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Most Popular Choice
                  </div>
                )}
                
                <div className="mb-12">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">{plan.name}</h3>
                  <p className="text-gray-400 text-sm font-bold leading-relaxed min-h-[48px]">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-2 mb-12">
                  <span className="text-6xl font-black text-gray-900 tracking-tighter">৳ {Math.round(price).toLocaleString()}</span>
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">/mo</span>
                </div>
                
                <ul className="space-y-6 mb-12 flex-grow border-t border-gray-50 pt-10">
                  {features.map((f: string, fi: number) => (
                    <li key={fi} className="flex items-center gap-4 text-gray-700 font-bold text-xs uppercase tracking-tight">
                      <div className="w-5 h-5 bg-red-50 text-eurosia-red rounded-full flex items-center justify-center shrink-0">
                         <CheckCircle2 size={12} />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] transition-all ${
                  plan.isPopular 
                    ? "bg-eurosia-red text-white hover:bg-red-700 shadow-xl shadow-red-900/20" 
                    : "bg-gray-900 text-white hover:bg-black"
                }`}>
                  Launch {plan.name} Ecosystem
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Global Benefits Footer */}
        <div className="bg-gray-900 rounded-[64px] p-20 text-white relative overflow-hidden">
           <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-eurosia-red/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
              {[
                { title: "One Ecosystem", desc: "Every app works together. Unified data and logic.", icon: Globe },
                { title: "Enterprise Security", desc: "Banking-grade encryption across every layer.", icon: ShieldCheck },
                { title: "Global Sync", desc: "Work offline and sync automatically with the cloud.", icon: Zap },
                { title: "Priority Hub", desc: "24/7 dedicated support regardless of your location.", icon: Headphones },
              ].map((f, i) => (
                <div key={i}>
                   <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group hover:bg-eurosia-red transition-all cursor-pointer">
                      <f.icon size={28} className="text-white" />
                   </div>
                   <h4 className="text-xl font-black mb-4 tracking-tight">{f.title}</h4>
                   <p className="text-sm text-gray-400 font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
           </div>

           <div className="mt-20 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h3 className="text-3xl font-black mb-2 tracking-tight">Ready for a custom solution?</h3>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Our Enterprise & White Label solutions are tailored to your needs.</p>
              </div>
              <Link to="/contact" className="px-12 py-5 bg-white text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center gap-3">
                 Contact Sales Team <ArrowRight size={18} />
              </Link>
           </div>
        </div>

        {/* FAQ Section Preview */}
        <div className="mt-40 max-w-4xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight">Frequently Asked Questions</h2>
           </div>
           <div className="space-y-4">
              {[
                "Can I switch between plans at any time?",
                "How does the offline-first sync work?",
                "Are my business data backups truly automatic?",
                "Can I build my own marketplace apps?",
              ].map((q, i) => (
                <div key={i} className="group p-8 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 rounded-[32px] transition-all cursor-pointer flex items-center justify-between">
                   <span className="font-black text-gray-900 uppercase text-[10px] tracking-[0.1em]">{q}</span>
                   <ChevronRight size={18} className="text-gray-300 group-hover:text-eurosia-red transition-all" />
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

