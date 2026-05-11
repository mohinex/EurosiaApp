import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, PieChart, Building2, Users, ShieldCheck, 
  AppWindow, Settings, Bell, MessageSquare, Calendar as CalendarIcon, 
  Menu, X, Search, Globe, ChevronDown, ChevronRight,
  LogOut, HelpCircle, FileText, Database, Radio, 
  CreditCard, Layout, Grid3X3, Flag, Image as LucideImage,
  Puzzle, Smartphone, Key, Network, CloudUpload, CloudOff, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuthStore } from "../store/useAuthStore";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";
import AIAssistant from "./AIAssistant";
import { Permission } from "../types/permissions";
import { syncService } from "../services/syncService";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["SYSTEM MANAGEMENT"]);
  const { user, logout, hasPermission } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const isOnline = useLiveQuery(() => syncService.isOnline()) ?? true;
  const pendingChanges = useLiveQuery(() => db.syncQueue.count()) ?? 0;

  // Dynamic Menu Configuration
  const menuConfig = [
    {
      group: "MAIN",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", permission: "DASHBOARD_VIEW" as Permission },
        { label: "App Blueprint", icon: Network, path: "/diagram", permission: "DASHBOARD_VIEW" as Permission },
        { label: "Marketplace", icon: Grid3X3, path: "/marketplace", permission: "DASHBOARD_VIEW" as Permission },
        { label: "Analytics", icon: PieChart, path: "/dashboard/analytics", permission: "ANALYTICS_VIEW" as Permission },
      ]
    },
    {
      group: "SYSTEM MANAGEMENT",
      items: [
        { label: "Companies", icon: Building2, path: "/dashboard/companies", permission: "COMPANIES_VIEW" as Permission },
        { label: "Users", icon: Users, path: "/dashboard/users", permission: "USERS_VIEW" as Permission },
        { label: "Roles & Permissions", icon: ShieldCheck, path: "/dashboard/roles", permission: "ROLES_MANAGE" as Permission },
        { label: "Apps & Modules", icon: AppWindow, path: "/dashboard/apps", permission: "APPS_MANAGE" as Permission },
        { label: "Licenses", icon: Key, path: "/dashboard/licenses", permission: "LICENSES_MANAGE" as Permission },
        { label: "Devices", icon: Smartphone, path: "/dashboard/devices", permission: "SETTINGS_GLOBAL" as Permission },
        { label: "Features Control", icon: Radio, path: "/dashboard/features", permission: "SETTINGS_GLOBAL" as Permission },
        { label: "Packages & Pricing", icon: Grid3X3, path: "/dashboard/pricing", permission: "PRICING_MANAGE" as Permission },
      ]
    },
    {
      group: "PAYMENT MANAGEMENT",
      items: [
        { label: "Payment Methods", icon: CreditCard, path: "/dashboard/payments", permission: "SETTINGS_GLOBAL" as Permission },
        { label: "Transactions", icon: FileText, path: "/dashboard/transactions", permission: "TRANSACTIONS_VIEW" as Permission },
        { label: "Invoices", icon: Layout, path: "/dashboard/invoices", permission: "TRANSACTIONS_VIEW" as Permission },
      ]
    },
    {
      group: "VERTICAL MODULES",
      items: [
        { label: "CloudPBX", icon: Radio, path: "/dashboard/cloudpbx", permission: "APPS_VIEW_ALL" as Permission },
        { label: "CyberSecurity", icon: ShieldCheck, path: "/dashboard/cybersecurity", permission: "APPS_VIEW_ALL" as Permission },
        { label: "FieldForce", icon: Flag, path: "/dashboard/fieldforce", permission: "APPS_VIEW_ALL" as Permission },
      ]
    },
    {
      group: "SYSTEM",
      items: [
        { label: "Website CMS", icon: Globe, path: "/dashboard/cms", permission: "CMS_MANAGE" as Permission },
        { label: "Media Manager", icon: LucideImage, path: "/dashboard/media", permission: "CMS_MANAGE" as Permission },
        { label: "Audit Logs", icon: FileText, path: "/dashboard/logs", permission: "AUDIT_LOGS_VIEW" as Permission },
        { label: "Settings", icon: Settings, path: "/dashboard/settings", permission: "SETTINGS_GLOBAL" as Permission },
        { label: "Help & Support", icon: HelpCircle, path: "/dashboard/support", permission: "DASHBOARD_VIEW" as Permission },
      ]
    }
  ];

  const filteredMenu = menuConfig.map(group => ({
    ...group,
    items: group.items.filter(item => hasPermission(item.permission))
  })).filter(group => group.items.length > 0);

  // Mock license state for UI demonstration
  const [licenseStatus, setLicenseStatus] = useState<'active' | 'expired' | 'warning'>('active');

  const isAdmin = user?.role === "ADMIN";
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  return (
    <div className={`flex h-screen ${isSuperAdmin ? 'bg-[#F8FAFC]' : 'bg-[#0F172A]'}`}>
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } ${isSuperAdmin ? 'bg-[#0A0A0A]' : 'bg-[#1E293B] border-r border-white/5'} text-white flex flex-col transition-all duration-300 z-50`}
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-[#B91C1C] rounded-lg shrink-0 flex items-center justify-center font-bold text-2xl">E</div>
            <div className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 invisible h-0"}`}>
               <h1 className="font-bold text-lg leading-none tracking-tight">EUROSIA</h1>
               <p className="text-[8px] font-medium leading-none tracking-widest text-[#B91C1C] uppercase mt-1">App Ecosystem</p>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="px-4 py-6 border-b border-white/5">
           <div className={`flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 ${!isSidebarOpen && "justify-center"}`}>
              <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden shrink-0">
                <img src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`} alt="Avatar" />
              </div>
              {isSidebarOpen && (
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate">{user?.firstName} {user?.lastName || 'Admin'}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider truncate">{user?.role}</p>
                </div>
              )}
           </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
          {filteredMenu.map((group) => (
            <div key={group.group}>
              <SectionTitle label={group.group} isOpen={isSidebarOpen} />
              {group.items.map(item => (
                <SidebarItem 
                  key={item.label} 
                  item={item} 
                  isOpen={isSidebarOpen} 
                  currentPath={location.pathname} 
                />
              ))}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 flex flex-col gap-2">
           <button className={`w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white rounded-xl transition-colors ${!isSidebarOpen && "justify-center"}`}>
              <HelpCircle size={20} />
              {isSidebarOpen && <span className="text-sm font-medium">Help & Support</span>}
           </button>
           <button 
             onClick={() => { logout(); navigate("/login"); }}
             className={`w-full flex items-center gap-3 p-3 text-gray-400 hover:text-[#B91C1C] rounded-xl transition-colors ${!isSidebarOpen && "justify-center"}`}
           >
              <LogOut size={20} />
              {isSidebarOpen && <span className="text-sm font-medium transition-transform">Logout Session</span>}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col overflow-hidden ${!isSuperAdmin && 'bg-[#0F172A]'}`}>
        {/* Header */}
        <header className={`h-20 ${isSuperAdmin ? 'bg-white border-b' : 'bg-[#1E293B] border-b border-white/5 text-white'} flex items-center justify-between px-8 z-40 relative`}>
           {licenseStatus !== 'active' && (
             <div className={`absolute top-20 left-0 right-0 py-2 px-8 flex items-center justify-between z-[100] animate-pulse border-b border-white/10 ${
               licenseStatus === 'expired' ? 'bg-red-600 text-white' : 'bg-[#B91C1C] text-white'
             }`}>
                <div className="flex items-center gap-3">
                   <AlertCircle size={14} />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      {licenseStatus === 'expired' ? 'License Expired - Premium Services Suspended' : 'License Expiring Soon - Action Required'}
                   </span>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4 hover:opacity-80">Renew Service Key</button>
             </div>
           )}
           <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className={`p-2 rounded-lg transition-colors ${isSuperAdmin ? 'hover:bg-gray-100' : 'hover:bg-white/5'}`}
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="relative w-80 hidden lg:block">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isSuperAdmin ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                <input 
                  type="text" 
                  placeholder="Search anything... (Ctrl + K)" 
                  className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all ${
                    isSuperAdmin 
                      ? 'bg-gray-50 border-gray-200 focus:ring-[#B91C1C]' 
                      : 'bg-[#0F172A] border-white/5 focus:ring-[#B91C1C] text-white'
                  }`}
                />
              </div>
           </div>

           <div className="flex items-center gap-4">
              {/* Sync Status */}
              <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg ${isSuperAdmin ? 'bg-gray-50 border-gray-100' : 'bg-black/20 border-white/5'}`}>
                 {isOnline ? (
                   <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Cloud Online
                   </span>
                 ) : (
                   <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                      <CloudOff size={12} />
                      Offline Mode
                   </span>
                 )}
                 {pendingChanges !== undefined && pendingChanges > 0 && (
                   <div className="flex items-center gap-1.5 border-l border-gray-200 pl-2 ml-1">
                      <CloudUpload size={12} className="text-[#B91C1C] animate-bounce" />
                      <span className="text-[10px] font-bold text-[#B91C1C] uppercase">{pendingChanges} Pending</span>
                   </div>
                 )}
              </div>

              <button className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all ${isSuperAdmin ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <Globe size={18} />
                <span>EN</span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2.5 rounded-xl relative transition-all ${isSuperAdmin ? 'bg-gray-50 text-gray-600 hover:bg-gray-100' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                >
                   <Bell size={20} />
                   <span className="absolute top-2 right-2 w-4 h-4 bg-[#B91C1C] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
                </button>
              </div>
              <button className={`hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isSuperAdmin ? 'bg-gray-900 hover:bg-black text-white' : 'bg-[#B91C1C] hover:bg-[#991B1B] text-white shadow-lg shadow-red-900/20'}`}>
                 Visit Website
              </button>
              <div className={`h-10 w-[1px] mx-2 ${isSuperAdmin ? 'bg-gray-100' : 'bg-white/5'}`}></div>
              <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                 <div className="text-right hidden md:block">
                    <p className={`text-xs font-bold leading-none ${isSuperAdmin ? 'text-gray-900' : 'text-white'}`}>{user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tight">{user?.role || 'Administrator'}</p>
                 </div>
                 <div className="w-10 h-10 rounded-full border-2 border-[#B91C1C] p-0.5">
                    <img src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=B91C1C&color=fff`} className="rounded-full" alt="Avatar" />
                 </div>
              </div>
           </div>
        </header>

        {/* Scrollable Viewport */}
        <div className={`flex-1 overflow-y-auto p-8 scrollbar-thin ${isSuperAdmin ? 'scrollbar-thumb-gray-200' : 'scrollbar-thumb-white/5 bg-[#0F172A]'}`}>
           <Outlet />
        </div>
      </main>
      <AIAssistant />

      {/* Notification Drawer */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className={`fixed top-0 right-0 h-full w-96 ${isSuperAdmin ? 'bg-white' : 'bg-gray-900 text-white'} shadow-2xl z-[70] p-8`}
            >
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-black uppercase tracking-widest">Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                     <X size={20} />
                  </button>
               </div>
               
               <div className="space-y-6">
                  {[
                    { title: "System Update", desc: "A new version of the CRM module is available.", time: "12m ago", type: "info" },
                    { title: "Security Alert", desc: "Multiple login failures detected from IP 192.168.1.1", time: "1h ago", type: "warning" },
                    { title: "Sync Complete", desc: "Your local database is now fully synced with the cloud.", time: "4h ago", type: "success" }
                  ].map((n, i) => (
                    <div key={i} className={`p-6 rounded-3xl border ${isSuperAdmin ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-white/5'} hover:scale-[1.02] transition-transform cursor-pointer`}>
                       <div className="flex justify-between items-start mb-2">
                          <p className="font-bold text-sm">{n.title}</p>
                          <span className="text-[10px] text-gray-500 font-bold uppercase">{n.time}</span>
                       </div>
                       <p className="text-xs text-gray-500 font-medium leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
               </div>

               <div className="absolute bottom-8 left-8 right-8">
                  <button className="w-full py-4 bg-[#B91C1C] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#991B1B] transition-colors">
                     Mark all as read
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionTitle({ label, isOpen }: { label: string; isOpen: boolean }) {
  if (!isOpen) return <div className="h-0.5 bg-white/5 mx-2 my-6"></div>;
  return <p className="px-4 text-[10px] font-extrabold text-gray-500 uppercase tracking-[0.2em] mb-4">{label}</p>;
}

function SidebarItem({ item, isOpen, currentPath }: { item: any; isOpen: boolean; currentPath: string }) {
  const isActive = currentPath === item.path;
  return (
    <Link 
      to={item.path} 
      className={`flex items-center gap-4 p-3 rounded-xl transition-all mb-1 group ${
        isActive 
          ? "bg-[#B91C1C] text-white shadow-lg shadow-red-900/40 transform scale-[1.02]" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      } ${!isOpen && "justify-center"}`}
    >
      <item.icon size={isActive ? 20 : 18} className={`shrink-0 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
      {isOpen && (
        <span className={`text-xs font-extrabold flex-1 truncate tracking-tight ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
          {item.label}
        </span>
      )}
      {isOpen && item.subItems && <ChevronRight size={14} className="opacity-40" />}
    </Link>
  );
}

const Calendar = (props: any) => <CalendarIcon {...props} />;
