

const Sidebar: React.FC<{ setActiveScreen: (screen: string) => void }> = ({ setActiveScreen }) => {
    return (
      <div className="z-10 fixed w-56 bg-gray-800 text-white h-screen flex flex-col">
        <button className="p-4 hover:bg-gray-700" onClick={() => setActiveScreen('home')}>
          Home
        </button>
        <button className="p-4 hover:bg-gray-700" onClick={() => setActiveScreen('savedPasswords')}>
          Saved Passwords
        </button>

         <div className="mt-auto">
        <button
          className="p-4 hover:bg-gray-700 w-full"
          onClick={() => {
            // Handle logout logic here
            console.log('Logging out...');
            // For example, you can reset the active screen to 'login':
            setActiveScreen('login');
          }}
        >
          Logout
        </button>
      </div>
      </div>
    );
  };

export default Sidebar