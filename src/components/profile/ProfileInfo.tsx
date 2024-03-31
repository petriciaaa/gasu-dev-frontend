import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IRootReducer } from "src/types/reducers";
import { IUser } from "src/types/user";

import avatar from "src/assets/images/avatar_test.png";
import { ReactComponent as PasswordLock } from "src/assets/icons/password_lock.svg";
import { ReactComponent as PasswordOpen } from "src/assets/icons/password_open.svg";

import "./profileInfo.scss";
import { validationFormFields } from "./../../utils/validation";

const ProfileInfo = () => {
  // Почему мы обращаемся к редьюсеру, а не к стейту?
  const user: IUser = useSelector<IRootReducer, any>(
    (state) => state.registrationReducer
  );

  const [userName, setUserName] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [surName, setSurname] = useState(user.surname);
  const [password, setPassword] = useState(user.password);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const userNameRef = useRef(null);
  const nameRef = useRef(null);
  const surNameRef = useRef(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleChangeElement = (event, callback) => {
    callback(event.target.value);
  };

  const handleMouseClickOutInput = (event) => {
    if (event.target !== passwordRef) {
      setPasswordOpen(false);
    }
  };
  const handleChangeButton = (elementRef) => {
    elementRef.current.focus();
  };

  const handleSubmitChange = async () => {
    const currentUserNewIfo = {
      username: userNameRef.current.value,
      name: nameRef.current.value,
      surname: surNameRef.current.value,
      password: password,
      id: JSON.parse(localStorage.getItem("currentUser")).id,
    };
    let validatedFieldsCounter = 0;
    for (let key in currentUserNewIfo) {
      if (
        currentUserNewIfo[key] &&
        validationFormFields(currentUserNewIfo[key])
      ) {
        validatedFieldsCounter++;
      }
    }
    if (validatedFieldsCounter === Object.keys(currentUserNewIfo).length) {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      const resp = await fetch(
        `http://elapteb8.beget.tech/api/users/${user.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: currentUserNewIfo.username,
            name: currentUserNewIfo.name,
            surname: currentUserNewIfo.surname,
            password: currentUserNewIfo.password,
          }),
        }
      ).then((resp) => resp.json());
      const action = { type: "CHANGE-USER-INFO", payload: currentUserNewIfo };
      localStorage.setItem("currentUser", JSON.stringify(currentUserNewIfo));
      dispatch(action);
      console.log(resp);

      //Весьма спрорно
      window.location.reload();
    } else {
      alert("Введите подходящие значения");
    }
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className="profile__info rounded-3xl flex flex-col items-start justify-start p-3 ">
        <div className="info__logo">
          <img src={avatar} />
          {/* <button className="info__logo__btn">
            {" "}
            <span>Изменить фото</span>
          </button> */}
        </div>
        <div className="info__user">
          {/*  */}
          <div className="info__user-wrapper flex items-end justify-between p-1">
            <div className="info__user__info flex flex-col justify-start items-start p-1">
              <span className="info__user__title">Имя</span>
              <input
                className="info__user__value mt-0.5"
                value={name}
                onChange={(event) => handleChangeElement(event, setName)}
                ref={nameRef}
              >
                {}
              </input>
            </div>
            <div className="info__user__change p-1">
              <button
                className="info__user__change__btn "
                onClick={() => {
                  handleChangeButton(nameRef);
                }}
              >
                Изменить
              </button>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="info__user-wrapper flex items-end justify-between p-1">
            <div className="info__user__info flex flex-col justify-start items-start p-1">
              <span className="info__user__title">Фамилия</span>
              <input
                className="info__user__value mt-0.5"
                value={surName}
                onChange={(event) => handleChangeElement(event, setSurname)}
                ref={surNameRef}
              >
                {}
              </input>
            </div>
            <div className="info__user__change p-1">
              <button
                className="info__user__change__btn "
                onClick={() => {
                  handleChangeButton(surNameRef);
                }}
              >
                Изменить
              </button>
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="info__user-wrapper flex items-end justify-between p-1">
            <div className="info__user__info flex flex-col justify-start items-start p-1">
              <span className="info__user__title">Имя пользователя</span>
              <input
                className="info__user__value mt-0.5"
                value={userName}
                onChange={(event) => {
                  handleChangeElement(event, setUserName);
                }}
                ref={userNameRef}
              >
                {}
              </input>
            </div>
            <div className="info__user__change p-1">
              <button
                className="info__user__change__btn "
                onClick={() => {
                  handleChangeButton(userNameRef);
                }}
              >
                Изменить
              </button>
            </div>
          </div>

          {/*  */}
          <div className="info__user-wrapper flex items-end justify-between p-1">
            <div className="info__user__info flex flex-col justify-start items-start p-1">
              <div
                className="info__user__info__password-wrapper flex items-center justify-between "
                onClick={() => {
                  setPasswordOpen(!passwordOpen);
                }}
              >
                <span className="info__user__title">Пароль </span>
                <button>
                  {passwordOpen ? <PasswordOpen /> : <PasswordLock />}
                </button>
              </div>

              <input
                className="info__user__value mt-0.5"
                value={passwordOpen ? password : "*".repeat(password.length)}
                onClick={() => setPasswordOpen(true)}
                onChange={(event) => {
                  console.log(event);
                  handleChangeElement(event, setPassword);
                }}
                ref={passwordRef}
              />
            </div>
            <div className="info__user__change p-1">
              <button
                className="info__user__change__btn "
                onClick={() => {
                  setPassword(password);
                  setPasswordOpen(true);
                  handleChangeButton(passwordRef);
                }}
              >
                Изменить
              </button>
            </div>
          </div>
          {/*  */}
        </div>
        <button className="info__submit " onClick={handleSubmitChange}>
          Подтвердить
        </button>
      </div>
    </>
  );
};
export default ProfileInfo;
