import * as React from "react";

import * as autobind from "autobind-decorator";
import { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { contactUs, IContact, IContactAction } from "../actions";
import { IState } from "../reducer";

interface IProps {
  contact?: IContact;
  dispatch?: Dispatch<IContactAction>;
}

class ContactUs extends Component<IProps, undefined> {

  public render(): JSX.Element {
    const contents = this.props.contact !== undefined
      ? this.renderMessage()
      : this.renderForm();

    return (
      <div>
        <h1>Contact Us</h1>
        {contents}
      </div>
    );
  }

  @autobind
  private handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.props.dispatch(contactUs(
      e.currentTarget.theName.value,
      e.currentTarget.email.value,
      e.currentTarget.message.value,
    ));
  }

  private renderMessage(): JSX.Element {
    return (
      <div>
        <h2>Your details have been received!</h2>
        <div>Name: {this.props.contact.name}</div>
        <div>Email: {this.props.contact.email}</div>
        <div>Message: {this.props.contact.message}</div>
      </div>
    );
  }

  private renderForm(): JSX.Element {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="theName" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email address" />
        <textarea name="message" placeholder="Your message" />
        <button>Send</button>
      </form>
    );
  }
}

export default connect((state: IState) => ({
  contact: state.contact,
}))(ContactUs);
