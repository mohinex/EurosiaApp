import { motion } from "motion/react";
import { 
  ArrowRight, ShieldCheck, Zap, Globe, Smartphone, 
  Database, Server, Layout, MessageSquare, ShoppingBag,
  Store, HeartPulse, Headphones, Radio, Activity,
  Lock, Building, Layers, CheckCircle2, ChevronRight,
  Monitor, CreditCard, Users, FileText, Wallet,
  PhoneCall, TrendingUp, Cloud, LayoutGrid, CloudUpload,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="bg-eurosia-gradient text-white pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
             <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-8 backdrop-blur-md">
                <div className="w-2 h-2 bg-eurosia-red rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">The Ecosystem-Powered Business OS</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                Your Complete <br />
                <span className="text-eurosia-red">Business</span> <br />
                Operating System
             </h1>
             <p className="text-xl text-gray-400 font-medium max-w-xl mb-12 leading-relaxed">
                EUROSIA App Ecosystem brings ERP, CRM, Accounting, AI, Communication, Fintech, Cybersecurity, eCommerce and Industry Solutions into one powerful platform.
             </p>
             <div className="flex flex-wrap gap-4">
                <Link to="/signup" className="px-10 py-5 bg-[#CC1A2F] text-white rounded-2xl font-black text-lg shadow-xl shadow-red-900/40 hover:scale-105 transition-all">Start with EUROSIA App</Link>
                <Link to="/apps" className="px-10 py-5 bg-white/10 border border-white/20 text-white rounded-2xl font-black text-lg hover:bg-white/20 transition-all flex items-center gap-3">
                   Explore Ecosystem <ArrowRight size={20} />
                </Link>
             </div>
             
             <div className="mt-20 flex gap-16">
                <div>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Trusted by</p>
                  <p className="text-2xl font-black tracking-tight">5,000+ Businesses</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Available in</p>
                  <p className="text-2xl font-black tracking-tight">15+ Countries</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Uptime Guaranteed</p>
                  <p className="text-2xl font-black tracking-tight">99.9%</p>
                </div>
             </div>
          </div>
          <div className="md:w-1/2 relative">
             <div className="relative z-20 translate-x-12 translate-y-12 rotate-[-2deg] hover:rotate-0 transition-transform duration-700 shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-[32px] overflow-hidden border-8 border-white/10">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="Dashboard Preview" className="w-full grayscale opacity-50" />
                <div className="absolute inset-0 bg-eurosia-blue/80 backdrop-blur-[2px] flex items-center justify-center p-12">
                   <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 w-full h-full shadow-2xl overflow-hidden relative">
                      <div className="flex items-center justify-between mb-8">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-eurosia-red rounded-lg" />
                            <div className="w-32 h-2 bg-white/10 rounded" />
                         </div>
                         <div className="flex gap-2">
                            <div className="w-4 h-4 rounded-full bg-white/5" />
                            <div className="w-4 h-4 rounded-full bg-white/5" />
                            <div className="w-4 h-4 rounded-full bg-white/5" />
                         </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mb-8">
                         {[1,2,3,4].map(i => <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />)}
                      </div>
                      <div className="h-40 bg-white/5 rounded-3xl mb-4" />
                      <div className="grid grid-cols-2 gap-4">
                         <div className="h-32 bg-white/5 rounded-3xl" />
                         <div className="h-32 bg-white/5 rounded-3xl" />
                      </div>
                   </div>
                </div>
             </div>
             {/* Orbital Accents */}
             <div className="absolute -top-20 -right-20 w-80 h-80 bg-eurosia-red opacity-10 rounded-full blur-[100px]" />
             <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-eurosia-blue opacity-30 rounded-full blur-[120px]" />
          </div>
        </div>
        
        {/* Quick Features Row */}
        <div className="max-w-[1600px] mx-auto px-8 mt-40">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <QuickCard icon={Zap} label="AI Assistant" desc="Smart Automation" />
              <QuickCard icon={Store} label="POS System" desc="Retail & Restaurant" />
              <QuickCard icon={Headphones} label="Cloud PBX" desc="Cell & Contact Center" />
              <QuickCard icon={Activity} label="Analytics" desc="Real-time Insights" />
           </div>
        </div>
      </section>

      {/* Brand Benefit Bar */}
      <section className="py-20 bg-white border-b border-gray-100">
         <div className="max-w-[1600px] mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-12 text-center text-gray-400 font-bold">
               <Benefit icon={ShieldCheck} label="One Platform" sub="All-in-One Solution" />
               <Benefit icon={Layout} label="One Login" sub="Access Everything" />
               <Benefit icon={Layers} label="Unlimited Apps" sub="Install What You Need" />
               <Benefit icon={Globe} label="Offline + Cloud" sub="Work Without Limits" />
               <Benefit icon={Zap} label="AI-Native" sub="Intelligent Automation" />
               <Benefit icon={Smartphone} label="Multi-Tenant SaaS" sub="Scale Effortlessly" />
            </div>
         </div>
      </section>

      {/* Technology Layers */}
      <section className="py-32 bg-gray-50/50 relative">
         <div className="max-w-[1600px] mx-auto px-8">
            <div className="text-center mb-24">
               <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs mb-4">Powerful Technology Layers</p>
               <h2 className="text-5xl font-black tracking-tight">Built on a Strong Foundation</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
               <TechLayer color="#3B82F6" label="Business Management Layer" desc="ERP, CRM, Inventory, Procurement, HR, Payroll & Projects" icon={Building} />
               <TechLayer color="#10B981" label="Artificial Intelligence Layer" desc="AI Chatbots, Voice Agents, Automation, Predictive Analytics" icon={Zap} />
               <TechLayer color="#F59E0B" label="Communication Layer" desc="Cloud PBX, IVR, Omnichannel, Call Center, WhatsApp" icon={PhoneCall} />
               <TechLayer color="#F43F5E" label="Fintech Layer" desc="Accounting, Billing, Payment Reminders, Cash Flow Management" icon={Wallet} />
               <TechLayer color="#B91C1C" label="Cybersecurity Layer" desc="Threat Monitoring, Vulnerability Assessment, Security Operations" icon={Lock} />
               <TechLayer color="#8B5CF6" label="Industry Solutions Layer" desc="Healthcare, Retail, Construction, Agriculture & Many More" icon={Globe} />
            </div>
         </div>
      </section>

      {/* Product Portfolio */}
      <section className="py-32">
         <div className="max-w-[1600px] mx-auto px-8">
            <div className="flex justify-between items-end mb-20">
               <div>
                  <p className="text-eurosia-red font-black uppercase tracking-[0.4em] text-xs mb-4">Our Product Portfolio</p>
                  <h2 className="text-5xl font-black tracking-tighter">Unlimited Solutions. One Ecosystem.</h2>
               </div>
               <Link to="/apps" className="text-eurosia-blue font-black uppercase tracking-widest text-xs hover:underline flex items-center gap-2">View All Apps <ChevronRight size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <ProductCard title="EUROSIA POS" desc="Smart Restaurant & Retail Management" icon={Store} color="#F43F5E" url="http://pos.eurosia.io/" />
               <ProductCard title="EUROSIA Care" desc="Digital Clinic & Healthcare Platform" icon={HeartPulse} color="#10B981" />
               <ProductCard title="EUROSIA CloudPBX" desc="Cloud PBX & Call Center Solution" icon={Headphones} color="#3B82F6" />
               <ProductCard title="EUROSIA AI Calling" desc="AI-Powered Voice Automation Platform" icon={Radio} color="#F59E0B" />
               
               <ProductCard title="EUROSIA AI Chatbot" desc="Customer Engagement Platform" icon={MessageSquare} color="#8B5CF6" />
               <ProductCard title="EUROSIA DataPilot AI" desc="Data Automation & Web Intelligence" icon={Activity} color="#3B82F6" />
               <ProductCard title="EUROSIA Defender X" desc="Global Cyber Defense Platform" icon={Lock} color="#B91C1C" />
               <ProductCard title="EUROSIA BuildNex" desc="Construction ERP & Property Management" icon={Building} color="#F59E0B" />

               <ProductCard title="EUROSIA InvoiceNex" desc="Professional Invoice Generator" icon={FileText} color="#0EA5E9" />
               <ProductCard title="EUROSIA PayBill" desc="Bill Management & Payment Reminder" icon={CreditCard} color="#F59E0B" />
               <ProductCard title="NexFarmer" desc="Agro Invoice & Farm Business Solution" icon={Layers} color="#10B981" />
               <ProductCard title="EUROSIA Cloud" desc="Multi-Tenant SaaS Platform" icon={Cloud} color="#3B82F6" />
            </div>
            
            <div className="mt-12 bg-eurosia-gradient rounded-[48px] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-12 group cursor-pointer overflow-hidden relative">
               <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
               <div className="flex-1 relative z-10">
                  <h3 className="text-4xl font-black mb-4 group-hover:translate-x-2 transition-transform">More Apps Coming Soon...</h3>
                  <p className="text-xl text-gray-400 font-bold">The marketplace is growing every day.</p>
               </div>
               <div className="relative z-10">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400" alt="Apps" className="w-64 rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" />
               </div>
            </div>
         </div>
      </section>

      {/* Simple Steps */}
      <section className="py-32 bg-gray-50/50">
         <div className="max-w-[1600px] mx-auto px-8 text-center">
            <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs mb-4">How EUROSIA App Ecosystem Works</p>
            <h2 className="text-5xl font-black tracking-tight mb-20">Simple Steps to Complete Business Management</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-8">
               <Step num="01" icon={Globe} label="Visit Website" />
               <Step num="02" icon={Users} label="Create Account" />
               <Step num="03" icon={Building} label="Create Company" />
               <Step num="04" icon={Layers} label="Choose Apps" />
               <Step num="05" icon={ShieldCheck} label="Activate License" />
               <Step num="06" icon={Layout} label="Use Dashboard" />
               <Step num="07" icon={Briefcase} label="Work Offline" />
               <Step num="08" icon={CloudUpload} label="Auto Sync Cloud" />
               <Step num="09" icon={TrendingUp} label="Scale & Grow" />
            </div>
         </div>
      </section>

      {/* Dashboard Sneak Peek */}
      <section className="py-32 bg-white">
         <div className="max-w-[1600px] mx-auto px-8">
            <div className="bg-eurosia-gradient rounded-[64px] p-20 text-white flex flex-col lg:flex-row gap-20 overflow-hidden relative shadow-2xl">
               <div className="lg:w-1/3 relative z-10">
                  <p className="text-eurosia-red font-black uppercase tracking-[0.4em] text-xs mb-4 tracking-tighter uppercase">Unified Business Dashboard</p>
                  <h2 className="text-5xl font-black mb-10 tracking-tight leading-tight">Everything You Need. <br /><span className="text-eurosia-red">At a Glance.</span></h2>
                  <ul className="space-y-6 mb-12">
                     <CheckItem text="Real-time Analytics & Insights" />
                     <CheckItem text="App Integration & Automation" />
                     <CheckItem text="Offline-First with Cloud Sync" />
                     <CheckItem text="Secure, Fast & Reliable" />
                  </ul>
                  <Link to="/dashboard" className="inline-flex items-center gap-3 bg-eurosia-red text-white px-10 py-5 rounded-2xl font-black hover:bg-red-700 transition-all shadow-eurosia-red">
                    Explore Dashboard <ArrowRight size={18} />
                  </Link>
               </div>
               <div className="lg:w-2/3 relative">
                  <div className="bg-[#1E293B] rounded-3xl border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] h-[600px] p-8 overflow-hidden relative">
                     <div className="flex items-center justify-between mb-10">
                        <div className="w-8 h-8 bg-eurosia-red rounded-lg" />
                        <div className="flex gap-4">
                           <div className="w-24 h-2 bg-white/5 rounded-full" />
                           <div className="w-8 h-8 rounded-full bg-white/10" />
                        </div>
                     </div>
                     <div className="grid grid-cols-4 gap-6 mb-12">
                        {[1,2,3,4].map(i => <div key={i} className="h-24 bg-white/5 rounded-3xl" />)}
                     </div>
                     <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 h-64 bg-white/5 rounded-3xl" />
                        <div className="h-64 bg-white/5 rounded-3xl" />
                     </div>
                     <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between py-4 border-t border-white/5">
                        <div className="flex gap-6">
                           <div className="w-20 h-2 bg-white/10 rounded" />
                           <div className="w-20 h-2 bg-white/10 rounded" />
                        </div>
                        <div className="w-32 h-10 bg-eurosia-red rounded-xl" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Pricing Header */}
      <section className="py-32 border-b border-gray-100">
         <div className="max-w-[1600px] mx-auto px-8 text-center">
            <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs mb-4">Flexible Pricing Plans</p>
            <h2 className="text-5xl font-black tracking-tight mb-8">Choose the Plan That Fits Your Business</h2>
            <div className="inline-flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-full mb-20">
               <button className="bg-eurosia-red text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">Monthly</button>
               <button className="text-gray-400 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:text-eurosia-blue transition-colors">Yearly (Save 20%)</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
               <PricingCard 
                 title="Starter" 
                 desc="Perfect for small businesses" 
                 price="৳ 1,990" 
                 features={["Up to 5 Users", "5 Apps Included", "5GB Cloud Storage", "Email Support"]}
               />
               <PricingCard 
                 title="Business" 
                 desc="For growing businesses" 
                 price="৳ 4,990" 
                 popular
                 features={["Up to 20 Users", "20 Apps Included", "20GB Cloud Storage", "Priority Support"]}
               />
               <PricingCard 
                 title="Enterprise" 
                 desc="For large organizations" 
                 price="৳ 12,990" 
                 features={["Unlimited Users", "Unlimited Apps", "100GB Cloud Storage", "24/7 Premium Support"]}
               />
               <PricingCard 
                 title="White Label" 
                 desc="For resellers & agencies" 
                 price="Custom" 
                 features={["White Label Branding", "Custom Domain", "Dedicated Support", "Revenue Sharing"]}
               />
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-gray-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-eurosia-red/10 blur-[120px] rounded-full translate-x-1/2" />
         <div className="max-w-[1600px] mx-auto px-8 relative z-10 text-center">
            <p className="text-eurosia-red font-black uppercase tracking-[0.4em] text-xs mb-8">Ready to evolve?</p>
            <h2 className="text-4xl md:text-7xl font-black mb-16 max-w-5xl mx-auto leading-tight">
               Build, manage and scale your <br />
               <span className="text-eurosia-red">entire business</span> from one platform.
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
               <Link to="/signup" className="px-12 py-6 bg-eurosia-red text-white rounded-3xl font-black text-lg shadow-xl shadow-red-900/20 hover:scale-105 transition-all">Start with EUROSIA App</Link>
               <Link to="/contact" className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-3xl font-black text-lg hover:bg-white/10 transition-all flex items-center gap-4">
                  Talk to a Specialist <ArrowRight size={24} />
               </Link>
            </div>
            
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto pt-24 border-t border-white/5">
                <div>
                   <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-2">Activation</p>
                   <p className="text-xl font-black">Instant Deploy</p>
                </div>
                <div>
                   <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-2">Uptime</p>
                   <p className="text-xl font-black">99.9% SLI</p>
                </div>
                <div>
                   <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-2">Security</p>
                   <p className="text-xl font-black">Bank-Grade</p>
                </div>
                <div>
                   <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-2">Compliance</p>
                   <p className="text-xl font-black">ISO Certified</p>
                </div>
            </div>
         </div>
      </section>

    </div>
  );
}

