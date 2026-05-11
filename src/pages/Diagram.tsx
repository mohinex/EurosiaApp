import { motion } from "motion/react";
import { 
  AppWindow, ShoppingBag, Wallet, Activity, Users, 
  MessageSquare, LayoutGrid, HeartPulse, PhoneCall, 
  Store, ShieldCheck, Globe, Zap, Database, Server,
  Lock, Cloud, Users2, Building2, Layers, Key, Bell,
  Radio, Cpu, Code, Network, Headphones, CreditCard,
  Building, Landmark, Mail, Truck, Briefcase, FileText
} from "lucide-react";

export default function Diagram() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-24 font-sans text-gray-900 border-x-4 border-eurosia-red mx-auto max-w-[1920px]">
      <div className="max-w-[1600px] mx-auto px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-eurosia-red text-white rounded-3xl flex items-center justify-center font-bold text-6xl shadow-eurosia-red">E</div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-[#11135E]">EUROSIA APP ECOSYSTEM</h1>
          <p className="text-2xl text-gray-500 font-bold mb-10 tracking-tight">The Ecosystem-Powered Business Operating System for the Modern World</p>
          
          <div className="inline-flex items-center gap-8 bg-eurosia-red text-white px-12 py-6 rounded-full text-xl font-black uppercase tracking-[0.2em] shadow-eurosia-red">
            <span>One Platform</span>
            <div className="w-2 h-2 bg-white rounded-full" />
            <span>One Login</span>
            <div className="w-2 h-2 bg-white rounded-full" />
            <span>Unlimited Business Solutions</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-10 mt-20 relative">
          
          {/* Left Column: Users */}
          <div className="col-span-2 space-y-8 flex flex-col justify-center">
            <h3 className="text-center font-black uppercase tracking-widest text-eurosia-blue mb-10">Users</h3>
            <UserIcon icon={Zap} label="Startups" />
            <UserIcon icon={Store} label="SMEs" />
            <UserIcon icon={Building2} label="Enterprises" />
            <UserIcon icon={Landmark} label="Government" />
            <UserIcon icon={Users2} label="Agencies" />
            <UserIcon icon={Briefcase} label="Resellers" />
          </div>

          {/* Central Stack */}
          <div className="col-span-8 space-y-12">
            
            {/* Layer 1: Unified Access Layer */}
            <div className="bg-[#11135E] rounded-[48px] p-8 text-white relative shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-eurosia-red opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
               <h4 className="text-center font-black uppercase tracking-[0.4em] mb-10 text-xs opacity-60">Unified Access Layer</h4>
               <div className="grid grid-cols-6 gap-6 relative z-10">
                  <AccessItem icon={Key} label="Single Login (SSO)" />
                  <AccessItem icon={Building2} label="Multi-tenant" />
                  <AccessItem icon={ShieldCheck} label="Role Based Access" />
                  <AccessItem icon={Database} label="License & Subscription" />
                  <AccessItem icon={Lock} label="Security & Audit Logs" />
                  <AccessItem icon={Bell} label="Notifications" />
               </div>
            </div>

            {/* Layer 2: Core Technology Layers */}
            <div className="space-y-6">
              <h4 className="text-center font-black uppercase tracking-[0.4em] text-gray-400 text-xs">Core Technology Layers</h4>
              <div className="grid grid-cols-3 gap-8">
                <TechLayerCard 
                  title="Business Management Layer" 
                  icon={Building} 
                  color="#3B82F6"
                  items={["ERP", "CRM", "Inventory", "Procurement", "HR & Payroll", "Project Management"]}
                />
                <TechLayerCard 
                  title="Artificial Intelligence Layer" 
                  icon={Zap} 
                  color="#10B981"
                  items={["AI Chatbots", "AI Voice Agents", "Workflow Automation", "Predictive Analytics", "Smart Assistants"]}
                />
                <TechLayerCard 
                  title="Communication Layer" 
                  icon={PhoneCall} 
                  color="#F59E0B"
                  items={["Cloud PBX", "IVR", "Omnichannel Messaging", "Call Center", "WhatsApp Integration"]}
                />
                <TechLayerCard 
                  title="Fintech Layer" 
                  icon={Landmark} 
                  color="#F43F5E"
                  items={["Accounting", "Billing", "Payment Reminders", "Cash Flow Management", "Financial Reports"]}
                />
                <TechLayerCard 
                  title="Cybersecurity Layer" 
                  icon={ShieldCheck} 
                  color="#B91C1C"
                  items={["Threat Monitoring", "Vulnerability Assessment", "Security Operations", "Data Protection", "Compliance"]}
                />
                <TechLayerCard 
                  title="Industry Solutions Layer" 
                  icon={Globe} 
                  color="#8B5CF6"
                  items={["Healthcare", "Retail & POS", "Construction", "Agriculture", "Education", "And More..."]}
                />
              </div>
            </div>

            {/* Layer 3: Product Portfolio */}
            <div className="bg-gray-50 rounded-[64px] p-12 border border-gray-100 shadow-xl">
               <h4 className="text-center font-black uppercase tracking-[0.4em] text-gray-400 text-xs mb-12">EUROSIA Product Portfolio</h4>
               <div className="grid grid-cols-4 gap-8">
                  <ProductItem icon={Store} title="EUROSIA POS" desc="Smart Restaurant & Retail Management" />
                  <ProductItem icon={HeartPulse} title="EUROSIA Care" desc="Digital Clinic & Healthcare Platform" />
                  <ProductItem icon={Headphones} title="EUROSIA CloudPBX" desc="Cloud PBX & Call Center Solution" />
                  <ProductItem icon={Radio} title="EUROSIA AI Calling" desc="AI-Powered Voice Automation Platform" />
                  
                  <ProductItem icon={MessageSquare} title="AI Chatbot" desc="Customer Engagement Platform" />
                  <ProductItem icon={Activity} title="DataPilot AI" desc="Data Automation & Web Intelligence" />
                  <ProductItem icon={Lock} title="Defender X" desc="Global Cyber Defense Platform" />
                  <ProductItem icon={Building} title="BuildNex" desc="Construction ERP & Property Management" />

                  <ProductItem icon={FileText} title="InvoiceNex" desc="Professional Invoice Generator" />
                  <ProductItem icon={CreditCard} title="PayBill" desc="Bill Management & Payment Reminder" />
                  <ProductItem icon={Layers} title="NexFarmer" desc="Agro Invoice & Farm Business Solution" />
                  <ProductItem icon={Cloud} title="Eurosia Cloud" desc="Multi-Tenant SaaS Platform" />
               </div>
               
               <div className="mt-16 bg-eurosia-red rounded-3xl p-8 flex items-center justify-between text-white shadow-eurosia-red">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <ShoppingBag size={32} />
                    </div>
                    <div>
                      <h5 className="text-2xl font-black">And Many More Industry-Specific Apps</h5>
                      <p className="font-bold opacity-80">The EUROSIA Marketplace is growing every day.</p>
                    </div>
                  </div>
                  <button className="bg-white text-eurosia-red px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">Explore Marketplace</button>
               </div>
            </div>

            {/* Layer 4: Infrastructure & Engine */}
            <div className="grid grid-cols-2 gap-12 pt-12">
               <div className="bg-gray-50 rounded-[48px] p-10 border border-gray-100">
                  <h4 className="font-black uppercase tracking-widest text-eurosia-red mb-8 flex items-center gap-3">
                    <Database size={24} />
                    OFFLINE-FIRST ARCHITECTURE
                  </h4>
                  <div className="space-y-4">
                    <Check text="Works Offline" />
                    <Check text="Local Data Storage (SQLite)" />
                    <Check text="Local Queue & Sync Engine" />
                    <Check text="Auto Sync When Online" />
                  </div>
               </div>
               <div className="bg-[#11135E] rounded-[48px] p-10 text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-eurosia-red opacity-10 rounded-full -translate-y-16 translate-x-16 blur-3xl" />
                  <h4 className="font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                    <Cloud size={24} />
                    CLOUD INFRASTRUCTURE
                  </h4>
                  <div className="space-y-4 text-gray-300">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> <span>PostgreSQL Database</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> <span>Multi-tenant Architecture</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> <span>High Availability & Backup</span></div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> <span>Real-time Data Sync</span></div>
                  </div>
                  <div className="absolute bottom-10 right-10 flex items-center gap-4">
                     <div className="flex flex-col items-end">
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#B91C1C]">AI Engine</span>
                       <span className="text-xs font-bold text-white">GenAI Ready</span>
                     </div>
                     <div className="w-12 h-12 bg-eurosia-red rounded-xl flex items-center justify-center">
                       <Cpu size={24} />
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Third Party */}
          <div className="col-span-2 space-y-8 flex flex-col justify-center border-l border-gray-100 pl-8">
            <h3 className="text-center font-black uppercase tracking-widest text-[#11135E] mb-10 leading-tight">Third Party<br />Integrations</h3>
            <IntegrationItem icon={CreditCard} label="Payment Gateways" desc="(Stripe, bKash, etc)" />
            <IntegrationItem icon={Landmark} label="Banks & Institutions" />
            <IntegrationItem icon={Mail} label="SMS / Email Providers" />
            <IntegrationItem icon={MessageSquare} label="WhatsApp Business API" />
            <IntegrationItem icon={Truck} label="Logistics APIs" />
            <IntegrationItem icon={Building2} label="Government APIs" />
            <div className="flex items-center justify-center pt-8">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">And More...</span>
            </div>
          </div>

        </div>

        {/* Technology Stack Footer */}
        <div className="mt-32 border-t border-gray-200 pt-16">
          <div className="grid grid-cols-7 gap-8 items-center opacity-40">
             <StackItem icon={AppWindow} label="Frontend" tech="React + Vite + Tailwind" />
             <StackItem icon={Server} label="Backend" tech="Node.js + NestJS" />
             <StackItem icon={Database} label="Offline DB" tech="SQLite / IndexedDB" />
             <StackItem icon={Network} label="ORM" tech="Prisma / TypeORM" />
             <StackItem icon={ShieldCheck} label="Auth" tech="RBAC + JWT" />
             <StackItem icon={Cloud} label="Deployment" tech="Docker + Nginx" />
             <StackItem icon={Lock} label="Security" tech="SSL + Cloudflare" />
          </div>
        </div>

        {/* Brand Bar */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex justify-between items-center text-gray-400">
           <div className="flex items-center gap-12">
              <span className="text-xs font-black uppercase tracking-[0.2em]">AI-Native Architecture</span>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Voice Automation</span>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Cybersecurity Ready</span>
           </div>
           <div className="flex items-center gap-12">
              <span className="text-xs font-black uppercase tracking-[0.2em]">Industry-Specific Apps</span>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Multi-Tenant SaaS</span>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Global Deployment</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function UserIcon({ icon: Icon, label }: any) {
  return (
    <div className="flex flex-col items-center gap-3 transition-transform hover:scale-110 group">
       <div className="w-16 h-16 bg-gray-50 text-eurosia-blue rounded-[20px] flex items-center justify-center border border-gray-100 group-hover:bg-eurosia-blue group-hover:text-white transition-all shadow-sm">
         <Icon size={24} />
       </div>
       <span className="text-xs font-black text-gray-900 leading-tight text-center">{label}</span>
    </div>
  );
}

function AccessItem({ icon: Icon, label }: any) {
  return (
    <div className="flex flex-col items-center gap-3 group px-2 text-center">
       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-eurosia-red shadow-lg">
         <Icon size={20} />
       </div>
       <span className="text-[10px] font-black uppercase tracking-tighter opacity-80 group-hover:opacity-100">{label}</span>
    </div>
  );
}

function TechLayerCard({ title, icon: Icon, color, items }: any) {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-md hover:shadow-2xl transition-all group border-b-8" style={{ borderBottomColor: color }}>
       <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-black/10 transition-transform group-hover:rotate-12" style={{ backgroundColor: color }}>
         <Icon size={24} />
       </div>
       <h4 className="text-lg font-black mb-6 leading-tight group-hover:text-eurosia-red transition-colors">{title}</h4>
       <ul className="space-y-3">
          {items.map((item: any) => (
            <li key={item} className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
               <span className="text-xs font-bold text-gray-500 whitespace-nowrap">{item}</span>
            </li>
          ))}
       </ul>
    </div>
  );
}

function ProductItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex gap-4 group">
       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-eurosia-red shadow-xl border border-gray-50 transition-transform group-hover:scale-110 group-hover:rotate-6">
         <Icon size={24} />
       </div>
       <div className="flex-1">
          <h5 className="text-sm font-black text-gray-900 group-hover:text-eurosia-red transition-colors">{title}</h5>
          <p className="text-[10px] font-bold text-gray-400 mt-0.5 leading-tight">{desc}</p>
       </div>
    </div>
  );
}

function IntegrationItem({ icon: Icon, label, desc }: any) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
       <div className="w-10 h-10 bg-gray-50 text-[#11135E] rounded-xl flex items-center justify-center border border-gray-100 group-hover:bg-[#11135E] group-hover:text-white transition-all shadow-sm">
         <Icon size={20} />
       </div>
       <div>
          <p className="text-[10px] font-black uppercase text-gray-900 tracking-tight leading-none mb-1">{label}</p>
          {desc && <p className="text-[8px] font-bold text-gray-400 tracking-tighter uppercase">{desc}</p>}
       </div>
    </div>
  );
}

function StackItem({ icon: Icon, label, tech }: any) {
  return (
    <div className="flex flex-col items-center gap-2 border-r border-gray-200 last:border-0 pr-4">
       <div className="flex items-center gap-2">
          <Icon size={14} className="text-gray-900" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">{label}</span>
       </div>
       <span className="text-[10px] font-bold text-gray-400 text-center">{tech}</span>
    </div>
  );
}

function Check({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
       <div className="w-4 h-4 bg-eurosia-red/20 rounded flex items-center justify-center"><Zap size={10} className="text-eurosia-red" /></div>
       <span className="text-xs font-black text-gray-600 uppercase tracking-widest">{text}</span>
    </div>
  );
}
