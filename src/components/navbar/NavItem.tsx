import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface NavItemProps {
  name: string;
  path: string;
  hasDropdown?: boolean;
  theme: "dark" | "light";
  isActive: boolean;
  isScrolled: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isOpen?: boolean;
}

export const NavItem = ({ 
  name, 
  path, 
  hasDropdown, 
  theme, 
  isActive, 
  isScrolled, 
  onMouseEnter, 
  onMouseLeave,
  isOpen 
}: NavItemProps) => {
  const getThemeClasses = () => {
    // If scrolled, we are always in "light" style basically (white bg)
    if (isScrolled) {
      return isActive 
        ? "text-eurosia-red" 
        : "text-gray-500 hover:text-eurosia-red";
    }

    if (theme === "dark") {
      return isActive 
        ? "text-eurosia-red font-black" 
        : "text-white/90 hover:text-eurosia-red";
    } else {
      return isActive 
        ? "text-eurosia-red font-black" 
        : "text-slate-900 hover:text-[#CC1A2F]";
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        to={path}
        aria-current={isActive ? "page" : undefined}
        className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-1 ${getThemeClasses()}`}
      >
        {name}
        {hasDropdown && (
          <ChevronDown 
            size={14} 
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
          />
        )}
      </Link>
    </div>
  );
};
