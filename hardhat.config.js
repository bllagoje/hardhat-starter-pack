require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");


/** @type import('hardhat/config').HardhatUserConfig */

const goerli_rpc_url = process.env.GOERLI_RPC_URL || "https://eth-goerli.g.alchemy.com/v2/....";
const private_key = process.env.PRIVATE_KEY || "0xkey";
const ethetscan_api_key = process.env.ETHERSCAN_API_KEY || "key";
const coinmarketcap_api_key = process.env.COINMARKETCAP_API_KEY || "key";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: goerli_rpc_url,
      accounts: [private_key],
      chainId: 5
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ethetscan_api_key
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: coinmarketcap_api_key
  }
};
