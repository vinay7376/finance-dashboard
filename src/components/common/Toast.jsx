import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md ${
                isSuccess
                  ? "bg-emerald-950/90 text-emerald-100 border-emerald-500/40 shadow-emerald-950/50"
                  : isError
                  ? "bg-rose-950/90 text-rose-100 border-rose-500/40 shadow-rose-950/50"
                  : "bg-slate-900/90 text-slate-100 border-slate-700/60 shadow-slate-950/50"
              }`}
            >
              <div className="flex items-center gap-3">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
                <p className="text-sm font-medium leading-snug">{toast.message}</p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/60 hover:text-white transition p-1 rounded-md"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
