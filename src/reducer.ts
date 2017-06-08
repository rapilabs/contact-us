import { ActionType } from "./actions";

const initialState: object = {};

export default (state: object = initialState, action: ActionType): object => {
  switch (action) {
    case ActionType.CONTACT_US:
      return state;

    default:
      return state;
  }
};
