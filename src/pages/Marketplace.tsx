import { motion } from "motion/react";
import { 
  AppWindow, ShoppingBag, FileText, Wallet, Repeat, 
  Users, MessageSquare, ShieldCheck, Zap, Layers, 
  Search, Filter, Star, Download, ArrowRight, ExternalLink, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "POS", "ERP", "CRM", "Finance", "HR", "Marketing", "Security"];

const apps = [
  {
    id: "pos",
    name: "EUROSIA POS",
    category: "POS",
    rating: 4.9,
    installs: "12k+",
    desc: "Next-gen point of sale with offline sync and multibranch support.",
    icon: ShoppingBag,
    color: "#F43F5E",
    price: "Free / ৳2,000",
    url: "http://pos.eurosia.io/"
  },
  {
    id: "erp",
    name: "EUROSIA ERP",
    category: "ERP",
    rating: 4.8,
    installs: "5k+",
    desc: "Enterprise resource planning with inventory, production, and supply chain.",
    icon: Repeat,
    color: "#F59E0B",
    price: "Custom"
  },
  {
    id: "invoicenex",
    name: "InvoiceNex",
    category: "Finance",
    rating: 4.7,
    installs: "8k+",
    desc: "AI-powered invoicing and automated billing for recurring subscriptions.",
    icon: FileText,
    color: "#10B981",
    price: "৳1,500/mo"
  },
  {
    id: "cashbook",
    name: "CashBook",
    category: "Finance",
    rating: 4.9,
    installs: "15k+",
    desc: "Simplified double-entry accounting for non-accountants.",
    icon: Wallet,
    color: "#3B82F6",
    price: "Free"
  },
  {
    id: "crm",
    name: "EUROSIA CRM",
    category: "CRM",
    rating: 4.6,
    installs: "3k+",
    desc: "Client relationship management with AI-driven lead tracking.",
    icon: Users,
    color: "#8B5CF6",
    price: "৳2,500/mo"
  },
  {
    id: "cloudpbx",
    name: "CloudPBX",
    category: "Security",
    rating: 4.5,
    installs: "1k+",
    desc: "Integrated business telephony and call center management.",
    icon: MessageSquare,
    color: "#475569",
    price: "৳5,000/mo"
  }
];

export default function Marketplace() {
  return (
    <div className="bg-white font-sans text-gray-900 min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-[#CC1A2F] text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            <Layers size={14} fill="currentColor" />
            <span>App Marketplace</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Scale Your <span className="text-[#CC1A2F]">Ecosystem</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Discover apps, plugins, and integrations to supercharge your business workflow. Built for EUROSIA and ready to install.
          </p>
          
          <div className="mt-12 max-w-2xl mx-auto relative group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC1A2F] transition-colors" size={24} />
             <input 
               type="text" 
               placeholder="Search apps, modules, or plugins..." 
               className="w-full bg-white border border-gray-200 rounded-[32px] pl-16 pr-8 py-6 text-lg font-bold outline-none focus:ring-4 focus:ring-[#CC1A2F]/10 transition-all shadow-xl shadow-black/5"
             />
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 space-y-10 shrink-0">
               <div>
                  <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-gray-400">Categories</h4>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <button key={cat} className={`block w-full text-left px-4 py-3 rounded-2xl text-sm font-black transition-all ${
                        cat === "All" ? "bg-[#CC1A2F] text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"
                      }`}>
                        {cat}
                      </button>
                    ))}
                  </div>
               </div>
               
               <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
                  <Zap className="text-[#CC1A2F] mb-4" size={32} fill="currentColor" />
                  <h4 className="font-black text-lg text-gray-900 mb-2">Build Your Own App</h4>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6">Want to list your module on our marketplace? Get started with our SDK.</p>
                  <Link to="/developer" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#CC1A2F]">
                    Developer Docs
                    <ArrowRight size={14} />
                  </Link>
               </div>
            </aside>

            {/* Main Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-10">
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Showing 95 Apps & Integrations</p>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-xs font-black text-gray-600 cursor-pointer">
                   <Filter size={14} />
                   <span>RELEVANCE</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {apps.map((app, i) => {
                   const CardContent = (
                     <motion.div 
                       key={app.id}
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="bg-white p-8 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all group flex flex-col h-full cursor-pointer"
                     >
                       <div className="flex items-start justify-between mb-8">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl" style={{ backgroundColor: app.color }}>
                            <app.icon size={32} />
                          </div>
                          <div className="flex flex-col items-end">
                             <div className="flex items-center gap-1 text-[#F59E0B] font-black text-sm">
                               <Star size={14} fill="currentColor" />
                               <span>{app.rating}</span>
                             </div>
                             <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">{app.installs} Installs</p>
                          </div>
                       </div>
                       <div className="mb-8">
                          <h3 className="text-2xl font-black text-gray-900 mb-2">{app.name}</h3>
                          <p className="text-sm text-gray-500 font-medium leading-relaxed">{app.desc}</p>
                       </div>
                       <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                          <div>
                             <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Price</p>
                             <p className="text-sm font-black text-gray-900">{app.price}</p>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest group-hover:bg-[#CC1A2F] transition-colors">
                             <Download size={16} />
                             Integrate
                          </div>
                       </div>
                     </motion.div>
                   );

                   if (app.url) {
                     return (
                       <a key={app.id} href={app.url} target="_blank" rel="noreferrer" className="block h-full">
                         {CardContent}
                       </a>
                     );
                   }

                   return (
                     <Link key={app.id} to="/signup" className="block h-full">
                       {CardContent}
                     </Link>
                   );
                 })}
                 
                 {/* Coming Soon Card */}
                 <div className="bg-[#CC1A2F] p-8 rounded-[40px] text-white flex flex-col justify-center items-center text-center relative overflow-hidden group border-4 border-white/10 shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <Sparkles size={48} className="mb-6 animate-pulse" fill="currentColor" />
                    <h3 className="text-2xl font-black mb-4">Discover More</h3>
                    <p className="text-white/80 font-medium text-sm leading-relaxed mb-8">250+ community modules and vertical app extensions coming this summer.</p>
                    <button className="bg-white text-[#CC1A2F] px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-xl">
                      Developer Program
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Teaser */}
      <section className="py-24 bg-gray-900 text-white">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Unified Core. Infinite <span className="text-[#CC1A2F]">Possibilities.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium mb-12">One platform for all your business needs. Scale effortlessly with EUROSIA App Ecosystem.</p>
            <div className="flex justify-center gap-6">
               <AppStat label="Apps" value="25+" />
               <AppStat label="Developers" value="1.2k" />
               <AppStat label="Plugins" value="150+" />
            </div>
         </div>
      </section>
    </div>
  );
}

function AppStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-10 py-6 bg-white/5 border border-white/10 rounded-[24px]">
       <p className="text-3xl font-black text-white leading-none mb-1">{value}</p>
       <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
}
