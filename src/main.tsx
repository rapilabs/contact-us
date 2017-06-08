import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";

import App from "./components/App";

import store from "./store";

const render = (Component: any): void => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("root"),
  );
};

render(App);

if (module.hasOwnProperty("hot")) {
  module.hot.accept("./components/App", (): void => {
    render(require<IRequireImport>("./components/App").default);  // tslint:disable-line:no-require-imports
  });
}
