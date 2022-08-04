import { Link } from "react-router-dom";
import "./Catalog.css";

export const Boat = ({ boat }) => {
  return (
    <div className="boat">
      <div className="boat-img">
        <img src={boat.image} alt=" " />
      </div>
      <div className="boat-info">
        <h1>{boat.name}</h1>
        <p>
          <span>Price per day: </span>${boat.price}
        </p>
        <p>
          <span>Type of boat: </span>
          {boat.type}
        </p>
      </div>
      <Link to={`/details/${boat._id}`} className="btn-details">
        Details
      </Link>
    </div>
  );
};
