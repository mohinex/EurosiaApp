import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Mail, Lock, Eye, EyeOff, Loader2, Key } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useUIStore } from "../store/useUIStore";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);
  const addToast = useUIStore(state => state.addToast);

  const [isOwnerMode, setIsOwnerMode] = useState(false);

  const handleLogoDoubleClick = () => {
    setIsOwnerMode(true);
    addToast("info", "Owner Security Mode Activated", "Please enter the master admin key to continue.");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const ownerKey = formData.get("ownerKey");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ownerKey }),
      });

      const data = await res.json();

      if (res.ok) {
        addToast("success", "Welcome back!", "Redirecting to your dashboard...");
        setAuth(data.user, data.token);
        if (data.user.role === "SUPER_ADMIN") {
          navigate("/dashboard/super");
        } else {
          navigate("/dashboard");
        }
      } else {
        addToast("error", "Authentication Failed", data.error || "Invalid credentials provided.");
      }
    } catch (err) {
      addToast("error", "Network Error", "Unable to reach EUROSIA servers. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div 
          onDoubleClick={handleLogoDoubleClick}
          className="flex justify-center items-center gap-2 mb-6 cursor-pointer select-none group"
        >
          <div className="w-12 h-12 bg-[#CC1A2F] text-white rounded-xl flex items-center justify-center font-bold text-3xl shadow-lg shadow-red-900/20 group-active:scale-95 transition-transform">E</div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl leading-none text-gray-900">EUROSIA</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">App Ecosystem</span>
          </div>
        </div>
        <h2 className="text-center text-3xl font-black text-gray-900 tracking-tight">
          {isOwnerMode ? "Owner Administration" : "Sign in to your account"}
        </h2>
        {!isOwnerMode && (
          <p className="mt-4 text-center text-sm text-gray-400 font-bold uppercase tracking-widest">
            Or{" "}
            <Link to="/signup" className="text-[#CC1A2F] hover:text-[#991B1B]">
              start your free trial
            </Link>
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-12 px-10 shadow-2xl shadow-gray-200 border border-gray-100 sm:rounded-[32px]"
        >
          <form className="space-y-6" onSubmit={handleLogin}>
            {isOwnerMode ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label className="block text-[10px] font-black text-[#CC1A2F] uppercase tracking-[0.2em] mb-3">Master Admin Key</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-red-300" />
                  </div>
                  <input
                    name="ownerKey"
                    type="password"
                    required
                    autoFocus
                    className="block w-full pl-12 pr-4 py-4 border border-red-100 rounded-2xl leading-5 bg-red-50/30 placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-[#CC1A2F] focus:border-transparent sm:text-sm font-bold transition-all"
                    placeholder="Enter owner credentials..."
                  />
                </div>
              </motion.div>
            ) : (
              <>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Email address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-300" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      disabled={isLoading}
                      className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl leading-5 bg-gray-50 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CC1A2F] focus:border-transparent sm:text-sm font-bold transition-all"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-300" />
                    </div>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      disabled={isLoading}
                      className="block w-full pl-12 pr-12 py-4 border border-gray-100 rounded-2xl leading-5 bg-gray-50 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CC1A2F] focus:border-transparent sm:text-sm font-bold transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-300" /> : <Eye className="h-5 w-5 text-gray-300" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#CC1A2F] focus:ring-[#CC1A2F] border-gray-300 rounded-lg cursor-pointer"
                />
                <label className="ml-3 block text-xs font-bold text-gray-500 uppercase tracking-widest">Remember me</label>
              </div>

              {!isOwnerMode && (
                <div className="text-xs">
                  <Link to="#" className="font-black text-[#CC1A2F] hover:text-[#991B1B] uppercase tracking-widest">
                    Forgot Key?
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl shadow-xl shadow-red-900/10 text-sm font-black text-white bg-[#CC1A2F] hover:bg-[#991B1B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CC1A2F] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em]"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isOwnerMode ? "Unlock Master Admin" : "Sign in to Dashboard")}
                {!isLoading && <ArrowRight size={20} />}
              </button>
              {isOwnerMode && (
                <button
                  type="button"
                  onClick={() => setIsOwnerMode(false)}
                  className="w-full mt-6 text-[10px] font-black text-gray-300 hover:text-gray-900 transition-colors uppercase tracking-[0.2em]"
                >
                  Return to normal login
                </button>
              )}
            </div>
          </form>
        </motion.div>
        <p className="mt-12 text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">
           &copy; 2025 EUROSIA LTD. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}
