import { useState, useMemo } from "react";
import { 
  Building2, Plus, Search, Filter, 
  MoreVertical, Shield, Trash2, Edit2, Activity
} from "lucide-react";
import { motion } from "motion/react";
import { useUIStore } from "../../store/useUIStore";
import { Pagination, EmptyState } from "../../components/CommonUI";

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToast, openModal } = useUIStore();

  const [companies, setCompanies] = useState([
    { id: 1, name: "Nexus IT Solutions", industry: "Technology", status: "Active", users: 124, revenue: "$24,500", package: "Enterprise" },
    { id: 2, name: "Oceanic Logistics", industry: "Services", status: "Active", users: 45, revenue: "$8,500", package: "Growth" },
    { id: 3, name: "Global Trade Co", industry: "Wholesale", status: "Suspended", users: 12, revenue: "$0", package: "Starter" },
    { id: 4, name: "Prime Retailers", industry: "Retail", status: "Active", users: 240, revenue: "$51,000", package: "Enterprise" },
    { id: 5, name: "Creative Dynamics", industry: "Creative", status: "Pending", users: 5, revenue: "$0", package: "Trial" },
  ]);

  const filteredCompanies = useMemo(() => {
    return companies.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [companies, searchTerm]);

  const handleAddCompany = () => {
    openModal(
      "Add New Company",
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Company Name</label>
            <input type="text" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-eurosia-red" placeholder="e.g. Acme Corp" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Industry</label>
            <input type="text" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-eurosia-red" placeholder="e.g. Tech" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Admin Email</label>
          <input type="email" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-eurosia-red" placeholder="admin@company.com" />
        </div>
        <p className="text-xs text-gray-400 font-bold">Creating a company will automatically provision a new tenant environment and send an invitation email to the administrator.</p>
      </div>,
      () => {
        addToast("success", "Company Created", "Nexus IT Solutions has been successfully added to the ecosystem.");
      }
    );
  };

  const handleDelete = (id: number) => {
    openModal(
      "Confirm Deletion",
      <div className="text-center p-4">
         <div className="w-20 h-20 bg-red-50 text-eurosia-red rounded-full flex items-center justify-center mx-auto mb-6">
            <Trash2 size={40} />
         </div>
         <p className="text-lg font-black text-gray-900 mb-2">Are you absolutely sure?</p>
         <p className="text-gray-500 font-medium tracking-tight">This action will permanently delete the company and its associated data. This cannot be undone.</p>
      </div>,
      () => {
         setCompanies(companies.filter(c => c.id !== id));
         addToast("success", "Company Deleted", "The company records have been purged from the system.");
      }
    )
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-eurosia-red rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-red-500/30">
               <Building2 size={40} />
            </div>
            <div>
               <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Ecosystem <span className="text-eurosia-red">Companies</span></h1>
               <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Total Nodes: 450 Entities</p>
            </div>
         </div>
         <button 
           onClick={handleAddCompany}
           className="px-10 py-5 bg-gray-900 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all flex items-center gap-3"
         >
            <Plus size={20} />
            Add New Company
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <StatCard label="Total Companies" value="450" change="+12" isPositive color="#F43F5E" />
         <StatCard label="Active Nodes" value="412" change="+5" isPositive color="#10B981" />
         <StatCard label="Total Users" value="12,400" change="+1.2k" isPositive color="#3B82F6" />
         <StatCard label="Platform MMR" value="$125,000" change="+$12k" isPositive color="#F59E0B" />
      </div>

      <div className="bg-white border border-gray-100 rounded-[64px] p-12 shadow-sm">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="relative w-full md:w-[480px]">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
               <input 
                 type="text" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search by name, industry, or ID..."
                 className="w-full bg-gray-50 border border-gray-100 rounded-3xl pl-16 pr-6 py-5 text-sm font-black outline-none focus:ring-4 focus:ring-eurosia-red/10 transition-all placeholder-gray-300"
               />
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-3 px-8 py-4 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-400 hover:bg-gray-100 transition-colors uppercase tracking-widest">
                  <Filter size={18} />
                  Filter Status
               </button>
               <button className="flex items-center gap-3 px-8 py-4 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-400 hover:bg-gray-100 transition-colors uppercase tracking-widest">
                  <Activity size={18} />
                  Sort By
               </button>
            </div>
         </div>

         {filteredCompanies.length === 0 ? (
           <EmptyState 
             title="No Companies Found"
             desc="We couldn't find any business entities matching your search criteria."
             actionLabel="Add New Company"
             onAction={handleAddCompany}
           />
         ) : (
           <>
            <div className="overflow-x-auto overflow-y-visible">
                <table className="w-full border-separate border-spacing-y-4">
                  <thead>
                      <tr className="text-left">
                        <th className="px-6 pb-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Entity Details</th>
                        <th className="px-6 pb-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Package</th>
                        <th className="px-6 pb-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Users</th>
                        <th className="px-6 pb-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Revenue</th>
                        <th className="px-6 pb-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Status</th>
                        <th className="px-6 pb-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredCompanies.map(company => (
                        <motion.tr 
                          key={company.id} 
                          initial={{ opacity: 0, x: -20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          className="group bg-white hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-6 px-6 first:rounded-l-[32px] border-y border-l border-gray-50">
                              <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 font-extrabold text-2xl group-hover:bg-eurosia-red group-hover:text-white transition-all shadow-sm">
                                    {company.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-black text-gray-900 text-lg tracking-tight leading-none mb-2">{company.name}</p>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{company.industry}</p>
                                </div>
                              </div>
                          </td>
                          <td className="py-6 px-6 border-y border-gray-50">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                                  <Shield size={16} className="text-amber-500" />
                                </div>
                                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">{company.package}</span>
                              </div>
                          </td>
                          <td className="py-6 px-6 border-y border-gray-50 text-sm font-black text-gray-900">{company.users}</td>
                          <td className="py-6 px-6 border-y border-gray-50 text-sm font-black text-gray-700">{company.revenue}</td>
                          <td className="py-6 px-6 border-y border-gray-50">
                              <div className={`inline-flex px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border ${
                                company.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' :
                                company.status === 'Suspended' ? 'bg-red-50 text-eurosia-red border-red-100' :
                                'bg-gray-100 text-gray-500 border-gray-200'
                              }`}>
                                {company.status}
                              </div>
                          </td>
                          <td className="py-6 px-6 border-y border-r border-gray-50 text-right last:rounded-r-[32px]">
                              <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-500 hover:shadow-lg transition-all">
                                    <Edit2 size={20} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(company.id)}
                                  className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-eurosia-red hover:shadow-lg transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                                <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 hover:shadow-lg transition-all">
                                    <MoreVertical size={20} />
                                </button>
                              </div>
                          </td>
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
            </div>
            
            <Pagination 
              currentPage={currentPage}
              totalPages={45}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
           </>
         )}
      </div>
    </div>
  );
}

function StatCard({ label, value, change, isPositive, color }: any) {
  return (
    <div className="bg-white border border-gray-50 rounded-[40px] p-10 shadow-sm group hover:-translate-y-1 transition-all">
       <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: color }}>
             <Building2 size={24} />
          </div>
          {change && (
            <span className={`text-[10px] font-black uppercase tracking-widest ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
          )}
       </div>
       <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">{label}</p>
       <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
    </div>
  );
}