function QuickCard({ icon: Icon, label, desc }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer group">
       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-eurosia-red transition-all">
         <Icon size={24} className="text-white" />
       </div>
       <div>
          <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">{label}</p>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{desc}</p>
       </div>
    </div>
  );
}

function Benefit({ icon: Icon, label, sub }: any) {
   return (
      <div className="flex flex-col items-center gap-3">
         <div className="w-16 h-16 bg-blue-50 text-eurosia-blue rounded-2xl flex items-center justify-center hover:bg-eurosia-blue hover:text-white transition-all shadow-sm">
            <Icon size={28} />
         </div>
         <div>
            <p className="text-sm font-black text-gray-900 leading-tight">{label}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">{sub}</p>
         </div>
      </div>
   );
}

function TechLayer({ color, label, desc, icon: Icon }: any) {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden border-b-8" style={{ borderBottomColor: color }}>
       <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:rotate-12 transition-transform" style={{ backgroundColor: color }}>
         <Icon size={24} />
       </div>
       <h4 className="text-sm font-black leading-tight mb-4">{label}</h4>
       <p className="text-[10px] text-gray-400 font-bold leading-relaxed">{desc}</p>
       <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
          <ChevronRight size={24} />
       </div>
    </div>
  );
}

function ProductCard({ title, desc, icon: Icon, color, url }: any) {
  const CardContent = (
    <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex gap-5 h-full cursor-pointer">
       <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform shadow-lg shadow-black/10" style={{ backgroundColor: color }}>
         <Icon size={24} />
       </div>
       <div>
          <h4 className="text-sm font-black leading-tight group-hover:text-eurosia-red transition-colors">{title}</h4>
          <p className="text-[10px] text-gray-400 font-bold mt-1 leading-relaxed">{desc}</p>
       </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="block h-full">
        {CardContent}
      </a>
    );
  }

  return (
    <Link to="/signup" className="block h-full">
      {CardContent}
    </Link>
  );
}

