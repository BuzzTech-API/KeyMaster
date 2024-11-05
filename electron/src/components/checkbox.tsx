import React from "react";

interface CheckboxProps {
  checked: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  className = "flex items-center",
  onChange,
  children,
  required = false,
}) => {

  return (
    <div className={className}>
      <input
        type="checkbox"
        required={required}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition duration-300"
      />
      <label className="ml-2 text-sm text-gray-300">{children}</label>
    </div>
  );
};

export default Checkbox;
