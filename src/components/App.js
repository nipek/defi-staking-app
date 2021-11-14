import React, { Component } from "react";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main";
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

  async loadTether(web3, networkId) {
    let { tether } = this.state;
    if (Object.keys(tether).length < 1) {
      // load tether contract
      const tetherData = Tether.networks[networkId];
      if (!tetherData) {
        return window.alert(
          "Error! Tether contract not deployed - no detected network!"
        );
      }

      tether = new web3.eth.Contract(Tether.abi, tetherData.address);

      this.setState(
        {
          tether,
          tetherBalance: String(
            await tether.methods.balanceOf(this.state.account).call()
          ),
        },
        () => {
          console.log(this.state.tetherBalance, "tetherBalance");
        }
      );
    } else {
      // just get data
      this.setState(
        {
          tetherBalance: String(
            await tether.methods.balanceOf(this.state.account).call()
          ),
        },
        () => {
          console.log(this.state.tetherBalance, "tetherBalance");
        }
      );
    }
  }

  async loadRWD(web3, networkId) {
    let { rwd } = this.state;
    if (Object.keys(rwd).length < 1) {
      // load tether contract
      const rwdData = RWD.networks[networkId];

      if (!rwdData) {
        return window.alert(
          "Error! RWD contract not deployed - no detected network!"
        );
      }

      rwd = new web3.eth.Contract(RWD.abi, rwdData.address);

      this.setState(
        {
          rwd,
          rwdBalance: String(
            await rwd.methods.balanceOf(this.state.account).call()
          ),
        },
        () => {
          console.log(this.state.rwdBalance, "rwdBalance");
        }
      );
    } else {
      // just load data

      this.setState(
        {
          rwdBalance: String(
            await rwd.methods.balanceOf(this.state.account).call()
          ),
        },
        () => {
          console.log(this.state.rwdBalance, "rwdBalance");
        }
      );
    }
  }

  async loadDecentralBank(web3, networkId) {
    let { decentralBank } = this.state;
    if (Object.keys(decentralBank).length < 1) {
      // load tether contract
      const decentalBankData = DecentralBank.networks[networkId];

      if (!decentalBankData) {
        return window.alert(
          "Error! DecentralBank contract not deployed - no detected network!"
        );
      }

      decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentalBankData.address
      );

      this.setState(
        {
          decentralBank,
          stakingBalance: String(
            await decentralBank.methods
              .stakingBalance(this.state.account)
              .call()
          ),
        },
        () => {
          console.log(this.state.stakingBalance, "stakingBalance");
        }
      );
    } else {
      // just load data

      this.setState(
        {
          stakingBalance: String(
            await decentralBank.methods
              .stakingBalance(this.state.account)
              .call()
          ),
        },
        () => {
          console.log(this.state.stakingBalance, "stakingBalance");
        }
      );
    }
  }

  // detect metamask

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      // await window.ethereum.enable(); // depreciated
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected! You can check out MetaMask!");
    }
  }

  async loadBlockchainData() {
    try {
      const web3 = window.web3;

      //
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] }, async () => {
        // setup network id thta we can then verify then hook it up to tether contract
        const networkId = await web3.eth.net.getId();

        await this.loadTether(web3, networkId);
        await this.loadRWD(web3, networkId);
        await this.loadDecentralBank(web3, networkId);

        this.setState({ loading: false });

        console.log(networkId, accounts);
      });
    } catch (error) {
      if (error.code === 4001) {
        // User rejected request
      }

      // setError(error);
    }
  }

  async componentDidMount() {
    // detect metamask
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  toggleLoading = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        loading: !prevState.loading,
      };
    });
  };

  // staking function
  stakeTokens = (amount) => {
    try {
      this.toggleLoading();
      // aprove
      this.state.tether.methods
        .approve(this.state.decentralBank._address, amount)
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          this.state.decentralBank.methods
            .depositTokens(amount)
            .send({ from: this.state.account })
            .on("transactionHash", (hash) => {
              this.toggleLoading();
              this.loadBlockchainData();
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  // unstaking function
  unstakeTokens = () => {
    try {
      this.toggleLoading();

      this.state.decentralBank.methods
        .unstakeTokens()
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          this.toggleLoading();
          this.loadBlockchainData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { stakingBalance, tetherBalance, rwdBalance } = this.state;
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px", minHeight: "100vm" }}
            >
              <div>
                {this.state.loading ? (
                  <p id="loader" className="text-center" style={{ margin: 30 }}>
                    Loading...
                  </p>
                ) : (
                  <Main
                    unstakeTokens={this.unstakeTokens}
                    stakeTokens={this.stakeTokens}
                    tetherBalance={tetherBalance}
                    rwdBalance={rwdBalance}
                    stakingBalance={stakingBalance}
                  />
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
