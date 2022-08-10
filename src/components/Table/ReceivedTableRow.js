import "./Table.css";

export const ReceivedTableRow = ({ quote, onReject, onAccept }) => {
  return (
    <tr>
      <td>{quote.name}</td>
      <td>{quote.type}</td>
      <td>{quote.startDate}</td>
      <td>{quote.endDate}</td>
      <td>{quote.userEmail}</td>
      <td>{quote.status} </td>
      <td className="btns">
        <button className="btn-accept" onClick={() => onAccept(quote)}>
          &#10004;
        </button>
        <button className="btn-reject" onClick={() => onReject(quote)}>
          &#10006;
        </button>
      </td>
    </tr>
  );
};
