import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onSubmit, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({ name, link });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={"card"}
      title={"Новое место"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input">
        <label className="popup__form-input">
          <input
            className="popup__info"
            id="popup__name-card"
            name="card"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
            required
          />
          <span className="popup__error popup__name-card-error"></span>
        </label>
        <label className="popup__form-input">
          <input
            className="popup__info"
            id="popup__link-card"
            name="url"
            type="url"
            placeholder="Ссылка на картинку"
            value={link}
            onChange={handleLinkChange}
            required
          />
          <span className="popup__error popup__link-card-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
