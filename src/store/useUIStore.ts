import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
}

interface UIState {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, description?: string) => void;
  removeToast: (id: string) => void;
  
  modal: {
    isOpen: boolean;
    title: string;
    content: React.ReactNode | null;
    onConfirm?: () => void;
  };
  openModal: (title: string, content: React.ReactNode, onConfirm?: () => void) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  addToast: (type, message, description) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, type, message, description }]
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }));
    }, 5000);
  },
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
  })),

  modal: {
    isOpen: false,
    title: "",
    content: null,
  },
  openModal: (title, content, onConfirm) => set({
    modal: { isOpen: true, title, content, onConfirm }
  }),
  closeModal: () => set({
    modal: { isOpen: false, title: "", content: null, onConfirm: undefined }
  })
}));
