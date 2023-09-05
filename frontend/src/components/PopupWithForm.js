function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? `popup_opened` : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__btn"
          type="button"
          title="Закрыть"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>

        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button className="popup__save" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
