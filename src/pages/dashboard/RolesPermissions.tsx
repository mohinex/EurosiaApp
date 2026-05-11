import { useState } from "react";
import { 
  Shield, Check, X, Search, Plus, 
  Trash2, Edit2, ShieldAlert, ShieldCheck, 
  Lock, Settings, Info
} from "lucide-react";
import { motion } from "motion/react";
import { DEFAULT_ROLES, Permission } from "../../types/permissions";

const ALL_PERMISSIONS: Permission[] = [
  'DASHBOARD_VIEW', 'ANALYTICS_VIEW', 'COMPANIES_VIEW', 'COMPANIES_CREATE', 
  'COMPANIES_EDIT', 'COMPANIES_DELETE', 'USERS_VIEW', 'USERS_MANAGE', 
  'ROLES_MANAGE', 'APPS_VIEW_ALL', 'APPS_MANAGE', 'PRICING_MANAGE', 
  'SUBSCRIPTIONS_VIEW', 'LICENSES_MANAGE', 'TRANSACTIONS_VIEW', 
  'CMS_MANAGE', 'PLUGINS_MANAGE', 'SETTINGS_GLOBAL', 'AUDIT_LOGS_VIEW'
];

export default function RolesPermissions() {
  const [roles, setRoles] = useState(
    Object.entries(DEFAULT_ROLES).map(([name, permissions]) => ({
      id: name.toLowerCase(),
      name,
      permissions
    }))
  );
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isEditing, setIsEditing] = useState(false);

  const togglePermission = (permission: Permission) => {
    if (!isEditing) return;
    
    setSelectedRole(prev => {
      const has = prev.permissions.includes(permission);
      const newPerms = has 
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      
      return { ...prev, permissions: newPerms };
    });
  };

  const handleSave = () => {
    setRoles(prev => prev.map(r => r.id === selectedRole.id ? selectedRole : r));
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#B91C1C] rounded-[24px] flex items-center justify-center text-white shadow-2xl">
               <ShieldCheck size={32} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tight">Roles & <span className="text-[#B91C1C]">Permissions</span></h1>
               <p className="text-gray-500 font-medium tracking-tight">Manage dynamic access control and role-based permissions.</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-4 bg-[#B91C1C] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-[#991B1B] transition-all"
                >
                  Save Matrix
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all"
              >
                Edit Permissions
              </button>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Roles Sidebar */}
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-100 rounded-[40px] p-8 shadow-sm">
               <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-gray-400">Available Roles</h3>
               <div className="space-y-3">
                  {roles.map(role => (
                    <button 
                      key={role.id}
                      onClick={() => !isEditing && setSelectedRole(role)}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${
                        selectedRole.id === role.id ? 'bg-gray-900 text-white shadow-xl' : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                       <div className="flex items-center gap-3">
                          <Shield size={18} className={selectedRole.id === role.id ? 'text-[#B91C1C]' : 'opacity-20'} />
                          <span className="font-bold text-sm">{role.name}</span>
                       </div>
                       <div className="text-[10px] font-black opacity-40">{role.permissions.length} PERMS</div>
                    </button>
                  ))}
                  <button className="w-full flex items-center justify-center gap-2 p-5 rounded-2xl border-2 border-dashed border-gray-100 text-gray-400 font-black text-xs uppercase tracking-widest hover:border-[#B91C1C] hover:text-[#B91C1C] transition-all">
                     <Plus size={16} />
                     Create Custom Role
                  </button>
               </div>
            </div>

            <div className="p-8 bg-blue-50 border border-blue-100 rounded-[32px]">
               <div className="flex gap-4 mb-4">
                  <Info className="text-blue-500 shrink-0" size={24} />
                  <p className="text-sm font-medium text-blue-900 leading-relaxed">
                     Changes to permissions are applied instantly to all users assigned to this role. Users may need to refresh their session.
                  </p>
               </div>
            </div>
         </div>

         {/* Permission Matrix */}
         <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h2 className="text-2xl font-black text-gray-900">{selectedRole.name} Permissions</h2>
                  <p className="text-sm text-gray-400 font-medium">Select the capabilities allowed for this role.</p>
               </div>
               {isEditing && (
                 <div className="flex items-center gap-2 text-[#B91C1C] text-xs font-black uppercase tracking-widest animate-pulse">
                    <ShieldAlert size={16} />
                    Editing Active
                 </div>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {ALL_PERMISSIONS.map(perm => (
                 <motion.div 
                   key={perm}
                   whileHover={isEditing ? { x: 5 } : {}}
                   onClick={() => togglePermission(perm)}
                   className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                     selectedRole.permissions.includes(perm)
                       ? 'bg-red-50/50 border-red-100'
                       : 'bg-white border-gray-50'
                   } ${isEditing ? 'cursor-pointer hover:border-[#B91C1C]/30' : 'opacity-80'}`}
                 >
                    <div className="flex items-center gap-4">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                         selectedRole.permissions.includes(perm) ? 'bg-[#B91C1C] text-white' : 'bg-gray-100 text-gray-400'
                       }`}>
                          {selectedRole.permissions.includes(perm) ? <Check size={14} /> : <Lock size={14} />}
                       </div>
                       <span className="text-xs font-black uppercase tracking-widest text-gray-700">
                          {perm.replace(/_/g, ' ')}
                       </span>
                    </div>
                    {isEditing && (
                      <div className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${
                        selectedRole.permissions.includes(perm) ? 'bg-[#B91C1C] border-[#B91C1C]' : 'border-gray-200'
                      }`}>
                         {selectedRole.permissions.includes(perm) && <Check size={12} className="text-white" />}
                      </div>
                    )}
                 </motion.div>
               ))}
            </div>

            {/* Matrix Backdrop Decoration */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gray-50 rounded-full blur-[80px] -z-10" />
         </div>
      </div>
    </div>
  );
}
