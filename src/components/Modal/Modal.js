import "./Modal.css";
import Button from "../Button/Button";

export const Modal = ({ modaTitle, modalBody, modalSubmitButton }) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title w-100">{modaTitle}</h4>
        <button type="button" className="close" data-dismiss="modal">
          &times;
        </button>
      </div>
      <div className="modal-body">{modalBody}</div>

      <div className="modal-footer">
        {modalSubmitButton}
        <Button type="button" data-dismiss="modal">
          Cancel
        </Button>
      </div>
    </div>
  );
};
