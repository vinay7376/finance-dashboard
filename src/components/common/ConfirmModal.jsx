import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  confirmVariant = "danger", // "danger" | "primary"
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl z-10"
        >
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-xl shrink-0 ${
                confirmVariant === "danger"
                  ? "bg-rose-500/10 text-rose-500"
                  : "bg-indigo-500/10 text-indigo-500"
              }`}
            >
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {message}
              </p>
            </div>

            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onCancel();
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium text-white transition shadow-sm ${
                confirmVariant === "danger"
                  ? "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
