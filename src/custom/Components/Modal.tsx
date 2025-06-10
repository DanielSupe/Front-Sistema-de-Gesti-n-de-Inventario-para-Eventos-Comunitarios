import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[70%] min-h-[50%] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-blue-600">
          <h2 className="text-white text-lg font-semibold">
            {title || "Modal"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 text-2xl font-bold cursor-pointer"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
