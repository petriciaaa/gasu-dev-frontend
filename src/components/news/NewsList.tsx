import React, { useState, useEffect } from "react";

import SimlpeLoader from "../loaders/SimpleLoader";

import "./news-list.scss";

//Do not forget to use useEffect hook!
const NewsList = () => {
  const [news, setNews] = useState({ data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://gasudev.ru/api/news")
      .then((resp) => resp.json())
      .then((data) => {
        setLoading(false);
        setNews(data);
      });
  }, []);

  if (loading) {
    return (
      <section className="w-full h-auto flex items-end justify-end ml-10">
        <SimlpeLoader />
      </section>
    );
  }

  const newsCards = news.data.reverse().map((news, index) => {
    return (
      <article className="news">
        <h3 className="news__title"> {news.title} </h3>
        <p className="news__content"> {news.content} </p>
        <div className="news__meta">
          <time className="news__time"> {news.datetime} </time>
          <span className="news__author"> {news.author} </span>
        </div>
      </article>
    );
  });

  return <> {newsCards} </>;
};
export default NewsList;
