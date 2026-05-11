import { useQuery } from "@tanstack/react-query";
import { 
  ShoppingBag, Wallet, ArrowDownCircle, TrendingUp, Clock, 
  Search, Bell, Plus, Globe, ChevronDown, 
  LayoutGrid, Activity, Calendar, MessageSquare, 
  CheckCircle2, FileText, ChevronRight, RefreshCw,
  HardDrive, Database, Building2, User, Users, Upload
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { motion } from "motion/react";
import { useAuthStore } from "../../store/useAuthStore";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../lib/db";
import { desktopService } from "../../services/desktopService";

const salesData = [
  { name: '01 May', value: 40000 },
  { name: '06 May', value: 65000 },
  { name: '11 May', value: 50000 },
  { name: '16 May', value: 125000, label: '৳ 1,25,000' },
  { name: '21 May', value: 85000 },
  { name: '26 May', value: 95000 },
  { name: '31 May', value: 110000 },
];

const transactionData = [
  { name: 'POS Sales', value: 38, color: '#F43F5E' },
  { name: 'Invoices', value: 28, color: '#10B981' },
  { name: 'Purchases', value: 18, color: '#8B5CF6' },
  { name: 'Payments', value: 10, color: '#F59E0B' },
  { name: 'Others', value: 6, color: '#3B82F6' },
];

export default function TenantDashboard() {
  const { user } = useAuthStore();
  const pendingChanges = useLiveQuery(() => db.syncQueue.count());

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Top Header/Banner */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Welcome back, {user?.firstName || 'Admin'}! 👋
            </h1>
            <p className="text-gray-400 mt-2 font-medium">Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-6 px-6 py-3 bg-[#1E293B] rounded-2xl border border-white/5 shadow-xl">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full" />
                   <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">License</span>
                      <span className="text-sm font-bold">Enterprise</span>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-blue-500 rounded-full" />
                   <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Devices</span>
                      <span className="text-sm font-bold">5 / 10</span>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full" />
                   <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Subscription</span>
                      <span className="text-sm font-bold">Active</span>
                   </div>
                </div>
             </div>
             <button className="px-6 py-3 bg-[#B91C1C] hover:bg-[#991B1B] text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-red-900/20 transition-all">
                <TrendingUp size={18} />
                Upgrade Plan
             </button>
          </div>
        </div>

        {/* Sales Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <StatBox label="Total Sales" value="৳ 8,75,000" icon={ShoppingBag} change="+ 12.5%" isPositive color="#F43F5E" />
          <StatBox label="Total Income" value="৳ 12,45,000" icon={Wallet} change="+ 8.3%" isPositive color="#8B5CF6" />
          <StatBox label="Total Expenses" value="৳ 3,25,000" icon={ArrowDownCircle} change="- 4.2%" isPositive={false} color="#F59E0B" />
          <StatBox label="Total Profit" value="৳ 9,20,000" icon={TrendingUp} change="+ 15.7%" isPositive color="#10B981" />
          <StatBox label="Total Due" value="৳ 2,15,000" icon={Clock} valueLabel="View Details" color="#3B82F6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Overview */}
          <div className="lg:col-span-2 bg-[#1E293B] rounded-[32px] p-8 border border-white/5 relative overflow-hidden">
             <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-xl font-bold">Sales Overview</h2>
                <select className="bg-[#0F172A] border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-400 outline-none">
                  <option>This Month</option>
                  <option>Last Month</option>
                </select>
             </div>
             <div className="h-[300px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dx={-10} tickFormatter={(v) => `${v/1000}k`} />
                      <Tooltip 
                        content={({ active, payload }: any) => {
                          if (active && payload && payload.length) {
                             return (
                               <div className="bg-[#0F172A] border border-white/10 p-3 rounded-xl shadow-2xl">
                                  <p className="text-xs text-gray-400 font-bold mb-1">{payload[0].payload.name}</p>
                                  <p className="text-sm font-black text-white">{payload[0].payload.label || `৳ ${payload[0].value.toLocaleString()}`}</p>
                               </div>
                             );
                          }
                          return null;
                        }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#F43F5E" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" dot={{ r: 6, fill: '#F43F5E', strokeWidth: 2, stroke: '#fff' }} />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Business Snapshot */}
          <div className="bg-[#1E293B] rounded-[32px] p-8 border border-white/5">
             <h2 className="text-xl font-bold mb-8">Business Snapshot</h2>
             <div className="h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie
                        data={transactionData}
                        innerRadius={70}
                        outerRadius={95}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {transactionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                   </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Total</p>
                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Transactions</p>
                   <p className="text-4xl font-black mt-2 leading-none">2,453</p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8">
                {transactionData.map(item => (
                   <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                         <span className="text-xs font-bold text-gray-400">{item.name}</span>
                      </div>
                      <span className="text-xs font-black">{item.value}%</span>
                   </div>
                ))}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* My Apps Icons */}
           <div className="bg-[#1E293B] rounded-[32px] p-8 border border-white/5">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-bold">My Apps</h2>
                 <button className="text-xs font-bold text-[#3B82F6] hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-6">
                 {[
                   { name: 'POS', color: '#F43F5E', icon: ShoppingBag },
                   { name: 'Inventory', color: '#F59E0B', icon: LayoutGrid },
                   { name: 'InvoiceNex', color: '#10B981', icon: FileText },
                   { name: 'CashBook', color: '#3B82F6', icon: Wallet },
                   { name: 'CRM', color: '#8B5CF6', icon: Users },
                   { name: 'HR & Payroll', color: '#10B981', icon: Users },
                   { name: 'Project', color: '#F59E0B', icon: Activity },
                   { name: 'Accounting', color: '#10B981', icon: DollarSign },
                   { name: 'Reports', color: '#F43F5E', icon: Activity },
                   { name: 'More Apps', color: '#475569', icon: Plus },
                 ].map((app, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                       <div 
                         className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg" 
                         style={{ backgroundColor: app.color }}
                       >
                          <app.icon size={24} className="text-white" />
                       </div>
                       <span className="text-[10px] font-bold text-gray-400 text-center tracking-tight truncate w-full">{app.name}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Recent Activity */}
           <div className="bg-[#1E293B] rounded-[32px] p-8 border border-white/5">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-bold">Recent Activity</h2>
                 <button className="text-xs font-bold text-[#3B82F6] hover:underline">View All</button>
              </div>
              <div className="space-y-6">
                 {[
                   { text: "Invoice INV-2025-0001 created", time: "2 minutes ago", tag: "Invoice", tagColor: "#10B981" },
                   { text: "Payment of ৳ 25,000 received", time: "15 minutes ago", tag: "Payment", tagColor: "#10B981" },
                   { text: "New customer Akib Store added", time: "1 hour ago", tag: "Customer", tagColor: "#3B82F6" },
                   { text: "Purchase PUR-2025-0003 created", time: "2 hours ago", tag: "Purchase", tagColor: "#F59E0B" },
                   { text: "Expense of ৳ 5,600 added", time: "3 hours ago", tag: "Expense", tagColor: "#F43F5E" },
                 ].map((act, i) => (
                    <div key={i} className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center border border-white/5">
                          <Clock size={16} className="text-gray-500" />
                       </div>
                       <div className="flex-1">
                          <p className="text-sm font-bold leading-tight">{act.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{act.time}</p>
                       </div>
                       <div className="px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest" style={{ backgroundColor: act.tagColor + '20', color: act.tagColor }}>
                          {act.tag}
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Announcements & Quick Actions */}
           <div className="space-y-6">
              <div className="bg-[#1E293B] rounded-[32px] p-8 border border-white/5">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Quick Actions</h2>
                </div>
                <div className="space-y-3">
                   {[
                     { label: "Create Invoice", icon: FileText, color: "#F43F5E" },
                     { label: "Add New Customer", icon: Users, color: "#10B981" },
                     { label: "Create Purchase", icon: ShoppingBag, color: "#F59E0B" },
                     { label: "Add Expense", icon: Wallet, color: "#8B5CF6" },
                     { label: "Create POS Order", icon: ShoppingBag, color: "#3B82F6" },
                     { label: "View Reports", icon: Activity, color: "#B91C1C" },
                   ].map((btn, i) => (
                     <button key={i} className="w-full flex items-center justify-between p-4 bg-[#0F172A] hover:bg-black rounded-2xl border border-white/5 transition-all group">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: btn.color }}>
                              <btn.icon size={18} className="text-white" />
                           </div>
                           <span className="text-sm font-bold">{btn.label}</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                     </button>
                   ))}
                </div>
              </div>
           </div>
        </div>

        {/* Footer / Status Bar */}
        <div className="bg-[#1E293B] rounded-3xl p-6 border border-white/5 flex flex-wrap justify-between items-center gap-8">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                 <div className={`w-3 h-3 rounded-full animate-pulse ${pendingChanges ? "bg-amber-500" : "bg-green-500"}`} />
                 <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Device ID</span>
                    <span className="text-sm font-bold truncate max-w-[80px]">{(localStorage.getItem('eurosia_device_id') || 'Detecting...').split('-')[0]}</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <Clock size={20} className="text-[#B91C1C]" />
                 <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Last Sync</span>
                    <span className="text-sm font-bold">2 minutes ago</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <Database size={20} className="text-[#B91C1C]" />
                 <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Local DB</span>
                    <span className="text-sm font-bold">SQLite</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <HardDrive size={20} className="text-[#B91C1C]" />
                 <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Cloud DB</span>
                    <span className="text-sm font-bold">PostgreSQL</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <Building2 size={20} className="text-[#B91C1C]" />
                 <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Company</span>
                    <span className="text-sm font-bold">{user?.tenant?.name || 'EUROSIA LTD.'}</span>
                 </div>
              </div>
           </div>
           
           <div className="flex items-center gap-8">
              <div className="flex gap-2">
                 <button 
                   onClick={() => desktopService.createLocalBackup()}
                   className="flex items-center gap-2 bg-[#1E293B] hover:bg-black text-white px-6 py-4 rounded-2xl font-bold transition-all border border-white/10"
                 >
                    <HardDrive size={18} />
                    Backup
                 </button>
                 <button 
                  onClick={() => document.getElementById('restore-input')?.click()}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-2xl font-bold transition-all border border-white/5"
                >
                   <Upload size={18} />
                   Restore
                </button>
                <input 
                  type="file" 
                  id="restore-input" 
                  className="hidden" 
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) desktopService.restoreFromBackup(file).then(() => window.location.reload());
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                 <Calendar size={20} className="text-[#B91C1C]" />
                 <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Financial Year</span>
                    <span className="text-sm font-bold">2025 (Jan - Dec)</span>
                 </div>
              </div>
              <button className="flex items-center gap-2 bg-[#B91C1C] hover:bg-[#991B1B] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-red-900/30">
                 <RefreshCw size={18} />
                 Sync Now
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}

function StatBox({ label, value, icon: Icon, change, isPositive, color, valueLabel }: any) {
  return (
    <div className="bg-[#1E293B] p-6 rounded-[32px] border border-white/5 flex flex-col group hover:-translate-y-1 transition-all">
       <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: color }}>
             <Icon size={24} className="text-white" />
          </div>
          {change && (
            <div className={`p-1.5 rounded-full ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
               {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            </div>
          )}
       </div>
       <div className="space-y-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</p>
          <div className="flex items-end justify-between">
             <h3 className="text-2xl font-black">{value}</h3>
             {change && <span className={`text-[10px] font-black ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{change} <span className="text-gray-500">vs last month</span></span>}
             {valueLabel && <span className="text-[10px] font-black text-[#3B82F6] cursor-pointer hover:underline">{valueLabel}</span>}
          </div>
       </div>
    </div>
  );
}

const DollarSign = (props: any) => <Wallet {...props} />;
const TrendingDown = (props: any) => <ArrowDownCircle {...props} />;
