// we hav contract directory already in truffle config
// require migrations in contracts folder
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
