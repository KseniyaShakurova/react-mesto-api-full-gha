import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}) {
  
  const ref = useRef();

  

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: ref.current.value });
  }

  useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"avatar"}
      onClose={onClose}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
      form={"avatar"}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input">
        <label className="popup__form-input">
          <input
            ref={ref}
            className="popup__info"
            id="popup__avatar-card"
            name="avatar"
            type="url"
            placeholder="Ссылка на Ваш аватар"
            required
          />
          <span className="popup__error popup__avatar-card-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
