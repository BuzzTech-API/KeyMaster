import React, { useState } from 'react'
import * as ReactDOM from 'react-dom/client';
import Home from './pages/home';
import SavedPasswords from './pages/savedPasswords';
import Sidebar from './components/sidebar';
import Login from './pages/login';
import UserProfile from './pages/userProfile';



const App = () => {
  //Estado inicial
  const [activeScreen, setActiveScreen] = useState('login');

  const handleLoginSuccess = () => {
    setActiveScreen('home');
  };

  return (
    <div className="flex h-screen">
      {/* refatoração, agora só chama o sidebar se a tela ativa não for Login, bem mais claro. */}
      {activeScreen !== 'login' && <Sidebar setActiveScreen={setActiveScreen} />}
      {activeScreen === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {activeScreen === 'home' && (<Home />)}
      {activeScreen === 'savedPasswords' && (<SavedPasswords />)}
      {activeScreen === 'userProfile' && (<UserProfile />)}
    </div>
  );
}

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
}

render();

