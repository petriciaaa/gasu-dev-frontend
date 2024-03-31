import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./news-edit.scss";

//Do not forget to use useEffect hook!
const UsersEditForm: React.FC = () => {
  // const users = await fetch('http://localhost:8000/api/users', )

  const changeRole = (user, event) => {
    const roles = {
      admin: 1,
      moder: 2,
      user: 3,
    };

    fetch(`http://localhost:8000/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role_id: roles[event.target.value],
      }),
    }).then((data) => window.location.reload());
  };

  const deleteUser = (user, event) => {
    fetch(`http://elapteb8.beget.tech/api/users/${user.id}`, {
      method: "DELETE",
    }).then((data) => window.location.reload());
  };

  const [users, setUsers] = useState({ data: [] });

  useEffect(() => {
    fetch("http://elapteb8.beget.tech/api/users")
      .then((resp) => resp.json())
      .then((data) => setUsers(data));
  }, []);

  const usersCard = users.data.reverse().map((users, index) => {
    return (
      <article className="users">
        <h3 className="users__username"> {users.username} </h3>
        <div className="users__meta">
          <button
            className="users__delete"
            onClick={(e) => deleteUser(users, e)}
          >
            {" "}
            Удалить{" "}
          </button>

          <select
            name=""
            id=""
            value={users.role}
            onChange={(e) => changeRole(users, e)}
            className="users__role"
          >
            <option value="admin"> Admin </option>
            <option value="moder"> Moder </option>
            <option value="user"> User </option>
          </select>
        </div>
      </article>
    );
  });

  useEffect(() => {
    fetch("http://elapteb8.beget.tech/api/users", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <div className="team__edit w-full flex flex-col items-start">
        <h2 className="dashboard__team__title"></h2>
        <div className="current_team flex items-start justify-center w-full ">
          <div className="current_team__add h-full  flex flex-col items-start justify-start  py-6">
            <p className="add__block__title">Пользователи</p>
            {/*  */}
            {usersCard}
          </div>
        </div>
      </div>
    </>
  );
};
export default UsersEditForm;
