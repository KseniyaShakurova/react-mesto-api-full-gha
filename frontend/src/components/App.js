import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register.js";
import Login from "./Login.js";
import authApi from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();
  const [infoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setInfoToolTipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (isLiked) {
      api
        .disLike(card._id, localStorage.jwt)
        .then((res) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? res : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .likeCard(card._id, localStorage.jwt )
        .then((res) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? res : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, localStorage.jwt)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(dataCard) {
    console.log(localStorage.jwt);
    api
      .createNewCard(dataCard, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data, reset) {
    
    api.setUserInfo(data, localStorage.jwt).then((res) => {
      setCurrentUser(res.data);
      closeAllPopups();
      reset();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    
    api
      .updateAvatar(data, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (isLoggedIn)  {
      
    Promise.all([api.getUserInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
    
       .then(([data, cards]) => {
        
        setCurrentUser(data.data);
        setCards(cards);
      })
      .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);
  

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setIsLoggedIn(false);
    history.push("/sign-in");
  }

  function handleRegisterUser(email, password) {
    authApi
      .registerUser(email, password)
      .then((data) => {
        if (data) {
          setInfoToolTipPopupOpen(true);
          setIsSuccess(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400-некорректно заполнено одно из полей");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleAuthUser(email, password) {
    authApi
      .loginUser(email, password)
      .then((data) => {
          localStorage.setItem('jwt', data.token);
          
          setUserEmail(email);
          setIsLoggedIn(true);
          history.push("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей ");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
        setIsSuccess(true);
        setInfoToolTipPopupOpen(false);
      });
  }

/*useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log(token);
    if (token) {
      console.log(token);
      authApi
        .checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setUserEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  }, [history]);*/
  
  useEffect(() => {
    if (localStorage.jwt) {
      authApi
        .checkToken(localStorage.jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setUserEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  }, [history]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="conteiner">
          <Header onSignOut={handleSignOut} userEmail={userEmail} />

          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isLoggedIn={isLoggedIn}
            />
            <Route path="/sign-up">
              <Register handleRegister={handleRegisterUser} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleAuthUser} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          {isLoggedIn && <Footer />}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={infoToolTipPopupOpen}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
