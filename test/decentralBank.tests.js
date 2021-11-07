const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", ([owner, customer]) => {
  // all code here for testing

  let tether, rwd, decentralBank;

  const tokens = (number) => web3.utils.toWei(number, "ether");

  before(async () => {
    // we want tether to deploy the contract
    tether = await Tether.new(); // will get instance of everything from Tether
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // check if all reward toekn is tranferred to decentral bank
    // transfer all tokens to decental bank
    await rwd.transfer(decentralBank.address, tokens("1000000"));

    // transfer 100 mocker tether to customer
    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });
  describe("Reward Token Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });

    it("contract has token", async () => {
      const balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });
  });
});
