import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <nav>
        {/* <img src="../../../../public/boat-logo.png" className="logo"  /> */}
        <h1>
          <Link className="home" to="/">
            Boat Rental
          </Link>
        </h1>
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
          <li>
            <Link to="/create">Create Listing</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
