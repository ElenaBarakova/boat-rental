import "./Create.css";

import * as boatService from "../../services/boatService";
import { AuthContext } from "../../contexts/AuthContext";
import { BoatContext } from "../../contexts/BoatContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const { auth } = useContext(AuthContext);
  const { createBoatListingHandler } = useContext(BoatContext);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const boatData = Object.fromEntries(new FormData(e.target));
    boatService.create(boatData, auth.accessToken).then((result) => {
      createBoatListingHandler(result);
    });
    navigate("/catalog");
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
          <h1>Create Listing</h1>
          <h4>Post your boat for rent</h4>
          <form method="POST" onSubmit={onSubmit}>
            <label>Name:</label>
            <input type="text" id="name" name="name" placeholder="Boat" />
            <label>Image:</label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="http://..."
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
              placeholder="4 persons"
            />

            <label>Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Lefcada Island"
            />
            <label>Price per day:</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="$1000.00"
            />

            <label>Additional information:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Add info..."
              defaultValue={""}
            />

            <input type="submit" id="btn" value={`CREATE`} />
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
