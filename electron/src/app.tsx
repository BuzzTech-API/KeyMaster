import React, { useState } from 'react'
import * as ReactDOM from 'react-dom/client';
import Home from './pages/home';
import SavedPasswords from './pages/savedPasswords';
import Sidebar from './components/sidebar';
import Login from './pages/login';
import UserProfile from './pages/userProfile';



const App = () => {

  const [activeScreen, setActiveScreen] = useState('userProfile');

  const handleLoginSuccess = () => {
    // Change the active screen to 'home' after login
    setActiveScreen('home');
  };
   return (
    <div className="flex h-screen">
      {activeScreen === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {activeScreen === 'home' && (
        <>
          <Sidebar setActiveScreen={setActiveScreen} />
          <Home />
        </>
      )}
      {activeScreen === 'savedPasswords' && (
        <>
          <Sidebar setActiveScreen={setActiveScreen} />
          <SavedPasswords />
        </>
      )}
            {activeScreen === 'userProfile' && (
        <>
          <Sidebar setActiveScreen={setActiveScreen} />
          <UserProfile name='Vitor Spricigo Lima' email='vitor.lima2206@gmail.com' password='asdf@!#D123d12SAD' />
        </>
      )}
    </div>
  );
}

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
}

render();

