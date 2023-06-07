import { ARBITRUM, MAINNET } from "./chains";

export const XGMT_EXCLUDED_ACCOUNTS = [
  "0x330eef6b9b1ea6edd620c825c9919dc8b611d5d5",
  "0xd9b1c23411adbb984b1c4be515fafc47a12898b2",
  "0xa633158288520807f91ccc98aa58e0ea43acb400",
  "0xffd0a93b4362052a336a7b22494f1b77018dd34b",
];

const CONTRACTS = {
  [MAINNET]: {
    //Goerli Testnet
    Vault: "0x7fC7fC2b7731ba0d0E9249E6e631Fa847bF49fF3", //replaced
    Router: "0x31292AFBd1d507a87dAa90c14E7dc061F1b0667f", //replaced
    VaultReader: "0x7d6aD321b5B1a9f7e0392e24e5BFe2ECe051ca3F", //replaced
    Reader: "0xc6e05fc8Ad98A24fE4c7e50D9Bd46F985da0dbE5", //replaced
    GlpManager: "0xf321A40A588E5c738685A44fc5Aa813221F70Ca5", //replaced
    RewardRouter: "0xA2c2980Ad188FEA9BA041A942eDacd0306f39cba", //replaced
    RewardReader: "0x119459363848512EE22F1d06eEa1C39E1d3Dcd87", //replaced
    NATIVE_TOKEN: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    GLP: "0x41268357F826D5Ec34FbBA8da86bCA2aDF885d25", //replaced
    GMX: "0x9f2f24B0A2d9550474d62b61539e7b437715eF1F", //replaced
    ES_GMX: "0x935912a166760446f2bDE1d082D3960F0A6Ef477", //replaced
    BN_GMX: "0xA8F08321123AD15fC8703c536d9347F9Db4da0F3", //replaced
    USDG: "0x78313C50e1636f366432D079a193Fe7c50acB5bd", //replaced
    ES_GMX_IOU: "0xC97B2209D81383d77b9e5D17C320b4E669295bE9", // placeholder address

    StakedGmxTracker: "0x631238cb763B2A7840b4F2754bAe9cA5f053053C", //replaced
    BonusGmxTracker: "0xE68beE7B3d1cAf6FE78A2a1c1694968de5Bd267A", //replaced
    FeeGmxTracker: "0xFbbd636F25735f4Bc68062Da1506a1DAfe638705", //replaced
    StakedGlpTracker: "0x71a7026c6892fc3e493129C4E52Eb3fefAE5d903", //replaced
    FeeGlpTracker: "0x481dC824EcE37E47080185edb5c0b23eEd85392F", //replaced

    StakedGmxDistributor: "0xFE7C336F42072aAe5048cDA1a5c942c570471998", //replaced
    StakedGlpDistributor: "0x83A2213ac361FB90B6f65E0a562a103Ca94A5bdc", //replaced

    GmxVester: "0x5A9B426E1C5AcB83F9819d92d316570DA28B62e9", //replaced
    GlpVester: "0x9D4ac5dAf5faDdc4b2bC7Cced6BBda7B84Cc5A4c", //replaced

    OrderBook: "0x631238cb763B2A7840b4F2754bAe9cA5f053053C", //replaced
    OrderExecutor: "0x631238cb763B2A7840b4F2754bAe9cA5f053053C", //replaced
    OrderBookReader: "0x34F7475721aa1fe99E0928EDbfDf4538CfC5ba4c", //replaced

    PositionRouter: "0xa23c7346B1c0CD79591b225Db9530b7170e3E70d", //replaced
    PositionManager: "0xE482B6074FE9eD423142779E1e148b84934491B7", //replaced

    TraderJoeGmxAvaxPool: "0x198Cb829FE2af472d6Da0F9070Dff51C67cb9F01", //replaced
    ReferralStorage: "0x22E5fD281B9CcFD0D9914bAe5ad14b577e638bdE", //replaced
    ReferralReader: "0xAd310160C41D4107083f262B30b8705BF77F306c", //replaced
  },

  [ARBITRUM]: {
    // arbitrum mainnet
    Vault: "0x489ee077994B6658eAfA855C308275EAd8097C4A",
    Router: "0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064",
    VaultReader: "0xfebB9f4CAC4cD523598fE1C5771181440143F24A",
    Reader: "0x2b43c90D1B727cEe1Df34925bcd5Ace52Ec37694",
    GlpManager: "0x321F653eED006AD1C29D174e17d96351BDe22649",
    RewardRouter: "0xA906F338CB21815cBc4Bc87ace9e68c87eF8d8F1",
    RewardReader: "0x8BFb8e82Ee4569aee78D03235ff465Bd436D40E0",
    NATIVE_TOKEN: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    GLP: "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258",
    GMX: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
    ES_GMX: "0xf42Ae1D54fd613C9bb14810b0588FaAa09a426cA",
    BN_GMX: "0x35247165119B69A40edD5304969560D0ef486921",
    USDG: "0x45096e7aA921f27590f8F19e457794EB09678141",
    ES_GMX_IOU: "0x6260101218eC4cCfFF1b778936C6f2400f95A954",
    StakedGmxTracker: "0x908C4D94D34924765f1eDc22A1DD098397c59dD4",
    BonusGmxTracker: "0x4d268a7d4C16ceB5a606c173Bd974984343fea13",
    FeeGmxTracker: "0xd2D1162512F927a7e282Ef43a362659E4F2a728F",
    StakedGlpTracker: "0x1aDDD80E6039594eE970E5872D247bf0414C8903",
    FeeGlpTracker: "0x4e971a87900b931fF39d1Aad67697F49835400b6",

    StakedGmxDistributor: "0x23208B91A98c7C1CD9FE63085BFf68311494F193",
    StakedGlpDistributor: "0x60519b48ec4183a61ca2B8e37869E675FD203b34",

    GmxVester: "0x199070DDfd1CFb69173aa2F7e20906F26B363004",
    GlpVester: "0xA75287d2f8b217273E7FCD7E86eF07D33972042E",

    OrderBook: "0x09f77E8A13De9a35a7231028187e9fD5DB8a2ACB",
    OrderExecutor: "0x7257ac5D0a0aaC04AA7bA2AC0A6Eb742E332c3fB",
    OrderBookReader: "0xa27C20A7CF0e1C68C0460706bB674f98F362Bc21",

    PositionRouter: "0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868",
    PositionManager: "0x75E42e6f01baf1D6022bEa862A28774a9f8a4A0C",

    UniswapGmxEthPool: "0x80A9ae39310abf666A87C743d6ebBD0E8C42158E",
    ReferralStorage: "0xe6fab3f0c7199b0d34d7fbe83394fc0e0d06e99d",
    ReferralReader: "0x8Aa382760BCdCe8644C33e6C2D52f6304A76F5c8",
  },
};

export function getContract(chainId: number, name: string): string {
  if (!CONTRACTS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!CONTRACTS[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return CONTRACTS[chainId][name];
}
