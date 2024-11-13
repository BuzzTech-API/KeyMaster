import React, { useState } from "react";
import * as ReactDOM from "react-dom/client";
import Home from "./pages/home";
import SavedPasswords from "./pages/savedPasswords";
import Sidebar from "./components/sidebar";
import Login from "./pages/login";
import Signup from "./pages/singup";
import CadastroTermo from "./pages/termoCadastro";

const App = () => {
  const [activeScreen, setActiveScreen] = useState("login");

  return (
    <div className="flex h-screen">
      {activeScreen === "login" && <Login setActiveScreen={setActiveScreen} />}
      {activeScreen === "signup" && (
        <Signup setActiveScreen={setActiveScreen} />
      )}
      {activeScreen === "home" && (
        <>
          <Sidebar setActiveScreen={setActiveScreen} />
          <Home />
        </>
      )}
      {activeScreen === "savedPasswords" && (
        <>
          <Sidebar setActiveScreen={setActiveScreen} />
          <SavedPasswords />
        </>
      )}

      {activeScreen === "cadastrarTermo" && (
        <>
          <Sidebar setActiveScreen={setActiveScreen} />
          <CadastroTermo />
        </>
      )}
      {activeScreen === "signupSu" && (
        <>
          <Sidebar setActiveScreen={setActiveScreen} />
          <Signup setActiveScreen={setActiveScreen} isSuperUser />
        </>
      )}
    </div>
  );
};

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
}

render();
