import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Login = ({ isLoggedIn, onLogin }) => {
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
    onLogin(email, password);
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <input
          className="auth__input"
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleEmail}
          autoComplete="new-password"
        />
        <input
          className="auth__input"
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Пароль"
          onChange={handlePassword}
          autoComplete="new-password"
        />
        <button className="auth__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
