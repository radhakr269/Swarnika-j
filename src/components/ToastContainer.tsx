import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#2C241E] text-white border border-[#524436] rounded-xs shadow-2xl p-4 flex items-start gap-3 transform transition-all duration-300 animate-in slide-in-from-bottom-2"
        >
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-[#CDB397] shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <h5 className="font-serif-luxury text-sm font-semibold tracking-wide text-[#F3EBE1]">
              {toast.title}
            </h5>
            <p className="text-[11px] text-[#C2B19F] mt-0.5 leading-snug">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#96826F] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
