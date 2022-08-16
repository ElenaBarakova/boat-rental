import "./Modal.css";

export const Modal = () => {
  return;
  <div
    id="quoteModal"
    className="modal fade"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">Choose dates</p>

          <button type="button" className="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <form method="POST" ref={formRef}>
          <div className="modal-body">
            <div className="calendar">
              <label htmlFor="start">Start date:</label>
              <input
                type="date"
                id="start"
                name="start"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className="calendar">
              <label htmlFor="end">End date:</label>
              <input
                type="date"
                id="end"
                name="end"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
            {isDateRangeValid && (
              <div
                id="validationServerUsernameFeedback"
                className="invalid-field"
              >
                End date must be after start date
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-modal-confirm btn-hover"
              data-dismiss="modal"
              onClick={onSubmit}
              disabled={isDateRangeValid ? true : false}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-modal-cancel btn-hover"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>;
};
