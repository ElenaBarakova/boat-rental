import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Catalog } from "./components/Catalog/Catalog";
import { Create } from "./components/Create/Create";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";

import { Register } from "./components/Register/Register";
import { Details } from "./components/Details/Details";
import { Error } from "./components/Error/Error";

import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [auth, setAuth] = useState({});

  const authLogin = (authData) => {
    setAuth(authData);
  };

  const authLogout = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, authLogin, authLogout }}>
      <>
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/register" element={<Register />} />
            <Route path="/details" element={<Details />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </main>
      </>
    </AuthContext.Provider>
  );
}

export default App;
