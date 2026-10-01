import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-bounce-in shadow-2xl">
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl transition-all ${
          isSuccess
            ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-200'
            : isError
            ? 'bg-rose-950/80 border-rose-500/30 text-rose-200'
            : 'bg-slate-900/90 border-slate-700/50 text-slate-200'
        }`}
      >
        <div className="mt-0.5 flex-shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400" />}
        </div>
        <div className="flex-1 text-sm">
          {toast.title && <p className="font-semibold">{toast.title}</p>}
          <p className="opacity-90">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition p-1 -mr-1 -mt-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
