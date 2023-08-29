import logoheader from "../images/logo.svg";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoheader}
        alt="логотим страницы - Место"
      />
      <Switch>
        <Route exact path="/sign-in">
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__info">
            <p className="header__email">{userEmail}</p>
            <Link to="/sign-in" className="header__exit" onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
