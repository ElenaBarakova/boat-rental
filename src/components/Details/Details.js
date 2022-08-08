import "./Details.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as boatService from "../../services/boatService";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Details = ({ boat }) => {
  const [currentBoat, setCurrentBoat] = useState({});

  const { auth } = useContext(AuthContext);
  const { boatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    boatService.getOne(boatId).then((boatData) => {
      setCurrentBoat(boatData);
    });
  }, [boatId]);

  const deleteHandler = () => {
    boatService.del(boatId, auth.accessToken);
    navigate("/catalog");
  };

  const isOwner = currentBoat._ownerId === auth._id;

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

          {isOwner ? (
            <div className="author">
              <Link
                to={`/details/${boatId}/edit`}
                className="btn-edit btn-hover"
              >
                EDIT
              </Link>
              <button>
                type="button" className="btn-delete btn-lg btn-hover"
                data-toggle="modal" data-target="#deleteModal" > DELETE
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-get-quote btn-lg btn-hover"
              data-toggle="modal"
              data-target="#deleteModal"
            >
              GET A QUOTE
            </button>
          )}

          {/* <!-- Modal --> */}
          <div id="deleteModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              {/* <!-- Modal content--> */}
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Choose dates</h4>
                </div>
                <div className="modal-body">
                  <div className="calendar">
                    <label htmlFor="start">Start date:</label>
                    <input type="date" id="start" name="quote-start" />
                  </div>
                  <div className="calendar">
                    <label htmlFor="end">End date:</label>
                    <input type="date" id="end" name="quote-end" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default btn-hover"
                    data-dismiss="modal"
                    onClick={deleteHandler}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn btn-default btn-hover"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Modal --> */}
          <div id="quoteModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              {/* <!-- Modal content--> */}
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Delete Listing</h4>
                </div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to delete {currentBoat.type}:{" "}
                    {currentBoat.name}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default btn-hover"
                    data-dismiss="modal"
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-default btn-hover"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
