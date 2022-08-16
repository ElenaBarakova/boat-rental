import "./Boat.css";
import Button from "../Button/Button";

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
              <Button to={`/details/${boat._id}`}>DETAILS</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
