import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Button } from "../Button/Button";
import { Login } from "../../pages/Login";

import { Context } from "../../Context";

import "./Footer.scss";

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__part">
          <div className="footer__title">В Україні</div>
          <ul className="footer__list">
            <li className="footer__el">Евакуація</li>
            <li className="footer__el">Житло в іншому місті</li>
            <li className="footer__el">Медична допомога</li>
            <li className="footer__el">Гуманітарна допомога</li>
          </ul>
        </div>
        <div className="footer__part">
          <div className="footer__title">За кордоном</div>
          <ul className="footer__list">
            <li className="footer__el">Перетин кордону </li>
            <li className="footer__el">Житло в Європі</li>
            <li className="footer__el">Гуманітарна допомога в Європі</li>
            <li className="footer__el">Статуси для українців в Європі </li>
          </ul>
        </div>
        <div className="footer__part">
          <div className="footer__title">Зв'язатися з нами</div>
          <ul className="footer__list">
            <li className="footer__el">itstep@gmail.com</li>
          </ul>
        </div>
      </footer>
      <div className="brand">
        <Link to="/login" className="brand__text">
          © 1999-2022 Компʼютерна Академія ШАГ
        </Link>
        {localStorage.getItem("Login") ? (
          <Button
            onClickHandler={() => {
              localStorage.clear();
              window.location.reload();
            }}
            cn="add__button footer__btn"
          >
            Log Our
          </Button>
        ) : null}
      </div>
    </>
  );
};
