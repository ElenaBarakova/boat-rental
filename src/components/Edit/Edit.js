import "./Edit.css";

import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { BoatContext } from "../../contexts/BoatContext";
import * as boatService from "../../services/boatService";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Edit = () => {
  const [currentBoat, setCurrentBoat] = useState({});
  const { auth } = useContext(AuthContext);
  const { createBoatListingHandler } = useContext(BoatContext);
  const { boatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    boatService.getOne(boatId).then((boatData) => {
      setCurrentBoat(boatData);
    });
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const boatData = Object.fromEntries(new FormData(e.target));
    boatService.edit(boatData, boatId, auth.accessToken).then((result) => {
      createBoatListingHandler(result);
    });
    navigate(`/details/${boatId}`);
    console.log(boatData);
  };

  return (
    <>
      {/* <div>
            <div class="errorContainer">
                <p>Error</p>
            </div>
        </div> */}
      <section id="create-container">
        <div className="create-container-info">
          <h1>Edit Listing</h1>
          <form method="POST" onSubmit={onSubmit}>
            <label>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={currentBoat.name}
            />
            <label>Image:</label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue={currentBoat.image}
            />

            <label>Boat type:</label>
            <select id="type" name="type">
              <option value="sail">Sail</option>
              <option value="catamaran">Catamaran</option>
              <option value="motor">Motor</option>
              <option value="other">Other</option>
            </select>

            <label>Capacity:</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              defaultValue={currentBoat.capacity}
            />

            <label>Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={currentBoat.location}
            />
            <label>Price per day:</label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={currentBoat.price}
            />

            <label>Additional information:</label>
            <textarea
              id="description"
              name="description"
              defaultValue={currentBoat.description}
            />

            <input type="submit" id="btn" value={`Save`} />
          </form>
        </div>
      </section>
      {/* <div>
            <div class="errorContainer">
                <p>Error</p>
            </div>
        </div> */}
    </>
  );
};
