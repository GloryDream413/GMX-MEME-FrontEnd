import { ethers } from "ethers";
import { isDevelopment } from "lib/legacy";

const { parseEther } = ethers.utils;

export const MAINNET = 1;
export const TESTNET = 97;
export const FANTOM_TESTNET = 4002;
export const ARBITRUM_TESTNET = 421611;
export const ARBITRUM = 42161;

// TODO take it from web3
export const DEFAULT_CHAIN_ID = MAINNET;
export const CHAIN_ID = DEFAULT_CHAIN_ID;

// export const SUPPORTED_CHAIN_IDS = [ARBITRUM, AVALANCHE];
export const SUPPORTED_CHAIN_IDS = [FANTOM_TESTNET];

if (isDevelopment()) {
  SUPPORTED_CHAIN_IDS.push(ARBITRUM_TESTNET);
}

export const IS_NETWORK_DISABLED = {
  [ARBITRUM]: true,
  [MAINNET]: false,
  [TESTNET]: true,
  [FANTOM_TESTNET]: true,
};

export const CHAIN_NAMES_MAP = {
  [MAINNET]: "Ethereum",
  [TESTNET]: "BSC Testnet",
  [ARBITRUM_TESTNET]: "ArbRinkeby",
  [ARBITRUM]: "Arbitrum",
  [FANTOM_TESTNET]: "Fantom Testnet",
};

export const GAS_PRICE_ADJUSTMENT_MAP = {
  [ARBITRUM]: "0",
  [FANTOM_TESTNET]: "0", // 3 gwei
  [MAINNET]: "0",
};

export const MAX_GAS_PRICE_MAP = {
  [FANTOM_TESTNET]: "0", // 200 gwei
  [MAINNET]: "0"
};

export const HIGH_EXECUTION_FEES_MAP = {
  [ARBITRUM]: 3, // 3 USD
  [FANTOM_TESTNET]: 3, // 3 USD
  [MAINNET]: 3
};

const constants = {
  [MAINNET]: {
    nativeTokenSymbol: "ETH",
    wrappedTokenSymbol: "WETH",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 8,
    v2: true,
    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
  },

  [TESTNET]: {
    nativeTokenSymbol: "BNB",
    defaultCollateralSymbol: "BUSD",
    defaultFlagOrdersEnabled: true,
    positionReaderPropsLength: 8,
    v2: false,
  },

  [ARBITRUM_TESTNET]: {
    nativeTokenSymbol: "ETH",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
  },

  [ARBITRUM]: {
    nativeTokenSymbol: "ETH",
    wrappedTokenSymbol: "WETH",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
  },

  [FANTOM_TESTNET]: {
    nativeTokenSymbol: "FTM",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: true,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
  },
};

const ALCHEMY_WHITELISTED_DOMAINS = ["gmx.io", "app.gmx.io"];

export const ARBITRUM_RPC_PROVIDERS = [getDefaultArbitrumRpcUrl()];
export const FANTOM_TESTNET_RPC_PROVIDERS = ["https://rpc.testnet.fantom.network"];
export const ETHEREUM_RPC_PROVIDERS = ["https://eth.llamarpc.com"];

export const BSC_RPC_PROVIDERS = [
  "https://bsc-dataseed.binance.org",
  "https://bsc-dataseed1.defibit.io",
  "https://bsc-dataseed1.ninicoin.io",
  "https://bsc-dataseed2.defibit.io",
  "https://bsc-dataseed3.defibit.io",
  "https://bsc-dataseed4.defibit.io",
  "https://bsc-dataseed2.ninicoin.io",
  "https://bsc-dataseed3.ninicoin.io",
  "https://bsc-dataseed4.ninicoin.io",
  "https://bsc-dataseed1.binance.org",
  "https://bsc-dataseed2.binance.org",
  "https://bsc-dataseed3.binance.org",
  "https://bsc-dataseed4.binance.org",
];

