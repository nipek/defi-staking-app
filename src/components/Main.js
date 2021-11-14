import React, { Component } from "react";
import tether from "../tether.png";

export default class Main extends Component {
  state = { amount: 0 };

  render() {
    const { amount } = this.state;
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "#000" }}>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "#000" }}>
              <td>
                {window.web3.utils.fromWei(this.props.stakingBalance, "ether")}{" "}
                USDT
              </td>
              <td>
                {window.web3.utils.fromWei(this.props.rwdBalance, "ether")} RWD
              </td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-2" style={{ opacity: 0.9 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.props.stakeTokens(
                window.web3.utils.toWei(String(amount), "ether")
              );
            }}
            className="mb-3"
          >
            <div style={{ borderSpacing: "0 1em" }}>
              <label className="float-left" style={{ marginLeft: 15 }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-right" style={{ marginRight: 8 }}>
                Balance:{" "}
                {window.web3.utils.fromWei(this.props.tetherBalance, "ether")}
              </span>
              <div className="input-group mb-4">
                <input
                  type="number"
                  placeholder="0"
                  value={this.state.amount}
                  onChange={({ target: { value } }) => {
                    this.setState({ amount: value });
                    console.log(value);
                  }}
                  required
                />
                <div className="input-group-open">
                  <div className="input-group-text">
                    <img src={tether} alt="tether" height={32} /> USDT
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary"
              >
                DEPOSIT
              </button>
            </div>
          </form>
          <button
            type="button"
            onClick={this.props.unstakeTokens}
            className="btn btn-lg btn-block btn-primary"
          >
            WITHDRAW
          </button>
          <div className="card-body text-center" style={{ color: "blue" }}>
            AIRDROP
          </div>
        </div>
      </div>
    );
  }
}
