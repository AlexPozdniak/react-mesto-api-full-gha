import success from "../images/success.svg";
import error from "../images/error.svg";

function InfoTooltip({
    isOpen,
    onClose,
    isSuccessful,
    path,
    navigate
}) {
    const message = isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз';

    function handleClose() {
        if (isSuccessful && path === '/signup') {
            navigate('/signin', { replace: true });
        }

        onClose();
    }

    return (
        <section
            className={`popup ${isOpen && 'popup_opened'}`}
        >
            <div className="popup__container">
                <img
                    className="popup-info__img"
                    src={isSuccessful ? success : error}
                    alt={message}
                />
                <h2 className="popup-info__text">
                    {message}
                </h2>
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={handleClose}
                />
            </div>
        </section>
    );
}

export default InfoTooltip;