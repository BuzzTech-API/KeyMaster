import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({  checked, onChange,children }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition duration-300"
      />
      <label className="ml-2 text-sm text-gray-300">{children}</label>
    </div>
  );
};

export default Checkbox;
