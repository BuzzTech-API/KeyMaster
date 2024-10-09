import { FaEye, FaLock } from "react-icons/fa";
import PasswordCard from "../components/passwordCard";
import { useEffect, useState } from "react";
import PasswordDetailsPanel from "../components/passwordDetailsPannel";

const SavedPasswords: React.FC = () => {

  const [selectedPassword, setSelectedPassword] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Sample password data
  const passwords = [
    { id: 1, name: 'Example Password', email: 'user@example.com', icon: <FaEye size={24} /> },
    { id: 2, name: 'Another Password', email: 'another@example.com', icon: <FaLock size={24} /> },
    { id: 3, name: 'Example Password', email: 'user@example.com', icon: <FaEye size={24} /> },
    { id: 4, name: 'Another Password', email: 'another@example.com', icon: <FaLock size={24} /> },
    { id: 5, name: 'Example Password', email: 'user@example.com', icon: <FaEye size={24} /> },
    { id: 6, name: 'Another Password', email: 'another@example.com', icon: <FaLock size={24} /> },
    { id: 7, name: 'Example Password', email: 'user@example.com', icon: <FaEye size={24} /> },
    { id: 8, name: 'Another Password', email: 'another@example.com', icon: <FaLock size={24} /> },
    { id: 9, name: 'Example Password', email: 'user@example.com', icon: <FaEye size={24} /> },
    { id: 10, name: 'Another Password', email: 'another@example.com', icon: <FaLock size={24} /> },
  ];

  const handleCardClick = (id: number) => {
    setSelectedPassword(id);
    setIsPanelOpen(true)
    // Here you can implement navigation to the password detail/edit screen
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const selectedPasswordData = passwords.find((password) => password.id === selectedPassword);

  return (
    <div className="ml-56 flex-1 p-4 bg-blue-950 overflow-y-auto h-full scrollbar relative">
      {passwords.map((password) => (
        <PasswordCard
          key={password.id}
          passwordName={password.name}
          email={password.email}
          icon={password.icon}
          isSelected={password.id === selectedPassword}
          onClick={() => handleCardClick(password.id)}
        />
      ))}
      {isPanelOpen && (
        <>
          {/* Overlay to close panel when clicked outside */}
          <div
            className="fixed ml-56 inset-0 bg-black bg-opacity-50 z-20 "
            onClick={handleClosePanel}
          />

          {/* Sliding panel */}
          <div
            className={`fixed top-0 right-0 w-1/2 h-full bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-30 $ isPanelOpen ? 'translate-x-0' : 'translate-x-full'`}



          >
            {selectedPasswordData && (
              <PasswordDetailsPanel
                passwordName={selectedPasswordData.name}
                email={selectedPasswordData.email}
                onClose={handleClosePanel}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
};

export default SavedPasswords