import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, User, Building, Loader2 } from "lucide-react";
import { useState } from "react";
import { useUIStore } from "../store/useUIStore";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const addToast = useUIStore(state => state.addToast);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const companyName = formData.get("companyName");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, companyName }),
      });

      const data = await res.json();

      if (res.ok) {
        addToast("success", "Account Created!", "Your EUROSIA ecosystem is being provisioned. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        addToast("error", "Signup Failed", data.error || "Please check your information and try again.");
      }
    } catch (err) {
      addToast("error", "Network Error", "Unable to reach EUROSIA servers.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center gap-2 mb-6 group">
          <div className="w-12 h-12 bg-[#CC1A2F] text-white rounded-xl flex items-center justify-center font-bold text-3xl shadow-lg shadow-red-900/20 group-active:scale-95 transition-transform">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl leading-none text-gray-900">EUROSIA</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">App Ecosystem</span>
          </div>
        </Link>
        <h2 className="text-center text-3xl font-black text-gray-900 tracking-tight">Start your free trial</h2>
        <p className="mt-4 text-center text-sm text-gray-400 font-bold uppercase tracking-widest">
          Already have an account?{" "}
          <Link to="/login" className="text-[#CC1A2F] hover:text-[#991B1B]">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-12 px-10 shadow-2xl shadow-gray-200 border border-gray-100 sm:rounded-[32px]"
        >
          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-300" />
                  </div>
                  <input name="firstName" type="text" required disabled={isLoading} className="block w-full pl-10 pr-4 py-4 border border-gray-100 rounded-2xl bg-gray-50 text-sm font-bold focus:ring-[#CC1A2F] outline-none transition-all" placeholder="John" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Last Name</label>
                <input name="lastName" type="text" required disabled={isLoading} className="block w-full px-4 py-4 border border-gray-100 rounded-2xl bg-gray-50 text-sm font-bold focus:ring-[#CC1A2F] outline-none transition-all" placeholder="Doe" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Company Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-300" />
                </div>
                <input name="companyName" type="text" required disabled={isLoading} className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl bg-gray-50 text-sm font-bold focus:ring-[#CC1A2F] outline-none transition-all" placeholder="Eurosia Ltd" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Work Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-300" />
                </div>
                <input name="email" type="email" required disabled={isLoading} className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl bg-gray-50 text-sm font-bold focus:ring-[#CC1A2F] outline-none transition-all" placeholder="john@company.com" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-300" />
                </div>
                <input name="password" type="password" required disabled={isLoading} className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl bg-gray-50 text-sm font-bold focus:ring-[#CC1A2F] outline-none transition-all" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input type="checkbox" required className="h-4 w-4 text-[#CC1A2F] focus:ring-[#CC1A2F] border-gray-200 rounded-lg cursor-pointer" />
              </div>
              <div className="ml-3 text-xs leading-relaxed text-gray-400 font-bold uppercase tracking-tight">
                <label>
                  I agree to the <Link to="/terms" className="text-[#CC1A2F] hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-[#CC1A2F] hover:underline">Privacy Policy</Link>.
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl shadow-xl shadow-red-900/10 text-sm font-black text-white bg-[#CC1A2F] hover:bg-[#991B1B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CC1A2F] transition-all flex items-center gap-3 uppercase tracking-[0.2em]"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Create My Ecosystem"}
                {!isLoading && <ArrowRight size={20} />}
              </button>
            </div>
          </form>
          
          <p className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black italic">
            No credit card required. 14 days free trial.
          </p>
        </motion.div>
        <p className="mt-12 text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">
           &copy; 2025 EUROSIA LTD. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}