export const RPC_PROVIDERS = {
  [MAINNET]: ETHEREUM_RPC_PROVIDERS,
  [ARBITRUM]: ARBITRUM_RPC_PROVIDERS,
  [FANTOM_TESTNET]: FANTOM_TESTNET_RPC_PROVIDERS,
};

export const FALLBACK_PROVIDERS = {
  [ARBITRUM]: [getAlchemyHttpUrl()],
  [FANTOM_TESTNET]: ["https://rpc.testnet.fantom.network"],
  [MAINNET]: ["https://eth.llamarpc.com"]
};

export const NETWORK_METADATA = {
  [MAINNET]: {
    chainId: "0x" + MAINNET.toString(16),
    chainName: "Ethereum",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ETHEREUM_RPC_PROVIDERS,
    blockExplorerUrls: ["https://etherscan.com"],
  },
  [TESTNET]: {
    chainId: "0x" + TESTNET.toString(16),
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
  [ARBITRUM_TESTNET]: {
    chainId: "0x" + ARBITRUM_TESTNET.toString(16),
    chainName: "Arbitrum Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://rinkeby-explorer.arbitrum.io/"],
  },
  [ARBITRUM]: {
    chainId: "0x" + ARBITRUM.toString(16),
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ARBITRUM_RPC_PROVIDERS,
    blockExplorerUrls: [getExplorerUrl(ARBITRUM)],
  },
  [FANTOM_TESTNET]: {
    chainId: "0x" + FANTOM_TESTNET.toString(16),
    chainName: "Fantom Testnet",
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.testnet.fantom.network"],
    blockExplorerUrls: [getExplorerUrl(FANTOM_TESTNET)],
  },
};

export const getConstant = (chainId: number, key: string) => {
  if (!constants[chainId]) {
    throw new Error(`Unsupported chainId ${chainId}`);
  }

  if (!(key in constants[chainId])) {
    throw new Error(`Key ${key} does not exist for chainId ${chainId}`);
  }

  return constants[chainId][key];
};

export function getChainName(chainId: number) {
  return CHAIN_NAMES_MAP[chainId];
}

export function getDefaultArbitrumRpcUrl() {
  return "https://arb1.arbitrum.io/rpc";
}

export function getAlchemyHttpUrl() {
  if (ALCHEMY_WHITELISTED_DOMAINS.includes(window.location.host)) {
    return "https://arb-mainnet.g.alchemy.com/v2/ha7CFsr1bx5ZItuR6VZBbhKozcKDY4LZ";
  }
  return "https://arb-mainnet.g.alchemy.com/v2/EmVYwUw0N2tXOuG0SZfe5Z04rzBsCbr2";
}

export function getAlchemyWsUrl() {
  if (ALCHEMY_WHITELISTED_DOMAINS.includes(window.location.host)) {
    return "wss://arb-mainnet.g.alchemy.com/v2/ha7CFsr1bx5ZItuR6VZBbhKozcKDY4LZ";
  }
  return "wss://arb-mainnet.g.alchemy.com/v2/EmVYwUw0N2tXOuG0SZfe5Z04rzBsCbr2";
}

export function getExplorerUrl(chainId) {
  if (chainId === 3) {
    return "https://ropsten.etherscan.io/";
  } else if (chainId === 42) {
    return "https://kovan.etherscan.io/";
  } else if (chainId === MAINNET) {
    return "https://etherscan.com/";
  } else if (chainId === TESTNET) {
    return "https://testnet.bscscan.com/";
  } else if (chainId === ARBITRUM_TESTNET) {
    return "https://testnet.arbiscan.io/";
  } else if (chainId === ARBITRUM) {
    return "https://arbiscan.io/";
  } else if (chainId === FANTOM_TESTNET) {
    return "https://testnet.ftmscan.com/";
  }
  return "https://etherscan.io/";
}

export function getHighExecutionFee(chainId) {
  return HIGH_EXECUTION_FEES_MAP[chainId] || 3;
}

export function isSupportedChain(chainId) {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}
