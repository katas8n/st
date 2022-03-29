import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Context } from "./Context";

import "./App.scss";
import { Page } from "./pages/Page";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get } from "firebase/database";

function App({ firebaseConfig }) {
  const [isLogin, setIsLogin] = useState(false);

  const [imgContext, setImgContext] = useState("");
  const [titleContext, setTitleContext] = useState("");
  const [textContext, setTextContext] = useState("");
  const [elementsId, setElementsId] = useState([]);
  const [elementId, setElementId] = useState([]);

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const [path, setPath] = useState([]);

  useEffect(() => {
    onValue(ref(db, "/"), (snapshot) => {
      const data = snapshot.val();
      for (const key in data) {
        const element = data[key];

        for (const prop in element) {
          if (prop.includes("West") || prop.includes("ukr")) {
            const name = element[prop];

            for (const id in name) {
              setElementsId((old) => [id, ...old]);
            }
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    onValue(ref(db, "/"), (snap) => {
      const value = snap.val();
      // console.log("[value]", value);
      for (const some in value) {
        for (const key in value) {
          const data = value[key];
          // console.log("[key]", key);
          for (const prop in data) {
            // console.log("[prop]", prop);
            for (let kek in data[prop]) {
              setPath((oldState) => [`/${key}/${prop}/${kek}`, ...oldState]);
            }

            // console.log(
            //   `https://it-step-847a3-default-rtdb.europe-west1.firebasedatabase.app//Help/${key}/${prop}`
            // );
            // console.log("[path]", path);
          }
        }
      }
    });
  }, []);
  // useEffect(ref(db , "/Help/${key}/${prop}"))

  const onChangeLogin = () => {
    setIsLogin(true);
    localStorage.setItem("Login", "yep");
  };

  return (
    <Context.Provider
      value={{
        isLogin,
        onChangeLogin,
        imgContext,
        setImgContext,
        titleContext,
        setTitleContext,
        textContext,
        setTextContext,
        setIsLogin,
        elementsId,
        setElementsId,
        elementId,
        setElementId,
      }}
    >
      <Routes>
        {path
          ? path.map((p) => {
              // console.log(p);
              return (
                <Route
                  exact
                  key={p}
                  path={p}
                  element={<Page path={p} firebaseConfig={firebaseConfig} />}
                />
              );
            })
          : null}

        <Route
          path="/"
          element={<Home strPath={path} firebaseConfig={firebaseConfig} />}
        />
        <Route
          exact
          path="/login"
          element={<Login firebaseConfig={firebaseConfig} />}
        />
      </Routes>
    </Context.Provider>
  );
}

export default App;
