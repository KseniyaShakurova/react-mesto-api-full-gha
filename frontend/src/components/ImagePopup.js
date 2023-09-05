function ImagePopup(props) {
  return (
    <div
      className={`popup popup_active ${props.card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__container-open">
        <button
          className="popup__btn"
          type="button"
          title="Закрыть"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__open-image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <p className="popup__open-title">{props.card ? props.card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
