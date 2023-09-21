import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
    const {_id: currentUserId} = useContext(CurrentUserContext);

    const { name, link, likes, _id: cardId } = cardData;
    const isOwn = cardData.owner._id === currentUserId;
    const isLiked = cardData.likes.some((el) => el._id === currentUserId);
    const likeButtonClassName = `elements__icon ${
        isLiked ? "elements__icon-active" : ""
    }`;

    return(
        <li className="elements__list-item">
            {isOwn && <button className="elements__trash" type="button" onClick={() => onCardDelete(cardId)}/>}
            <img
                className="elements__picture"
                alt={name}
                src={link}
                onClick={() => onCardClick( { name: name, link: link } )}
            />
            <div className="elements__container">
                <h2 className="elements__text">{name}</h2>
                <div className="elements__like-container">
                    <button
                        className={likeButtonClassName}
                        type="button"
                        onClick={() => onCardLike(cardId, isLiked)}
                    />
                    <span className="elements__counter">{likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;