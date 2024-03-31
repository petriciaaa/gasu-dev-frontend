import React from "react";
import { NavLink } from "react-router-dom";
import { Map, YMaps } from "@pbe/react-yandex-maps";

import "./contacts.scss";

import { ReactComponent as VkIcon } from "src/assets/svg/icons8-vk.svg";
import { useScreenWidth } from "./../../hooks/screen";

const Contacts = () => {
  const width = useScreenWidth();

  return (
    <section className="contacts">
      <div className="contacts-wrapper">
        <span className="contacts__info__elem  contacts__header">Контакты</span>
        <div className="contacts__info">
          <h4 className="contacts__info__elem contacts__header ">
            Студенческий совет
          </h4>
          <span className="contacts__info__elem contacts__info__elem-field ">
            {" "}
            Адрес
          </span>
          <p className="contacts__info__elem contacts__info__elem-value contacts__info__elem-link">
            Санкт-Петербург, 2-я Красноармейская ул., д. 4, каб. 136
          </p>
          <span className="contacts__info__elem contacts__info__elem-field">
            E-mail
          </span>

          <a
            href="mailto:oso@spbgasu.ru"
            className="contacts__info__elem contacts__info__elem-value  contacts__info__elem-email contacts__info__elem-link"
          >
            oso@spbgasu.ru
          </a>

          <NavLink
            to={"https://vk.com/ssspbgasu"}
            className={"contacts__info__elem contacts__info__elem-link"}
          >
            <VkIcon />
          </NavLink>
        </div>
      </div>

      <div className="map-wrapper">
        <YMaps>
          <div>
            Местоположение студсовета
            <Map
              width={width > 600 ? 500 : 320}
              defaultState={{
                center: [59.915096640731554, 30.31459785681434],
                zoom: 16,
              }}
            />
          </div>
        </YMaps>
      </div>
    </section>
  );
};

export default Contacts;
