import React from "react";

interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  buttonNode?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  className,
  onClose,
  title,
  children,
  buttonNode = (
    <button
      onClick={onClose}
      className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
    >
      Fechar
    </button>
  ),
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" +
        className
      }
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        {children}
        {buttonNode}
      </div>
    </div>
  );
};

export default Modal;
