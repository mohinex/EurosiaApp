import { MapPin, Users, Navigation, Calendar, ClipboardCheck, PhoneCall, Zap, ArrowRight, Truck } from "lucide-react";

export default function FieldForce() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-600 rounded-[24px] flex items-center justify-center text-white shadow-2xl">
               <Truck size={40} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tight">EUROSIA <span className="text-[#B91C1C]">FieldForce</span></h1>
               <p className="text-gray-500 font-medium mt-1">Real-time team management and logistics optimization.</p>
            </div>
         </div>
         <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all">Live Tracking</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <StatCard icon={Users} label="Team Members" value="48" />
         <StatCard icon={MapPin} label="Active Tasks" value="156" />
         <StatCard icon={Navigation} label="Distance Today" value="1,240 km" />
      </div>

      <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900">Task Schedule</h2>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-10 h-10 rounded-full border-4 border-white" alt="" />
                  ))}
               </div>
               <button className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600">All Agents</button>
            </div>
         </div>

         <div className="space-y-4">
            {[
              { agent: "Rahim Ahmed", task: "Delivery - Sector 12", status: "In Progress", time: "09:00 - 11:30" },
              { agent: "Karim Ullah", task: "Maintenance - Gulshan 2", status: "Completed", time: "10:15 - 12:00" },
              { agent: "Jasim Uddin", task: "Site Visit - Banani", status: "Delayed", time: "11:00 - 13:00" },
              { agent: "Abul Foyez", task: "Equipment Pickup", status: "Scheduled", time: "14:00 - 15:30" }
            ].map((task, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl border border-gray-50 hover:border-gray-200 hover:shadow-xl transition-all group">
                 <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-[#B91C1C] group-hover:text-white transition-all">
                    <ClipboardCheck size={28} />
                 </div>
                 <div className="flex-1">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">{task.time}</p>
                    <h3 className="text-lg font-black text-gray-900">{task.task}</h3>
                    <p className="text-sm text-gray-500 font-medium">Agent: <span className="text-gray-900">{task.agent}</span></p>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      task.status === "Completed" ? "bg-green-50 text-green-600" :
                      task.status === "Delayed" ? "bg-red-50 text-[#B91C1C]" :
                      task.status === "In Progress" ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-500"
                    }`}>
                       {task.status}
                    </div>
                    <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-[#B91C1C] transition-colors">
                       <ArrowRight size={20} />
                    </button>
                 </div>
              </div>
            ))}
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
