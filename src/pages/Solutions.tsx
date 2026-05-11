import { motion } from "motion/react";
import { 
  Building2, Store, HeartPulse, HardHat, 
  Car, GraduationCap, Plane, Sprout,
  ArrowRight, ShieldCheck, Zap, Globe
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Solutions() {
  const industries = [
    { title: "Retail & E-commerce", icon: Store, color: "#F43F5E", desc: "Omnichannel POS, Inventory management, and Customer Loyalty programs." },
    { title: "Healthcare & Clinic", icon: HeartPulse, color: "#10B981", desc: "Patient records, Appointment scheduling, and Telemedicine integrations." },
    { title: "Construction & REAL Estate", icon: HardHat, color: "#F59E0B", desc: "Project management, Resource tracking, and Budgeting for large scale builds." },
    { title: "Corporate & Enterprise", icon: Building2, color: "#3B82F6", desc: "Advanced ERP, HR, and Payroll solutions for medium to large organizations." },
    { title: "Automotive & Logistics", icon: Car, color: "#6366F1", desc: "Fleet management, Service tracking, and Supply Chain optimization." },
    { title: "Education & Learning", icon: GraduationCap, color: "#A855F7", desc: "School management, LMS, and Student Information Systems." },
    { title: "Travel & Hospitality", icon: Plane, color: "#06B6D4", desc: "Booking engines, Channel managers, and Guest relationship platforms." },
    { title: "Agriculture & Farming", icon: Sprout, color: "#84CC16", desc: "Farm management, Yield forecasting, and Supply chain for producers." },
  ];

  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="text-center mb-24 max-w-3xl mx-auto">
           <p className="text-eurosia-red font-black uppercase tracking-[0.4em] text-xs mb-4">Vertical Industry Focus</p>
           <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-tight mb-8">
              Solutions Built for <br />
              <span className="text-eurosia-red">Your Industry</span>
           </h1>
           <p className="text-xl text-gray-400 font-medium leading-relaxed">
              Generic tools don't solve specific problems. EUROSIA provides vertical-specific modules designed by domain experts to handle your unique operational challenges.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
           {industries.map((item, i) => (
             <motion.div 
               key={item.title}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="group p-10 rounded-[48px] border border-gray-100 bg-white hover:bg-gray-50 transition-all cursor-pointer relative overflow-hidden"
             >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl"
                  style={{ backgroundColor: item.color }}
                >
                   <item.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-gray-400 font-bold text-sm leading-relaxed mb-10">
                   {item.desc}
                </p>
                <Link to="#" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-900 group-hover:text-eurosia-red transition-colors">
                   View Industry Apps <ArrowRight size={14} />
                </Link>
             </motion.div>
           ))}
        </div>

        {/* Feature Focus */}
        <div className="bg-gray-900 rounded-[64px] overflow-hidden">
           <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-20">
                 <p className="text-eurosia-red font-black uppercase tracking-[0.4em] text-xs mb-8">Custom Ecosystem Building</p>
                 <h2 className="text-5xl font-black text-white tracking-tighter leading-tight mb-10">Don't adjust to the software. <br /><span className="text-eurosia-red">The software adjusts to you.</span></h2>
                 <p className="text-gray-400 font-medium text-lg mb-12 leading-relaxed">
                    Every industry solution in the EUROSIA ecosystem is built on our core platform layers, ensuring that while you get specific vertical functionality, you never lose the power of global sync, AI, and enterprise security.
                 </p>
                 <div className="grid grid-cols-2 gap-8">
                    {[
                      { label: "Vertical Core", sub: "Deep Industry Logic" },
                      { label: "AI Grounding", sub: "Specific Domain Data" },
                      { label: "API First", sub: "Unlimited Connectivity" },
                      { label: "Offline First", sub: "Field-Ready Logic" },
                    ].map(f => (
                      <div key={f.label}>
                         <p className="text-white font-black text-lg mb-1 tracking-tight">{f.label}</p>
                         <p className="text-gray-500 font-black uppercase text-[10px] tracking-widest">{f.sub}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="lg:w-1/2 relative min-h-[500px]">
                 <img 
                   src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200" 
                   alt="Modern Workspace" 
                   className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent" />
                 <div className="absolute inset-0 flex items-center justify-center p-20">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[48px] shadow-2xl relative z-10">
                       <ShieldCheck size={48} className="text-eurosia-red mb-6" />
                       <h4 className="text-2xl font-black text-white mb-4 tracking-tight">Compliance Guaranteed</h4>
                       <p className="text-gray-400 font-medium text-sm leading-relaxed">
                          Our industry solutions are pre-configured to meet regional regulatory requirements for Healthcare (HIPAA), Finance (FCA), and more.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* CTA section */}
        <div className="mt-40 text-center">
           <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-8">Can't find your industry?</h2>
              <p className="text-gray-400 font-medium mb-12">We are constantly expanding our ecosystem. Contact us to discuss your specific requirements and we might just build it for you.</p>
              <Link to="/contact" className="inline-flex items-center gap-3 px-12 py-5 bg-eurosia-red text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/20 hover:scale-105 transition-all">
                 Request Vertical Solution <ArrowRight size={18} />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

