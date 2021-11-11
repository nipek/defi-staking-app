import React, { Component } from "react";
import bank from "../bank.png";
export default class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-dark fixed-top shadow p-0"
        style={{ backgroundColor: "#000", height: "50px" }}
      >
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          style={{ color: "#fff" }}
        >
          <img
            width="50"
            height="30"
            alt="dapp"
            className="d-inline-block align- top"
            src={bank}
          />{" "}
          DAPP Yield Staking (Decentralized Banking)
        </a>

        <ul className="navbar-nav px-3">
          <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
            <small style={{ color: "#fff" }}>
              ACCOUNT NUMBER: {this.props.account}
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}
