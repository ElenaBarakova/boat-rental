import "./Details.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import * as boatService from "../../services/boatService";
import * as quoteService from "../../services/quoteService";
import { AuthContext } from "../../contexts/AuthContext";

export const Details = () => {
  const [currentBoat, setCurrentBoat] = useState({});
  const [startDate, setStartDate] = useState("yyyy-mm-dd");
  const [endDate, setEndDate] = useState("yyyy-mm-dd");

  const { auth } = useContext(AuthContext);
  const { boatId } = useParams();
  const formRef = useRef();
  const navigate = useNavigate();

  const startDateCheck = new Date(startDate).getTime();
  const endDateCheck = new Date(endDate).getTime();
  const isDateRangeValid = endDateCheck < startDateCheck;

  useEffect(() => {
    boatService.getOne(boatId).then((boatData) => {
      setCurrentBoat(boatData);
    });
  }, [boatId]);

  const deleteHandler = () => {
    boatService.del(boatId, auth.accessToken);
    navigate("/catalog");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const startDate = formRef.current?.start.value;
    const endDate = formRef.current?.end.value;

    const quoteData = {
      name: currentBoat.name,
      type: currentBoat.type,
      _ownerId: currentBoat._ownerId,
      userId: auth._id,
      userEmail: auth.email,
      ownerEmail: currentBoat.ownerEmail,
      startDate,
      endDate,
      status: "Pending",
    };

    quoteService.create(quoteData, auth.accessToken).then((result) => {
      console.log(result);
    });

    navigate("/my-profile");
  };

  const isOwner = currentBoat._ownerId === auth._id;

  return (
    <section className="details">
      <div className="row">
        <div className="col-6">
          <div className="boat-img">
            <img src={currentBoat.image} alt=" " />
          </div>
        </div>
        <div className="col-6">
          <div className="boat-info">
            <div className="boat-text">
              <p className="detail-title font-weight-bold-title">Details</p>

              <p className="detail">
                <span className="font-weight-bold">Name: </span>
                {currentBoat.name}
              </p>

              <p className="detail">
                <span className="font-weight-bold">Boat type: </span>
                {currentBoat.type}
              </p>
              <p className="detail">
                <span className="font-weight-bold">Capacity: </span>
                {currentBoat.capacity} persons
              </p>
              <p className="detail">
                <span className="font-weight-bold">Location: </span>
                {currentBoat.location}
              </p>

              <p className="detail">
                <span className="font-weight-bold">Price: </span>$
                {currentBoat.price}
              </p>
              <p id="description">
                <span className="font-weight-bold">
                  Additional information:
                </span>
              </p>
              <p id="description">{currentBoat.description}</p>
              <div className="details-btn">
                {/*Only for registered user and author of the publication */}

                {isOwner ? (
                  <div>
                    <Link
                      to={`/details/${boatId}/edit`}
                      className="btn-edit btn-lg btn-hover"
                    >
                      EDIT
                    </Link>
                    <button
                      type="button"
                      className="btn-delete btn-lg btn-hover"
                      data-toggle="modal"
                      data-target="#deleteModal"
                    >
                      DELETE
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn-get-quote btn-lg btn-hover"
                    data-toggle="modal"
                    data-target="#quoteModal"
                  >
                    GET A QUOTE
                  </button>
                )}
              </div>
              {/* <!-- Modal --> */}
              <div id="quoteModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                  {/* <!-- Modal content--> */}
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                      <h4 className="modal-title">Choose dates</h4>
                    </div>
                    <form method="POST" ref={formRef}>
                      <div className="modal-body">
                        <div className="calendar">
                          <label htmlFor="start">Start date:</label>
                          <input
                            type="date"
                            id="start"
                            name="start"
                            value={startDate}
                            onChange={(e) => {
                              setStartDate(e.target.value);
                            }}
                          />
                        </div>
                        <div className="calendar">
                          <label htmlFor="end">End date:</label>
                          <input
                            type="date"
                            id="end"
                            name="end"
                            value={endDate}
                            onChange={(e) => {
                              setEndDate(e.target.value);
                            }}
                          />
                        </div>
                        {isDateRangeValid && (
                          <div
                            id="validationServerUsernameFeedback"
                            className="invalid-feedback"
                          >
                            End date must be after start date
                          </div>
                        )}
                      </div>

                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn btn-default btn-hover"
                          data-dismiss="modal"
                          onClick={onSubmit}
                          disabled={isDateRangeValid ? true : false}
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
                    </form>
                  </div>
                </div>
              </div>

              {/* <!-- Modal --> */}
              <div id="deleteModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                  {/* <!-- Modal content--> */}
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
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
        </div>
      </div>
    </section>
  );
};
