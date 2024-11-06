import React from 'react';
import { logout } from '../api/logout'; // Ivan Germano: Importa a função de logout da pasta "api"

const Sidebar: React.FC<{ setActiveScreen: (screen: string) => void }> = ({ setActiveScreen }) => {
    const handleLogout = async () => {
      // Ivan Germano: Aqui chamamos a função de logout da API
      await logout();

      // Ivan Germano: Aqui vamos redirecionar para a tela de login
      setActiveScreen('login');
    };

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
            onClick={handleLogout}
            >
            Logout
          </button>
        </div>
      </div>
    );
  };

export default Sidebar