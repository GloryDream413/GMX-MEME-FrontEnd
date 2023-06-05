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
    Vault: "0x40fC506358b102E14Aba61a35d76f1Cf69Df2AF7",//replaced 
    Router: "0x58692bE7a344E029b11438deb9B1B442d274E71d",//replaced 
    VaultReader: "0xa2a4a54D1462746933b7895Ad521a3E10C6b5147",//replaced 
    Reader: "0x2Daa447E9497669106ae2435BB86bc00b393C75a",//replaced 
    GlpManager: "0x6c9157b4625E2a41F6FCa07e4ce6D038eC4ff065",//replaced 
    RewardRouter: "0xF7830f8d9A2Bdc2e743Af4171FeB2d39c7FC5E9f",//replaced 
    RewardReader: "0x12b0Bce07f50B07C51182e590a546FBbcA7b832B",//replaced 
    NATIVE_TOKEN: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    GLP: "0xCc5c1410E3952f57eF8611ab52a03E9B8a4632C2",//replaced 
    GMX: "0x024db959258d9CaDE60b31f87E38Fb685aF345aB", //replaced 
    ES_GMX: "0xC22E82D9faDd9E25A3Ee838037e6665228b9d308",//replaced 
    BN_GMX: "0x09aE0F265168C6880837c980d91B00C23bAA2Ba0",//replaced 
    USDG: "0xa32B52615f93aDDE1200D9f3C1B2857FFc83ef42", //replaced 
    ES_GMX_IOU: "0x61102bffaE0C8324f4978803E62AB5e476A721Ad", // placeholder address

    StakedGmxTracker: "0x4997F0b635E70007146EB4DC8512A15ba619bB70",//replaced 
    BonusGmxTracker: "0x927B06bE3C8a56A39fb5BF845679E5b584050792",//replaced 
    FeeGmxTracker: "0xeEC5e3A2e8d17103Bf735FAC8853Cc87B064C73F",//replaced 
    StakedGlpTracker: "0xC3b29F618600E68CC8E522a0e6fF5600f26909B6",//replaced 
    FeeGlpTracker: "0x00CFd79848487648d64336D5216927847052fE25",//replaced 

    StakedGmxDistributor: "0x002aaCc989C8bac343023d4346332feC8554369d",//replaced 
    StakedGlpDistributor: "0xADaf21da0d098B6A9F15E2451Ab232ADfb7C76d1",//replaced 

    GmxVester: "0xa6a320794720b393BeF84540Aa6d56be1841F2C6",//replaced 
    GlpVester: "0xD7778B1805884C2Ce0449E21eBb2F0d7BFB58e00",//replaced 

    OrderBook: "0xcE1405C08a5710C370C1F38B6f652292e9091E03",//replaced 
    OrderExecutor: "0xcE1405C08a5710C370C1F38B6f652292e9091E03",//replaced
    OrderBookReader: "0xcfAD3ba80Ff22933b7e20A7114357C4f69cffE6C",//replaced 

    PositionRouter: "0x9427430CEA114cBBeDD5F5AB39F555028fec943b",//replaced 
    PositionManager: "0xe412ee0C72c142925E59648F6a956e43cF0aa2bE",//replaced 

    TraderJoeGmxAvaxPool: "0x198Cb829FE2af472d6Da0F9070Dff51C67cb9F01",//replaced
    ReferralStorage: "0x306d9C0f9d48F4d1D5FFF6F1958254D832C89A7C",//replaced 
    ReferralReader: "0xe39c50fEB746CdC7C297F66E89346F0d3fAFd772",//replaced 
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
  }
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
