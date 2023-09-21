import PopupWithForm from "./PopupWithForm";
import {useRef} from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const ref = useRef();
    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: ref.current.value,
        });
    }

    return(
        <PopupWithForm
            name='change-avatar'
            title='Обновить аватар'
            textButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__container-input">
                <input
                    id="avatar"
                    ref={ref}
                    className="popup__input popup__input_type_avatar"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span className="error-class popup__input-error-avatar"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;