import React from "react";

import "./card.scss";
import { NavLink } from "react-router-dom";

interface IPropsCard {
  title: string;
  description: string;
  image?: any;
  btnText?: string;
  inputPlaceHolder?: string;
}
const Card = (props: IPropsCard) => {
  const {
    title,
    description,
    image,
    btnText = "Отправить",
    inputPlaceHolder = "Enter your email",
  } = props;

  return (
    <section className=" w-full h-auto flex items-center justify-center ">
      <div className="card rounded-2xl w-11/12 flex flex-row items-center justify-between p-10">
        {/* INFO */}
        <div className="card__info flex flex-col items-start justify-center pl-6">
          {/* bg-red-50 */}
          <div className="card__info__wrapper  ">
            <h2 className="card__info__title mt-9"> {title}</h2>
            <p className="card__info__description mt-6">{description}</p>

            {/* <div className="card__info__form flex items-center justify-start w-min h-max mt-6  rounded-3xl ">
              <input
                type="text"
                placeholder={inputPlaceHolder}
                className=" rounded-3xl info__form__input"
              />
              <NavLink to={"/profile"}>
                <button className="info__form__btn rounded-3xl">
                  {" "}
                  {btnText}
                </button>
              </NavLink>
            </div> */}
          </div>
        </div>
        {/* Image */}
        <div className="card__image w-1/2 h-full flex items-center justify-center max-xs:hidden rounded-3xl ">
          {typeof image != "string" && image}
          {typeof image == "string" && (
            <img src={image} className=" rounded-3xl" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Card;
