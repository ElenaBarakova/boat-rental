import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as boatService from "../../services/boatService";
import boatSign from "../../img/boat-sign.png";
import "./Home.css";
import { Boat } from "../Boat/Boat";

export const Home = () => {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    boatService
      .getAll()
      .then((result) => {
        const resultArray = result.slice(result.length - 3);
        setBoats(resultArray);
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

      {boats.length > 0 && (
        <>
          <h2 className="title">Latest Listings</h2>

          <div className="boat-list">
            <div className="row">
              {boats?.map((x) => {
                return (
                  <div className="col-4">
                    <Boat boat={x} key={x._id} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
