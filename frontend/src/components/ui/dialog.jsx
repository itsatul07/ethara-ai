import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ className, children }) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}

export function DialogHeader({ className, children }) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      {children}
    </div>
  );
}

export function DialogTitle({ className, children }) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
}

export function DialogFooter({ className, children }) {
  return (
    <div className={cn("flex justify-end mt-4", className)}>
      {children}
    </div>
  );
}

export function DialogClose({ onClose, children }) {
  return (
    <button
      onClick={onClose}
      className="ml-auto p-1 hover:bg-neutral-100 rounded-md"
    >
<X className="h-5 w-5" />
    </button>
  );
}