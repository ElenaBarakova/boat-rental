import { Link } from "react-router-dom";
import boatSign from "../../img/boat-sign.png";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home">
      <div className="main-sign">
        <img src={boatSign} alt="sign" />
      </div>

      <Link to="/catalog" className="button-home">
        BOOK YOUR BOAT
      </Link>
    </div>
  );
};
