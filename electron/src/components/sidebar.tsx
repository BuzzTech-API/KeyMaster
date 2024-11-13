const Sidebar: React.FC<{ setActiveScreen: (screen: string) => void }> = ({
  setActiveScreen,
}) => {
  const isSuperUser = localStorage.getItem("isSuperUser");
  return (
    <div className="z-10 fixed w-56 bg-gray-800 text-white h-screen flex flex-col">
      <button
        className="p-4 hover:bg-gray-700"
        onClick={() => setActiveScreen("home")}
      >
        Home
      </button>
      <button
        className="p-4 hover:bg-gray-700"
        onClick={() => setActiveScreen("savedPasswords")}
      >
        Saved Passwords
      </button>
      {isSuperUser !== undefined && isSuperUser === "true" && (
        <button
          className="p-4 hover:bg-gray-700"
          onClick={() => setActiveScreen("signupSu")}
        >
          Criar Usuário
        </button>
      )}
      {
        <button
          className="p-4 hover:bg-gray-700"
          onClick={() => setActiveScreen("cadastrarTermo")}
        >
          Cadastrar Termo de Condições
        </button>
      }
      <div className="mt-auto">
        <button
          className="p-4 hover:bg-gray-700 w-full"
          onClick={() => {
            // Handle logout logic here
            console.log("Logging out...");
            // For example, you can reset the active screen to 'login':
            setActiveScreen("login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
