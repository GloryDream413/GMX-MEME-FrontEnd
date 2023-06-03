import { ethers } from "ethers";
import { getContract } from "./contracts";
import { ARBITRUM, ARBITRUM_TESTNET, AVALANCHE, MAINNET, TESTNET } from "./chains";
import { Token } from "domain/tokens";

export const TOKENS: { [chainId: number]: Token[] } = {
  [MAINNET]: [
    {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address:  ethers.constants.AddressZero,
      coingeckoUrl: "https://www.coingecko.com/en/coins/ethereum",
      imageUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      isNative: true,
      isShortable: true,
    },
    {
      name: "Wrapped Ether",
      symbol: "WETH",
      decimals: 18,
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      isWrapped: true,
      baseSymbol: "ETH",
      imageUrl: "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
    },
    {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      decimals: 18,
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      coingeckoUrl: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      imageUrl: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744",
    },
    {
      name: "ApeCoin",
      symbol: "APE",
      decimals: 18,
      address: "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
      coingeckoUrl: "https://www.coingecko.com/en/coins/apecoin",
      imageUrl: "https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1647476455",
    },
    // {
    //   name: "USD Gambit",
    //   symbol: "USDG",
    //   decimals: 18,
    //   address: getContract(MAINNET, "USDG"),
    //   isUsdg: true,
    //   coingeckoUrl: "https://www.coingecko.com/en/coins/usd-gambit",
    //   imageUrl: "https://assets.coingecko.com/coins/images/15886/small/usdg-02.png",
    // },
    {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      isStable: true,
      coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
      imageUrl: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    },
    // {
    //   name: "Tether",
    //   symbol: "USDT",
    //   decimals: 6,
    //   address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    //   isStable: true,
    //   coingeckoUrl: "https://www.coingecko.com/en/coins/tether",
    //   imageUrl: "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png",
    // },
  ],
  [TESTNET]: [
    {
      name: "Bitcoin (BTCB)",
      symbol: "BTC",
      decimals: 8,
      address: "0xb19C12715134bee7c4b1Ca593ee9E430dABe7b56",
      imageUrl: "https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: "0x1958f7C067226c7C8Ac310Dc994D0cebAbfb2B02",
      imageUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
    },
    {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
      address: ethers.constants.AddressZero,
      isNative: true,
      imageUrl: "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    },
    {
      name: "Wrapped Binance Coin",
      symbol: "WBNB",
      decimals: 18,
      address: "0x612777Eea37a44F7a95E3B101C39e1E2695fa6C2",
      isWrapped: true,
      baseSymbol: "BNB",
      imageUrl: "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    },
    {
      name: "USD Gambit",
      symbol: "USDG",
      decimals: 18,
      address: getContract(TESTNET, "USDG"),
      isUsdg: true,
      imageUrl: "https://assets.coingecko.com/coins/images/15886/small/usdg-02.png",
    },
    {
      name: "Binance USD",
      symbol: "BUSD",
      decimals: 18,
      address: "0x3F223C4E5ac67099CB695834b20cCd5E5D5AA9Ef",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
    },
  ],
  [ARBITRUM_TESTNET]: [
    {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
      address: "0x27960f9A322BE96A1535E6c19B3958e80E6a2670",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: ethers.constants.AddressZero,
      isNative: true,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
    },
    // https://github.com/OffchainLabs/arbitrum/blob/950c2f91b2e951cd3764394e0a73eac3797aecf3/packages/arb-ts/src/lib/networks.ts#L65
    {
      name: "Wrapped Ethereum",
      symbol: "WETH",
      decimals: 18,
      address: "0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681",
      isWrapped: true,
      baseSymbol: "ETH",
      imageUrl: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xf0DCd4737A20ED33481A49De94C599944a3Ca737",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    },
    {
      name: "Tether",
      symbol: "USDT",
      decimals: 6,
      address: "0x818ED84bA1927945b631016e0d402Db50cE8865f",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png",
    },
  ],
  [ARBITRUM]: [
    {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: ethers.constants.AddressZero,
      isNative: true,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
    },
    {
      name: "Wrapped Ethereum",
      symbol: "WETH",
      decimals: 18,
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      isWrapped: true,
      baseSymbol: "ETH",
      imageUrl: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
    },
    {
      name: "Bitcoin (WBTC)",
      symbol: "BTC",
      decimals: 8,
      address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
    },
    {
      name: "Chainlink",
      symbol: "LINK",
      decimals: 18,
      address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
      isStable: false,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1547034700",
    },
    {
      name: "Uniswap",
      symbol: "UNI",
      decimals: 18,
      address: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
      isStable: false,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    },
    {
      name: "Tether",
      symbol: "USDT",
      decimals: 6,
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707",
    },
    {
      name: "Dai",
      symbol: "DAI",
      decimals: 18,
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/9956/thumb/4943.png?1636636734",
    },
    {
      name: "Frax",
      symbol: "FRAX",
      decimals: 18,
      address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/13422/small/frax_logo.png?1608476506",
    },
    {
      name: "Magic Internet Money",
      symbol: "MIM",
      decimals: 18,
      address: "0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A",
      isStable: true,
      isTempHidden: true,
      imageUrl: "https://assets.coingecko.com/coins/images/16786/small/mimlogopng.png",
    },
  ],
  [AVALANCHE]: [
    {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
      address: ethers.constants.AddressZero,
      isNative: true,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818",
    },
    {
      name: "Wrapped AVAX",
      symbol: "WAVAX",
      decimals: 18,
      address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      isWrapped: true,
      baseSymbol: "AVAX",
      imageUrl: "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818",
    },
    {
      name: "Ethereum (WETH.e)",
      symbol: "ETH",
      address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
      decimals: 18,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
    },
    {
      name: "Bitcoin (BTC.b)",
      symbol: "BTC",
      address: "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
      decimals: 8,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/26115/thumb/btcb.png?1655921693",
    },
    {
      name: "Bitcoin (WBTC.e)",
      symbol: "WBTC",
      address: "0x50b7545627a5162F82A992c33b87aDc75187B218",
      decimals: 8,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      decimals: 6,
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    },
    {
      name: "USD Coin (USDC.e)",
      symbol: "USDC.e",
      address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
      decimals: 6,
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    },
    {
      name: "Magic Internet Money",
      symbol: "MIM",
      address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
      decimals: 18,
      isStable: true,
      isTempHidden: true,
      imageUrl: "https://assets.coingecko.com/coins/images/16786/small/mimlogopng.png",
    },
    {
      name: "Chainlink Token (LINK.e)",
      // symbol: "LINK.e",
      symbol: "LINK",
      address: "0x5947BB275c521040051D82396192181b413227A3",
      decimals: 18,
      isStable: false,
      isShortable: true,
      // isTempHidden: true,
      imageUrl: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700",
    },
    {
      name: "Aave Token (AAVE.e)",
      // symbol: "AAVE.e",
      symbol: "AAVE",
      address: "0x63a72806098Bd3D9520cC43356dD78afe5D386D9",
      decimals: 18,
      isStable: false,
      isShortable: true,
      // isTempHidden: true,
      imageUrl: "https://assets.coingecko.com/coins/images/12645/small/AAVE.png?1601374110",
    },
  ],
};

export const ADDITIONAL_TOKENS: { [chainId: number]: Token[] } = {
  [ARBITRUM]: [
    {
      name: "GMX",
      symbol: "GMX",
      address: getContract(ARBITRUM, "GMX"),
      decimals: 18,
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    {
      name: "Escrowed $ZOMI",
      symbol: "esGMX",
      address: getContract(ARBITRUM, "ES_GMX"),
      decimals: 18,
    },
    {
      name: "GMX LP",
      symbol: "GLP",
      address: getContract(ARBITRUM, "GLP"),
      decimals: 18,
      imageUrl: "https://github.com/zomi/gmx-assets/blob/main/GMX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  ],
  [AVALANCHE]: [
    {
      name: "$ZOMI",
      symbol: "$ZOMI",
      address: getContract(AVALANCHE, "GMX"),
      decimals: 18,
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    {
      name: "Escrowed ZOMI",
      symbol: "esZOMI",
      address: getContract(AVALANCHE, "ES_GMX"),
      decimals: 18,
    },
    {
      name: "ZOMI LP",
      symbol: "$ZLP",
      address: getContract(ARBITRUM, "GLP"),
      decimals: 18,
      imageUrl: "https://github.com/zomi/gmx-assets/blob/main/GMX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  ],
  [MAINNET]: [
    {
      name: "$ZOMI",
      symbol: "$ZOMI",
      address: getContract(MAINNET, "GMX"),
      decimals: 18,
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    {
      name: "Escrowed ZOMI",
      symbol: "esZOMI",
      address: getContract(MAINNET, "ES_GMX"),
      decimals: 18,
    },
    {
      name: "ZOMI LP",
      symbol: "$ZLP",
      address: getContract(MAINNET, "GLP"),
      decimals: 18,
      imageUrl: "https://github.com/zomi/gmx-assets/blob/main/GMX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  ],
};

export const PLATFORM_TOKENS: { [chainId: number]: { [symbol: string]: Token } } = {
  [ARBITRUM]: {
    // arbitrum
    GMX: {
      name: "GMX",
      symbol: "GMX",
      decimals: 18,
      address: getContract(ARBITRUM, "GMX"),
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    GLP: {
      name: "GMX LP",
      symbol: "GLP",
      decimals: 18,
      address: getContract(ARBITRUM, "StakedGlpTracker"), // address of fsGLP token because user only holds fsGLP
      imageUrl: "https://github.com/zomi/gmx-assets/blob/main/GMX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  },
  [AVALANCHE]: {
    // avalanche
    GMX: {
      name: "ZOMI",
      symbol: "$ZOMI",
      decimals: 18,
      address: getContract(AVALANCHE, "GMX"),
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    GLP: {
      name: "ZOMI LP",
      symbol: "$ZLP",
      decimals: 18,
      address: getContract(AVALANCHE, "StakedGlpTracker"), // address of fsGLP token because user only holds fsGLP
      imageUrl: "https://github.com/zomi/gmx-assets/blob/main/GMX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  },
  [MAINNET]: {
    // avalanche
    GMX: {
      name: "ZOMI",
      symbol: "$ZOMI",
      decimals: 18,
      address: getContract(MAINNET, "GMX"),
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    GLP: {
      name: "ZOMI LP",
      symbol: "$ZLP",
      decimals: 18,
      address: getContract(MAINNET, "StakedGlpTracker"), // address of fsGLP token because user only holds fsGLP
      imageUrl: "https://github.com/zomi/gmx-assets/blob/main/GMX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  },
};

export const ICONLINKS = {
  [ARBITRUM_TESTNET]: {
    GMX: {
      coingecko: "https://www.coingecko.com/en/coins/gmx",
      arbitrum: "https://arbiscan.io/address/0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
    },
    GLP: {
      arbitrum: "https://testnet.arbiscan.io/token/0xb4f81Fa74e06b5f762A104e47276BA9b2929cb27",
    },
  },
  [MAINNET]: {
    GMX: {
      coingecko: "https://www.coingecko.com/en/coins/gmx",
      avalanche: "https://etherscan.io/address/0xDc2C540Fd99eb5dC424095C8C6A63f7c805D46e9",
    },
    GLP: {
      avalanche: "https://etherscan.io/address/0x0E2b5428CE48c87a33Ad55A14d3b79BC7300C241",
    },
    ETH: {
      coingecko: "https://www.coingecko.com/en/coins/weth",
      avalanche: "https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    BTC: {
      coingecko: "https://www.coingecko.com/en/coins/bitcoin-avalanche-bridged-btc-b",
      avalanche: "https://etherscan.io/address/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    },
    USDC: {
      coingecko: "https://www.coingecko.com/en/coins/usd-coin",
      avalanche: "https://etherscan.io/address/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
  },
  [ARBITRUM]: {
    GMX: {
      coingecko: "https://www.coingecko.com/en/coins/gmx",
      arbitrum: "https://arbiscan.io/address/0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
    },
    GLP: {
      arbitrum: "https://arbiscan.io/token/0x1aDDD80E6039594eE970E5872D247bf0414C8903",
    },
    ETH: {
      coingecko: "https://www.coingecko.com/en/coins/ethereum",
    },
    BTC: {
      coingecko: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      arbitrum: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
    },
    LINK: {
      coingecko: "https://www.coingecko.com/en/coins/chainlink",
      arbitrum: "https://arbiscan.io/address/0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
    },
    UNI: {
      coingecko: "https://www.coingecko.com/en/coins/uniswap",
      arbitrum: "https://arbiscan.io/address/0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
    },
    USDC: {
      coingecko: "https://www.coingecko.com/en/coins/usd-coin",
      arbitrum: "https://arbiscan.io/address/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    },
    USDT: {
      coingecko: "https://www.coingecko.com/en/coins/tether",
      arbitrum: "https://arbiscan.io/address/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    },
    DAI: {
      coingecko: "https://www.coingecko.com/en/coins/dai",
      arbitrum: "https://arbiscan.io/address/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    },
    MIM: {
      coingecko: "https://www.coingecko.com/en/coins/magic-internet-money",
      arbitrum: "https://arbiscan.io/address/0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a",
    },
    FRAX: {
      coingecko: "https://www.coingecko.com/en/coins/frax",
      arbitrum: "https://arbiscan.io/address/0x17fc002b466eec40dae837fc4be5c67993ddbd6f",
    },
  },
  [AVALANCHE]: {
    GMX: {
      coingecko: "https://www.coingecko.com/en/coins/gmx",
      avalanche: "https://snowtrace.io/address/0xDc2C540Fd99eb5dC424095C8C6A63f7c805D46e9",
    },
    GLP: {
      avalanche: "https://snowtrace.io/address/0x0E2b5428CE48c87a33Ad55A14d3b79BC7300C241",
    },
    AVAX: {
      coingecko: "https://www.coingecko.com/en/coins/avalanche",
    },
    ETH: {
      coingecko: "https://www.coingecko.com/en/coins/weth",
      avalanche: "https://snowtrace.io/address/0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
    },
    WBTC: {
      coingecko: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      avalanche: "https://snowtrace.io/address/0x50b7545627a5162f82a992c33b87adc75187b218",
    },
    BTC: {
      coingecko: "https://www.coingecko.com/en/coins/bitcoin-avalanche-bridged-btc-b",
      avalanche: "https://snowtrace.io/address/0x152b9d0FdC40C096757F570A51E494bd4b943E50",
    },
    MIM: {
      coingecko: "https://www.coingecko.com/en/coins/magic-internet-money",
      avalanche: "https://snowtrace.io/address/0x130966628846bfd36ff31a822705796e8cb8c18d",
    },
    USDC: {
      coingecko: "https://www.coingecko.com/en/coins/usd-coin",
      avalanche: "https://snowtrace.io/address/0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
    },
    "USDC.e": {
      coingecko: "https://www.coingecko.com/en/coins/usd-coin-avalanche-bridged-usdc-e",
      avalanche: "https://snowtrace.io/address/0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
    },
    LINK: {
      coingecko: "https://www.coingecko.com/en/coins/chainlink",
      avalanche: "https://snowtrace.io/address/0x5947BB275c521040051D82396192181b413227A3",
    },
    AAVE: {
      coingecko: "https://www.coingecko.com/en/coins/aave",
      avalanche: "https://snowtrace.io/address/0x63a72806098Bd3D9520cC43356dD78afe5D386D9",
    },
  },
};

export const GLP_POOL_COLORS = {
  ETH: "#6062a6",
  BTC: "#F7931A",
  WBTC: "#F7931A",
  USDC: "#2775CA",
  "USDC.e": "#2A5ADA",
  USDT: "#67B18A",
  MIM: "#9695F8",
  FRAX: "#000",
  DAI: "#FAC044",
  UNI: "#E9167C",
  AVAX: "#E84142",
  LINK: "#3256D6",
};

export const TOKENS_MAP: { [chainId: number]: { [address: string]: Token } } = {};
export const TOKENS_BY_SYMBOL_MAP: { [chainId: number]: { [symbol: string]: Token } } = {};
export const WRAPPED_TOKENS_MAP: { [chainId: number]: Token } = {};
export const NATIVE_TOKENS_MAP: { [chainId: number]: Token } = {};

const CHAIN_IDS = [MAINNET, TESTNET, ARBITRUM, ARBITRUM_TESTNET, AVALANCHE];

for (let j = 0; j < CHAIN_IDS.length; j++) {
  const chainId = CHAIN_IDS[j];
  TOKENS_MAP[chainId] = {};
  TOKENS_BY_SYMBOL_MAP[chainId] = {};
  let tokens = TOKENS[chainId];
  if (ADDITIONAL_TOKENS[chainId]) {
    tokens = tokens.concat(ADDITIONAL_TOKENS[chainId]);
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    TOKENS_MAP[chainId][token.address] = token;
    TOKENS_BY_SYMBOL_MAP[chainId][token.symbol] = token;
  }
}

for (const chainId of CHAIN_IDS) {
  for (const token of TOKENS[chainId]) {
    if (token.isWrapped) {
      WRAPPED_TOKENS_MAP[chainId] = token;
    } else if (token.isNative) {
      NATIVE_TOKENS_MAP[chainId] = token;
    }
  }
}

export function getWrappedToken(chainId: number) {
  return WRAPPED_TOKENS_MAP[chainId];
}

export function getNativeToken(chainId: number) {
  return NATIVE_TOKENS_MAP[chainId];
}

export function getTokens(chainId: number) {
  return TOKENS[chainId];
}

export function isValidToken(chainId: number, address: string) {
  if (!TOKENS_MAP[chainId]) {
    throw new Error(`Incorrect chainId ${chainId}`);
  }
  return address in TOKENS_MAP[chainId];
}

export function getToken(chainId: number, address: string) {
  if (!TOKENS_MAP[chainId]) {
    throw new Error(`Incorrect chainId ${chainId}`);
  }
  if (!TOKENS_MAP[chainId][address]) {
    throw new Error(`Incorrect address "${address}" for chainId ${chainId}`);
  }
  return TOKENS_MAP[chainId][address];
}

export function getTokenBySymbol(chainId: number, symbol: string) {
  const token = TOKENS_BY_SYMBOL_MAP[chainId][symbol];
  if (!token) {
    throw new Error(`Incorrect symbol "${symbol}" for chainId ${chainId}`);
  }
  return token;
}

export function getWhitelistedTokens(chainId: number) {
  return TOKENS[chainId].filter((token) => token.symbol !== "USDG");
}

export function getVisibleTokens(chainId: number) {
  return getWhitelistedTokens(chainId).filter((token) => !token.isWrapped && !token.isTempHidden);
}
