import "./Catalog.css";
import { Boat } from "../Boat/Boat";
import { useEffect, useState } from "react";
import * as boatService from "../../services/boatService";

export const Catalog = () => {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    boatService
      .getAll()
      .then((result) => {
        setBoats(result);
      })
      .catch(() => {
        setBoats([]);
      });
  }, []);

  return (
    <section className="catalog">
      <h1>
        <span>BOATS FOR RENT</span>
      </h1>
      <div className="row">
        {boats.length > 0 ? (
          boats?.map((x) => {
            return (
              <div className="col-4">
                <Boat boat={x} key={x._id} />
              </div>
            );
          })
        ) : (
          <div className="no-offer">
            <p>There are no boats to rent at the moment!</p>
          </div>
        )}
      </div>
    </section>
  );
};
