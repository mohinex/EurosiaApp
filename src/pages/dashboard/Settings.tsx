import { useState } from "react";
import { 
  Settings as SettingsIcon, Flag, Laptop, Terminal, 
  Shield, Globe, Palette, Bell, Save, RefreshCw, 
  Puzzle, Cpu, Cloud, Database
} from "lucide-react";
import { useSettingsStore } from "../../store/useSettingsStore";
import { motion } from "motion/react";

export default function Settings() {
  const { featureFlags, toggleFeature, whiteLabel, updateWhiteLabel } = useSettingsStore();
  const [activeTab, setActiveTab] = useState("features");

  const tabs = [
    { id: "features", label: "Feature Flags", icon: Flag },
    { id: "white-label", label: "White Label", icon: Palette },
    { id: "plugins", label: "Plugin System", icon: Puzzle },
    { id: "system", label: "System Config", icon: Terminal },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#CC1A2F] rounded-[24px] flex items-center justify-center text-white shadow-2xl">
               <SettingsIcon size={32} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tight">System <span className="text-[#CC1A2F]">Settings</span></h1>
               <p className="text-gray-500 font-medium">Manage ecosystem behavior, white-labeling, and core features.</p>
            </div>
         </div>
         <button className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all">
            <Save size={18} />
            Save Changes
         </button>
      </div>

      <div className="flex gap-4 p-2 bg-gray-100 rounded-3xl w-fit">
         {tabs.map(tab => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all ${
               activeTab === tab.id ? 'bg-white text-gray-900 shadow-lg' : 'text-gray-500 hover:text-gray-700'
             }`}
           >
             <tab.icon size={18} />
             {tab.label}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
         {activeTab === "features" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm space-y-10">
               <h2 className="text-2xl font-black text-gray-900">Feature Toggle Board</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(featureFlags).map(([key, enabled]) => (
                    <div key={key} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-[#B91C1C]/30 transition-all">
                       <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${enabled ? 'bg-[#B91C1C] text-white' : 'bg-gray-200 text-gray-400'}`}>
                             {key === 'aiAssistant' ? <Cpu size={24} /> : 
                              key === 'marketplace' ? <Puzzle size={24} /> : 
                              key === 'offlineMode' ? <Database size={24} /> : <Flag size={24} />}
                          </div>
                          <div>
                             <p className="font-black text-gray-900 uppercase text-xs tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</p>
                             <p className="text-sm text-gray-500 font-medium">{enabled ? 'Active and visible to users' : 'Disabled globally'}</p>
                          </div>
                       </div>
                       <button 
                        onClick={() => toggleFeature(key as any)}
                        className={`w-14 h-8 rounded-full relative transition-all ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                       >
                          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${enabled ? 'left-7' : 'left-1'}`} />
                       </button>
                    </div>
                  ))}
               </div>
            </motion.div>
         )}

         {activeTab === "white-label" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm space-y-10">
               <h2 className="text-2xl font-black text-gray-900">White Label Identity</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <label className="text-xs font-black uppercase tracking-widest text-gray-400">Ecosystem Brand Name</label>
                     <input 
                        type="text" 
                        value={whiteLabel.companyName}
                        onChange={(e) => updateWhiteLabel({ companyName: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 font-bold outline-none focus:ring-4 focus:ring-[#B91C1C]/10"
                     />
                  </div>
                  <div className="space-y-4">
                     <label className="text-xs font-black uppercase tracking-widest text-gray-400">Primary Brand Color</label>
                     <div className="flex items-center gap-4">
                        <input 
                           type="color" 
                           value={whiteLabel.primaryColor}
                           onChange={(e) => updateWhiteLabel({ primaryColor: e.target.value })}
                           className="w-12 h-12 rounded-xl cursor-pointer border-none p-0"
                        />
                        <input 
                           type="text" 
                           value={whiteLabel.primaryColor}
                           readOnly
                           className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-3 font-mono font-bold"
                        />
                     </div>
                  </div>
               </div>
               
               <div className="p-8 bg-gray-900 rounded-[32px] text-white">
                  <h4 className="font-black text-sm uppercase tracking-widest mb-6 opacity-60">Identity Preview</h4>
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-3xl" style={{ backgroundColor: whiteLabel.primaryColor }}>
                        {whiteLabel.companyName.charAt(0)}
                     </div>
                     <div>
                        <h3 className="text-2xl font-black tracking-tight">{whiteLabel.companyName}</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Ecosystem Node • v4.0</p>
                     </div>
                  </div>
               </div>
            </motion.div>
         )}

         {activeTab === "plugins" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm space-y-10">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-gray-900">Plugin Management</h2>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#B91C1C] transition-colors">Install Plugin</button>
               </div>
               <div className="space-y-4">
                  {[
                    { name: "Dynamic Pricing Engine", dev: "EUROSIA Core", status: "Active", deps: "AppInventory, AppFinance" },
                    { name: "SmsNex Gateway", dev: "Third Party", status: "Active", deps: "AppNotifications" },
                    { name: "AI Insight Engine", dev: "Experimental", status: "Inactive", deps: "AppAnalytics" },
                  ].map((plugin, i) => (
                    <div key={i} className="flex items-center justify-between p-6 border border-gray-50 rounded-3xl hover:border-[#CC1A2F]/20 transition-all">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                             <Puzzle size={24} />
                          </div>
                          <div>
                             <p className="font-black text-gray-900">{plugin.name}</p>
                             <p className="text-xs text-gray-500 font-medium">Dependency: <span className="text-[#CC1A2F]">{plugin.deps}</span></p>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${plugin.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                             {plugin.status}
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                             <SettingsIcon size={20} />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
         )}
      </div>
    </div>
  );
}
