import React, { useState } from 'react'
import * as ReactDOM from 'react-dom/client';
import Home from './pages/home';
import SavedPasswords from './pages/savedPasswords';
import Sidebar from './components/sidebar';


const App = () => {
  
  const [activeScreen, setActiveScreen] = useState('home');
  
  return (
    <div className="flex h-screen">
      <Sidebar setActiveScreen={setActiveScreen} />
      {activeScreen === 'home' && <Home />}
      {activeScreen === 'savedPasswords' && <SavedPasswords />}
    </div>
  );
}

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App/>);
}

render();
