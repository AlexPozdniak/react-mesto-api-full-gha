import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

function AddPlacePopup({isOpen, onClose, onAddCard}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddCard({name, link});
    }

    return(
        <PopupWithForm
            name='add-card'
            title='Новое место'
            textButton='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__container-input">
                <input
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="popup__input popup__input_type_name"
                    type="text"
                    name="name"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                />
                <span className="error-class popup__input-error-name"></span>
            </div>
            <div className="popup__container-input">
                <input
                    id="link"
                    value={link}
                    onChange={handleLinkChange}
                    className="popup__input popup__input_type_link"
                    type="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span className="error-class popup__input-error-link"></span>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;