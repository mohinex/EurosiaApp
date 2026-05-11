import { Loader2, PackageOpen, ChevronLeft, ChevronRight } from "lucide-react";

export function LoadingState({ message = "Loading data..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-12 text-center">
       <Loader2 className="w-12 h-12 text-[#CC1A2F] animate-spin mb-4" />
       <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">{message}</p>
    </div>
  );
}

export function EmptyState({ title, desc, actionLabel, onAction }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-12 text-center bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
       <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
          <PackageOpen size={40} className="text-gray-300" />
       </div>
       <h3 className="text-xl font-black text-gray-900 mb-2">{title || "No Data Found"}</h3>
       <p className="text-gray-500 max-w-sm mb-8 font-medium">{desc || "We couldn't find any records matching your criteria. Try adjusting your filters."}</p>
       {actionLabel && (
         <button 
           onClick={onAction}
           className="px-8 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-black uppercase tracking-widest text-[#CC1A2F] hover:bg-gray-50 transition-all shadow-sm"
         >
            {actionLabel}
         </button>
       )}
    </div>
  );
}

export function Pagination({ currentPage, totalPages, onPageChange }: any) {
  return (
    <div className="flex items-center justify-between mt-8 p-6 bg-white border border-gray-50 rounded-3xl">
       <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
         Page <span className="text-gray-900">{currentPage}</span> of <span className="text-gray-900">{totalPages}</span>
       </p>
       <div className="flex gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
             <ChevronLeft size={20} />
          </button>
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button 
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${
                  currentPage === pageNum ? "bg-[#CC1A2F] text-white shadow-lg shadow-red-500/20" : "bg-white text-gray-900 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                 {pageNum}
              </button>
            );
          })}
          <button 
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
             <ChevronRight size={20} />
          </button>
       </div>
    </div>
  );
}
