import dotenv from "dotenv";

dotenv.config();

const config = {
  SafeMutual: {
    56: "0xc6c6A482A32D257af442f9e1772e981624A26C99", // Mainnet
    97: "0xc6c6A482A32D257af442f9e1772e981624A26C99", // Testnet
  },
  BlockExplorerURL: {
    56: "https://bscscan.com",
    97: "https://testnet.bscscan.com",
  },
  RpcURL: {
    56: "https://speedy-nodes-nyc.moralis.io/03eb35954a0b7ed092444a8e/bsc/mainnet",
    97: "https://speedy-nodes-nyc.moralis.io/03eb35954a0b7ed092444a8e/bsc/testnet",
  },
  chainHexID: {
    56: "0x38",
    97: "0x61",
  },
  INFURA_ID: "9f08884ad87343d89b817b96e19e5808",
  chainID: 56,
};

export default config;
