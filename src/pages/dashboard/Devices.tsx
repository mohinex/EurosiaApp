import { useState } from "react";
import { 
  Smartphone, Monitor, Tablet, Laptop, 
  Search, Filter, Plus, Shield, ShieldAlert,
  ShieldCheck, Trash2, MoreVertical, Activity,
  Globe, User, MapPin, Clock, Lock, Unlock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../lib/db";
import { licenseService } from "../../services/licenseService";

export default function Devices() {
  const [searchTerm, setSearchTerm] = useState("");

  const devices = useLiveQuery(() => 
    db.devices.toArray()
  ) || [];

  const filteredDevices = devices.filter(dev => 
    dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dev.companyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dev.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const registerCurrentDevice = async () => {
    const fingerprint = licenseService.generateFingerprint();
    const existing = await db.devices.where('fingerprint').equals(fingerprint).first();
    
    if (existing) {
       alert("This device is already registered.");
       return;
    }

    await db.devices.add({
      id: `DEV-${Math.floor(Math.random() * 9000) + 1000}`,
      name: `Agent-Node-${Math.floor(Math.random() * 100)}`,
      platform: navigator.platform.includes('Win') ? 'Windows' : 'Unix',
      companyId: 'Nexus IT',
      userId: 'Admin',
      lastActiveAt: new Date().toISOString(),
      status: 'active',
      isBlocked: false,
      fingerprint,
      sortOrder: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  const toggleBlock = async (device: any) => {
    const nextStatus = device.status === 'blocked' ? 'active' : 'blocked';
    await db.devices.update(device.id, { 
       status: nextStatus,
       isBlocked: nextStatus === 'blocked'
    });
  };

  const deleteDevice = async (id: string) => {
    if (confirm("Are you sure you want to remove this device node?")) {
      await db.devices.delete(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#B91C1C] rounded-[24px] flex items-center justify-center text-white shadow-2xl">
               <Smartphone size={32} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tight">Connected <span className="text-[#B91C1C]">Devices</span></h1>
               <p className="text-gray-500 font-medium">Monitor ecosystem node endpoints and enforce device-level security.</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <button 
              onClick={registerCurrentDevice}
              className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all"
            >
              Register This Device
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <StatCard label="Total Devices" value={devices.length} />
         <StatCard label="Active Now" value={devices.filter(d => d.status === 'active').length} />
         <StatCard label="Blocked" value={devices.filter(d => d.status === 'blocked').length} />
         <StatCard label="Security Alerts" value="0" />
      </div>

      <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm overflow-hidden">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="text" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search by device ID, user or company..."
                 className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-[#B91C1C]/10 transition-all"
               />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDevices.map((dev) => (
              <motion.div 
                key={dev.id}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-[40px] border transition-all ${
                  dev.status === 'blocked' ? 'bg-red-50/30 border-red-100' : 'bg-white border-gray-100 hover:shadow-2xl'
                }`}
              >
                 <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      dev.status === 'blocked' ? 'bg-[#B91C1C] text-white' : 'bg-gray-900 text-white shadow-xl'
                    }`}>
                       {dev.platform?.includes('Windows') ? <Monitor size={28} /> : 
                        dev.platform?.includes('iOS') ? <Tablet size={28} /> : 
                        <Smartphone size={28} />}
                    </div>
                    <div className="flex flex-col items-end">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         dev.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-[#B91C1C] text-white'
                       }`}>
                          {dev.status}
                       </span>
                       <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">{dev.platform} OS</span>
                    </div>
                 </div>

                 <div className="mb-8">
                    <h3 className="text-xl font-black text-gray-900 leading-none mb-2">{dev.name}</h3>
                    <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-4">{dev.id} • {dev.fingerprint}</p>
                    
                    <div className="space-y-3">
                       <div className="flex items-center gap-3">
                          <User size={14} className="text-gray-400" />
                          <p className="text-sm font-bold text-gray-700">{dev.userId || 'System Admin'}</p>
                       </div>
                       <div className="flex items-center gap-3">
                          <Globe size={14} className="text-gray-400" />
                          <p className="text-sm font-bold text-gray-700">{dev.companyId}</p>
                       </div>
                       <div className="flex items-center gap-3">
                          <Clock size={14} className="text-gray-400" />
                          <p className="text-xs font-bold text-gray-500">Last active: <span className="text-gray-900">{new Date(dev.lastActiveAt).toLocaleString()}</span></p>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-2 pt-8 border-t border-gray-50">
                    <button 
                      onClick={() => toggleBlock(dev)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        dev.status === 'blocked' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 text-gray-600 hover:bg-[#B91C1C] hover:text-white'
                      }`}
                    >
                       {dev.status === 'blocked' ? <Unlock size={14} /> : <Lock size={14} />}
                       {dev.status === 'blocked' ? 'Unblock' : 'Block Device'}
                    </button>
                    <button 
                      onClick={() => deleteDevice(dev.id)}
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-[#B91C1C] transition-all"
                    >
                       <Trash2 size={18} />
                    </button>
                 </div>
              </motion.div>
            ))}

            {filteredDevices.length === 0 && (
               <div className="col-span-full py-20 text-center border-4 border-dashed border-gray-50 rounded-[40px]">
                  <p className="text-gray-400 font-bold">No connected devices found matching your search.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</p>
       <p className="text-2xl font-black text-gray-900">{value}</p>
    </div>
  );
}
