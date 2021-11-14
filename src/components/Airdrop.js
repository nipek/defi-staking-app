import React, { Component } from "react";
import { isConstructorDeclaration } from "typescript";

export default class Airdrop extends Component {
  state = {
    time: {},
    seconds: 5,
  };

  timer = 0;

  airdropReleaseToken() {
    let staking = this.props.stakingBalance;

    if (staking * 1 >= window.web3.utils.toWei("50", "ether") * 1) {
      this.startTimer();
    }
  }
  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    this.setState((prevState) => {
      let seconds = prevState.seconds - 1;

      if (seconds < 1) {
        clearInterval(this.timer);
      }
      return {
        ...prevState,
        time: this.secondsToTime(seconds),
        seconds,
      };
    });
  };

  secondsToTime(secs) {
    let h, m, s;

    h = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    m = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = secs % 60;
    s = Math.ceil(divisor_for_seconds);

    return { h, m, s };
  }

  componentDidMount() {
    const timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft }, () => {
      this.airdropReleaseToken();
    });
  }
  render() {
    const {
      time: { h, m, s },
    } = this.state;
    return <div style={{ color: "#000" }}>{`${m}:${s}`}</div>;
  }
}
