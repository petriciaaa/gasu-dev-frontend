import { IUser } from "src/types/user";
import { initialState } from "../strore";

export const registrationReducer = (
  state = initialState.user,
  action: {
    type: string;
    payload?: IUser;
  }
) => {
  switch (action.type) {
    case "REGISTRATION":
      return {
        user: {
          username: action.payload.username,
          name: action.payload.name,
          surname: action.payload.surname,
          password: action.payload.password,
        },
      };
    default:
      return state;
  }
};
export const loginReducer = (
  state = initialState.isAuth,
  action: { type: string; payload?: boolean }
) => {
  switch (action.type) {
    case "CHANGE-USER-AUTH-VALUE":
      return { state: action.payload };
    default:
      return state;
  }
};
export const changeUserInfoReducer = (
  state = initialState.user,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "CHANGE-USER-INFO":
      return {
        ...state,
        user: {
          username: action.payload.username,
          name: action.payload.name,
          surname: action.payload.surname,
          password: action.payload.password,
        },
      };
    default:
      return state;
  }
};
export const authReducer = (
  state = initialState.isAuth,
  action: { type: string; payload?: boolean }
) => {
  switch (action.type) {
    case "GET-AUTH-VALUE":
      return { state };
    case "SET-AUTH-VALUE":
      return action.payload;
    default:
      return state;
  }
};

