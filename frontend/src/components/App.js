import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useCallback, useEffect, useState} from "react";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { pathname } = useLocation();

    const checkActiveToken = useCallback(() => {
        const jwt = localStorage.getItem('jwt');
        console.log('jwt',jwt)
        if (jwt) {
            auth
                .checkToken(jwt)
                .then((res) => {
                    console.log('check',res)
                    if (res) {
                        setIsLoggedIn(true);
                        setEmail(res.email);
                        setCurrentUser(res)
                        navigate("/", { replace: true });
                    }
                })
                .catch((err) => {
                    setIsLoggedIn(false);
                    console.log(err);
                });
        }
    }, [navigate])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    api.getData(jwt)
        .then(([user, cards])  => {
            console.log('getData',user, cards)
            setCards(cards.data);
            setCurrentUser(user.data);
        })
        .catch((err) => console.log(err));

    checkActiveToken();
  }, [checkActiveToken]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setInfoToolTipOpen(false);

      setSelectedCard(null);
  }

  function handleCardClick(card) {
      setSelectedCard(card);
  }

  function handleCardLike(cardId, isLiked) {
      api.changeLikeCardStatus(cardId, isLiked)
          .then(newCard => {
            setCards(state => state.map(stateCard => stateCard._id === cardId ? newCard : stateCard));
          })
          .catch((err) => console.log(err));
  }

  function handleUpdateUser(user) {
    const jwt = localStorage.getItem('jwt');
      api.patchUserInfo(user, jwt)
          .then(res => {
            setCurrentUser(res);
            closeAllPopups();
          })
          .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
      api.setUserAvatar(avatar)
          .then(res => {
              setCurrentUser(res);
              closeAllPopups();
          })
          .catch((err) => console.log(err));
  }

  function handleAddCard(data) {
      api.createCard(data)
          .then(newCard => {
              setCards([newCard, ...cards]);
              closeAllPopups();
          })
          .catch((err) => console.log(err));
  }

  function handleDeleteCard(id) {
      api.deleteCard(id)
          .then(() => {
              const newCards = cards.filter(card => card._id !== id);
              setCards(newCards);
          })
          .catch((err) => console.log(err));
  }

    function handleRegistration(password, email) {
        if (!password || !email) {
            return;
        }
        auth
            .authorize(password, email, false)
            .then(() => {
                setIsSuccessful(true);
            })
            .catch((err) => {
                setIsSuccessful(false);
                console.log(err);
            })
            .finally(() => {
                setInfoToolTipOpen(true);
            });
    }

    function handleLogin(password, email) {
        console.log(password,email)
        if (!password || !email) {
            return;
        }
        auth
            .authorize(password, email)
            .then((res) => {
                console.log(res.token)
                setIsLoggedIn(true);
                localStorage.setItem('jwt', res.token);
                setEmail(email);
                navigate('/', { replace: true });
            })
            .catch((err) => {
                console.log(err);
                setIsLoggedIn(false);
                setInfoToolTipOpen(true);
                setIsSuccessful(false);
            });
    }

    function handleSignOut() {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        setEmail('');
        navigate('/signin', { replace: true });
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header
              isLoggedIn={isLoggedIn}
              email={email}
              handleSignOut={handleSignOut}
              path={pathname}
          />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute
                            element={Main}
                            isLoggedIn={isLoggedIn}
                            handleEditAvatarClick={handleEditAvatarClick}
                            handleAddPlaceClick={handleAddPlaceClick}
                            handleEditProfileClick={handleEditProfileClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleDeleteCard}
                            cards={cards}
                            email={email}
                        />
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <Login
                            title="Вход"
                            buttonText="Войти"
                            onSubmit={handleLogin}
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Register
                            title="Регистрация"
                            buttonText="Зарегистрироваться"
                            onSubmit={handleRegistration}
                        />
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          <Footer />
          <AddPlacePopup
              onClose={closeAllPopups}
              isOpen={isAddPlacePopupOpen}
              onAddCard={handleAddCard}
          />
          <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
          />
          <ImagePopup cardData={selectedCard} onClose={closeAllPopups}/>
            <InfoTooltip
                onClose={closeAllPopups}
                isOpen={isInfoToolTipOpen}
                isSuccessful={isSuccessful}
                path={pathname}
                navigate={navigate}
            />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
