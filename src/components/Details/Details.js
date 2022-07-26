import "./Details.css";

export const Details = () => {
  return (
    <section id="details-info">
      <h1>Details</h1>
      <div className="coin-image">
        <img src="./static/images/bitcoin.png" alt=" " />
      </div>
      <div className="coin-info">
        <div className="coin-text">
          <h1 id="name">Bitcoin</h1>
          <h3 id="payment">Payment method: paypal</h3>
          <p id="price">
            <span>Price: $31 166.71</span>
          </p>
          <p id="description">
            Bitcoin is a decentralized digital currency that can be transferred
            on the peer-to-peer bitcoin network.
          </p>
        </div>
        <div className="product-btn">
          {/*Only for registered user and author of the publication */}
          {/* <div class="author">
                        <a href="#" class="btn-edit">Edit</a>
                        <a href="#" class="btn-delete">Delete</a>
                    </div> */}
          {/* Logged in user who has not yet buy this crypto*/}
          {/* <a href="#" class="btn-buy">Buy</a> */}
          {/* Logged in user who has already buy this crypto*/}
          <p className="buy-message">You already bought these crypto coins.</p>
        </div>
      </div>
    </section>
  );
};
