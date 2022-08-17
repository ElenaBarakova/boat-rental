import Button, { buttonVariants } from "../Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import * as boatService from "../../services/boatService";

export const ModalDelete = ({ currentBoat }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { boatId } = useParams();

  const deleteHandler = async () => {
    boatService.del(boatId, auth.accessToken);
    await setTimeout(() => {
      navigate("/catalog");
    }, 500);
  };
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title w-100">Delete Listing</h4>
        <button type="button" className="close" data-dismiss="modal">
          &times;
        </button>
      </div>
      <div className="modal-body">
        <p>
          Are you sure you want to delete {currentBoat.type}: {currentBoat.name}
        </p>
      </div>
      <div className="modal-footer">
        <Button
          type="button"
          data-dismiss="modal"
          onClick={deleteHandler}
          variant={buttonVariants.red}
        >
          Delete
        </Button>
        <Button
          type="button"
          className="btn btn-modal-cancel btn-hover"
          data-dismiss="modal"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
