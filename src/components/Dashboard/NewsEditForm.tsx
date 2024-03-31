import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./news-edit.scss";

//Do not forget to use useEffect hook!
const NewsEditForm: React.FC = () => {
  // const news = await fetch('http://localhost:8000/api/news', )

  const newsTitle = useRef(null);
  const newsContent = useRef(null);
  const deleteTitle = useRef(null);

  const addNews = (event) => {
    fetch("http://elapteb8.beget.tech/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newsTitle.current.value,
        content: newsContent.current.value,
        user_id: JSON.parse(localStorage.getItem("currentUser")).id,
      }),
    });

    newsTitle.current.value = "";
    newsContent.current.value = "";
  };

  const deleteNews = (event) => {
    fetch("http://elapteb8.beget.tech/api/news/0", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: deleteTitle.current.value,
      }),
    });

    deleteTitle.current.value = "";
  };

  return (
    <>
      <div className="team__edit w-full flex flex-col items-start">
        <h2 className="dashboard__team__title"></h2>
        <div className="current_team flex items-start justify-center w-full ">
          <div className="current_team__add h-full  flex flex-col items-start justify-start  py-6 ">
            <p className="add__block__title">Добавьте новую новость</p>
            {/*  */}
            <div className="add__block-wrapper flex flex-col items-start mt-4 p-1 ">
              <span>Заголовок</span>
              <input type="text" ref={newsTitle} className="" />
            </div>
            {/*  */}
            <div className="add__block-wrapper flex flex-col items-start mt-4 p-1">
              <span>Текст новости</span>
              <textarea ref={newsContent} className="content" />
            </div>
            <button className="add__subimt" onClick={addNews}>
              Добавить
            </button>
          </div>
          {/* Delete */}
          <div className="current_team__delete h-full py-6">
            <p className="add__block__title">Удалить новость</p>
            {/*  */}
            <div className="add__block-wrapper flex flex-col items-start mt-4 p-1 ">
              <span>Заголовок</span>
              <input type="text" className="" ref={deleteTitle} />
            </div>
            {/*  */}

            <button
              className="add__subimt add__submit-delete"
              onClick={deleteNews}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewsEditForm;
