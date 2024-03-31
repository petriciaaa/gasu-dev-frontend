// types/initialState.ts

interface IUser {
  username: string;
  name: string;
  surname: string;
  password: string;
}

interface IRegistrationState {
  user: IUser;
  tets: {
    test1: number;
  };
}

interface ILoginState {
  user: IUser | null;
  tets: {
    test1: number;
  } | null;
}

export interface IInitialState {
  isAuth: boolean;
  isAdmin: boolean;
  user: IUser;
  //   registration: IRegistrationState;
  login: ILoginState;
  council: {};
}
