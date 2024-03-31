import React, { useEffect, useRef } from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./auth.scss";
import Modal from "../modals/Modal";
import SimlpeLoader from "../loaders/SimpleLoader";

import { useDispatch, useSelector } from "react-redux";
import { validationFormFields } from "../../utils/validation";

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

const SignInForm = (props: IPropsLoginForm) => {
  const isAuth = useSelector<any, any>((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { feedbackOk, feedbackErr } = props;
  const [validated, setValidated] = useState(false);
  const [checkBoxValue, setCheckBoxValue] = useState("off");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const userNameInputRef = useRef(null);
  const checkBoxInputRef = useRef(null);
  const passswordInputRef = useRef(null);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const handleCheckBoxClick = (prev) => {
    prev === "off" ? setCheckBoxValue("on") : setCheckBoxValue("off");
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);

    const user = {
      name: userNameInputRef.current.value,
      password: passswordInputRef.current.value,
    };

    await fetch("http://elapteb8.beget.tech/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userNameInputRef.current.value,
        password: passswordInputRef.current.value,
      }),
    })
      .then((resp) => {
        if (resp.status == 403) {
          setLoading(false);
          setError(true);
        }

        return resp.json();
      })
      .then((resp) => {
        if (resp.data) {
          user["name"] = resp.data.name;
          user["password"] = resp.data.password;
          user["surname"] = resp.data.surname;
          user["username"] = resp.data.username;
          let validatedFieldsCounter = 0;
          for (let key in user) {
            if (user[key] && validationFormFields(user[key])) {
              validatedFieldsCounter++;
            }
          }

          const action = { type: "LOG-IN", payload: user };
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              username: resp.data.username,
              name: resp.data.name,
              surname: resp.data.surname,
              password: resp.data.password,
              id: resp.data.id,
            })
          );

          localStorage.setItem(
            "isCurrentUserAdmin",
            JSON.stringify(resp.data.role)
          );
          localStorage.setItem("isAuth", JSON.stringify("true"));

          dispatch(action);
          dispatch({ type: "SET-AUTH-VALUE", payload: true });
          setLoading(false);
          navigate("/profile");
          window.location.reload();
        }
      });
  };

  if (loading) {
    return <SimlpeLoader />;
  }
  if (error) {
    return <Modal severity="error" message="Пользователя не существеует. " />;
  }
  return (
    <section className="form-wrapper">
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="form-reg rounded-3xl flex flex-col items-start justify-center p-4"
      >
        <Row className="p-3 flex flex-col items-start justify-center">
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
          // type="submit"
          variant="outline-primary"
          onClick={handleSubmitClick}
        >
          Войти
        </Button>
      </Form>
    </section>
  );
};
export default SignInForm;
