import "./Table.css";

export const SentTableRow = ({ quote, onReject }) => {
  return (
    <tr>
      <td>{quote.name}</td>
      <td>{quote.type}</td>
      <td>{quote.startDate}</td>
      <td>{quote.endDate}</td>
      <td>{quote.ownerEmail}</td>
      <td>{quote.status} </td>
      <td className="btns">
        <button className="btn-reject" onClick={onReject}>
          &#10006;
        </button>
      </td>
    </tr>
  );
};
