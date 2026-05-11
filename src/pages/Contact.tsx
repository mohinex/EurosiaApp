import { useState } from "react";
import { Mail, Phone, MapPin, Globe, Send, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT_INFO } from "../constants/contact";

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setFormState('success');
      else setFormState('error');
    } catch (err) {
      setFormState('error');
    }
  };

  return (
    <div className="pt-40 pb-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div>
            <p className="text-eurosia-red font-black uppercase tracking-[0.4em] text-xs mb-4">Connect with EUROSIA</p>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-12">
               Let's Build <br />
               <span className="text-eurosia-red">the Future Together</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed mb-16 max-w-xl">
               Connect with EUROSIA to discover how our ecosystem-powered business technologies can help you automate, manage and scale your organization.
            </p>

            <div className="space-y-12">
               {[
                 { icon: MapPin, title: "Headquarters", content: CONTACT_INFO.officeAddress, sub: CONTACT_INFO.officeLocation },
                 { icon: Phone, title: "Direct Line", content: CONTACT_INFO.phonePrimaryDisplay, url: `tel:${CONTACT_INFO.phonePrimary}` },
                 { icon: MessageCircle, title: "WhatsApp Support", content: CONTACT_INFO.phoneSecondaryDisplay, url: CONTACT_INFO.whatsapp.primary },
                 { icon: Mail, title: "Official Support", content: CONTACT_INFO.supportEmail, url: `mailto:${CONTACT_INFO.supportEmail}` },
               ].map((item, i) => (
                 <a key={i} href={item.url} target={item.url?.startsWith('http') ? "_blank" : undefined} rel={item.url?.startsWith('http') ? "noreferrer" : undefined} className="flex gap-8 group cursor-pointer">
                    <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-eurosia-red group-hover:text-white transition-all shadow-sm">
                       <item.icon size={28} />
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">{item.title}</h4>
                       <p className="text-xl font-black text-gray-900 tracking-tight">{item.content}</p>
                       {item.sub && <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{item.sub}</p>}
                    </div>
                 </a>
               ))}
            </div>

            <div className="mt-20 p-12 bg-gray-900 rounded-[48px] text-white relative overflow-hidden">
               <div className="absolute right-0 top-0 w-40 h-40 bg-eurosia-red opacity-20 blur-[60px] rounded-full" />
               <h4 className="text-2xl font-black mb-4 tracking-tight">Ecosystem Partnership</h4>
               <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">Interested in becoming an EUROSIA partner or reseller? Join our growing global network.</p>
               <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-eurosia-red hover:text-white transition-colors">
                  Join Partner Program <ArrowRight size={16} />
               </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-eurosia-red/5 rounded-[64px] rounded-br-[120px] translate-x-4 translate-y-4" />
            <div className="relative bg-white p-12 md:p-16 rounded-[64px] rounded-br-[120px] border border-gray-100 shadow-2xl">
              {formState === 'success' ? (
                <div className="py-24 text-center">
                   <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green-500/10">
                      <CheckCircle2 size={48} />
                   </div>
                   <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Transmission Successful</h3>
                    <p className="text-gray-400 font-medium mb-12 max-w-xs mx-auto">Thank you for contacting EUROSIA. Our team has received your message and will get back to you shortly.</p>
                   <button 
                     onClick={() => setFormState('idle')}
                     className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
                   >
                     Send New Message
                   </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Full Name</label>
                         <input name="name" required type="text" className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-black outline-none focus:bg-white focus:border-eurosia-red/20 focus:ring-4 focus:ring-eurosia-red/5 transition-all" placeholder="Enter Full Name" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Company Name</label>
                         <input name="company" required type="text" className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-black outline-none focus:bg-white focus:border-eurosia-red/20 focus:ring-4 focus:ring-eurosia-red/5 transition-all" placeholder="Enter Company Name" />
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Email Address</label>
                         <input name="email" required type="email" className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-black outline-none focus:bg-white focus:border-eurosia-red/20 focus:ring-4 focus:ring-eurosia-red/5 transition-all" placeholder="Email Address" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Phone Number</label>
                         <input name="phone" required type="tel" className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-black outline-none focus:bg-white focus:border-eurosia-red/20 focus:ring-4 focus:ring-eurosia-red/5 transition-all" placeholder="Phone Number" />
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Country</label>
                         <input name="country" required type="text" className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-black outline-none focus:bg-white focus:border-eurosia-red/20 focus:ring-4 focus:ring-eurosia-red/5 transition-all" placeholder="Country" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Interested Solution</label>
                         <select name="solution" required className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-black outline-none focus:bg-white focus:border-eurosia-red/20 focus:ring-4 focus:ring-eurosia-red/5 transition-all appearance-none">
                            <option value="">Select a Solution</option>
                            <option value="ERP">ERP Solution</option>
                            <option value="CRM">CRM Solution</option>
                            <option value="Healthcare">Healthcare System</option>
                            <option value="Retail">Retail & POS</option>
                            <option value="Construction">Construction Management</option>
                         </select>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Detailed Message</label>
                      <textarea name="message" required rows={6} className="w-full bg-gray-50 border border-transparent rounded-3xl px-6 py-5 text-sm font-black outline-none focus:bg-white focus:border-eurosia-red/20 focus:ring-4 focus:ring-eurosia-red/5 transition-all resize-none" placeholder="Tell us more about your business needs..."></textarea>
                   </div>
                   <button 
                     disabled={formState === 'loading'}
                     className="w-full py-6 bg-eurosia-red hover:bg-red-700 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-900/20 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                   >
                     {formState === 'loading' ? "Processing..." : "Dispatch Message"}
                     <Send size={18} />
                   </button>
                   {formState === 'error' && (
                     <p className="text-red-500 text-[10px] font-black uppercase text-center tracking-widest">Network conflict detected. Please retry transmission.</p>
                   )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

