import { Link } from "react-router-dom";

export const CTAButton = () => {
  return (
    <Link
      to="/signup"
      className="px-8 py-4 bg-[#CC1A2F] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-red-900/20 hover:scale-105 transition-all"
    >
      Establish Ecosystem
    </Link>
  );
};
