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
import { BoatContext } from "./contexts/BoatContext";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { Edit } from "./components/Edit/Edit";
import { MyProfile } from "./components/MyProfile/MyProfile";
import { UserRoute } from "./components/routeGuards/UserRoute";

function App() {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [boats, setBoats] = useState([]);
  //const navigate = useNavigate();

  const authLogin = (authData) => {
    setAuth(authData);
  };

  const authLogout = () => {
    setAuth({});
  };

  const createBoatListingHandler = (boatData) => {
    setBoats((state) => [...state, boatData]);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        authLogin,
        authLogout,
        isAuthenticated: Boolean(auth.accessToken),
        isOwner: "",
      }}
    >
      <>
        <Header />
        <BoatContext.Provider value={{ boats, createBoatListingHandler }}>
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />

              <Route element={<UserRoute />}>
                <Route path="/create" element={<Create />} />
                <Route path="/details/:boatId/edit" element={<Edit />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/logout" element={<Logout />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/details/:boatId" element={<Details />} />
              <Route path="/error" element={<Error />} />
            </Routes>
          </main>
        </BoatContext.Provider>
      </>
    </AuthContext.Provider>
  );
}

export default App;
