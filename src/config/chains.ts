import { ethers } from "ethers";
import { isDevelopment } from "lib/legacy";

const { parseEther } = ethers.utils;

export const MAINNET = 5;
export const ARBITRUM = 42161;

export const DEFAULT_CHAIN_ID = MAINNET;
export const CHAIN_ID = DEFAULT_CHAIN_ID;

export const SUPPORTED_CHAIN_IDS = [MAINNET];

if (isDevelopment()) {
  SUPPORTED_CHAIN_IDS.push(MAINNET);
}

export const IS_NETWORK_DISABLED = {
  [ARBITRUM]: true,
  [MAINNET]: false,
};

export const CHAIN_NAMES_MAP = {
  [MAINNET]: "Ethereum",
  [ARBITRUM]: "Arbitrum",
};

export const GAS_PRICE_ADJUSTMENT_MAP = {
  [ARBITRUM]: 4,
  [MAINNET]: 4,
};

export const MAX_GAS_PRICE_MAP = {
  [MAINNET]: 0,
  [ARBITRUM]: 0, // 200 gwei
};

export const HIGH_EXECUTION_FEES_MAP = {
  [ARBITRUM]: 3, // 3 USD
  [MAINNET]: 3,
};

const constants = {
  [MAINNET]: {
    nativeTokenSymbol: "GoerliETH",
    wrappedTokenSymbol: "WETH",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: true,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.01"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0100001"),
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
};

const ALCHEMY_WHITELISTED_DOMAINS = ["gmx.io", "app.gmx.io"];

export const ARBITRUM_RPC_PROVIDERS = [getDefaultArbitrumRpcUrl()];
export const ETHEREUM_RPC_PROVIDERS = ["https://ethereum-goerli.publicnode.com"];

export const RPC_PROVIDERS = {
  [MAINNET]: ETHEREUM_RPC_PROVIDERS,
  [ARBITRUM]: ARBITRUM_RPC_PROVIDERS,
};

export const FALLBACK_PROVIDERS = {
  [ARBITRUM]: [getAlchemyHttpUrl()],
  [MAINNET]: ["https://ethereum-goerli.publicnode.com"],
};

export const NETWORK_METADATA = {
  [MAINNET]: {
    chainId: "0x" + MAINNET.toString(16),
    chainName: "Goerli Testnet",
    nativeCurrency: {
      name: "GoerliETH",
      symbol: "GoerliETH",
      decimals: 18,
    },
    rpcUrls: ["https://ethereum-goerli.publicnode.com"],
    blockExplorerUrls: ["https://goerli.etherscan.io/"],
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
  console.log(chainId, ">>>>>>>>>>>>>>>>");
  if (chainId === 3) {
    return "https://ropsten.etherscan.io/";
  } else if (chainId === 42) {
    return "https://kovan.etherscan.io/";
  } else if (chainId === MAINNET) {
    return "https://goerli.etherscan.io/";
  } else if (chainId === ARBITRUM) {
    return "https://goerli.etherscan.io/";
    // return "https://arbiscan.io/";
  }
  return "https://etherscan.io/";
}

export function getHighExecutionFee(chainId) {
  return HIGH_EXECUTION_FEES_MAP[chainId] || 3;
}

export function isSupportedChain(chainId) {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}
