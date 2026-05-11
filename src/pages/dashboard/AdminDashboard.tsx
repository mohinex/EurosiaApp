import { useQuery } from "@tanstack/react-query";
import { 
  Building2, Users, CreditCard, LayoutDashboard, 
  TrendingUp, TrendingDown, DollarSign, Activity,
  ArrowUpRight, ArrowDownRight, MoreVertical, RefreshCcw, FileText
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "motion/react";

const revenueData = [
  { name: 'May 1', value: 30000 },
  { name: 'May 6', value: 35000 },
  { name: 'May 11', value: 32000 },
  { name: 'May 16', value: 45000 },
  { name: 'May 21', value: 42650 },
  { name: 'May 26', value: 55000 },
  { name: 'May 31', value: 58000 },
];

const subData = [
  { name: 'Starter', value: 1245, color: '#3B82F6' },
  { name: 'Business', value: 1020, color: '#10B981' },
  { name: 'Enterprise', value: 420, color: '#F59E0B' },
  { name: 'White Label', value: 160, color: '#8B5CF6' },
];

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetch("/api/admin/stats").then(res => res.json()),
  });

  const { data: activities } = useQuery({
    queryKey: ["admin-activities"],
    queryFn: () => fetch("/api/admin/activities").then(res => res.json()),
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <nav className="flex items-center gap-2 text-sm text-gray-400 font-bold uppercase tracking-wider mt-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#B91C1C]">Dashboard</span>
          </nav>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 shadow-sm">
             <Calendar className="text-[#B91C1C]" size={18} />
             <span>May 1, 2025 - May 31, 2025</span>
          </div>
          <button className="flex items-center gap-2 bg-[#B91C1C] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 hover:bg-[#991B1B] transition-all">
             <RefreshCcw size={18} />
             Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard icon={Building2} label="Total Companies" value={stats?.totalCompanies?.toLocaleString()} change="+12.5%" isInfo />
        <StatCard icon={Users} label="Total Users" value={stats?.totalUsers?.toLocaleString()} change="+15.3%" isInfo />
        <StatCard icon={Activity} label="Active Subscriptions" value={stats?.activeSubscriptions?.toLocaleString()} change="+9.8%" isInfo />
        <StatCard icon={DollarSign} label="Monthly Revenue" value={`$${stats?.monthlyRevenue?.toLocaleString()}`} change="+18.7%" isInfo />
        <StatCard icon={PieChart} label="Payment Success" value={`${stats?.paymentSuccess}%`} change="+2.4%" isInfo />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
              <p className="text-sm text-gray-400 font-medium">Monthly revenue growth and projections</p>
            </div>
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-600 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B91C1C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#B91C1C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dx={-10} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: '#B91C1C', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="value" stroke="#B91C1C" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscriptions Overview */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Subscriptions Overview</h2>
          <div className="flex-1 relative min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subData}
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total</p>
                <p className="text-3xl font-black text-gray-900 leading-none mt-1">2,845</p>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
             {subData.map(item => (
                <div key={item.name} className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                   <div>
                      <p className="text-gray-900 font-bold text-xs">{item.name}</p>
                      <p className="text-[10px] text-gray-400 font-medium">1,245 (43.7%)</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Recent Activities */}
         <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
               <button className="text-xs font-bold text-[#B91C1C] uppercase tracking-wider hover:underline">View All</button>
            </div>
            <div className="space-y-6">
               {(activities || []).map((activity: any) => (
                  <div key={activity.id} className="flex items-center gap-5 group cursor-pointer hover:bg-gray-50 -mx-2 p-2 rounded-2xl transition-all">
                     <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#B91C1C] shrink-0 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100 shadow-sm group-hover:shadow-md">
                        <Activity size={20} />
                     </div>
                     <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 leading-tight">{activity.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                     </div>
                     <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                           activity.type === 'Payment' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                           {activity.type}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Top Active Apps */}
         <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-xl font-bold text-gray-900">Top Active Apps</h2>
               <button className="text-xs font-bold text-[#B91C1C] uppercase tracking-wider hover:underline">View All</button>
            </div>
            <div className="space-y-8">
               {[
                  { name: 'EUROSIA POS', users: '1,245 Companies', pct: 78, color: '#B91C1C' },
                  { name: 'EUROSIA InvoiceNex', users: '1,102 Companies', pct: 65, color: '#10B981' },
                  { name: 'EUROSIA CashBook', users: '987 Companies', pct: 58, color: '#3B82F6' },
                  { name: 'EUROSIA CRM', users: '876 Companies', pct: 48, color: '#F59E0B' },
               ].map((app) => (
                  <div key={app.name} className="space-y-2">
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-sm font-bold text-gray-900">{app.name}</p>
                           <p className="text-xs text-gray-400">{app.users}</p>
                        </div>
                        <p className="text-xs font-black text-gray-900">{app.pct}%</p>
                     </div>
                     <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${app.pct}%` }}
                           transition={{ duration: 1, ease: 'easeOut' }}
                           className="h-full rounded-full" 
                           style={{ backgroundColor: app.color }}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, isInfo }: any) {
  const isPositive = change.startsWith("+");
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col">
       <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-gray-50 text-[#B91C1C] rounded-2xl flex items-center justify-center group-hover:bg-[#B91C1C] group-hover:text-white transition-all shadow-sm">
             <Icon size={24} />
          </div>
          <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tight py-1 px-2 rounded-full ${
             isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
             {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
             {change}
          </div>
       </div>
       <div className="mt-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
          <div className="flex items-center justify-between">
             <h3 className="text-2xl font-black text-gray-900 tracking-tight">{value}</h3>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">v/s last month</p>
       </div>
    </div>
  );
}

const Calendar = (props: any) => <Activity {...props} />;
const KeyInput = (props: any) => <FileText {...props} />;
