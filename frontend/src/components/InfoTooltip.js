import React from "react";
import IconClose from "../images/closeIcon.svg";
import SuccessIcon from "../images/successIcon.svg";

const InfoTooltip = ({ onClose, isOpen, isSuccess }) => {
  return (
    <div className={`popup popup_tooltip ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        {isSuccess ? (
          <>
            <img
              src={`${SuccessIcon}`}
              alt="зеленая галочка"
              className="popup__tooltip_img"
            />
            <h2 className="popup__tooltip_title">
              Вы успешно зарегистрировались!
            </h2>
          </>
        ) : (
          <>
            <img
              src={`${IconClose}`}
              alt="красный крестик"
              className="popup__tooltip_img"
            />
            <h2 className="popup__tooltip_title">
              Что-то пошло не так! Попробуйте ещё раз!
            </h2>
          </>
        )}

        <button type="button" className="popup__btn" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
