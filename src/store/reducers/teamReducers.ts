import { initialState } from "../strore";

export const teamReducer = (
  state = initialState.council,
  action: {
    type: string;
    payload?: any;
  }
) => {
  switch (action.type) {
    case "GET-TEAM":
      return {
        state,
      };
    case "ADD-TEAM-MEMBER":
      return { state: action.payload };
    default:
      return state;
  }
};
