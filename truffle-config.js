module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // match any network
    },
  },
  contracts_directory: "./src/contracts",
  contracts_build_directory: "./src/truffle_abis",
  compilers: {
    solc: {
      version: "^0.5.0", // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
        //evmVersion: "byzantium"
      },
    },
  },
};
