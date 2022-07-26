import "./Create.css";

export const Create = () => {
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
          <form method="POST">
            <label>Name:</label>
            <input type="text" id="name" name placeholder="Boat" />
            <label>Image:</label>
            <input type="text" id="image" name placeholder="http://..." />

            <label>Boat type:</label>
            <select id="type" name>
              <option value="sail">Sail</option>
              <option value="catamaran">Catamaran</option>
              <option value="motor">Motor</option>
              <option value="other">Other</option>
            </select>

            <label>Capacity:</label>
            <input type="number" id="capacity" name placeholder="4 persons" />

            <label>Location:</label>
            <input
              type="number"
              id="location"
              name
              placeholder="Lefcada Island"
            />
            <label>Price per day:</label>
            <input type="number" id="price" name placeholder="$1000.00" />

            <label>Additional information:</label>
            <textarea
              id="description"
              name
              placeholder="Add info..."
              defaultValue={""}
            />

            <input type="submit" id="btn" value={`Create`} />
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
