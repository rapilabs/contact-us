import { Action } from "redux";
import { CONTACT_US, IContact, IContactAction } from "./actions";

export interface IState {
  readonly contact?: IContact;
}

const initialState: IState = {
  contact: undefined,
};

export default (state: IState = initialState, action: Action): IState => {
  switch (action.type) {
    case CONTACT_US:
      return {
        ...state,
        contact: {
          name: (action as IContactAction).name,
          email: (action as IContactAction).email,
          message: (action as IContactAction).message,
        },
      };

    default:
      return state;
  }
};
