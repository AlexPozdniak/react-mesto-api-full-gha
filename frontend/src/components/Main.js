import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({
    handleAddPlaceClick,
    handleEditAvatarClick,
    handleEditProfileClick,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards
}) {
    const {name, about, avatar, _id: id} = useContext(CurrentUserContext);

    return(
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-edit-button" onClick={handleEditAvatarClick}>
                    <img className="profile__avatar-img" src={avatar}
                         alt="Аватар профиля" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{name}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Редактировать"
                        onClick={handleEditProfileClick}
                    />
                    <p className="profile__job">{about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить"
                    onClick={handleAddPlaceClick}
                />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map(item => {
                        return (
                            <Card
                                key={item._id}
                                cardData={item}
                                onCardClick={onCardClick}
                                currentUserId={id}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Main;