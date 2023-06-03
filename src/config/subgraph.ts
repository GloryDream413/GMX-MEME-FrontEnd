import { ARBITRUM, FANTOM_TESTNET, MAINNET } from "./chains";

export const SUBGRAPH_URLS = {
  [ARBITRUM]: {
    stats: "https://api.thegraph.com/subgraphs/name/gmx-io/gmx-stats",
    referrals: "https://api.thegraph.com/subgraphs/name/gmx-io/gmx-arbitrum-referrals",
    nissohVault: "https://api.thegraph.com/subgraphs/name/nissoh/gmx-vault",
  },

  [FANTOM_TESTNET]: {
    stats: "https://api.thegraph.com/subgraphs/name/glorydream413/zomitest-stats",
    referrals: "https://api.thegraph.com/subgraphs/name/glorydream413/zomitest-referrals",
    trades:"https://api.thegraph.com/subgraphs/name/glorydream413/zomitest-trades",
  },

  [MAINNET]: {
    stats: "https://api.thegraph.com/subgraphs/name/strongnezha/zomi-stats",
    referrals: "https://api.thegraph.com/subgraphs/name/strongnezha/zomi-referrals",
    trades:"https://api.thegraph.com/subgraphs/name/strongnezha/zomi-trades",
  },

  common: {
    chainLink: "https://api.thegraph.com/subgraphs/name/deividask/chainlink",
  },
};
