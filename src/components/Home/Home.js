import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as boatService from "../../services/boatService";
import boatSign from "../../img/boat-sign.png";
import { CardHome } from "./CardHome";
import "./Home.css";

export const Home = () => {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    boatService
      .getAll()
      .then((result) => {
        setBoats(result);
      })
      .catch(() => {
        setBoats([]);
      });
  }, []);

  return (
    <div className="home">
      <div className="main-sign">
        <img src={boatSign} alt="sign" />
      </div>

      <Link to="/catalog" className="button-home btn-hover">
        BOOK YOUR BOAT
      </Link>

      <h2 className="title">Latest Listings</h2>
      <div className="boat-list">
        {boats?.map((x) => {
          return (
            //<div className="offer-list" >
            <CardHome boat={x} key={x._id} />
            //</div>
          );
        })}
      </div>
    </div>
  );
};
