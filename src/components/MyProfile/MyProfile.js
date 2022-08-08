import "./MyProfile.css";

import * as boatService from "../../services/boatService";
import { AuthContext } from "../../contexts/AuthContext";
import { BoatContext } from "../../contexts/BoatContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const MyProfile = () => {
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
      <section id="profile-container">
        <h1>My Profile</h1>

        <div className="profile-container-info">
          <h4>Name: {auth.username}</h4>
          <h4>Email: {auth.email}</h4>
        </div>

        <h4 className="quotes-title">My Quotes</h4>
        <table className="table">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Boat Name</th>
              <th scope="col">Boat Type</th>
              <th scope="col">Start date</th>
              <th scope="col">End date</th>
              <th scope="col">To (email):</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <th scope="row">1</th> */}
              <td>Mark</td>
              <td>Otto</td>
              <td>01.08.22</td>
              <td>10.08.22</td>
              <td>abv@abv.bg</td>
              <td>Pending </td>
              <td className="btns">
                <button className="btn-reject">&#10006;</button>
              </td>
            </tr>
            <tr>
              {/* <th scope="row">1</th> */}
              <td>Mark</td>
              <td>Otto</td>
              <td>01.08.22</td>
              <td>10.08.22</td>
              <td>abv@abv.bg</td>
              <td>Pending </td>
              <td className="btns">
                <button className="btn-reject">&#10006;</button>
              </td>
            </tr>
          </tbody>
        </table>

        <h4 className="quotes-title">Quotes For My Listings</h4>
        <table className="table">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Boat Name</th>
              <th scope="col">Boat Type</th>
              <th scope="col">Start date</th>
              <th scope="col">End date</th>
              <th scope="col">From (email):</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <th scope="row">1</th> */}
              <td>Mark</td>
              <td>Otto</td>
              <td>01.08.22</td>
              <td>10.08.22</td>
              <td>abv@abv.bg</td>
              <td>Pending</td>
              <td className="btns">
                <button className="btn-accept">&#10004;</button>
                <button className="btn-reject">&#10006;</button>
              </td>
            </tr>
            <tr>
              {/* <th scope="row">1</th> */}
              <td>Mark</td>
              <td>Otto</td>
              <td>01.08.22</td>
              <td>10.08.22</td>
              <td>abv@abv.bg</td>
              <td>Pending</td>
              <td className="btns">
                <button className="btn-accept">&#10004;</button>
                <button className="btn-reject">&#10006;</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* <div>
            <div class="errorContainer">
                <p>Error</p>
            </div>
        </div> */}
    </>
  );
};
