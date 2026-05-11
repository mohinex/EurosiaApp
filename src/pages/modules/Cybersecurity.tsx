import { ShieldAlert, ShieldCheck, Lock, Eye, Radar, Zap, ArrowRight, Shield } from "lucide-react";

export default function Cybersecurity() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#B91C1C] rounded-[24px] flex items-center justify-center text-white shadow-2xl">
               <Shield size={40} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tight">EUROSIA <span className="text-[#B91C1C]">CyberSec</span></h1>
               <p className="text-gray-500 font-medium mt-1">Zero-trust security layer for your entire app ecosystem.</p>
            </div>
         </div>
         <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all">Security Audit</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <StatCard icon={ShieldCheck} label="System Health" value="99%" color="text-green-500" />
         <StatCard icon={ShieldAlert} label="Threats Blocked" value="1,204" color="text-[#B91C1C]" />
         <StatCard icon={Lock} label="Encrypted Nodes" value="450" color="text-blue-500" />
         <StatCard icon={Eye} label="Active Monitoring" value="24/7" color="text-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="p-10 bg-gray-900 text-white rounded-[48px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B91C1C]/20 blur-[80px] -z-0" />
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                  <Radar className="text-[#B91C1C] animate-spin-slow" size={32} />
                  <h2 className="text-2xl font-black">Live Threat Map</h2>
               </div>
               <div className="aspect-video bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Real-time Visualization Active</p>
               </div>
            </div>
         </div>

         <div className="p-10 bg-white border border-gray-100 rounded-[48px] shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Recent Alerts</h2>
            <div className="space-y-6">
               {[
                 { title: "Unauthorized Login Attempt", desc: "Blocked from IP 192.168.1.105", time: "2 mins ago" },
                 { title: "SSL Certificate Renewal", desc: "Auto-renewed for app.eurosia.com", time: "1 hour ago" },
                 { title: "DDoS Mitigation Active", desc: "Traffic filter spike detected and handled", time: "4 hours ago" }
               ].map((alert, i) => (
                 <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#B91C1C] shrink-0 group-hover:scale-110 transition-transform">
                       <ShieldAlert size={20} />
                    </div>
                    <div>
                       <p className="font-bold text-gray-900 leading-none mb-1">{alert.title}</p>
                       <p className="text-xs text-gray-500 font-medium">{alert.desc}</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">{alert.time}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="p-8 bg-white border border-gray-100 rounded-[32px] hover:shadow-xl transition-all group">
       <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#B91C1C] group-hover:text-white transition-all">
             <Icon size={20} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
       </div>
       <p className={`text-4xl font-black ${color}`}>{value}</p>
    </div>
  );
}
