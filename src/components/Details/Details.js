import "./Details.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as boatService from "../../services/boatService";

export const Details = ({ boat }) => {
  const [currentBoat, setCurrentBoat] = useState({});
  const { boatId } = useParams();

  useEffect(() => {
    boatService.getOne(boatId).then((boatData) => {
      setCurrentBoat(boatData);
    });
  });

  return (
    <section className="details-info">
      <h1>Details</h1>
      <div className="boat-img">
        <img src={currentBoat.image} alt=" " />
      </div>
      <div className="boat-info">
        <div className="boat-text">
          <h1 id="name">Name: {currentBoat.name}</h1>

          <p id="type">Boat type: {currentBoat.type}</p>
          <p id="capacity">Capacity: {currentBoat.capacity} persons</p>
          <p id="location">Location: {currentBoat.location}</p>

          <p id="price">
            <span>Price: ${currentBoat.price}</span>
          </p>
          <p id="description">Additional information:</p>
          <p id="description">{currentBoat.description}</p>
        </div>
        <div className="product-btn">
          {/*Only for registered user and author of the publication */}
          <div class="author">
            <Link to={`/details/${boatId}/edit`} className="btn-edit">
              EDIT
            </Link>
            <Link to={`/details/${boatId}/delete`} className="btn-delete">
              DELETE
            </Link>
          </div>
          <Link to={`/details/${boatId}/delete`} className="btn-get-quote">
            GET A QUOTE
          </Link>
        </div>
      </div>
    </section>
  );
};
