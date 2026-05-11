import { useState } from "react";
import { 
  Key, Plus, Search, Filter, 
  Shield, Calendar, Users, Smartphone,
  MoreVertical, CheckCircle2, AlertCircle, XCircle,
  RefreshCw, ExternalLink, Download, ArrowRight,
  ShieldAlert, ShieldCheck, Lock, Unlock, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../lib/db";
import { licenseService } from "../../services/licenseService";

export default function Licenses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newLicense, setNewLicense] = useState({
    companyId: '',
    maxUsers: 10,
    maxDevices: 5,
    expiryDays: 365,
    offlineAllowed: true
  });

  const licenses = useLiveQuery(() => 
    db.licenses.toArray()
  ) || [];

  const filteredLicenses = licenses.filter(l => 
    l.licenseKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.companyId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerate = async () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + newLicense.expiryDays);

    await licenseService.createLicense({
      key: `EUR-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      licenseKey: `EUR-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`, // Duplicate for now
      companyId: newLicense.companyId || 'Nexus IT',
      startDate: new Date().toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: 'active',
      maxUsers: newLicense.maxUsers,
      maxDevices: newLicense.maxDevices,
      allowedModules: ['POS', 'ERP', 'CRM'],
      allowedFeatures: ['ALL'],
      offlineAllowed: newLicense.offlineAllowed,
      offlineGracePeriod: 7,
      lastValidatedAt: new Date().toISOString()
    } as any);
    setIsModalOpen(false);
  };

  const toggleStatus = async (license: any) => {
     const nextStatus = license.status === 'active' ? 'blocked' : 'active';
     await db.licenses.update(license.id, { status: nextStatus });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#B91C1C] rounded-[24px] flex items-center justify-center text-white shadow-2xl">
               <Key size={32} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tight">Ecosystem <span className="text-[#B91C1C]">Licenses</span></h1>
               <p className="text-gray-500 font-medium">Generate and manage enterprise license keys and module access.</p>
            </div>
         </div>
         <button 
           onClick={() => setIsModalOpen(true)}
           className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all"
         >
            <Plus size={18} />
            Generate License
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatCard label="Total Licenses" value={licenses.length} icon={Key} />
         <StatCard label="Active Keys" value={licenses.filter(l => l.status === 'active').length} icon={ShieldCheck} />
         <StatCard label="Expired/Blocked" value={licenses.filter(l => l.status !== 'active').length} icon={AlertCircle} />
      </div>

      <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="text" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search by key, company or license ID..."
                 className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-[#B91C1C]/10 transition-all"
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="text-left">
                     <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">License ID & Key</th>
                     <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Partner / Company</th>
                     <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Expiration</th>
                     <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Usage Limits</th>
                     <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                     <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredLicenses.map(item => (
                    <tr key={item.id} className="group">
                       <td className="py-6">
                          <div className="flex flex-col">
                             <span className="text-xs font-black text-[#B91C1C] uppercase tracking-[0.1em] mb-1">{item.id}</span>
                             <span className="font-mono text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded inline-block w-fit tracking-tighter">{item.licenseKey}</span>
                          </div>
                       </td>
                       <td className="py-6">
                          <p className="font-black text-gray-900">{item.companyId}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.allowedModules?.length || 0} Modules Active</p>
                       </td>
                       <td className="py-6">
                          <div className="flex items-center gap-2 text-sm font-black text-gray-900">
                             <Calendar size={14} className="text-gray-400" />
                             {new Date(item.expiryDate).toLocaleDateString()}
                          </div>
                       </td>
                       <td className="py-6">
                          <div className="flex items-center gap-6">
                             <div>
                                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Users Max</p>
                                <p className="text-sm font-black">{item.maxUsers}</p>
                             </div>
                             <div>
                                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Devices Max</p>
                                <p className="text-sm font-black">{item.maxDevices}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-6">
                          <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            item.status === 'active' ? 'bg-green-50 text-green-600' :
                            item.status === 'expired' ? 'bg-amber-50 text-amber-500' :
                            'bg-red-50 text-[#B91C1C]'
                          }`}>
                            {item.status}
                          </div>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button 
                               onClick={() => toggleStatus(item)}
                               className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors"
                             >
                                {item.status === 'active' ? <Lock size={18} /> : <Unlock size={18} />}
                             </button>
                             <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-colors">
                                <Download size={18} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal Integration */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-sm">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="bg-white rounded-[48px] p-10 w-full max-w-xl shadow-2xl space-y-8"
             >
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-black text-gray-900">New License Key</h2>
                   <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                      <X size={24} />
                   </button>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Enterprise Company Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Nexus Global"
                        onChange={(e) => setNewLicense({...newLicense, companyId: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold outline-none" 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Max Users</label>
                        <input 
                          type="number" 
                          value={newLicense.maxUsers}
                          onChange={(e) => setNewLicense({...newLicense, maxUsers: parseInt(e.target.value)})}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold outline-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Max Devices</label>
                        <input 
                          type="number" 
                          value={newLicense.maxDevices}
                          onChange={(e) => setNewLicense({...newLicense, maxDevices: parseInt(e.target.value)})}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold outline-none" 
                        />
                      </div>
                   </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  className="w-full py-5 bg-[#B91C1C] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-[#991B1B] transition-all"
                >
                   Generate Service Key
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm group">
       <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#B91C1C] group-hover:text-white transition-all">
             <Icon size={20} />
          </div>
       </div>
       <p className="text-3xl font-black text-gray-900">{value}</p>
    </div>
  );
}
