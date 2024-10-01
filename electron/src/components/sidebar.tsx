

const Sidebar: React.FC<{ setActiveScreen: (screen: string) => void }> = ({ setActiveScreen }) => {
    return (
      <div className="z-10 fixed w-64 bg-gray-800 text-white h-screen flex flex-col">
        <button className="p-4 hover:bg-gray-700" onClick={() => setActiveScreen('home')}>
          Home
        </button>
        <button className="p-4 hover:bg-gray-700" onClick={() => setActiveScreen('savedPasswords')}>
          Saved Passwords
        </button>
      </div>
    );
  };

export default Sidebar