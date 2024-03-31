import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {
  loginReducer,
  registrationReducer,
  changeUserInfoReducer,
  authReducer,
} from "./reducers/authReducers";
import { IInitialState } from "./../types/store";
import { teamReducer } from "./reducers/teamReducers";

import { adminReducer } from "./reducers/adminReducers";

//Init store
export const initialState: IInitialState = {
  isAuth: localStorage.getItem("isAuth")
    ? JSON.parse(localStorage.getItem("isAuth"))
    : "false",
  isAdmin: localStorage.getItem("isCurrentUserAdmin")
    ? JSON.parse(localStorage.getItem("isCurrentUserAdmin"))
    : "user",
  user: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : {
        username: "Login",
        name: "Name",
        surname: "Surname",
        password: "hash",
        id: null,
      },
  login: {
    user: null,
    tets: null,
  },
  council: {
    totalMembers: null,
    membersInfo: [
      {
        id: 1,
        fullName: "Иван Гордый",
        post: "Заместитель председателя",
        photo: null,
        additionalInfo: null,
      },
      {
        id: 2,
        fullName: "Алла Борисовна",
        post: "Заместитель председателя",
        photo: null,
        additionalInfo: "",
      },
      {
        id: 3,
        fullName: "Николай Прокофьев",
        post: "Сотрудник",
        photo: null,
        additionalInfo: "",
      },
      {
        id: 4,
        fullName: "Анастасия Бобрикова",
        post: "Сотрудник",
        photo: null,
        additionalInfo: "",
      },
      {
        id: 5,
        fullName: "Михаил Непомнящий",
        post: "Сотрудник",
        photo: null,
        additionalInfo: "",
      },
      {
        id: 6,
        fullName: "Юлия Крамник",
        post: "Сотрудник",
        photo: null,
        additionalInfo: "",
      },
    ],
  },

  // Add other values if needed
};

const rootReducer = combineReducers({
  registrationReducer,
  loginReducer,
  changeUserInfoReducer,
  teamReducer,
  adminReducer,
  authReducer,
});

const store = legacy_createStore(rootReducer);

export default store;
