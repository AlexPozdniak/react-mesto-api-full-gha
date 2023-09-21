import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const initialUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName(initialUser.name);
            setInfo(initialUser.about);
        }
    }, [isOpen, initialUser]);

    function handleInfoChange(evt) {
        setInfo(evt.target.value);
    }

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name,
            about: info,
        });
    }

    return(
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            textButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__container-input">
                <input
                    id="title"
                    value={name}
                    onChange={handleNameChange}
                    className="popup__input popup__input_type_title"
                    type="text"
                    name="name"
                    placeholder="Имя"
                    required minLength="2"
                    maxLength="40"
                />
                <span className="error-class popup__input-error-title"></span>
            </div>
            <div className="popup__container-input">
                <input
                    id="job"
                    value={info}
                    onChange={handleInfoChange}
                    className="popup__input popup__input_type_job"
                    type="text"
                    name="about"
                    placeholder="О себе"
                    required
                    minLength="2"
                    maxLength="200"
                />
                <span className="error-class popup__input-error-job"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;