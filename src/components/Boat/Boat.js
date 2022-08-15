import { Link } from "react-router-dom";
import "./Boat.css";

export const Boat = ({ boat }) => {
  return (
    <div className="boat">
      <div className="row w-100 mx-0">
        <div className="col-6">
          <div className="boat-img">
            <img src={boat.image} alt=" " />
          </div>
        </div>
        <div className="col-6">
          <div className="boat-info">
            <div>
              <h6>{boat.name}</h6>
              <p>
                <span>Price per day: </span>${boat.price}
              </p>
              <p>
                <span>Type of boat: </span>
                {boat.type}
              </p>
            </div>
            <div>
              <Link
                to={`/details/${boat._id}`}
                className="btn-details btn-hover"
              >
                DETAILS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
