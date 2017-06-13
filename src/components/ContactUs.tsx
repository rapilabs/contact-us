import * as React from "react";

import * as autobind from "autobind-decorator";
import * as classNames from "classnames";
import { ChangeEvent, Component, FocusEvent, FormEvent, InvalidEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { contactUs, IContact, IContactAction } from "../actions";
import { IState as IContactUsState } from "../reducer";

import "./ContactUs.scss";

class FormField {
  public name: string;
  public value: string;
  public errorMsg: string;

  public constructor(name: string, value: string = "", errorMsg: string = "") {
    this.name = name;
    this.value = value;
    this.errorMsg = errorMsg;
  }
}

interface IProps {
  readonly contact?: IContact;
  readonly dispatch?: Dispatch<IContactAction>;
}

interface IState {
  readonly contactName: FormField;
  readonly email: FormField;
  readonly message: FormField;
}

class ContactUs extends Component<IProps, IState> {

  public state: IState = {
    contactName: new FormField("contactName"),
    email: new FormField("email"),
    message: new FormField("message"),
  };

  public render(): JSX.Element {
    const contents = this.props.contact !== undefined
      ? this.renderMessage()
      : this.renderForm();

    return (
      <div className="ContactUs">
        <h1 className="ContactUs__heading">Contact Us</h1>
        {contents}
      </div>
    );
  }

  @autobind
  private handleInvalid(e: InvalidEvent<HTMLInputElement>): void {
    (this.state as any)[e.currentTarget.name].errorMsg = e.currentTarget.validationMessage;
    this.forceUpdate();
  }

  @autobind
  private handleChange(e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>): void {
    (this.state as any)[e.currentTarget.name].value = e.currentTarget.value;
    this.forceUpdate();
  }

  @autobind
  private handleBlur(e: FocusEvent<HTMLInputElement & HTMLTextAreaElement>): void {
    if (e.currentTarget.checkValidity()) {
      (this.state as any)[e.currentTarget.name].errorMsg = "";
      this.forceUpdate();
    }
  }

  @autobind
  private handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (e.currentTarget.checkValidity()) {
      this.props.dispatch(contactUs(
        e.currentTarget.contactName.value,
        e.currentTarget.email.value,
        e.currentTarget.message.value,
      ));
    }
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
    const nameClassnames = classNames("form-group", {
      "has-danger": this.state.contactName.errorMsg !== "",
    });
    const emailClassnames = classNames("form-group", {
      "has-danger": this.state.email.errorMsg !== "",
    });

    return (
      <form onSubmit={this.handleSubmit} noValidate={true} className="ContactUs__form">
        <div className={nameClassnames}>
          <input
            type="input"
            name="contactName"
            required={true}
            placeholder="Your name"
            className="form-control"
            value={this.state.contactName.value}
            onChange={this.handleChange}
            onInvalid={this.handleInvalid}
            onBlur={this.handleBlur}
          />
          <div className="form-control-feedback">{this.state.contactName.errorMsg}</div>
         </div>
        <div className={emailClassnames}>
          <input
            type="email"
            name="email"
            required={true}
            placeholder="Your email address"
            className="form-control form-group"
            value={this.state.email.value}
            onChange={this.handleChange}
            onInvalid={this.handleInvalid}
            onBlur={this.handleBlur}
          />
          <div className="form-control-feedback">{this.state.email.errorMsg}</div>
        </div>
        <textarea
          name="message"
          placeholder="Your message"
          className="form-control form-group ContactUs__form-message"
          value={this.state.message.value}
          onChange={this.handleChange}
        />
        <button className="btn btn-primary">Send</button>
      </form>
    );
  }
}

export default connect((state: IContactUsState) => ({
  contact: state.contact,
}))(ContactUs);
