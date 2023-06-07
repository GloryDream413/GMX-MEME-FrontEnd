import { ARBITRUM, MAINNET } from "config/chains";
import { getContract } from "config/contracts";

const ETH_GMX = getContract(MAINNET, "GMX");

type Exchange = {
  name: string;
  icon: string;
  networks: number[];
  link?: string;
  links?: { [ARBITRUM]: string };
};

export const EXTERNAL_LINKS = {
  [MAINNET]: {
    bungee: `https://multitx.bungee.exchange/?toChainId=43114&toTokenAddress=${ETH_GMX}`,
    banxa: "https://gmx.banxa.com/?coinType=AVAX&fiatType=USD&fiatAmount=500&blockchain=avalanche",
    networkWebsite: "https://www.avax.network/",
    buyGmx: {
      banxa: "https://gmx.banxa.com/?coinType=GMX&fiatType=USD&fiatAmount=500&blockchain=avalanche",
      traderjoe: `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${ETH_GMX}`,
    },
  },
};

export const TRANSFER_EXCHANGES: Exchange[] = [
  {
    name: "Arbitrum",
    icon: "ic_arbitrum_24.svg",
    networks: [ARBITRUM],
    link: "https://bridge.arbitrum.io/",
  },
  {
    name: "Hop",
    icon: "ic_hop.svg",
    networks: [ARBITRUM],
    link: "https://app.hop.exchange/send?token=ETH&sourceNetwork=ethereum&destNetwork=arbitrum",
  },
  {
    name: "Bungee",
    icon: "ic_bungee.png",
    networks: [ARBITRUM],
    link: "https://multitx.bungee.exchange",
  },
  {
    name: "Multiswap",
    icon: "ic_multiswap.svg",
    networks: [ARBITRUM],
    link: "https://app.multichain.org/#/router",
  },
  {
    name: "O3",
    icon: "ic_o3.png",
    networks: [ARBITRUM],
    link: "https://o3swap.com/",
  },
  {
    name: "Across",
    icon: "ic_across.svg",
    networks: [ARBITRUM],
    link: "https://across.to/",
  },
];

export const CENTRALISED_EXCHANGES: Exchange[] = [
  {
    name: "Binance",
    icon: "ic_binance.svg",
    link: "https://www.binance.com/en/trade/GMX_USDT?_from=markets",
    networks: [ARBITRUM],
  },
  {
    name: "Bybit",
    icon: "ic_bybit.svg",
    link: "https://www.bybit.com/en-US/trade/spot/GMX/USDT",
    networks: [ARBITRUM],
  },
  {
    name: "Kucoin",
    icon: "ic_kucoin.svg",
    link: "https://www.kucoin.com/trade/GMX-USDT",
    networks: [ARBITRUM],
  },
  {
    name: "Huobi",
    icon: "ic_huobi.svg",
    link: "https://www.huobi.com/en-us/exchange/gmx_usdt/",
    networks: [ARBITRUM],
  },
];

export const DECENTRALISED_AGGRIGATORS: Exchange[] = [
  {
    name: "1inch",
    icon: "ic_1inch.svg",
    links: {
      [ARBITRUM]: "https://app.1inch.io/#/42161/unified/swap/ETH/GMX",
    },
    networks: [ARBITRUM],
  },
  {
    name: "Paraswap",
    icon: "ic_paraswap.svg",
    links: {
      [ARBITRUM]: "https://app.paraswap.io/#/?network=arbitrum",
    },
    networks: [ARBITRUM],
  },
  {
    name: "Firebird",
    icon: "ic_firebird.png",
    link: "https://app.firebird.finance/swap",
    networks: [ARBITRUM],
  },
  {
    name: "OpenOcean",
    icon: "ic_openocean.svg",
    links: {
      [ARBITRUM]: "https://app.openocean.finance/CLASSIC#/ARBITRUM/ETH/GMX",
    },
    networks: [ARBITRUM],
  },
  {
    name: "Odos",
    icon: "ic_odos.png",
    link: "https://app.odos.xyz/",
    networks: [ARBITRUM],
  },
  {
    name: "Slingshot",
    icon: "ic_slingshot.svg",
    link: "https://app.slingshot.finance/swap/ETH",
    networks: [ARBITRUM],
  },
];
