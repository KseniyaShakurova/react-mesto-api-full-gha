import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Register = ({ handleRegister, isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(email, password);
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        className="auth__form"
        noValidate
        autoComplete="off"
      >
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          className="auth__input"
          onChange={handleEmail}
          placeholder="Email"
          autoComplete="new-password"
        />
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          className="auth__input"
          onChange={handlePassword}
          placeholder="Пароль"
          autoComplete="new-password"
        />
        <button type="submit" className="auth__button">
          Зарегистрироваться
        </button>

        <div className="auth__signi">
          <Link to="/sign-in" className="auth__link">
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
