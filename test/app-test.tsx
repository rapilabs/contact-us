import * as React from "react";
import { expect } from "chai";
import * as Mocha from "mocha";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import ContactUs from "../src/components/ContactUs";
import store from "../src/store";

describe("Contact us form", function() {
  it("should display correctly", function() {
    const wrapper = mount(<Provider store={store}><ContactUs/></Provider>);

    // make sure a correct form is rendered with no initial values
    expect((wrapper.find('form input[name="contactName"]').get(0) as any).value).to.be.empty;
    expect((wrapper.find('form input[name="email"]').get(0) as any).value).to.be.empty;
    expect((wrapper.find('form textarea[name="message"]').get(0) as any).value).to.be.empty;
  });

/*
 * jsdom does not yet support HTML5 form validation :(
 * https://github.com/tmpvar/jsdom/issues/544
 * 
  it("should show the form submission page given the form is submitted with valid data", function() {
    const wrapper = mount(<Provider store={store}><ContactUs/></Provider>);

    (wrapper.find('form input[name="contactName"]').get(0) as any).value = 'Bugs Bunny';
    (wrapper.find('form input[name="email"]').get(0) as any).value = 'bugs@bunny.com';
    (wrapper.find('form textarea[name="message"]').get(0) as any).value = 'What\'s up doc?';
    wrapper.find('form').simulate('submit');

    wrapper.update();
    expect((wrapper.find('h2') as any).text()).to.equal('Your details have been received!');
  });
 */
});
