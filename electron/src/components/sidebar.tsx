import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/getCurrentUser'; // Ivan Germano: Importa Rota para Usuário atual.
import { logout } from '../api/logout'; // Ivan Germano: Importa Rota de Logout.

const Sidebar: React.FC<{ setActiveScreen: (screen: string) => void }> = ({ setActiveScreen }) => {

    const [user, setUser] = useState<{ email: string } | null>(null);

    useEffect(() => {
      // Ivan Germano: Chamar a função para obter o usuário atual
      const getUser = async () => {
        const response = await getCurrentUser();
        if (response.success && response.user) {
          setUser(response.user); // Ivan Germano: Define o usuário no estado
        } else {
          console.error(response.message);
        }
      };
  
      getUser();
    }, []);

    const handleLogout = async () => {
      // Ivan Germano: Aqui chamamos a função de logout da API
      await logout();

      // Ivan Germano: Aqui vamos redirecionar para a tela de login
      setActiveScreen('login');
    };

    return (
      <div className="z-10 fixed w-56 bg-gray-800 text-white h-screen flex flex-col">
        {/*Ivan Germano: Componente para mostrar qual usuário está logado */}
        {user && (
          <div className="p-4 bg-gray-700 text-center">
            <p>Usuário: {user.email}</p>
          </div>
        )}
        <button className="p-4 hover:bg-gray-700" onClick={() => setActiveScreen('home')}>
          Home
        </button>
        <button className="p-4 hover:bg-gray-700" onClick={() => setActiveScreen('savedPasswords')}>
          Saved Passwords
        </button>
        <button className="p-4 hover:bg-gray-700" onClick={() => setActiveScreen('userProfile')}>
          User Profile
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