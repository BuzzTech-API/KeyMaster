import { FaEye, FaLock, FaPlus } from "react-icons/fa";
import PasswordCard from "../components/passwordCard";
import { useEffect, useState } from "react";
import PasswordDetailsPanel from "../components/passwordDetailsPannel";
import { Password } from "../interfaces/password.interface";
import { createPassword, deleteUserPassword, getUserPasswords } from "../api/password";
import AddPasswordModal from "../components/addPasswordModal";
import { useUser } from "../context/UserContext";

const SavedPasswords: React.FC = () => {
  //info do usuário
  const { user } = useUser()


  
  const [passwords, setPasswords] = useState<Password[]>([]);
  const userPasswords = async () => {
    const data = await getUserPasswords(user.id); // Capture return
    setPasswords(data); 
  };
  useEffect(() => {
    userPasswords();
  }, []);


  const handleDeletePassword = async (id: number) => {
    const success = await deleteUserPassword(id);

    if (success) {
      setPasswords((prevPasswords) => prevPasswords.filter((password) => password.id !== id));
    } else {
      console.log("Failed to delete password");
    }
    handleClosePanel()
  };




  const handleDeletePassword = async (id: number) => {
    const success = await deleteUserPassword(id);

    if (success) {
      setPasswords((prevPasswords) => prevPasswords.filter((password) => password.id !== id));
    } else {
      console.log("Failed to delete password");
    }
    handleClosePanel()
  };







  // Modal de Criar nova senha
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseAddPasswordModal = () => setIsModalOpen(false);
  const handleOpenAddPasswordModal = () => setIsModalOpen(true);

  const handleSavePassword = async (title: string, login: string, password: string, creationDate: Date) => {
    const passwordData = { title, login, password, creationDate }
    await createPassword(passwordData, user.id)
    userPasswords()
  };


  
  
  // Painel de detalhes da senha
  const [selectedPassword, setSelectedPassword] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleCardClick = (id: number) => {
    setSelectedPassword(id);
    setIsPanelOpen(true)
    // Here you can implement navigation to the password detail/edit screen
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };
  

  //pega as infos da senha que foi selecionada para dispor no painel
  const selectedPasswordData = passwords.find((password) => password.id === selectedPassword);




  return (
    <div className="ml-56 flex-1 p-4 bg-blue-950 overflow-y-auto h-full scrollbar relative">
      <button className="flex items-center bg-white text-black font-semibold py-2 px-4 rounded mb-4 hover:bg-gray-400 ml-auto"
        onClick={handleOpenAddPasswordModal}
      >
        <FaPlus className="mr-2" />
        Add New Password
      </button>
      <AddPasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseAddPasswordModal}
        onSave={handleSavePassword}
      />
      {passwords.map((password) => (
        <PasswordCard
          key={password.id}
          passwordName={password.title}
          email={password.login}
          icon={<FaLock size={24} />}
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
                title={selectedPasswordData.title}
                login={selectedPasswordData.login}
                password={selectedPasswordData.password}
                id={selectedPasswordData.id}
                creationDate={selectedPasswordData.creationDate}
                handleDeletePassword={handleDeletePassword}
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