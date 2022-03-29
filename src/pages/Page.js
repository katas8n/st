import React, { useContext, useEffect, useState } from "react";

import parser from "html-react-parser";

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";

import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

import { Context } from "../Context";

import "./Page.scss";

export const Page = ({ firebaseConfig, path }) => {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    onValue(ref(db, path), (snap) => {
      const data = snap.val();
      for (const key in data) {
        const element = data[key];
        console.log(data);
        setTitle(data.title);
        setText(data.text);
        console.log("[element]", element);
      }
    });
  }, []);

  return (
    <>
      <Header>
        <div className="header__title">{title}</div>
      </Header>
      <div className="str">
        {/* <div className="str__title">{titleContext}</div> */}
        <div className="str__text">{parser(text)}</div>
      </div>
      <Footer />
    </>
  );
};
