import React, { useContext, useEffect, useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parser from "html-react-parser";
import { Link, Route } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";

import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Button } from "../components/Button/Button";

import { Context } from "../Context";

import { Form } from "../components/Form/Form";
import { Input } from "../components/Input/Input";
import mainLogo from "../assets/images/main_logo.svg";

export const Home = ({ firebaseConfig, strPath }) => {
  const [helpUkr, setHelpUkr] = useState([]);
  const [helpWest, setHelpWest] = useState([]);
  const [helpQuest, setQuest] = useState([]);
  const [path, setPath] = useState(``);

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  function redirect(e) {
    const elementId = e.target.parentNode.id;
    // console.log("[elementId]", elementId);

    for (let str of strPath) {
      onValue(ref(db, str), (snap) => {
        const data = snap.val();

        if (data.id === elementId) {
          setPath(str);
          window.location.href = str;
        }
      });
    }
  }

  // Effect

  function getData(db, path, setData) {
    onValue(ref(db, path), async (snap) => {
      const data = await snap.val();

      for (let key in data) {
        const obj = await data[key];

        for (let prop in obj) {
          setData((oldState) => {
            return [obj[prop], ...oldState];
          });
        }
      }
    });
  }

  function deleteData(db, path, elem) {
    onValue(ref(db, path), async (snap) => {
      const data = await snap.val();

      for (let key in data) {
        const obj = data[key];

        for (let prop in obj) {
          if (obj[prop] == elem) {
            // console.log("[DATA]", key);
            // console.log("[path]", path + "/" + key);
            remove(ref(db, path + "/" + key));
            window.location.reload();
          }
        }
      }
    });
  }

  useEffect(() => {
    getData(db, "/Help", setHelpUkr);
    getData(db, "/West", setHelpWest);
    getData(db, "/Questions", setQuest);
  }, [db]);

  // Context
  const { setImgContext, setTitleContext, setTextContext } =
    useContext(Context);

  // Toggler
  const [add, setAdd] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [isInUkrain, setIsInUkrain] = useState(true);
  const [check, setCheck] = useState(false);

  //Content state
  const [src, setSrc] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // Questions state
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionText, setQuestionText] = useState("");

  // Content
  const onChangeSrc = (e) => {
    setSrc(e.target.value);
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  // Question
  const onChangeQTitle = (e) => {
    setQuestionTitle(e.target.value);
  };
  // OnClick
  const onClickHandler = (e) => {
    setAdd((oldState) => !oldState);
    console.log("[e.target]", e.target);
  };
  const onClickHandlerAddQuestion = (e) => {
    setAddQuestion((oldState) => !oldState);
  };

  function writeUserData(db, path, title, text, imageUrl) {
    set(ref(db, path), {
      title: title,
      text: text,
      src: imageUrl,
      id: Math.random().toString().slice(4, 13),
      visible: true,
    });
    window.location.reload();
  }

  const onClickAddQHandler = (e) => {
    e.preventDefault();

    writeUserData(
      db,
      `/Questions/Question/Question${Math.random().toString().slice(5, 13)}`,
      questionTitle,
      questionText,
      "huck"
    );

    setQuestionTitle("");
    setQuestionText("");
    window.location.reload();
  };

  const onClickAddHandler = (e) => {
    e.preventDefault();
    if (title.length < 3) return;

    if (check) {
      writeUserData(
        db,
        `/Help/ukr/News${Math.random().toString().slice(5, 13)}`,
        title,
        text,
        src
      );
    } else {
      writeUserData(
        db,
        `/West/West1/West${Math.random().toString().slice(5, 13)}`,
        title,
        text,
        src
      );
    }

    setSrc("");
    setText("");
    setTitle("");
  };

  // className Toggler
  function onClickClassNameHandler() {
    setIsInUkrain((oldState) => !oldState);
  }

  return (
    <div className="app">
      <Header>
        <div className="img__wrapper">
          <img alt="#" src={mainLogo} className="img" />
        </div>
      </Header>

      <div className="content">
        <div className="content__title">Допомога</div>
        <div className="content__choose">
          <span
            onClick={onClickClassNameHandler}
            className={
              isInUkrain ? "content__choosen active" : "content__choosen"
            }
          >
            В Україні
          </span>
          <span
            onClick={onClickClassNameHandler}
            className={
              !isInUkrain ? "content__choosen active" : "content__choosen"
            }
          >
            За кордоном
          </span>
        </div>
        <div className="pages__wrapper">
          <div className="pages">
            {isInUkrain
              ? helpUkr
                  .map((el, i) => {
                    // console.log(el.visible);
                    console.log("[el]", el);
                    return (
                      <div
                        onClick={() => {
                          setImgContext(el.src);
                          setTitleContext(el.title);
                          setTextContext(el.text);
                        }}
                        id={el.id}
                        className="page"
                        key={i}
                      >
                        {localStorage.getItem("Login") ? (
                          <Button
                            onClickHandler={(e) => {
                              console.log(e.target);
                              deleteData(db, "/Help/ukr", el.id);
                            }}
                            cn="add__button delete"
                          >
                            X
                          </Button>
                        ) : null}
                        <div className="page__img">
                          <img src={el.src} alt="" className="image" />
                        </div>

                        <div
                          key={path}
                          onClick={(e) => redirect(e)}
                          className="page__title"
                        >
                          {el.title}
                        </div>
                      </div>
                    );
                  })
                  .reverse()
              : helpWest.map((el, i) => {
                  return (
                    <div
                      onClick={() => {
                        setImgContext(el.src);
                        setTitleContext(el.title);
                        setTextContext(el.text);
                      }}
                      className="page"
                      key={i}
                      id={el.id}
                    >
                      {localStorage.getItem("Login") ? (
                        <Button
                          onClickHandler={(e) => {
                            console.log(e.target);
                            deleteData(db, "/West/West1", el.id);
                          }}
                          cn="add__button delete"
                        >
                          X
                        </Button>
                      ) : null}
                      <div className="page__img">
                        <img src={el.src} alt="" className="image" />
                      </div>
                      <Link
                        to="/page"
                        onClick={(e) => {
                          console.log("[e]", e);
                        }}
                        className="page__title"
                      >
                        {el.title}
                      </Link>
                    </div>
                  );
                })}
          </div>
        </div>

        {localStorage.getItem("Login") ? (
          <Button onClickHandler={onClickHandler} cn="add__button">
            +
          </Button>
        ) : null}
        {localStorage.getItem("Login") && add ? (
          <div className="form__wrapper">
            <Form>
              <span className="add__text">Назва</span>
              <Input
                onChangeHandler={onChangeTitle}
                value={title}
                type="text"
                cn="form__input log"
              />
              <span className="add__text">Текст</span>
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(data);
                  console.log(text);
                }}
              />
              <span className="add__text">Адреса зображення</span>
              <Input
                onChangeHandler={onChangeSrc}
                value={src}
                type="text"
                cn="form__input log"
              />
              <div className="check">
                <span className="add__text">В Україні</span>
                <Input
                  cn="form__checkbox"
                  onChangeHandler={(e) => {
                    setCheck((oldState) => !oldState);
                  }}
                  type="checkbox"
                  checked={check}
                />
              </div>

              <Button onClickHandler={onClickAddHandler} cn="add__button">
                Add
              </Button>
            </Form>
          </div>
        ) : null}
      </div>

      <div className="question">
        <div className="content__title">
          {helpQuest.length > 0 ? "Поширені запитання" : null}
        </div>
        {helpQuest.map((el, i) => {
          return (
            <div className="question__item" key={i} id={el.id}>
              {localStorage.getItem("Login") ? (
                <div className="button__wrapper">
                  <Button
                    onClickHandler={(e) => {
                      console.log(e.target);
                      deleteData(db, "/Questions/Question", el.id);
                    }}
                    cn="add__button delete"
                  >
                    X
                  </Button>
                </div>
              ) : null}
              {el.title}
              <div className="question__item-text">{parser(el.text)}</div>
            </div>
          );
        })}
        {localStorage.getItem("Login") ? (
          <Button onClickHandler={onClickHandlerAddQuestion} cn="add__button">
            +
          </Button>
        ) : null}

        {addQuestion ? (
          <div className="form__wrapper">
            <Form>
              <span className="add__text">Назва</span>
              <Input
                onChangeHandler={onChangeQTitle}
                value={questionTitle}
                type="text"
                cn="form__input log"
              />
              <span className="add__text">Текст</span>
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setQuestionText(data);
                }}
              />

              <Button onClickHandler={onClickAddQHandler} cn="add__button">
                Add
              </Button>
            </Form>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};
