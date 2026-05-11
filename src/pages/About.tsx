import { motion } from "motion/react";
import { 
  Target, Eye, Rocket, Users, 
  MapPin, Award, ShieldCheck, Heart,
  ArrowRight, Globe, Zap, Building2,
  CheckCircle2, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { label: "Founded", value: "2018" },
    { label: "Team Size", value: "150+" },
    { label: "Countries", value: "15+" },
    { label: "App Modules", value: "45+" },
  ];

  const values = [
    { title: "Ecosystem First", desc: "We believe in the power of interconnected tools that share intelligence and data seamlessly.", icon: Zap, color: "#CC1A2F" },
    { title: "Security Obsessed", desc: "Privacy and security aren't features; they are the foundation of everything we build.", icon: ShieldCheck, color: "#11135E" },
    { title: "Human Centric", desc: "We build for the people who use our software every day, prioritizing clarity and speed.", icon: Heart, color: "#F43F5E" },
    { title: "Scale Ready", desc: "From a two-person startup to a global enterprise, our architecture grows with you.", icon: Rocket, color: "#3B82F6" },
  ];

  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-40">
           <div className="lg:w-1/2">
              <p className="text-eurosia-red font-black uppercase tracking-[0.4em] text-xs mb-4">Our Vision & Mission</p>
              <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8">
                 Unified. <br />
                 Intelligent. <br />
                 <span className="text-eurosia-red">Limitless.</span>
              </h1>
              <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-xl mb-12">
                 EUROSIA App Ecosystem was born from a simple realization: modern businesses are drowning in disconnected SaaS tools. We set out to build a unified operating system that brings every workflow into a single, intelligent environment.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 {stats.map(s => (
                   <div key={s.label}>
                      <p className="text-3xl font-black text-gray-900 leading-none mb-1">{s.value}</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
                   </div>
                 ))}
              </div>
           </div>
           <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-[64px] overflow-hidden shadow-2xl origin-bottom-right rotate-2 hover:rotate-0 transition-transform duration-700">
                 <img src="https://images.unsplash.com/photo-1522071823906-b9a7ff0c0cd5?auto=format&fit=crop&q=80&w=1200" alt="Team" className="w-full grayscale hover:grayscale-0 transition-all duration-1000" />
                 <div className="absolute inset-0 bg-eurosia-blue/20 backdrop-blur-[2px]" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-12 rounded-[48px] shadow-2xl border border-gray-100 max-w-xs z-20">
                 <p className="text-sm font-black text-gray-900 leading-relaxed italic mb-4">
                    "We didn't just build another app; we built the foundation for the future of business work."
                 </p>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-eurosia-red rounded-full" />
                    <div>
                       <p className="text-xs font-black text-gray-900">M.H. Mohin</p>
                       <p className="text-[10px] font-bold text-gray-400 uppercase">Founder & Architect</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Core Values */}
        <div className="mb-40">
           <div className="text-center mb-24">
              <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs mb-4">The EUROSIA Philosophy</p>
              <h2 className="text-5xl font-black text-gray-900 tracking-tight">Our Core Values</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={v.title} className="p-12 rounded-[56px] border border-gray-100 bg-white hover:bg-gray-50 transition-all group">
                   <div 
                     className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl"
                     style={{ backgroundColor: v.color }}
                   >
                      <v.icon size={32} />
                   </div>
                   <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">{v.title}</h3>
                   <p className="text-gray-400 font-bold text-xs leading-relaxed">
                      {v.desc}
                   </p>
                </div>
              ))}
           </div>
        </div>

        {/* Our Approach */}
        <div className="bg-gray-50 rounded-[80px] p-20 mb-40">
           <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-1/2">
                 <h2 className="text-5xl font-black text-gray-900 tracking-tight mb-10 leading-tight">The Ecosystem <br /><span className="text-eurosia-red">Advantage</span></h2>
                 <p className="text-gray-400 font-medium text-lg leading-relaxed mb-12">
                    Unlike traditional software that forces you to integrate different vendors, EUROSIA originates from a unified core. This means every app natively understands every other app. No data silos, no integration headaches.
                 </p>
                 <div className="space-y-6">
                    {[
                      "Centrally managed ecosystem security",
                      "Unified user identity across all apps",
                      "Cross-app data intelligence & AI",
                      "Offline-first operational capability"
                    ].map(text => (
                      <div key={text} className="flex items-center gap-4">
                         <div className="w-6 h-6 bg-eurosia-red rounded-full flex items-center justify-center text-white shrink-0">
                            <CheckCircle2 size={14} />
                         </div>
                         <span className="text-sm font-black text-gray-700 uppercase tracking-tight">{text}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-8">
                 <div className="bg-white p-10 rounded-[56px] shadow-sm border border-gray-100 mt-12">
                    <Target size={40} className="text-eurosia-red mb-6" />
                    <h4 className="text-xl font-black text-gray-900 tracking-tight mb-3">Our Target</h4>
                    <p className="text-xs text-gray-400 font-bold leading-relaxed">To become the default workstation for 1 Million businesses by 2030.</p>
                 </div>
                 <div className="bg-white p-10 rounded-[56px] shadow-sm border border-gray-100">
                    <Eye size={40} className="text-eurosia-blue mb-6" />
                    <h4 className="text-xl font-black text-gray-900 tracking-tight mb-3">Our Mission</h4>
                    <p className="text-xs text-gray-400 font-bold leading-relaxed">Lowering the technical barrier for businesses to adopt enterprise-grade technology.</p>
                 </div>
                 <div className="bg-white p-10 rounded-[56px] shadow-sm border border-gray-100">
                    <Award size={40} className="text-green-500 mb-6" />
                    <h4 className="text-xl font-black text-gray-900 tracking-tight mb-3">Our Quality</h4>
                    <p className="text-xs text-gray-400 font-bold leading-relaxed">Zero-compromise approach to performance, security, and design excellence.</p>
                 </div>
                 <div className="bg-white p-10 rounded-[56px] shadow-sm border border-gray-100 -mt-12">
                    <Building2 size={40} className="text-orange-500 mb-6" />
                    <h4 className="text-xl font-black text-gray-900 tracking-tight mb-3">Our Stability</h4>
                    <p className="text-xs text-gray-400 font-bold leading-relaxed">Infrastructure built on global cloud redundancy with 99.9% uptime proof.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Global Presence */}
        <div className="text-center">
           <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs mb-8">Ready to evolve?</p>
           <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-16 max-w-4xl mx-auto leading-tight">
              Build, manage and scale your <span className="text-eurosia-red">entire business</span> from one platform.
           </h2>
           <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="px-12 py-6 bg-eurosia-red text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/20 hover:scale-105 transition-all">Start with EUROSIA App</Link>
              <Link to="/contact" className="px-12 py-6 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-3">
                 Contact Team <ArrowRight size={18} />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

