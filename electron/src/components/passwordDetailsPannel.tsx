import React from 'react';

interface PasswordDetailsPanelProps {
  passwordName: string;
  email: string;
  onClose: () => void;
}

const PasswordDetailsPanel: React.FC<PasswordDetailsPanelProps> = ({ passwordName, email, onClose }) => {
  return (
    
    <div className="relative fixed right-0 top-0 w-full h-full bg-gray-900 text-white p-8 shadow-lg transform transition-transform duration-300">
      <button className="text-gray-400 hover:text-white mb-4" onClick={onClose}>Close</button>
      <h2 className="text-2xl font-semibold mb-2">{passwordName}</h2>
      <p className="text-lg text-gray-400">{email}</p>
      {/* Add more details here */}
    </div>
  );
};

export default PasswordDetailsPanel;