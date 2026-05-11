import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  theme: "dark" | "light";
  isScrolled: boolean;
}

export const LanguageSwitcher = ({ theme, isScrolled }: LanguageSwitcherProps) => {
  const getThemeClasses = () => {
    if (isScrolled) return "text-gray-500 group-hover:text-gray-900";
    if (theme === "dark") return "text-white/80 group-hover:text-white";
    return "text-slate-900 group-hover:text-eurosia-red";
  };

  const getBorderClasses = () => {
    if (isScrolled) return "border-gray-200 group-hover:border-eurosia-red";
    if (theme === "dark") return "border-white/20 group-hover:border-white";
    return "border-slate-200 group-hover:border-eurosia-red";
  };

  const getIconClasses = () => {
    if (isScrolled) return "text-gray-400 group-hover:text-eurosia-red";
    if (theme === "dark") return "text-white/60 group-hover:text-eurosia-red";
    return "text-slate-400 group-hover:text-eurosia-red";
  };

  return (
    <div className="flex items-center gap-2 group cursor-pointer transition-all">
      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${getBorderClasses()}`}>
        <Globe size={14} className={getIconClasses()} />
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${getThemeClasses()}`}>
        EN
      </span>
    </div>
  );
};
