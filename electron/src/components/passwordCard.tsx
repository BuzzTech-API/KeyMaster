import React from 'react';
import { FaEye } from 'react-icons/fa'; // You can use any icon library

interface PasswordCardProps {
    passwordName: string;
    email: string;
    icon: React.ReactNode; // Accept any React component as the icon
    isSelected: boolean;
    onClick: () => void; // Callback function for click event
}


const PasswordCard: React.FC<PasswordCardProps> = ({ passwordName, email, icon, isSelected, onClick }) => {
    return (
        <div
            className={`flex items-center bg-gray-800 text-white p-4 m-2 rounded-lg shadow-md border cursor-pointer hover:bg-gray-700 transition duration-300 ${isSelected ? 'border-blue-500' : 'border-gray-600'
                }`}
            onClick={onClick}
        >
            <div className="text-gray-400 mr-4 hover:text-white transition duration-300">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-semibold">{passwordName}</span>
                <span className="text-sm text-gray-400">{email}</span>
            </div>
        </div>
    );
};

export default PasswordCard;