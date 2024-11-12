import { useState } from "react";

interface AddPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, login: string, password: string, creationDate: Date) => void;
}

const AddPasswordModal: React.FC<AddPasswordModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ title: false, login: false, password: false });

  if (!isOpen) return null;

  const validateFields = () => {
    const newErrors = {
      title: title.trim() === "",
      login: login.trim() === "",
      password: password.trim() === ""
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSave = () => {
    if (validateFields()) {
      onSave(title, login, password, new Date());
      onClose();
      setTitle("");
      setLogin("");
      setPassword("");
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-300 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Password</h2>

        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors({ ...errors, title: false });
          }}
          className={`w-full p-2 border rounded mb-1 ${
            errors.title ? "border-red-500" : "border-black"
          } focus:outline-none focus:ring focus:ring-blue-300`}
        />
        {errors.title && <p className="text-red-500 mb-4">Title is required.</p>}

        <label className="block mb-2 font-semibold">Login</label>
        <input
          type="text"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
            if (errors.login) setErrors({ ...errors, login: false });
          }}
          className={`w-full p-2 border rounded mb-1 ${
            errors.login ? "border-red-500" : "border-black"
          } focus:outline-none focus:ring focus:ring-blue-300`}
        />
        {errors.login && <p className="text-red-500 mb-4">Login is required.</p>}

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: false });
          }}
          minLength={4}
          className={`w-full p-2 border rounded mb-1 ${
            errors.password ? "border-red-500" : "border-black"
          } focus:outline-none focus:ring focus:ring-blue-300`}
        />
        {errors.password && <p className="text-red-500 mb-4">Password is required.</p>}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title || !login || !password} // disable if any field is empty
            className={`px-4 py-2 rounded ${
              !title || !login || !password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPasswordModal;