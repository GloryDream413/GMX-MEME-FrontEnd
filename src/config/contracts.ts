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
    Vault: "0xeB81176A6F67cf0f35aa9FaCB20A22E1ea892f75",//replaced 
    Router: "0x3AB07ED97EB756dBaae60bE274a276523591A1E5",//replaced 
    VaultReader: "0x41414609d8A548705985ec6116A53Ac5dA325220",//replaced 
    Reader: "0xea50c7b093287620e5B4d3294Fe5647cDC30b5eA",//replaced 
    GlpManager: "0x46AADe5a294c939a8Df8A2B5cF300069f7174B12",//replaced 
    RewardRouter: "0x47ff2177cf9812D66BA6d6738417a6BF84875CB8",//replaced 
    RewardReader: "0x24cA960D93b5b926A3CF3846A5Ff0e51Dc44DCD6",//replaced 
    NATIVE_TOKEN: "0x7af963cF6D228E564e2A0aA0DdBF06210B38615D",
    GLP: "0x71B4f9057E2373b1589a4C066C7795025396F2f4",//replaced 
    GMX: "0x42E0aAc6dA998AA46864d40FF714d0fb44f20712", //replaced 
    ES_GMX: "0xE5bfCB362276fA63c17F183F01f2f863A3a468B8",//replaced 
    BN_GMX: "0x019eAb94D2AD69e5c0C30EF4C14Afe9B4bA6B2d9",//replaced 
    USDG: "0xa3872C6cFFA0FBcd5A8155ac3213E65316DeF225", //replaced 
    ES_GMX_IOU: "0x890608Aed29882E56f4DD45Ee21E8b9F8492891E", // placeholder address

    StakedGmxTracker: "0xd5f3C5545CA13748C2974Fa397Ef14045f02FDf2",//replaced 
    BonusGmxTracker: "0x5Ac1d030e133E3842F6f5822E94962FC29c3F3aE",//replaced 
    FeeGmxTracker: "0xed4991Fef256964035dD1B18685c10bE716f20c8",//replaced 
    StakedGlpTracker: "0xb75aF2B80beB7989dCA870893cB7F823aACef020",//replaced 
    FeeGlpTracker: "0x28F57Cb83A47aD7d060840437Be85F58C45d0fAe",//replaced 

    StakedGmxDistributor: "0x8438aBAB3fc2b6bB0Cd88B83317c723AD7643eB9",//replaced 
    StakedGlpDistributor: "0xa838c4F07B5B3A41A68fb65E63eD1544844256FD",//replaced 

    GmxVester: "0xd820A886c8887B914BD91ca1812549Ea4DA0901C",//replaced 
    GlpVester: "0xb23BCd73995b42F101c1e7C714b9aadE135875a1",//replaced 

    OrderBook: "0x3594362449612ECeae9dd898136Ccb62afA21949",//replaced 
    OrderExecutor: "0x3594362449612ECeae9dd898136Ccb62afA21949",//replaced
    OrderBookReader: "0x236057d205CBA9180FA7ea78F2d723b35C9165F2",//replaced 

    PositionRouter: "0x7776117Ce46d5423477C72c3CE84Bc5D9983F4D6",//replaced 
    PositionManager: "0x736c8E7Aa8bcAfF15ed9d78946Ebd5230e13D4E2",//replaced 

    TraderJoeGmxAvaxPool: "0x198Cb829FE2af472d6Da0F9070Dff51C67cb9F01",//replaced
    ReferralStorage: "0xaf102c607b9734D119b5b9519C58D06c3dA781a9",//replaced 
    ReferralReader: "0x217837b8E46Ef3AEA3AE911E096537952Df98f73",//replaced 
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
