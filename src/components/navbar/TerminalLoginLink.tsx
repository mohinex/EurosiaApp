import { Link } from "react-router-dom";

interface TerminalLoginLinkProps {
  theme: "dark" | "light";
  isScrolled: boolean;
}

export const TerminalLoginLink = ({ theme, isScrolled }: TerminalLoginLinkProps) => {
  const getThemeClasses = () => {
    if (isScrolled) return "text-gray-900";
    if (theme === "dark") return "text-white";
    return "text-slate-900";
  };

  return (
    <Link
      to="/login"
      className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-eurosia-red ${getThemeClasses()}`}
    >
      Terminal Login
    </Link>
  );
};
