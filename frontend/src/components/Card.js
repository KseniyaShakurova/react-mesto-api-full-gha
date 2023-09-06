import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `group__btn ${
    isLiked && "group__btn_active"
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div className="group__item">
      {isOwn && (
        <button
          className="group__btn-remove"
          title="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="group__image"
        id="btnImg"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="group__text">
        <h2 className="group__title">{props.card.name}</h2>
        <div className="group__conteiner-like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            title="Лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="group__likes-calculator">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
