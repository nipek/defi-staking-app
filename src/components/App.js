import React, { Component } from "react";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
export default class App extends Component {
  state = {
    account: "0x0",
    tether: {},
    rwd: {},
    decentralBank: {},
    tetherBalance: "0",
    rwdBalance: "0",
    stakingBalance: "0",
    loading: true,
  };

  // detect metamask

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected! You can check out MetaMask!");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // setup network id thta we can then verify then hook it up to tether contract
    const networkId = await web3.eth.net.getId();

    // load tether contract
    const tetherData = Tether.networks[networkId];
    if (!tetherData) {
      return window.alert(
        "Error! Tether contract not deployed - no detected network!"
      );
    }

    const tether = new web3.eth.Contract(Tether.abi, tetherData.address);

    this.setState(
      {
        tether,
        tetherBalance: String(
          await tether.methods.balanceOf(this.state.account).call()
        ),
      },
      () => {
        console.log(this.state.tetherBalance);
      }
    );

    console.log(networkId, accounts);
  }

  async componentDidMount() {
    // detect metamask
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  render() {
    return <Navbar account={this.state.account} />;
  }
}
