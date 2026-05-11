import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, Globe, 
  LayoutDashboard, Server, Shield, 
  ArrowRight, Sparkles, Building2
} from "lucide-react";
import { NAV_LINKS, PAGE_CONFIG } from "../constants/navigation";
import { NavItem } from "./navbar/NavItem";
import { LanguageSwitcher } from "./navbar/LanguageSwitcher";
import { TerminalLoginLink } from "./navbar/TerminalLoginLink";
import { CTAButton } from "./navbar/CTAButton";

const SOLUTION_ITEMS = [
  { name: "Enterprise ERP", desc: "For large scale operations", icon: Building2 },
  { name: "Managed Cloud", desc: "Global scaling infrastructure", icon: Server },
  { name: "Bank-Grade Security", desc: "High-compliance protection", icon: Shield },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const location = useLocation();

  // Get theme based on route
  const currentTheme = useMemo(() => {
    return PAGE_CONFIG[location.pathname]?.navbarTheme || "light";
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowSolutions(false);
  }, [location.pathname]);

  const textColor = isScrolled 
    ? "text-gray-900" 
    : currentTheme === "dark" 
      ? "text-white" 
      : "text-slate-900";

  const subTextColor = isScrolled 
    ? "text-gray-400" 
    : currentTheme === "dark" 
      ? "text-gray-300" 
      : "text-slate-400";

  const dividerColor = isScrolled
    ? "bg-gray-200"
    : currentTheme === "dark"
      ? "bg-white/25"
      : "bg-slate-200";

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled 
        ? "py-4 bg-white/80 backdrop-blur-2xl shadow-xl shadow-black/5" 
        : currentTheme === "light" 
          ? "py-8 bg-white/50 backdrop-blur-md border-b border-gray-100" 
          : "py-8 bg-transparent"
    }`}>
      <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[#CC1A2F] text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-red-900/20 group-hover:scale-110 transition-transform duration-500">
             E
          </div>
          <div className="flex flex-col">
            <span className={`font-black text-2xl leading-none tracking-tighter transition-colors duration-500 ${textColor}`}>
              EUROSIA
            </span>
            <span className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-500 ${isScrolled ? 'text-gray-400 group-hover:text-[#CC1A2F]' : subTextColor}`}>
              App Ecosystem
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <NavItem 
              key={link.path}
              name={link.name}
              path={link.path}
              hasDropdown={link.hasDropdown}
              theme={currentTheme}
              isActive={location.pathname === link.path}
              isScrolled={isScrolled}
              onMouseEnter={() => link.hasDropdown && setShowSolutions(true)}
              onMouseLeave={() => link.hasDropdown && setShowSolutions(false)}
              isOpen={showSolutions && link.hasDropdown}
            />
          ))}

          {/* Solutions Dropdown Portal-like rendering */}
          <AnimatePresence>
            {showSolutions && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                onMouseEnter={() => setShowSolutions(true)}
                onMouseLeave={() => setShowSolutions(false)}
                className="absolute top-24 left-1/4 mt-4 w-[400px] bg-white border border-gray-100 rounded-[32px] shadow-2xl p-6 overflow-hidden origin-top-left"
              >
                <div className="space-y-4">
                  {SOLUTION_ITEMS.map((item) => (
                    <Link 
                      key={item.name} 
                      to="/solutions"
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#CC1A2F] group-hover:text-white transition-colors">
                         <item.icon size={24} />
                      </div>
                      <div>
                         <p className="text-sm font-black text-gray-900 tracking-tight">{item.name}</p>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-[#CC1A2F]">
                      <Sparkles size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Industry Specific</span>
                   </div>
                   <ArrowRight size={16} className="text-gray-200" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <LanguageSwitcher theme={currentTheme} isScrolled={isScrolled} />
          
          <div className={`h-4 w-[1px] mx-2 transition-colors duration-500 ${dividerColor}`} />

          <TerminalLoginLink theme={currentTheme} isScrolled={isScrolled} />

          <CTAButton />
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-2xl shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="p-8 space-y-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-xl font-black tracking-tight ${location.pathname === link.path ? 'text-[#CC1A2F]' : 'text-gray-900'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 border-t border-gray-100 space-y-4">
                <Link
                  to="/login"
                  className="block w-full py-5 text-center font-black text-gray-900 border border-gray-100 rounded-2xl tracking-widest uppercase text-xs"
                >
                  Terminal Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full py-5 text-center font-black text-white bg-[#CC1A2F] rounded-2xl tracking-widest uppercase text-xs shadow-lg shadow-red-900/20"
                >
                  Establish Ecosystem
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


