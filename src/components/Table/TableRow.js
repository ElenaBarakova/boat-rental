import { quotesStatus } from "../../constants/constants";
import "./Table.css";

export const TableRow = ({ quote, onReject, onAccept, showReceived }) => {
  let statusCssClass;

  if (quote.status === quotesStatus.rejected) {
    statusCssClass = "status-rejected";
  } else if (quote.status === quotesStatus.accepted) {
    statusCssClass = "status-accepted";
  }
  return (
    <tr>
      <td>{quote.name}</td>
      <td>{quote.type}</td>
      <td>{quote.startDate}</td>
      <td>{quote.endDate}</td>
      <td>{showReceived ? quote.userEmail : quote.ownerEmail}</td>
      <td className={`font-weight-bold ${statusCssClass || ""}`}>
        {quote.status}
      </td>
      <td className="btns">
        {showReceived && (
          <button className="btn-accept" onClick={() => onAccept(quote)}>
            &#10004;
          </button>
        )}
        <button className="btn-reject" onClick={() => onReject(quote)}>
          &#10006;
        </button>
      </td>
    </tr>
  );
};
