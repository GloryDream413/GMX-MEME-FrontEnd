import { React, useMemo} from "react";
import Footer from "components/Footer/Footer";
import "./Home.css";

import simpleSwapIcon from "img/ic_simpleswaps.svg";
import costIcon from "img/ic_cost.svg";
import liquidityIcon from "img/ic_liquidity.svg";
import totaluserIcon from "img/ic_totaluser.svg";

import arbitrumIcon from "img/ic_arbitrum_96.svg";
import avaIcon from "img/ic_avalanche_96.svg";

import statsIcon from "img/ic_stats.svg";
import tradingIcon from "img/ic_trading.svg";

import useSWR from "swr";

import { USD_DECIMALS, getTotalVolumeSum } from "lib/legacy";
import { useUserStat, useVolumeData, useTradersData, formatNumber } from "domain/legacy";

import TokenCard from "components/TokenCard/TokenCard";
import { Trans } from "@lingui/macro";
import { HeaderLink } from "components/Header/HeaderLink";
import { ARBITRUM, MAINNET } from "config/chains";
import { getServerUrl } from "config/backend";
import { bigNumberify, formatAmount, numberWithCommas } from "lib/numbers";
export default function Home({ showRedirectModal, redirectPopupTimestamp }) {
  
  const [totalVolume, totalVolumeDelta] = useVolumeData();
  const [openInterest, openInterestDelta] = useTradersData();
  const avalancheUserStats = useUserStat(MAINNET);
  let totalUsers = 0;

  if (avalancheUserStats && avalancheUserStats.uniqueCount) {
    totalUsers += avalancheUserStats.uniqueCount;
  }

  const LaunchExchangeButton = () => {
    return (
      <HeaderLink
        className="default-btn"
        to="/trade"
        redirectPopupTimestamp={redirectPopupTimestamp}
        showRedirectModal={showRedirectModal}
      >
        <Trans>Launch Exchange</Trans>
      </HeaderLink>
    );
  };

  return (
    <div className="Home">
      <div className="Home-top">
        {/* <div className="Home-top-image"></div> */}
        <div className="Home-title-section-container default-container">
          <div className="Home-title-section">
            <div className="Home-title">
              <Trans>
                Decentralized
                <br />
                Perpetual Exchange
              </Trans>
            </div>
            <div className="Home-description">
              <Trans>
                Trade PEPE, BOB, LADYS, WOJAK, DOGE and other top cryptocurrencies with up to 5x leverage directly from your wallet
              </Trans>
            </div>
            <LaunchExchangeButton />
          </div>
        </div>
        <div className="Home-latest-info-container default-container">
          <div className="Home-latest-info-block">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="Home-latest-info-content"></div>
            <div className="Home-latest-info-content">
              <div className="Home-latest-info__title">
                <Trans>Total Trading Volume</Trans>
              </div>
              {/* <div className="Home-latest-info__value">${formatAmount(totalVolume, USD_DECIMALS, 0, true)}</div> */}
              <div className="Home-latest-info__value">{totalVolume ? formatNumber(totalVolume, { currency: true, compact: false }) : `$0`}</div>

            </div>
          </div>
          <div className="Home-latest-info-block">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="Home-latest-info-content">
              <div className="Home-latest-info__title">
                <Trans>Open Interest</Trans>
              </div>
              <div className="Home-latest-info__value">{openInterest ? formatNumber(openInterest, { currency: true, compact: false }) : `$0`}</div>
            </div>
          </div>
          <div className="Home-latest-info-block">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="Home-latest-info-content">
              <div className="Home-latest-info__title">
                <Trans>Total Users</Trans>
              </div>
              <div className="Home-latest-info__value">{numberWithCommas(totalUsers.toFixed(0))}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="Home-benefits-section">
        <div className="Home-benefits default-container">
          <div className="Home-benefit">
            <div className="Home-benefit-icon">
              <div className="Home-benefit-title">
                <Trans>Reduce Liquidation Risks</Trans>
              </div>
            </div>
            <div className="Home-benefit-description">
              <Trans>
                An aggregate of high-quality price feeds determine when liquidations occur. This keeps positions safe
                from temporary wicks.
              </Trans>
            </div>
          </div>
          <div className="Home-benefit">
            <div className="Home-benefit-icon">
              <div className="Home-benefit-title">
                <Trans>Save on Costs</Trans>
              </div>
            </div>
            <div className="Home-benefit-description">
              <Trans>
                Enter and exit positions with minimal spread and zero price impact. Get the optimal price without
                incurring additional costs.
              </Trans>
            </div>
          </div>
          <div className="Home-benefit">
            <div className="Home-benefit-icon">
              <div className="Home-benefit-title">
                <Trans>Simple Swaps</Trans>
              </div>
            </div>
            <div className="Home-benefit-description">
              <Trans>
                Open positions through a simple swap interface. Conveniently swap from any supported asset into the
                position of your choice.
              </Trans>
            </div>
          </div>
        </div>
      </div>

      <div className="Home-token-card-section">
        <div className="Home-token-card-container default-container">
          <div className="Home-token-card-info">
            <div className="Home-token-card-info__title">
              <Trans>Two tokens create our ecosystem</Trans>
            </div>
          </div>
          <TokenCard showRedirectModal={showRedirectModal} redirectPopupTimestamp={redirectPopupTimestamp} />
        </div>
      </div>
      <Footer showRedirectModal={showRedirectModal} redirectPopupTimestamp={redirectPopupTimestamp} />
    </div>
  );
}
