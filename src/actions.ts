import { Action } from "redux";

/* won't be availble until typescript 2.4
export enum ActionType {
  CONTACT_US = "CONTACT_US",
}
*/

export const CONTACT_US = "CONTACT_US";

export interface IContact {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface IContactAction extends Action, IContact {}

export const contactUs = (name: string, email: string, message: string): IContactAction => {
  const action: IContactAction = {
    type: CONTACT_US,
    name,
    email,
    message,
  };

  return action;
};
