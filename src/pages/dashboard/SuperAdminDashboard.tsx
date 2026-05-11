import { useQuery } from "@tanstack/react-query";
import { 
  Building2, Users, CreditCard, LayoutDashboard, 
  TrendingUp, TrendingDown, DollarSign, Activity,
  ArrowUpRight, ArrowDownRight, MoreVertical, RefreshCcw, FileText,
  Calendar, ShieldCheck, Globe, Bell, Search, CheckCircle2,
  Layout, Grid3X3, Smartphone, Key, Filter, Layers, Server, Database,
  ChevronDown, ChevronRight, Settings
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { motion } from "motion/react";
import { desktopService } from "../../services/desktopService";

const revenueData = [
  { name: 'May 1', value: 30000 },
  { name: 'May 6', value: 35000 },
  { name: 'May 11', value: 32000 },
  { name: 'May 16', value: 45000, label: 'Revenue: $42,650' },
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

export default function SuperAdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => ({
      totalCompanies: 1248,
      totalUsers: 24532,
      activeSubscriptions: 2845,
      monthlyRevenue: 48650,
      paymentSuccess: 96.8
    }),
  });

  const { data: activities } = useQuery({
    queryKey: ["admin-activities"],
    queryFn: () => [
      { id: 1, type: "Company", text: "New company 'Tech Solutions Ltd.' registered", time: "2 minutes ago", status: "Active" },
      { id: 2, type: "Payment", text: "Payment received from 'Alpha Traders'", time: "15 minutes ago", amount: 1299 },
      { id: 3, type: "User", text: "New user 'John Doe' added", time: "25 minutes ago", status: "Active" },
      { id: 4, type: "Subscription", text: "Subscription upgraded by 'Beta Industries'", time: "45 minutes ago", status: "Active" },
      { id: 5, type: "System", text: "bKash payment method updated", time: "1 hour ago", status: "Active" }
    ],
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Dashboard</h1>
          <nav className="flex items-center gap-2 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mt-2">
            <span>Home</span>
            <ChevronRight size={10} />
            <span className="text-eurosia-red font-black">Dashboard</span>
          </nav>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-3 bg-white border border-gray-100 px-6 py-4 rounded-[20px] shadow-sm text-xs font-black uppercase tracking-wider text-gray-600">
             <Calendar className="text-eurosia-red" size={18} />
             <span>May 1, 2025 - May 31, 2025</span>
             <ChevronDown size={14} className="text-gray-400" />
          </div>
          <button className="flex items-center gap-3 bg-eurosia-red text-white px-8 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all">
             <RefreshCcw size={18} />
             Refresh Dashboard
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <SuperStatCard icon={Building2} label="Total Companies" value="1,248" change="+12.5%" isPositive color="#F43F5E" />
        <SuperStatCard icon={Users} label="Total Users" value="24,532" change="+15.3%" isPositive color="#3B82F6" />
        <SuperStatCard icon={CheckCircle2} label="Active Subscriptions" value="2,845" change="+9.8%" isPositive color="#10B981" />
        <SuperStatCard icon={DollarSign} label="Monthly Revenue" value="$48,650" change="+18.7%" isPositive color="#F59E0B" />
        <SuperStatCard icon={PieChart} label="Payment Success" value="96.8%" change="+2.4%" isPositive color="#8B5CF6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm flex flex-col group">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Revenue Overview</h2>
            </div>
            <select className="bg-gray-50 border-none rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 outline-none cursor-pointer">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorSupRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CC1A2F" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#CC1A2F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dx={-15} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                   cursor={{ stroke: '#CC1A2F', strokeWidth: 2, strokeDasharray: '5 5' }}
                   contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '20px', color: '#fff', padding: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
                   itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}
                   labelStyle={{ color: '#64748B', fontWeight: 'bold', fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Area type="monotone" dataKey="value" stroke="#CC1A2F" strokeWidth={5} fillOpacity={1} fill="url(#colorSupRev)" dot={{ r: 8, fill: '#CC1A2F', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 10, strokeWidth: 0, fill: '#11135E shadow-2xl' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscriptions Overview */}
        <div className="bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm flex flex-col">
          <h2 className="text-xl font-black text-gray-900 tracking-tight mb-10 text-center">Subscriptions Overview</h2>
          <div className="flex-1 relative min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subData}
                    innerRadius={85}
                    outerRadius={120}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {subData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} className="outline-none" />
                    ))}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total</p>
                <p className="text-5xl font-black text-gray-900 leading-none">2,845</p>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-10 p-4 bg-gray-50 rounded-3xl">
             {subData.map(item => (
                <div key={item.name} className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: item.color }}></div>
                   <div>
                      <p className="text-gray-900 font-extrabold text-[10px] uppercase tracking-wider">{item.name}</p>
                      <p className="text-[14px] text-gray-400 font-black tracking-tight">{item.value.toLocaleString()} <span className="text-[8px] opacity-60">({Math.round(item.value/2845*100)}%)</span></p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* System Status */}
         <div className="bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm lg:col-span-1">
            <h2 className="text-xl font-black text-gray-900 tracking-tight mb-10">System Status</h2>
            <div className="space-y-4">
               <StatusRow icon={Server} label="Server Status" text="All systems operational" color="green" />
               <StatusRow icon={Database} label="Database" text="Connected" color="green" />
               <StatusRow icon={Activity} label="Storage" text="68% Used" color="yellow" />
               <StatusRow icon={RefreshCcw} label="Backup" text="Last backup: 2h ago" color="green" />
               <StatusRow icon={Globe} label="Offline Sync" text="All Clients Online" color="green" />
            </div>
            <button className="w-full mt-10 py-5 bg-gray-900 hover:bg-black rounded-2xl text-[10px] font-black text-white uppercase tracking-widest transition-all shadow-xl">
               View Full Systems Log
            </button>
         </div>

         {/* Recent Activities */}
         <div className="bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Activities</h2>
               <button className="text-[10px] font-black text-eurosia-red uppercase tracking-[0.2em] hover:bg-red-50 px-4 py-2 rounded-full transition-colors">View All Activities</button>
            </div>
            <div className="space-y-6">
               {(activities || []).map((activity: any) => (
                  <div key={activity.id} className="flex items-center gap-6 group cursor-pointer hover:bg-gray-50 -mx-4 p-5 rounded-[24px] transition-all border border-transparent hover:border-gray-100">
                     <div className="w-14 h-14 bg-white text-eurosia-red rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-gray-100 group-hover:bg-eurosia-red group-hover:text-white transition-all">
                        <Activity size={24} />
                     </div>
                     <div className="flex-1">
                        <p className="text-sm font-extrabold text-gray-900 leading-tight">{activity.text}</p>
                        <p className="text-[10px] text-gray-400 font-black mt-1.5 uppercase tracking-[0.1em]">{activity.time}</p>
                     </div>
                     <div className="text-right flex flex-col items-end gap-3">
                        {activity.amount && <span className="text-lg font-black text-green-600 tracking-tighter">${activity.amount.toLocaleString()}</span>}
                        <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                           activity.type === 'Payment' ? 'bg-green-50 text-green-600 border-green-100' : 
                           activity.type === 'Company' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                           'bg-red-50 text-red-600 border-red-100'
                        }`}>
                           {activity.type}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Top Active Apps & Recent Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white rounded-[32px] p-10 border border-gray-50 shadow-sm">
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-xl font-black text-gray-900 tracking-tight">Top Active Apps</h2>
               <button className="text-xs font-black text-[#B91C1C] uppercase tracking-[0.2em] hover:underline">View All</button>
            </div>
            <div className="space-y-8">
               {[
                  { name: 'EUROSA POS', subs: '1,245 Companies', pct: 78, color: '#B91C1C' },
                  { name: 'EUROSA InvoiceNex', subs: '1,102 Companies', pct: 65, color: '#10B981' },
                  { name: 'EUROSA CashBook', subs: '987 Companies', pct: 58, color: '#3B82F6' },
                  { name: 'EUROSA CRM', subs: '876 Companies', pct: 48, color: '#F59E0B' },
                  { name: 'EUROSA CloudPBX', subs: '754 Companies', pct: 42, color: '#3B82F6' },
               ].map((app) => (
                  <div key={app.name} className="flex items-center gap-6">
                     <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
                        <Layers size={24} className="text-gray-400" />
                     </div>
                     <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-end">
                           <p className="text-sm font-black text-gray-900">{app.name}</p>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{app.subs}</p>
                        </div>
                        <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                           <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${app.pct}%`, backgroundColor: app.color }} />
                        </div>
                     </div>
                     <span className="text-xs font-black text-gray-900 w-10 text-right">{app.pct}%</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-white rounded-[32px] p-10 border border-gray-50 shadow-sm">
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Companies</h2>
               <button className="text-xs font-black text-[#B91C1C] uppercase tracking-[0.2em] hover:underline">View All</button>
            </div>
            <div className="space-y-6">
               {[
                  { name: "Tech Solutions Ltd.", joined: "Registered: 2 minutes ago", status: "Active" },
                  { name: "Alpha Traders", joined: "Registered: 15 minutes ago", status: "Active" },
                  { name: "Beta Industries", joined: "Registered: 1 hour ago", status: "Active" },
                  { name: "Gamma Corporation", joined: "Registered: 2 hours ago", status: "Pending", isAlt: true },
                  { name: "Delta Services", joined: "Registered: 3 hours ago", status: "Active" },
               ].map((company) => (
                  <div key={company.name} className="flex items-center gap-5 border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                     <div className="w-12 h-12 bg-red-50 text-[#B91C1C] rounded-2xl flex items-center justify-center shrink-0 font-black">
                        {company.name.charAt(0)}
                     </div>
                     <div className="flex-1">
                        <h4 className="text-sm font-black text-gray-900">{company.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{company.joined}</p>
                     </div>
                     <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        company.isAlt ? 'bg-orange-50 text-orange-500 border border-orange-100' : 'bg-green-50 text-green-500 border border-green-100'
                     }`}>
                        {company.status}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Quick Access Bottom Bar */}
      <div className="bg-white rounded-[32px] p-8 border border-gray-50 shadow-sm">
         <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Quick Access</h2>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <QuickAccessBtn icon={Building2} label="Add Company" color="#3B82F6" />
            <QuickAccessBtn icon={Users} label="Add User" color="#3B82F6" />
            <QuickAccessBtn icon={Gift} label="Create Package" color="#F59E0B" />
            <QuickAccessBtn icon={CreditCard} label="Add Payment Method" color="#10B981" />
            <QuickAccessBtn icon={Key} label="Generate License" color="#3B82F6" />
            <QuickAccessBtn icon={Settings} label="System Settings" color="#0A0A0A" />
         </div>
      </div>
    </div>
  );
}

function SuperStatCard({ icon: Icon, label, value, change, isPositive, color }: any) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm group hover:shadow-xl transition-all">
       <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 bg-red-50 text-[#B91C1C] rounded-2xl flex items-center justify-center shadow-sm border border-red-100 group-hover:bg-[#B91C1C] group-hover:text-white transition-all">
             <Icon size={28} />
          </div>
          <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
             {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
             {change}
          </div>
       </div>
       <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
             <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
          </div>
          <p className={`text-[10px] font-black uppercase tracking-widest mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
             {change} <span className="text-gray-400">this month</span>
          </p>
       </div>
    </div>
  );
}

function StatusRow({ icon: Icon, label, text, color }: any) {
   const colorClass = color === 'green' ? 'bg-green-500' : color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500';
   return (
      <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
               <Icon size={20} />
            </div>
            <div>
               <p className="text-sm font-black text-gray-900 leading-none">{label}</p>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">{text}</p>
            </div>
         </div>
         <div className={`w-3 h-3 rounded-full ${colorClass} ${color === 'green' && 'animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`} />
      </div>
   );
}

function QuickAccessBtn({ icon: Icon, label, color }: any) {
  return (
    <button className="flex items-center gap-3 bg-white hover:bg-gray-50 border border-gray-100 px-4 py-4 rounded-2xl transition-all shadow-sm group">
       <Icon size={20} className="text-gray-400 group-hover:text-gray-800 transition-colors shrink-0" />
       <span className="text-xs font-black text-gray-900 leading-tight text-left">{label}</span>
    </button>
  );
}

const Gift = (props: any) => <TrendingUp {...props} />;
