import { PhoneCall, Radio, Mic, Shield, Smartphone, Globe, ArrowRight, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function CloudPBX() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-900 rounded-[24px] flex items-center justify-center text-white shadow-2xl">
               <PhoneCall size={40} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tight">EUROSIA <span className="text-[#B91C1C]">CloudPBX</span></h1>
               <p className="text-gray-500 font-medium mt-1">Enterprise-grade business telephony and call center infrastructure.</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">Active System</div>
            <button className="px-8 py-4 bg-[#B91C1C] text-white rounded-2xl font-black shadow-xl shadow-red-500/20 hover:scale-105 transition-transform">Configure Lines</button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <StatCard icon={Mic} label="Active Channels" value="128" />
         <StatCard icon={Smartphone} label="Registered Devices" value="45" />
         <StatCard icon={Globe} label="Global Regions" value="06" />
      </div>

      <div className="bg-gray-900 rounded-[48px] p-12 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[80px] -z-0" />
         <div className="relative z-10">
            <h2 className="text-3xl font-black mb-8">Unified Communication</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {["Auto Attendant", "Call Queuing", "IVR Builder", "Call Analytics"].map((feat, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                     <p className="text-sm font-black uppercase tracking-widest text-[#B91C1C] mb-2">0{i+1}</p>
                     <p className="font-bold">{feat}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div className="p-8 bg-white border border-gray-100 rounded-[32px] hover:shadow-xl transition-all group">
       <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#B91C1C] group-hover:text-white transition-all">
             <Icon size={20} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
       </div>
       <p className="text-4xl font-black text-gray-900">{value}</p>
    </div>
  );
}
