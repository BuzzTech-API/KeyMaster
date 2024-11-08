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
  
    if (!isOpen) return null;
  
    const handleSave = () => {
      onSave(title, login, password, new Date());
      onClose();
      setTitle('')
      setLogin('')
      setPassword('')
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-300 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Add New Password</h2>
          
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-black rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
          />
  
          <label className="block mb-2 font-semibold">Login</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-2 border rounded mb-4 border-black focus:outline-none focus:ring focus:ring-blue-300"
          />
  
          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4 border-black focus:outline-none focus:ring focus:ring-blue-300"
          />
  
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AddPasswordModal;