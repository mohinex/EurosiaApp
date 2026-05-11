import { Link } from "react-router-dom";
import { 
  Facebook, Twitter, Linkedin, Github, 
  Mail, Phone, MapPin, ArrowUpRight, 
  Globe, Layers, ShieldCheck, MessageSquare
} from "lucide-react";
import { CONTACT_INFO } from "../constants/contact";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 pt-32 pb-12 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-10 group cursor-pointer">
              <div className="w-12 h-12 bg-white text-gray-900 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl transition-transform group-hover:scale-110">
                E
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl leading-none text-white tracking-tighter">EUROSIA</span>
                <span className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase">App Ecosystem</span>
              </div>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed mb-10 max-w-sm">
              {CONTACT_INFO.siteName} is the complete ecosystem-powered business operating system for modern organizations.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, url: CONTACT_INFO.socials.facebook },
                { icon: Twitter, url: CONTACT_INFO.socials.twitter },
                { icon: Linkedin, url: CONTACT_INFO.socials.linkedin },
                { icon: Github, url: "https://github.com/Eurosia-App-Ecosystem" }
              ].map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-eurosia-red hover:text-white transition-all cursor-pointer">
                  <item.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:col-span-3">
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Products</h4>
              <ul className="space-y-4">
                {["AI Apps", "POS System", "Cloud PBX", "AI Solutions", "eCommerce"].map((item) => (
                  <li key={item}>
                    <Link to="/apps" className="text-sm font-bold text-gray-500 hover:text-eurosia-red transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Solutions</h4>
              <ul className="space-y-4">
                {["ERP Solution", "CRM Solution", "Healthcare", "Retail & POS", "Construction"].map((item) => (
                  <li key={item}>
                    <Link to="/solutions" className="text-sm font-bold text-gray-500 hover:text-eurosia-red transition-colors flex items-center gap-1 group">
                      {item} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Company</h4>
              <ul className="space-y-4">
                {[
                  { name: "About Us", path: "/about" },
                  { name: "Careers", path: "#" },
                  { name: "Partners", path: "#" },
                  { name: "News & Blog", path: "#" },
                  { name: "Contact Us", path: "/contact" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm font-bold text-gray-500 hover:text-eurosia-red transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Resources</h4>
              <ul className="space-y-4">
                {["Documentation", "Help Center", "API Reference", "Community", "Status"].map((item) => (
                  <li key={item}>
                    <Link to="#" className="text-sm font-bold text-gray-500 hover:text-eurosia-red transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 border-y border-white/5 py-12">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-eurosia-red">
                 <MapPin size={24} />
              </div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                 {CONTACT_INFO.officeAddress}
              </p>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-eurosia-red">
                 <Phone size={24} />
              </div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                 {CONTACT_INFO.phonePrimaryDisplay}
              </p>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-eurosia-red">
                 <Mail size={24} />
              </div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                 {CONTACT_INFO.supportEmail}
              </p>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-eurosia-red">
                 <Globe size={24} />
              </div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                 {CONTACT_INFO.primaryWebsite}
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-4">Newsletter</h4>
            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Subscribe to get updates</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Join our ecosystem for the latest app launches, security reports, and innovations.
            </p>
          </div>
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 focus-within:border-eurosia-red/50 transition-colors max-w-xl lg:ml-auto w-full">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-transparent border-none outline-none px-6 text-sm font-bold text-white placeholder-gray-600"
            />
            <button className="px-10 py-4 bg-eurosia-red text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-900/20">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-1">
             <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none">
                &copy; {currentYear} {CONTACT_INFO.companyName}. ALL RIGHTS RESERVED.
             </p>
             <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Powered by Antigravity OS</p>
          </div>
          <div className="flex gap-10">
            {["System Privacy", "License Agreement", "Audit Log", "Status"].map(item => (
              <Link key={item} to="#" className="text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