function Step({ num, icon: Icon, label }: any) {
  return (
    <div className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-all cursor-pointer">
       <div className="text-[10px] font-black text-gray-300 border-b-2 border-gray-100 pb-1 mb-2">00</div>
       <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-900 border border-gray-50">
          <Icon size={24} />
       </div>
       <span className="text-[10px] font-black uppercase text-gray-600 tracking-tight leading-none text-center">{label}</span>
       <p className="text-[8px] text-gray-300 font-bold uppercase mt-1">Explore Ecosystem</p>
    </div>
  );
}

function PricingCard({ title, desc, price, features, popular }: any) {
  return (
    <div className={`p-10 rounded-[40px] border transition-all ${popular ? 'border-eurosia-red ring-4 ring-red-50 bg-white scale-105 shadow-2xl relative z-10' : 'border-gray-100 hover:border-eurosia-blue bg-white'}`}>
       {popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-eurosia-red text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Popular</span>}
       <h4 className="text-xl font-black mb-2">{title}</h4>
       <p className="text-xs text-gray-400 font-bold mb-8">{desc}</p>
       <div className="flex items-baseline gap-2 mb-10">
          <span className="text-4xl font-black tracking-tight">{price}</span>
          <span className="text-gray-400 font-bold uppercase text-[10px]">/month</span>
       </div>
       <ul className="space-y-4 mb-10">
          {features.map((f: any) => (
            <li key={f} className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 bg-eurosia-red rounded-full" />
               <span className="text-xs font-bold text-gray-600">{f}</span>
            </li>
          ))}
       </ul>
       <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${popular ? 'bg-eurosia-red text-white shadow-eurosia-red hover:bg-red-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'}`}>Get Started</button>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-4">
       <div className="w-5 h-5 bg-eurosia-red text-white rounded-full flex items-center justify-center shrink-0">
          <CheckCircle2 size={12} />
       </div>
       <span className="text-sm font-bold text-white/80">{text}</span>
    </li>
  );
}


