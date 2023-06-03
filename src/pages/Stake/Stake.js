import React from "react";

import { MAINNET, getConstant } from "config/chains";

import StakeV1 from "./StakeV1";
import StakeV2 from "./StakeV2";

export default function Stake(props) {
  const chainId = MAINNET;
  const isV2 = getConstant(chainId, "v2");
  return isV2 ? <StakeV2 {...props} /> : <StakeV1 {...props} />;
}
