import "./Home.css";
import { Link } from "react-router-dom";

export const CardHome = ({ boat }) => {
  return (
    <Link to={`/details/${boat._id}`} className="btn-details btn-hover">
      <div className="boat">
        <img
          src={boat.image}
          alt="https://img.freepik.com/free-vector/illustration-transportation-icon_53876-28473.jpg?w=2000"
        />
        <div>
          <h3>{boat.name}</h3>
          <h4>${boat.price}</h4>
        </div>
      </div>{" "}
    </Link>
  );
};
