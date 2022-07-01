import dotenv from "dotenv";

dotenv.config();

const config = {
  AnchorEarnBSC: {
    56: "0x0EA7C4c6A230e091e930b0E6fD9D5c18a6699Cbc",
    97: "0x80de92df50F270e49bb4E269502D00cAB753A55a",
  },
  BlockExplorerURL: {
    56: "https://bscscan.com",
    97: "https://testnet.bscscan.com",
  },
  RpcURL: {
    56: "https://bsc-dataseed1.defibit.io/",
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
