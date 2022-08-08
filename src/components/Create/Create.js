import "./Create.css";

import * as boatService from "../../services/boatService";
import { AuthContext } from "../../contexts/AuthContext";
import { BoatContext } from "../../contexts/BoatContext";
import {
  checkMaxLength,
  checkMinLength,
  checkUrl,
} from "../../services/validationService";
import { formFields } from "../../constants/constants";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const { auth } = useContext(AuthContext);
  const { createBoatListingHandler } = useContext(BoatContext);
  const [validationErrors, setValidationErrors] = useState({});
  const formRef = useRef();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const boatData = Object.fromEntries(new FormData(e.target));
    boatService.create(boatData, auth.accessToken).then((result) => {
      createBoatListingHandler(result);
    });
    navigate("/catalog");
    console.log(boatData);
  };

  const addToValidationErrors = (key, value) => {
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
      [key]: value,
    }));
  };

  const removeValidationErrors = (key, value) => {
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
        removeValidationErrors(
          formFields.name,
          "Name should be between 3 and 12 chars"
        );
      }
    }

    if (keyName === formFields.image) {
      if (!isImageValid) {
        addToValidationErrors(formFields.image, "Invalid image URL");
      } else {
        removeValidationErrors(formFields.image, "Invalid image URL");
      }
    }

    if (keyName === formFields.capacity) {
      if (!isCapacityValid) {
        addToValidationErrors(
          formFields.capacity,
          "Capacity should be between 1 and 2 chars"
        );
      } else {
        removeValidationErrors(
          formFields.capacity,
          "Capacity should be between 1 and 2 chars"
        );
      }
    }

    if (keyName === formFields.location) {
      if (!isLocationValid) {
        addToValidationErrors(
          formFields.location,
          "Location should be less than 30 chars"
        );
      } else {
        removeValidationErrors(
          formFields.location,
          "Location should be less than 30 chars"
        );
      }
    }

    if (keyName === formFields.price) {
      if (!isPriceValid) {
        addToValidationErrors(
          formFields.price,
          "Price should be at least 1 char"
        );
      } else {
        removeValidationErrors(
          formFields.price,
          "Price should be at least 1 char"
        );
      }
    }

    if (keyName === formFields.description) {
      if (!isDescriptionValid) {
        addToValidationErrors(
          formFields.description,
          "Additional information should be less than 200 chars"
        );
      } else {
        removeValidationErrors(
          formFields.description,
          "Additional information should be less than 200 chars"
        );
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
          <h1>Create Listing</h1>
          <h4>Post your boat for rent</h4>
          <form method="POST" onSubmit={onSubmit} ref={formRef}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Boat"
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
                placeholder="http://..."
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
              <select id="type" name="type">
                <option value="sail">Sail</option>
                <option value="catamaran">Catamaran</option>
                <option value="motor">Motor</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity:</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                placeholder="4 persons"
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
                placeholder="Lefcada Island"
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
                placeholder="$1000.00"
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
                type="text"
                id="description"
                name="description"
                placeholder="Add info..."
                defaultValue={""}
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
              id="btn btn-hover"
              value={`CREATE`}
              // disabled={validationErrors ? "disabled" : " "}
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
