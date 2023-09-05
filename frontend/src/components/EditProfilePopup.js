import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const [inputName, setInputName] = useState("");
  const [inputAbout, setInputAbout] = useState("");

  const currentUser = useContext(CurrentUserContext);
  const { name, about } = currentUser;

  function handleNameChange(evt) {
    setInputName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setInputAbout(evt.target.value);
  }

  useEffect(() => {
    if (isOpen) setInputName(name ?? "");
    setInputAbout(about ?? "");
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: inputName,
      about: inputAbout,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={"profile"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
      form={"profile"}
    >
      <fieldset className="popup__input">
        <label className="popup__form-input">
          <input
            className="popup__info popup__info_input_name"
            name="name"
            id="profile-name"
            type="text"
            placeholder="Ваше имя"
            minLength="2"
            maxLength="40"
            value={inputName}
            onChange={handleNameChange}
            required
          />
          <span className="popup__error profile-name-error"></span>
        </label>
        <label className="popup__form-input">
          <input
            className="popup__info popup__info_input_job"
            name="job"
            id="job"
            type="text"
            placeholder="Интересное о Вас"
            minLength="2"
            maxLength="200"
            value={inputAbout}
            onChange={handleDescriptionChange}
            required
          />
          <span className="popup__error job-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
