import { useState } from "react";
import { 
  CreditCard, Plus, Search, Filter, 
  Settings, Shield, ExternalLink, RefreshCcw,
  ToggleLeft, ToggleRight, CheckCircle2, AlertCircle,
  Globe, Smartphone, Banknote, Landmark, Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SUPPORTED_PROVIDERS = [
  { id: 'stripe', name: 'Stripe', icon: CreditCard, color: '#6366F1' },
  { id: 'paypal', name: 'PayPal', icon: Wallet, color: '#003087' },
  { id: 'bkash', name: 'bKash', icon: Smartphone, color: '#D12053' },
  { id: 'nagad', name: 'Nagad', icon: Smartphone, color: '#E93323' },
  { id: 'sslcommerz', name: 'SSLCommerz', icon: Globe, color: '#005CAB' },
  { id: 'bank', name: 'Bank Transfer', icon: Landmark, color: '#475569' },
  { id: 'manual', name: 'Manual Payment', icon: Banknote, color: '#10B981' },
];

export default function PaymentSettings() {
  const [methods, setMethods] = useState([
    { 
      id: '1', 
      name: 'Credit / Debit Card', 
      provider: 'stripe', 
      isEnabled: true, 
      isSandbox: true, 
      currency: 'USD',
      fee: 2.9,
      status: 'Active'
    },
    { 
      id: '2', 
      name: 'bKash Wallet', 
      provider: 'bkash', 
      isEnabled: true, 
      isSandbox: false, 
      currency: 'BDT',
      fee: 1.85,
      status: 'Active'
    },
    { 
      id: '3', 
      name: 'Bank Transfer (Offline)', 
      provider: 'bank', 
      isEnabled: false, 
      isSandbox: false, 
      currency: 'BDT',
      fee: 0,
      status: 'Inactive'
    }
  ]);

  const [selectedMethod, setSelectedMethod] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#B91C1C] rounded-[24px] flex items-center justify-center text-white shadow-2xl">
               <CreditCard size={32} />
            </div>
            <div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tight">Payment <span className="text-[#B91C1C]">Gateways</span></h1>
               <p className="text-gray-500 font-medium">Control global payment methods and merchant credentials.</p>
            </div>
         </div>
         <button className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all">
            <Plus size={18} />
            Add Method
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* List */}
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm">
               <div className="grid grid-cols-1 gap-4">
                  {methods.map((method) => {
                    const provider = SUPPORTED_PROVIDERS.find(p => p.id === method.provider);
                    const Icon = provider?.icon || CreditCard;
                    
                    return (
                      <div 
                        key={method.id}
                        onClick={() => setSelectedMethod(method)}
                        className={`flex items-center justify-between p-6 rounded-3xl border transition-all cursor-pointer ${
                          selectedMethod?.id === method.id 
                            ? 'bg-gray-900 border-gray-900 text-white shadow-2xl scale-[1.02]' 
                            : 'bg-gray-50 border-gray-100 hover:border-[#B91C1C]/30 text-gray-900'
                        }`}
                      >
                         <div className="flex items-center gap-6">
                            <div 
                              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                              style={{ backgroundColor: provider?.color }}
                            >
                               <Icon size={28} />
                            </div>
                            <div>
                               <p className="font-black text-lg">{method.name}</p>
                               <div className="flex items-center gap-3 mt-1">
                                  <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{method.provider}</span>
                                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${method.isSandbox ? 'bg-amber-500/20 text-amber-500' : 'bg-green-500/20 text-green-500'}`}>
                                     {method.isSandbox ? 'SANDBOX' : 'LIVE'}
                                  </span>
                               </div>
                            </div>
                         </div>

                         <div className="flex items-center gap-8">
                            <div className="text-right hidden sm:block">
                               <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Fee</p>
                               <p className="font-black">{method.fee}%</p>
                            </div>
                            <button className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                               selectedMethod?.id === method.id ? 'bg-white/10 text-white' : 'bg-white text-gray-400'
                            }`}>
                               <Settings size={20} />
                            </button>
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>
         </div>

         {/* Configuration Details */}
         <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
               {selectedMethod ? (
                 <motion.div 
                   key={selectedMethod.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm space-y-8 sticky top-8"
                 >
                    <div className="flex items-center justify-between">
                       <h3 className="text-2xl font-black text-gray-900">Configure</h3>
                       <button className={`p-2 rounded-lg ${selectedMethod.isEnabled ? 'text-green-500 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>
                          {selectedMethod.isEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                       </button>
                    </div>

                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Public Key</label>
                          <input type="text" value="pk_test_********************" readOnly className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-mono text-sm font-bold" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secret Key</label>
                          <input type="password" value="sk_test_********************" readOnly className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-mono text-sm font-bold" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Currency</label>
                             <input type="text" value={selectedMethod.currency} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fee (%)</label>
                             <input type="text" value={selectedMethod.fee} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold" />
                          </div>
                       </div>
                    </div>

                    <div className="p-6 bg-red-50 border border-red-100 rounded-3xl">
                       <div className="flex gap-3">
                          <AlertCircle className="text-[#B91C1C] shrink-0" size={20} />
                          <p className="text-xs font-bold text-red-900 leading-relaxed">
                             Ensure the callback URL in your {selectedMethod.provider} dashboard matches: <br/>
                             <span className="font-mono text-[10px] opacity-60">https://api.eurosia.com/v1/payments/webhook</span>
                          </p>
                       </div>
                    </div>

                    <button className="w-full py-5 bg-[#B91C1C] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-[#991B1B] transition-all">
                       Save Gateway Config
                    </button>
                 </motion.div>
               ) : (
                 <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[48px] p-10 flex flex-col items-center justify-center text-center h-[500px]">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-6">
                       <CreditCard size={40} />
                    </div>
                    <p className="text-lg font-black text-gray-400">Select a payment method <br/> to configure credentials</p>
                 </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
