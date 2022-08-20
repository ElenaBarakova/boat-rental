import "./MyProfile.css";

import * as quoteService from "../../services/quoteService";
import { AuthContext } from "../../contexts/AuthContext";
import { TableRow } from "../Table/TableRow";
import { EmptyTableRow } from "../Table/EmptyTableRow";

import { useContext, useState, useEffect } from "react";
import { quotesStatus } from "../../constants/constants";

export const MyProfile = () => {
  const { auth } = useContext(AuthContext);
  const [sentQuotes, setSentQuotes] = useState([]);
  const [receivedQuotes, setReceivedQuotes] = useState([]);

  useEffect(() => {
    quoteService
      .getAll()
      .then((result) => {
        const sentQuotes = result.filter((quote) => quote.userId === auth._id);
        const receivedQuotes = result.filter(
          (quote) => quote.ownerEmail === auth.email
        );
        setSentQuotes(sentQuotes);
        setReceivedQuotes(receivedQuotes);
      })
      .catch(() => {
        setSentQuotes([]);
        setReceivedQuotes([]);
      });
  }, [auth._id, auth.email]);

  const changeStatusHandler = (
    quotes,
    setQuotesFn,
    currentQuoteData,
    statusChange
  ) => {
    quoteService
      .statusChange(currentQuoteData, statusChange, auth.accessToken)
      .then((result) => {
        const foundQuote = quotes.find((quote) => quote._id === result._id);
        const foundQuoteIndex = quotes.findIndex(
          (quote) => quote._id === result._id
        );

        foundQuote.status = result.status;
        setQuotesFn((quotes) => [
          ...quotes.slice(0, foundQuoteIndex),
          foundQuote,
          ...quotes.slice(foundQuoteIndex + 1),
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <section className="profile-container">
        <p className="font-weight-bold-title">My Profile</p>

        <div className="profile-container-info">
          <h4>Name: {auth.username}</h4>
          <h4>Email: {auth.email}</h4>
        </div>

        <h4 className="quotes-title">My Quotes</h4>
        <table className="table">
          <thead>
            <tr>
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
            {sentQuotes.length > 0 ? (
              sentQuotes?.map((quote) => {
                return (
                  <TableRow
                    quote={quote}
                    key={quote._id}
                    onReject={() =>
                      changeStatusHandler(
                        sentQuotes,
                        setSentQuotes,
                        quote,
                        quotesStatus.rejected
                      )
                    }
                  />
                );
              })
            ) : (
              <EmptyTableRow />
            )}
          </tbody>
        </table>

        <h4 className="quotes-title">Quotes For My Listings</h4>
        <table className="table">
          <thead>
            <tr>
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
            {receivedQuotes.length > 0 ? (
              receivedQuotes.map((quote) => {
                return (
                  <TableRow
                    quote={quote}
                    key={quote._id}
                    onReject={() =>
                      changeStatusHandler(
                        receivedQuotes,
                        setReceivedQuotes,
                        quote,
                        quotesStatus.rejected
                      )
                    }
                    onAccept={() =>
                      changeStatusHandler(
                        receivedQuotes,
                        setReceivedQuotes,
                        quote,
                        quotesStatus.accepted
                      )
                    }
                    showReceived
                  />
                );
              })
            ) : (
              <EmptyTableRow />
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};
