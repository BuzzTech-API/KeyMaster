import React from 'react';
import { FaEye } from 'react-icons/fa'; // You can use any icon library

interface PasswordCardProps {
  passwordName: string;
  email: string;
  onClick: () => void; // Callback function for click event
}

const PasswordCard: React.FC<PasswordCardProps> = ({ passwordName, email, onClick }) => {
  return (
    <div
      className="flex items-center justify-between bg-gray-800 text-white p-4 m-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition duration-300"
      onClick={onClick} // Attach the click event handler
    >
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{passwordName}</span>
        <span className="text-sm text-gray-400">{email}</span>
      </div>
      <FaEye className="text-gray-400 hover:text-white transition duration-300" size={24} />
    </div>
  );
};

export default PasswordCard;