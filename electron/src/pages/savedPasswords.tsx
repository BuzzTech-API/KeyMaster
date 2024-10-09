import { FaEye, FaLock } from "react-icons/fa";
import PasswordCard from "../components/passwordCard";

const SavedPasswords: React.FC = () => {

  // Sample password data
  const passwords = [
    { id: 1, name: 'Example Password', email: 'user@example.com', icon: <FaEye size={24} /> },
    { id: 2, name: 'Another Password', email: 'another@example.com', icon: <FaLock size={24} /> },
    { id: 1, name: 'Example Password', email: 'user@example.com', icon: <FaEye size={24} /> },
    { id: 2, name: 'Another Password', email: 'another@example.com', icon: <FaLock size={24} /> },
    { id: 1, name: 'Example Password', email: 'user@example.com', icon: <FaEye size={24} /> },
    { id: 2, name: 'Another Password', email: 'another@example.com', icon: <FaLock size={24} /> },
    { id: 1, name: 'Example Password', email: 'user@example.com', icon: <FaEye size={24} /> },
    { id: 2, name: 'Another Password', email: 'another@example.com', icon: <FaLock size={24} /> },
    { id: 1, name: 'Example Password', email: 'user@example.com', icon: <FaEye size={24} /> },
    { id: 2, name: 'Another Password', email: 'another@example.com', icon: <FaLock size={24} /> },
  ];

  const handleCardClick = (id: number) => {
    console.log('Clicked on card with ID:', id);
    // Here you can implement navigation to the password detail/edit screen
  };

  return (
    <div className="ml-64 flex-1 p-4 bg-blue-950 overflow-y-auto h-full scrollbar">
      {passwords.map((password) => (
        <PasswordCard
          key={password.id}
          passwordName={password.name}
          email={password.email}
          icon={password.icon}
          onClick={() => handleCardClick(password.id)}
        />
      ))}
    </div>
  )
};

export default SavedPasswords