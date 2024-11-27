import { FaTrash, FaTimes } from "react-icons/fa";

interface PasswordDetailsPanelProps {
  title: string;
  login: string;
  password: string;
  creationDate: Date
  id: number;
  onClose: () => void;
  handleDeletePassword: (id: number) => void; // The delete function passed as a prop
}

const formatDate = (date: Date): string => {
  const validDate = new Date(date);
  return validDate.toLocaleDateString('en-GB')
};


const PasswordDetailsPanel: React.FC<PasswordDetailsPanelProps> = ({ title, login, password, id, creationDate, onClose, handleDeletePassword }) => {

  let date = formatDate(creationDate)

  return (
    <div className="relative fixed right-0 top-0 w-full h-full bg-gray-900 text-white p-8 shadow-lg transform transition-transform duration-300">

      {/* Buttons Container */}
      <div className="flex justify-between items-center mb-4 border-b border-white pb-4">

        {/* Close button */}
        <button
          className="text-gray-400 hover:text-white flex items-center"
          onClick={onClose}
        >
          <FaTimes className="w-5 h-5 mr-2" /> {/* Close icon */}
          Close
        </button>
        {/* Delete button */}
        <button
          className="text-red-500 hover:text-red-700 font-semibold flex items-center"
          onClick={() => {
            const confirmed = window.confirm("Are you sure you want to delete this password?")
            if (confirmed) {
              handleDeletePassword(id)
            }
          }}
        >
          <FaTrash className="w-5 h-5 mr-2" /> {/* Trash icon */}
          Delete
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Nome: </h2>
      <p className="text-lg text-gray-400">{title}</p>
      <h2 className="text-2xl font-semibold mb-2">Login:</h2>
      <p className="text-lg text-gray-400">{login}</p>
      <h2 className="text-2xl font-semibold mb-2">Password:</h2>
      <p className="text-lg text-gray-400">{password}</p>
      <h2 className="text-2xl font-semibold mb-2">Creation Date:</h2>

      <p className="text-lg text-gray-400">{date}</p>

      {/* Add more details here */}
    </div>
  );
};


export default PasswordDetailsPanel