const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function issueRewards(cb) {
  const decentralBank = await DecentralBank.deployed();

  await decentralBank.issueTokens();

  console.log("Tokens have been issued successfully");

  cb(false, "done");
};
