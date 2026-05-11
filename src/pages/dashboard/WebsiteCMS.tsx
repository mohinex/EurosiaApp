import { useState, useEffect } from "react";
import { 
  Globe, Layout, Plus, Search, Filter, 
  Settings, Save, Eye, MoveVertical, Trash2,
  Edit3, Layers, Monitor, Smartphone, Menu,
  Image as ImageIcon, Type, Link, History,
  ChevronRight, AlignLeft, Grid, Package, 
  HelpCircle, MessageSquare, Megaphone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../lib/db";

const SECTION_TEMPLATES = [
  { type: 'hero', label: 'Hero Section', icon: Monitor },
  { type: 'features', label: 'Feature Grid', icon: Grid },
  { type: 'product_portfolio', label: 'Product Portfolio', icon: Package },
  { type: 'tech_layers', label: 'Technology Layers', icon: Layers },
  { type: 'pricing', label: 'Pricing Table', icon: Layout },
  { type: 'faq', label: 'FAQ Accordion', icon: HelpCircle },
  { type: 'cta', label: 'CTA Banner', icon: Megaphone },
  { type: 'footer', label: 'Site Footer', icon: AlignLeft },
];

export default function WebsiteCMS() {
  const [activeTab, setActiveTab] = useState("sections");
  const [editingSection, setEditingSection] = useState<any>(null);
  
  const sections = useLiveQuery(() => 
    db.pageSections.orderBy('sortOrder').toArray()
  ) || [];

  const handleAddSection = async (template: any) => {
    let defaultData = {};
    if (template.type === 'hero') {
      defaultData = {
        title: "Your Complete Business Operating System",
        subtitle: "One Platform. One Login. Unlimited Business Solutions.",
        tagline: "Next Gen OS",
        buttons: [
          { label: "Start Free Trial", url: "/signup" },
          { label: "Explore Apps", url: "/apps" }
        ]
      };
    } else if (template.type === 'features') {
      defaultData = {
        title: "Built for Success",
        subtitle: "Enterprise power, starting from Day 1",
        features: [
          { title: "Cloud Scale", desc: "Scale instantly with your business needs." }
        ]
      };
    } else if (template.type === 'faq') {
       defaultData = {
         title: "Frequently Asked Questions",
         faqs: [
           { question: "How do I start?", answer: "Sign up for a free trial." }
         ]
       };
    }

    const newSection = {
      pageId: 'main-home', // Default page
      type: template.type,
      title: `New ${template.label}`,
      subtitle: "Click to edit this content",
      data: JSON.stringify(defaultData), // Store as string as per schema
      status: 'draft',
      sortOrder: (sections.length > 0 ? sections[sections.length - 1].sortOrder : 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await db.pageSections.add(newSection);
  };

  const handleSaveSection = async () => {
    if (editingSection) {
      const { id, ...data } = editingSection;
      await db.pageSections.update(id, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      setEditingSection(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#B91C1C] rounded-[24px] flex items-center justify-center text-white shadow-2xl">
               <Globe size={32} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tight">Website <span className="text-[#B91C1C]">CMS</span></h1>
               <p className="text-gray-500 font-medium">Manage landing pages, dynamic sections, and SEO metadata.</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
               <Eye size={18} />
               Preview Site
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all">
               <Save size={18} />
               Publish Changes
            </button>
         </div>
      </div>

      <div className="flex gap-4 p-2 bg-gray-100 rounded-3xl w-fit">
         {["sections", "navigation", "seo", "media"].map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
               activeTab === tab ? 'bg-white text-gray-900 shadow-lg' : 'text-gray-500 hover:text-gray-700'
             }`}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Sidebar Editor */}
         <div className="lg:col-span-8 space-y-6">
            {activeTab === "sections" && (
               <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                     <h2 className="text-2xl font-black text-gray-900">Page Sections</h2>
                     <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                           <History size={20} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                           <Settings size={20} />
                        </button>
                     </div>
                  </div>

                  <div className="space-y-4">
                     {sections.map((section: any) => (
                       <motion.div 
                         key={section.id}
                         layout
                         className="flex items-center justify-between p-6 bg-gray-50 border border-gray-100 rounded-3xl group hover:border-[#B91C1C]/30 transition-all"
                       >
                          <div className="flex items-center gap-6">
                             <div className="cursor-grab text-gray-300">
                                <MoveVertical size={18} />
                             </div>
                             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm">
                                {(() => {
                                   const Template = SECTION_TEMPLATES.find(t => t.type === section.type)?.icon || Layout;
                                   return <Template size={24} />;
                                })()}
                             </div>
                             <div>
                                <p className="font-black text-gray-900">{section.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                   <span className="text-[10px] font-black uppercase tracking-widest text-[#B91C1C] opacity-60">{section.type}</span>
                                   <span className="text-[10px] text-gray-300">•</span>
                                   <span className={`text-[10px] font-black uppercase tracking-widest ${section.status === 'active' ? 'text-green-500' : 'text-amber-500'}`}>
                                      {section.status}
                                   </span>
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button 
                               onClick={() => setEditingSection(section)}
                               className="p-3 bg-white hover:bg-gray-100 rounded-xl text-gray-600 shadow-sm"
                             >
                                <Edit3 size={18} />
                             </button>
                             <button 
                               onClick={() => db.pageSections.delete(section.id)}
                               className="p-3 bg-white hover:bg-red-50 rounded-xl text-gray-400 hover:text-[#B91C1C] shadow-sm"
                             >
                                <Trash2 size={18} />
                             </button>
                          </div>
                       </motion.div>
                     ))}
                  </div>

                  <div className="mt-10 pt-10 border-t border-gray-50">
                     <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-6 font-mono">Insert Section Template</h4>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {SECTION_TEMPLATES.map(template => (
                          <button 
                            key={template.type}
                            onClick={() => handleAddSection(template)}
                            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-100 rounded-3xl hover:border-[#B91C1C]/40 hover:bg-[#B91C1C]/5 group transition-all"
                          >
                             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-[#B91C1C] group-hover:text-white transition-all mb-4">
                                <template.icon size={20} />
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900">{template.label}</span>
                          </button>
                        ))}
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Right Sidebar Editor */}
         <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
               {editingSection ? (
                 <motion.div 
                   key={editingSection.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="bg-white border border-gray-100 rounded-[48px] p-8 shadow-sm space-y-8 sticky top-8"
                 >
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-black text-gray-900">Edit Section</h3>
                       <button onClick={() => setEditingSection(null)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                          <Plus size={20} className="rotate-45" />
                       </button>
                    </div>

                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Section Title</label>
                          <input 
                            type="text" 
                            value={editingSection.title}
                            onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold outline-none focus:ring-4 focus:ring-[#B91C1C]/10" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Section Subtitle</label>
                          <textarea 
                            value={editingSection.subtitle}
                            onChange={(e) => setEditingSection({...editingSection, subtitle: e.target.value})}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold outline-none focus:ring-4 focus:ring-[#B91C1C]/10 min-h-[100px]" 
                          />
                       </div>
                       
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Content Configuration (JSON)</h4>
                          <textarea 
                            value={JSON.stringify(editingSection.data || {}, null, 2)}
                            onChange={(e) => {
                               try {
                                 const parsed = JSON.parse(e.target.value);
                                 setEditingSection({...editingSection, data: parsed});
                               } catch (err) {
                                 // Allow typing invalid JSON temporarily
                                 setEditingSection({...editingSection, _tempData: e.target.value});
                               }
                            }}
                            className="w-full bg-gray-900 text-green-400 font-mono text-xs rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-[#B91C1C]/10 min-h-[300px]" 
                          />
                          <p className="text-[10px] text-gray-400">Modify the JSON structure to update the section content dynamically.</p>
                       </div>
                    </div>

                    <button 
                      onClick={handleSaveSection}
                      className="w-full py-5 bg-[#B91C1C] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-[#991B1B] transition-all"
                    >
                       Apply Changes
                    </button>
                 </motion.div>
               ) : (
                 <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[48px] p-10 flex flex-col items-center justify-center text-center h-[500px]">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-200 mb-6">
                       <Layout size={40} />
                    </div>
                    <p className="text-lg font-black text-gray-400">Select a section <br/> to edit its properties</p>
                 </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
