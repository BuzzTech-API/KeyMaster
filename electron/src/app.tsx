import React, { useState } from 'react'
import * as ReactDOM from 'react-dom/client';
import Home from './pages/home';
import SavedPasswords from './pages/savedPasswords';
import Sidebar from './components/sidebar';
import Login from './pages/login';
import UserProfile from './pages/userProfile';
import { UserProvider } from './context/UserContext';
import Signup from "./pages/singup";
import CadastroTermo from "./pages/termoCadastro";
import { TermProvider } from './context/TermsContext';



const App = () => {
  const [activeScreen, setActiveScreen] = useState("login");
  return (
    <UserProvider>
      <TermProvider>
        <div className="flex h-screen">
          {/* refatoração, agora só chama o sidebar se a tela ativa não for Login, bem mais claro. */}
          {activeScreen === "login" && <Login setActiveScreen={setActiveScreen} />}
          {activeScreen !== 'login' && activeScreen !== 'singup' && <Sidebar setActiveScreen={setActiveScreen} />}
          {activeScreen === 'home' && (<Home />)}
          {activeScreen === 'savedPasswords' && (<SavedPasswords />)}
          {activeScreen === 'userProfile' && (<UserProfile />)}
          {activeScreen === "signup" && (
            <Signup setActiveScreen={setActiveScreen} />
          )}
          {activeScreen === "cadastrarTermo" && (
            <CadastroTermo />
          )}
          {activeScreen === "signupSu" && (
            <Signup setActiveScreen={setActiveScreen} isSuperUser />
          )}
        </div>
      </TermProvider>
    </UserProvider>
  )
};
function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
}

render();
