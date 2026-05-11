import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useUIStore } from "../store/useUIStore";

export default function FeedbackRenderer() {
  const { toasts, removeToast, modal, closeModal } = useUIStore();

  return (
    <>
      {/* Toasts */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={`pointer-events-auto min-w-[320px] max-w-[400px] p-4 rounded-2xl shadow-2xl border flex gap-4 items-start ${
                toast.type === "success" ? "bg-white border-green-100 shadow-green-900/5" :
                toast.type === "error" ? "bg-white border-red-100 shadow-red-900/5" :
                toast.type === "warning" ? "bg-white border-amber-100 shadow-amber-900/5" :
                "bg-white border-blue-100 shadow-blue-900/5"
              }`}
            >
              <div className={`mt-0.5 shrink-0 ${
                toast.type === "success" ? "text-green-500" :
                toast.type === "error" ? "text-red-500" :
                toast.type === "warning" ? "text-amber-500" :
                "text-blue-500"
              }`}>
                {toast.type === "success" && <CheckCircle2 size={20} />}
                {toast.type === "error" && <AlertCircle size={20} />}
                {toast.type === "warning" && <AlertTriangle size={20} />}
                {toast.type === "info" && <Info size={20} />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-gray-900">{toast.message}</p>
                {toast.description && <p className="text-xs text-gray-500 mt-1 font-medium">{toast.description}</p>}
              </div>
              <button 
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-900 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal.isOpen && (
          <div className="fixed inset-0 z-[9998] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[40px] shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100"
            >
               <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">{modal.title}</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-900 transition-colors">
                     <X size={24} />
                  </button>
               </div>
               <div className="p-8">
                  <div className="text-gray-600 font-medium">
                     {modal.content}
                  </div>
               </div>
               <div className="p-8 bg-gray-50 flex justify-end gap-4">
                  <button 
                    onClick={closeModal}
                    className="px-8 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all"
                  >
                     Cancel
                  </button>
                  {modal.onConfirm && (
                    <button 
                      onClick={() => {
                        modal.onConfirm?.();
                        closeModal();
                      }}
                      className="px-8 py-3 bg-eurosia-red text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all"
                    >
                       Confirm Action
                    </button>
                  )}
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
