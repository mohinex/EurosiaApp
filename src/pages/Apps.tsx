import { useQuery } from "@tanstack/react-query";
import { 
  AppWindow, ArrowRight, Search, Filter, 
  Store, HeartPulse, Headphones, Radio, 
  MessageSquare, Activity, Lock, Building,
  FileText, CreditCard, Layers, Cloud,
  Cpu, Globe, Zap, Database
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

export default function Apps() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: appsData, isLoading } = useQuery({
    queryKey: ["product-apps"],
    queryFn: async () => {
      const res = await fetch("/api/apps");
      if (!res.ok) throw new Error("Failed to fetch apps");
      return res.json();
    }
  });

  const fallbackApps = [
    { id: "1", name: "EUROSIA POS", description: "Smart Restaurant & Retail Management", category: "Retail", icon: Store, color: "#F43F5E" },
    { id: "2", name: "EUROSIA Care", description: "Digital Clinic & Healthcare Platform", category: "Healthcare", icon: HeartPulse, color: "#10B981" },
    { id: "3", name: "EUROSIA CloudPBX", description: "Cloud PBX & Call Center Solution", category: "Communication", icon: Headphones, color: "#3B82F6" },
    { id: "4", name: "EUROSIA AI Calling", description: "AI-Powered Voice Automation Platform", category: "AI", icon: Radio, color: "#F59E0B" },
    { id: "5", name: "EUROSIA AI Chatbot", description: "Customer Engagement Platform", category: "AI", icon: MessageSquare, color: "#8B5CF6" },
    { id: "6", name: "EUROSIA DataPilot AI", description: "Data Automation & Web Intelligence", category: "AI", icon: Activity, color: "#3B82F6" },
    { id: "7", name: "EUROSIA Defender X", description: "Global Cyber Defense Platform", category: "Cybersecurity", icon: Lock, color: "#B91C1C" },
    { id: "8", name: "EUROSIA BuildNex", description: "Construction ERP & Property Management", category: "Industry", icon: Building, color: "#F59E0B" },
    { id: "9", name: "EUROSIA InvoiceNex", description: "Professional Invoice Generator", category: "Fintech", icon: FileText, color: "#0EA5E9" },
    { id: "10", name: "EUROSIA PayBill", description: "Bill Management & Payment Reminder", category: "Fintech", icon: CreditCard, color: "#F59E0B" },
    { id: "11", name: "NexFarmer", description: "Agro Invoice & Farm Business Solution", category: "Industry", icon: Layers, color: "#10B981" },
    { id: "12", name: "EUROSIA Cloud", description: "Multi-Tenant SaaS Platform", category: "Core", icon: Cloud, color: "#3B82F6" },
  ];

  const apps = appsData && appsData.length > 0 ? appsData : fallbackApps;

  const filteredApps = useMemo(() => {
    return apps.filter((app: any) => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             app.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All" || app.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [apps, searchTerm, activeCategory]);

  const categories = ["All", ...new Set(apps.map((a: any) => a.category))] as string[];

  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
           <div className="max-w-2xl">
              <p className="text-eurosia-red font-black uppercase tracking-[0.4em] text-xs mb-4">Ecosystem Marketplace</p>
              <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                 Unlimited Modules. <br />
                 <span className="text-eurosia-red">One Powerful</span> Platform.
              </h1>
              <p className="text-xl text-gray-400 font-medium mt-6 leading-relaxed">
                 Explore our suite of business applications designed to work together perfectly. From AI automation to financial management, we have it all.
              </p>
           </div>
           <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                 <p className="text-2xl font-black text-gray-900">45+</p>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Apps</p>
              </div>
              <div className="w-px h-12 bg-gray-100 mx-4 hidden md:block" />
              <div className="text-right hidden md:block">
                 <p className="text-2xl font-black text-gray-900">12k+</p>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Installs</p>
              </div>
           </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-20 bg-gray-50/50 p-8 rounded-[40px] border border-gray-100">
           <div className="relative w-full md:w-[480px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
              <input 
                type="text" 
                placeholder="Search by app name or capabilities..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-[20px] pl-16 pr-6 py-5 text-sm font-black outline-none focus:ring-4 focus:ring-eurosia-red/10 transition-all placeholder-gray-300 shadow-sm" 
              />
           </div>
           <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
             {categories.map(cat => (
               <button 
                 key={cat} 
                 onClick={() => setActiveCategory(cat)}
                 className={`px-8 py-4 whitespace-nowrap rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                   activeCategory === cat 
                     ? "bg-gray-900 text-white shadow-xl" 
                     : "bg-white border border-gray-100 text-gray-400 hover:border-eurosia-red hover:text-eurosia-red"
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredApps.length > 0 ? filteredApps.map((app: any, i: number) => {
            const Icon = app.icon || AppWindow;
            return (
              <motion.div 
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white p-10 rounded-[48px] border border-gray-100 hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all flex flex-col h-full relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity translate-x-12 -translate-y-12 rounded-full"
                  style={{ backgroundColor: app.color || "#CC1A2F" }}
                />

                <div 
                  className="w-20 h-20 rounded-[28px] flex items-center justify-center mb-8 shadow-xl shadow-black/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                  style={{ backgroundColor: app.color || "#CC1A2F", color: "white" }}
                >
                  <Icon size={36} />
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-eurosia-red transition-colors">{app.name}</h3>
                <p className="text-gray-400 font-bold text-sm leading-relaxed mb-10 flex-grow">
                   {app.description}
                </p>
                
                <div className="flex items-center justify-between pt-8 border-t border-gray-50 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Target</span>
                    <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">{app.category}</span>
                  </div>
                  <Link to="#" className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-eurosia-red group-hover:text-white transition-all shadow-sm">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </motion.div>
            );
          }) : (
            <div className="col-span-full py-40 text-center">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <Search size={40} />
               </div>
               <h3 className="text-3xl font-black text-gray-900">No Apps Found</h3>
               <p className="text-gray-400 font-bold">Try adjusting your search or category filters.</p>
            </div>
          )}
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-[48px] p-12 flex flex-col justify-center items-center text-center text-white border border-gray-800 relative overflow-hidden group min-h-[400px]"
          >
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800')] opacity-5 grayscale group-hover:scale-110 transition-transform duration-1000" />
             <div className="relative z-10">
                <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mb-10 mx-auto border border-white/10 group-hover:bg-eurosia-red transition-all">
                   <Zap size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tighter">Request a Custom Module</h3>
                <p className="text-gray-400 font-bold leading-relaxed mb-10 max-w-[240px] mx-auto uppercase text-[10px] tracking-widest">
                   Need a specialized tool for your unique workflows? Our engineering team is ready to build it.
                </p>
                <button className="w-full py-5 bg-eurosia-red hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/40">
                   Contact Ecosystem Team
                </button>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

