function ImagePopup({onClose, cardData}) {
    return(
        <div className={"popup popup_type_preview-card" + (cardData && ' popup_opened')}>
            <div className="popup__preview-container">
                <button
                    id="preview-close"
                    type="button"
                    className="popup__close-button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
                <img className="popup__image" alt={cardData?.name} src={cardData?.link}/>
                <div className="popup__text">{cardData?.name}</div>
            </div>
        </div>
    );
}

export default ImagePopup;