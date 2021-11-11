import React, { Component } from "react";
import Navbar from "./Navbar";

export default class App extends Component {
  state = {
    account: "0x0",
  };

  render() {
    return <Navbar account={this.state.account} />;
  }
}
