require("babel-register");
require("babel-polyfill");
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    rinkeby: {
      provider: new HDWalletProvider(
        [privateKeys], // Array of account private keys
        `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}` // Url to an Ethereum Node
      ),
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 4,
    },
    live: {
      networkCheckTimeout: 15000,
      provider: new HDWalletProvider(
        [privateKeys], // Array of account private keys
        `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}` // Url to an Ethereum Node
      ),
      network_id: 1,
      confirmations: 2,
      gasPrice: 27000000000,
    },
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
  },
  compilers: {
    solc: {
      version: "0.6.12",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
