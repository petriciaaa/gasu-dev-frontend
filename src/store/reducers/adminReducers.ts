import { initialState } from "../strore";

export const adminReducer = (
  state = initialState.isAdmin,
  action: { type: string; payload?: boolean }
) => {
  switch (action.type) {
    case "GET-ADMIN-VALUE":
      return { state };
    case "SET-ADMIN-VALUE":
      return { state: action.payload };
    default:
      return state;
  }
};
