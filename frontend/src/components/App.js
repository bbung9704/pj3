import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
  render() {
    return (
      <>
        <h1>Hello World!</h1>
        <h2>Bye World!</h2>
      </>
    );
  }
}

const container = document.getElementById("app");
render(<App />, container);
