import React, { useState, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Context } from "../Context";
import { Form } from "../components/Form/Form";
import { Input } from "../components/Input/Input";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = ({ firebaseConfig }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");
  const { isLogin, onChangeLogin } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      return navigate("/");
    }
  }, [isLogin]);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const onChangeEmailHandler = (e) => {
    setLogin(e.target.value);
  };
  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        if (userCredential.user.uid === "qmEocvxWVMMGnANixW4xg9cd7fU2") {
          setIsError("");
          onChangeLogin();
        }
      })
      .catch((e) => {
        console.log("[e.message]", e.message);
        if (
          e.message === "Firebase: Error (auth/invalid-email)." ||
          e.message === "Firebase: Error (auth/wrong-password)."
        ) {
          setIsError("Неверный логин или пароль");
        }
      });
  };
  return (
    <div className="login">
      <h1>Katas8n</h1>
      <h3 className="error__message">{isError ? isError : null}</h3>

      <Form>
        <Input
          type="text"
          value={login}
          placeholder="Login"
          cn="form__input log"
          onChangeHandler={onChangeEmailHandler}
        />
        <Input
          type="password"
          value={password}
          placeholder="Password"
          cn="form__input password"
          onChangeHandler={onChangePasswordHandler}
        />
        <Input
          onSubmitHandler={onSubmitHandler}
          type="submit"
          value="Login"
          cn="form__button"
        />
      </Form>
    </div>
  );
};
