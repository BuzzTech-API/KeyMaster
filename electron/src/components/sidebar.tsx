import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/getCurrentUser'; // Ivan Germano: Importa Rota para Usuário atual.
import { logout } from '../api/logout'; // Ivan Germano: Importa Rota de Logout.

const Sidebar: React.FC<{ setActiveScreen: (screen: string) => void }> = ({ setActiveScreen }) => {
    interface User{
      id: number;
      name: string;
      email:string;
      password: string;
    }

    const [user, setUser] = useState<User | null>(null);
      
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
      <div className="z-10 fixed w-56 bg-gray-800 text-white h-screen flex flex-col items">
        {/*Ivan Germano: Componente para mostrar qual usuário está logado */}
        {user && (
          <div className="p-4 bg-gray-300 text-black font-bold text-center">
            <p>Usuário: {user.name}</p>
            <p>Id: {user.id}</p>
          </div>
        )}
        <button className="border-2 p-4 hover:bg-gray-700" onClick={() => setActiveScreen('home')}>
          Home
        </button>
        <button className="border-2 p-4 hover:bg-gray-700" onClick={() => setActiveScreen('savedPasswords')}>
          Saved Passwords
        </button>


        <div className="mt-auto">
        <button className="border-2 p-4 hover:bg-gray-700 w-full" onClick={() => setActiveScreen('userProfile')}>
          User Profile
        </button>
          <button
            className="p-4 bg-red-700 hover:bg-red-500 w-full"
            onClick={handleLogout}
            >
            Logout
          </button>
        </div>
      </div>
    );
  };

export default Sidebar