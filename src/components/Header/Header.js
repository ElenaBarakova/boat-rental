import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Header.css";

export const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Boats</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>

          {auth.accessToken ? (
            <>
              <li>
                <Link to="/create">Create Listing</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
              <li>
                <p className="hello">Hello, {`${auth.username}`}!</p>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
