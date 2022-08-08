import "./Edit.css";

import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";

import { boatTypes, formFields } from "../../constants/constants";
import {
  checkMaxLength,
  checkMinLength,
  checkUrl,
} from "../../services/validationService";
import { BoatContext } from "../../contexts/BoatContext";
import * as boatService from "../../services/boatService";

export const Edit = () => {
  const [currentBoat, setCurrentBoat] = useState({});
  const [selectedType, setSelectedType] = useState(boatTypes[0]);
  const [validationErrors, setValidationErrors] = useState({});

  const { auth } = useContext(AuthContext);
  const { createBoatListingHandler } = useContext(BoatContext);
  const { boatId } = useParams();
  const formRef = useRef();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const boatData = Object.fromEntries(new FormData(e.target));
    boatService.edit(boatData, boatId, auth.accessToken).then((result) => {
      createBoatListingHandler(result);
    });
    navigate(`/details/${boatId}`);
  };

  useEffect(() => {
    boatService.getOne(boatId).then((boatData) => {
      setCurrentBoat(boatData);
      setSelectedType(boatData.type);
    });
  }, [boatId]);

  const selectTypeHandler = (e) => {
    setSelectedType(e.target.value);
  };

  const addToValidationErrors = (key, value) => {
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
      [key]: value,
    }));
    console.log(validationErrors);
  };

  const removeValidationErrors = (key) => {
    setValidationErrors((currentErrors) => {
      const { [key]: value, ...rest } = currentErrors;
      return rest;
    });
  };

  const blurHandler = (keyName) => {
    const name = formRef.current?.name.value;
    const isNameValid = checkMaxLength(name, 20) && checkMinLength(name, 3);

    const image = formRef.current?.image.value;
    const isImageValid = checkUrl(image);

    const capacity = formRef.current?.capacity.value;
    const isCapacityValid =
      checkMaxLength(capacity, 2) && checkMinLength(capacity, 1);

    const location = formRef.current?.location.value;
    const isLocationValid = checkMaxLength(location, 30);

    const price = formRef.current?.price.value;
    const isPriceValid = checkMinLength(price, 1);

    const description = formRef.current?.description.value;
    const isDescriptionValid = checkMaxLength(description, 200);

    if (keyName === formFields.name) {
      if (!isNameValid) {
        addToValidationErrors(
          formFields.name,
          "Name should be between 3 and 12 chars"
        );
      } else {
        removeValidationErrors(formFields.name);
      }
    }

    if (keyName === formFields.image) {
      if (!isImageValid) {
        addToValidationErrors(formFields.image, "Invalid image URL");
      } else {
        removeValidationErrors(formFields.image);
      }
    }

    if (keyName === formFields.capacity) {
      if (!isCapacityValid) {
        addToValidationErrors(
          formFields.capacity,
          "Capacity should be between 1 and 2 chars"
        );
      } else {
        removeValidationErrors(formFields.capacity);
      }
    }

    if (keyName === formFields.location) {
      if (!isLocationValid) {
        addToValidationErrors(
          formFields.location,
          "Location should be less than 30 chars"
        );
      } else {
        removeValidationErrors(formFields.location);
      }
    }

    if (keyName === formFields.price) {
      if (!isPriceValid) {
        addToValidationErrors(
          formFields.price,
          "Price should be at least 1 char"
        );
      } else {
        removeValidationErrors(formFields.price);
      }
    }

    if (keyName === formFields.description) {
      if (!isDescriptionValid) {
        addToValidationErrors(
          formFields.description,
          "Additional information should be less than 200 chars"
        );
      } else {
        removeValidationErrors(formFields.description);
      }
    }
  };

  return (
    <>
      {/* <div>
            <div class="errorContainer">
                <p>Error</p>
            </div>
        </div> */}
      <section id="create-container">
        <div className="create-container-info">
          <h1>Edit Listing</h1>
          <form method="POST" onSubmit={onSubmit} ref={formRef}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={currentBoat.name}
                onBlur={() => blurHandler(formFields.name)}
              />
              {validationErrors?.name && (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {validationErrors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                type="text"
                id="image"
                name="image"
                defaultValue={currentBoat.image}
                onBlur={() => blurHandler(formFields.image)}
              />
              {validationErrors?.image && (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {validationErrors.image}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="type">Boat type:</label>
              <select
                id="type"
                name="type"
                value={selectedType}
                onChange={selectTypeHandler}
              >
                {boatTypes.map((type) => {
                  return (
                    <option value={type.toLowerCase()} key={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity:</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                defaultValue={currentBoat.capacity}
                onBlur={() => blurHandler(formFields.capacity)}
              />
              {validationErrors?.capacity && (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {validationErrors.capacity}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                defaultValue={currentBoat.location}
                onBlur={() => blurHandler(formFields.location)}
              />
              {validationErrors?.location && (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {validationErrors.location}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="price">Price per day:</label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={currentBoat.price}
                onBlur={() => blurHandler(formFields.price)}
              />
              {validationErrors?.price && (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {validationErrors.price}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Additional information:</label>
              <textarea
                id="description"
                name="description"
                defaultValue={currentBoat.description}
                onBlur={() => blurHandler(formFields.description)}
              />
              {validationErrors?.description && (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {validationErrors.description}
                </div>
              )}
            </div>

            <input
              type="submit"
              id="btn"
              // disabled={validationErrors ? "disabled" : " "}
              value={`SAVE`}
            />
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
