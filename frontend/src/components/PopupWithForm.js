function PopupWithForm({
   name,
   title,
   children,
   textButton,
   isOpen,
   onClose,
   onSubmit
}) {
    return (
        <div className={`popup popup_type_${name}` + (isOpen && ' popup_opened')}>
            <div className='popup__container'>
                <h2 className={`popup__title ${name === 'deletion' ? 'popup__title_confirm' : ''}`}>
                    {title}
                </h2>
                <form className="popup__form" name={name + '-form'} onSubmit={onSubmit}>
                    {children}
                    <button className="popup__button popup__save-button" type="submit" aria-label={textButton}>
                        {textButton}
                    </button>
                </form>
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} />
            </div>
        </div>
    );
}


export default PopupWithForm;