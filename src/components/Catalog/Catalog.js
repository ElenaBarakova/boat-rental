import "./Catalog.css";

import catamaran from "../../img/catamaran.jpg";
import motor from "../../img/Benetti_yacht_for_charter_Formosa_22555.jpg";

import { Boat } from "./Boat";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as boatService from "../../services/boatService";

export const Catalog = () => {
  const [boats, setBoats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    boatService.getAll().then((result) => {
      setBoats(result);
    });
  });

  const detailsClickHandler = (e) => {
    e.preventDefault();
    navigate("/details");
  };

  return (
    <section className="catalog">
      <h1>
        <span>BOATS FOR RENT</span>
      </h1>

      {boats.length > 0 ? (
        boats.map((x) => {
          return (
            <div className="offer-list">
              <Boat key={x._id} boat={x} onDetailsClick={detailsClickHandler} />
            </div>
          );
        })
      ) : (
        <div className="no-offer">
          <p>There are no boats to rent at the moment!</p>
        </div>
      )}

      {/* <div className="boat">
          <div className="boat-img">
            <img src={catamaran} alt=" " />
          </div>
          <div className="boat-info">
            <h1>Valleta</h1>
            <p>
              <span>Price per day: </span>$2,338.55
            </p>
            <p>
              <span>Type of boat: </span>Catamaran
            </p>
          </div>
          <a
            href="/details"
            className="btn-details"
            onClick={detailsClickHandler}
          >
            Details
          </a>
        </div>

        <div className="boat">
          <div className="boat-img">
            <img src={motor} alt=" " />
          </div>
          <div className="boat-info">
            <h1>Marina</h1>
            <p>
              <span>Price per day: </span>$5,565.65
            </p>
            <p>
              <span>Type of boat: </span>Motor
            </p>
          </div>
          <a href="/" className="btn-details">
            Details
          </a>
        </div>

        <div className="boat">
          <div className="boat-img">
            <img src={catamaran} alt=" " />
          </div>
          <div className="boat-info">
            <h1>Valleta</h1>
            <p>
              <span>Price per day: </span>$2,338.55
            </p>
            <p>
              <span>Type of boat: </span>Catamaran
            </p>
          </div>
          <a href="/" className="btn-details">
            Details
          </a>
        </div>*/}
    </section>
  );
};
