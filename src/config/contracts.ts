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
    Vault: "0x458217E1CB42cA9d196Fd0B6C92E0f01377b0Ce9", //replaced
    Router: "0xde89Eeb63dEC88dC3b4a563327df38eF46AD56DC", //replaced
    VaultReader: "0xCF2491f13461BA73a07E2eBd4c1d19286F38eC5c", //replaced
    Reader: "0x8d9a156c94ce59884986acB3BFc0537d2A11A26A", //replaced
    GlpManager: "0xaC4fc0d106f0ccB7e01858fC1e84267AE1544E39", //replaced
    RewardRouter: "0x6C84C34B3Bd0a80Cc7e8ac78231FcDA63073DfCF", //replaced
    RewardReader: "0x93621f79E6C24Bdc9B14f38FE65ca9EB42a44b46", //replaced
    NATIVE_TOKEN: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    GLP: "0xEA003EDf3c6886F42B39921478757d5Dc6dF06dD", //replaced
    GMX: "0xc30982498ceAc1989c200FE30a7b19ba3763AeaD", //replaced
    ES_GMX: "0x879Cf0E12135B3980BBd1446882ef7c149106427", //replaced
    BN_GMX: "0x6d461e2b6a377A7b35c914551CCF87D41E303540", //replaced
    USDG: "0xa8939852828b26060281F9b2eA806C0253cFdD88", //replaced
    ES_GMX_IOU: "0xe36D77cf33654f4353A46FaD17Fb33cbC5902351", // placeholder address

    StakedGmxTracker: "0x06e2182b2096a0381970aB0416F86c80B9cb2F73", //replaced
    BonusGmxTracker: "0x60bc69a5873faE24D0f8115640599c7e2e37b259", //replaced
    FeeGmxTracker: "0x5c9640F6411f2beAC2C60B67820E3DF3e597EDDA", //replaced
    StakedGlpTracker: "0x8cDf3204a6E272d6aAa16DCbc1C214d591e42406", //replaced
    FeeGlpTracker: "0xd72fA66F9d144ec94AF2B05d214839E8EE2bC791", //replaced

    StakedGmxDistributor: "0x01f885e08460D855dE7410a7b2CF63eeC74438AD", //replaced
    StakedGlpDistributor: "0x85Da252752dF617060c5489605e77B4F1130E162", //replaced

    GmxVester: "0x0eDE195a1A8A798f0701004f1e1CC495611C3E21", //replaced
    GlpVester: "0x933901dA035c9E5c6cB734744b410c607e8d7677", //replaced

    OrderBook: "0x1e0ad629592e25860c608111dEd9c5E61921C2ED", //replaced
    OrderExecutor: "0x1e0ad629592e25860c608111dEd9c5E61921C2ED", //replaced
    OrderBookReader: "0x51Ad66DB808bcC40fEC15970DEAffA8D940251Eb", //replaced

    PositionRouter: "0x54d094B8f55cE13111BED6b128d5bA8e580D67C9", //replaced
    PositionManager: "0x9E6803fc355Ff3D1dE47C99ED6b49853de252194", //replaced

    TraderJoeGmxAvaxPool: "0x198Cb829FE2af472d6Da0F9070Dff51C67cb9F01", //replaced
    ReferralStorage: "0xC6a09f95CB92650A35Cd34147a6d9C24505deFfA", //replaced
    ReferralReader: "0x8b84e7f6d8Ee11a4ED15223C7b1e38942f362E8c", //replaced
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
