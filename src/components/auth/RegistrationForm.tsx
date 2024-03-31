import React, { useEffect, useRef } from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./auth.scss";

import { useDispatch, useSelector } from "react-redux";
import { validationFormFields } from "../../utils/validation";

import { NavLink } from "react-router-dom";
import SimlpeLoader from "../loaders/SimpleLoader";
import Modal from "../modals/Modal";

interface IPropsLoginForm {
  feedbackOk: string;
  feedbackErr: string;
}

interface INewUser {
  username: string;
  name: string;
  surname: string;
  password: string;
}

const RegistrationForm = (props: IPropsLoginForm) => {
  const navigate = useNavigate();

  const { feedbackOk, feedbackErr } = props;
  const [validated, setValidated] = useState(false);
  const [checkBoxValue, setCheckBoxValue] = useState("off");

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleCheckBoxClick = (prev) => {
    prev === "off" ? setCheckBoxValue("on") : setCheckBoxValue("off");
  };

  const dispatch = useDispatch();

  const userNameInputRef = useRef(null);
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const passswordInputRef = useRef(null);
  const checkBoxInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
    }
    setValidated(true);
  };
  const handleSubmitClick = async () => {
    setLoading(true);

    if (
      userNameInputRef.current &&
      validationFormFields(userNameInputRef.current.value) &&
      validationFormFields(firstNameInputRef.current.value) &&
      validationFormFields(lastNameInputRef.current.value) &&
      validationFormFields(passswordInputRef.current.value) &&
      checkBoxInputRef.current.value === "on"
      // checkBoxInputRef.current.value === "on" -Надо смотреть выше
    ) {
      const resp = await fetch("http://elapteb8.beget.tech/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userNameInputRef.current.value,
          name: firstNameInputRef.current.value,
          surname: lastNameInputRef.current.value,
          password: passswordInputRef.current.value,
        }),
      }).then(function (resp) {
        if (resp.status == 409) {
          setLoading(false);
          setError(true);
        }
        return resp.json();
      });

      console.log(resp);

      //делаем Post и передаем user
      if (resp.data) {
        const newUser: INewUser | any = {
          username: resp.data.username,
          name: resp.data.name,
          surname: resp.data.surname,
          password: resp.data.password,
          id: resp.data.id,
        };

        if (true) {
          const action = { type: "REGISTRATION", payload: newUser };

          localStorage.setItem("currentUser", JSON.stringify(newUser));
          localStorage.setItem("isAuth", JSON.stringify("true"));

          dispatch(action);
          dispatch({ type: "SET-AUTH-VALUE", payload: true });

          setLoading(false);
          navigate("/profile");

          //Весьма спрорно
          window.location.reload();
        }
      }
    } else {
      alert("Заполните все поля");
      window.location.reload();
    }
  };
  if (loading) {
    return <SimlpeLoader />;
  }
  if (error) {
    return (
      <Modal
        severity="error"
        message="Пользователь уже существует, введите другое имя пользователя. "
      />
    );
  }
  return (
    <section className="form-wrapper">
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="form-reg rounded-3xl flex flex-col items-start justify-center p-4"
      >
        <Row className="mb-3 p-3 flex flex-col items-start justify-center">
          <Form.Group controlId="validationCustom01">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              ref={firstNameInputRef}
            />
            <Form.Control.Feedback>{feedbackOk}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2" controlId="validationCustom02">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              ref={lastNameInputRef}
            />
            <Form.Control.Feedback>{feedbackOk}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2" controlId="validationCustomUsername">
            <Form.Label>Имя пользователя</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                ref={userNameInputRef}
              />
              <Form.Control.Feedback type="invalid">
                {feedbackErr}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-4 p-3">
          <Form.Group controlId="validationCustom03">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              ref={passswordInputRef}
            />
            <Form.Control.Feedback type="invalid">
              {feedbackErr}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-2 px-3">
          <Form.Check
            required
            label="Я принимаю условия обработки данных"
            feedback="Примите соглашение."
            feedbackType="invalid"
            ref={checkBoxInputRef}
            value={checkBoxValue}
            onClick={() => handleCheckBoxClick(checkBoxValue)}
          />
        </Form.Group>
        <Button
          className="ml-4 submit__btn"
          type="submit"
          variant="outline-primary"
          onClick={handleSubmitClick}
        >
          Зарегистрироваться
        </Button>
      </Form>
      <div className="form-annotation flex items-center justify-center ">
        <NavLink to={"/sign_in"}>
          <button className="rounded-3xl bg-slate-300 ">
            У меня уже есть аккаунт.
          </button>
        </NavLink>
      </div>
    </section>
  );
};
export default RegistrationForm;
