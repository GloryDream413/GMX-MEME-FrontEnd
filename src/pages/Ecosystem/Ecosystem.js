import React from "react";
import { Trans } from "@lingui/macro";
import SEO from "components/Common/SEO";

import Footer from "components/Footer/Footer";
import { getPageTitle } from "lib/legacy";

import arbitrumIcon from "img/ic_arbitrum_16.svg";
import avalancheIcon from "img/ic_weth_16.svg";

import "./Ecosystem.css";
import ExternalLink from "components/ExternalLink/ExternalLink";
import { MAINNET } from "config/chains";
import { t } from "@lingui/macro";

const NETWORK_ICONS = {
  [MAINNET]: avalancheIcon,
};

const NETWORK_ICON_ALTS = {
  [MAINNET]: "Ethereum Icon",
};

export default function Ecosystem() {
  const gmxPages = [
    {
      title: "$POOPE Stats",
      link: "https://stats.zomi.exchange/",
      linkLabel: "stats.zomi.exchange",
      about: t`$POOPE Stats Page`,
      chainIds: [MAINNET],
    },
    {
      title: "$POOPE Announcements",
      link: "https://t.me/zomichat",
      linkLabel: "t.me",
      about: t`$POOPE Announcements and Updates`,
      chainIds: [MAINNET],
    },
  ];

  const communityProjects = [
  ];

  const dashboardProjects = [
  ];

  const integrations = [
  ];

  const telegramGroups = [
    {
      title: "$POOPE",
      link: "https://t.me/zomichat",
      linkLabel: "t.me",
      about: t`Telegram Group`,
    },
    {
      title: "$POOPE",
      link: "https://t.me/zomifinance",
      linkLabel: "t.me",
      about: t`Telegram Announcements`,
    },
  ];

  return (
    <SEO title={getPageTitle("Ecosystem Projects")}>
      <div className="default-container page-layout">
        <div>
          <div className="Tab-title-section">
            <div className="Page-title">
              <Trans>Telegram Groups</Trans>
            </div>
            <div className="Page-description">
              <Trans>Community-led Telegram groups.</Trans>
            </div>
          </div>
          <div className="DashboardV2-projects">
            {telegramGroups.map((item) => {
              const linkLabel = item.linkLabel ? item.linkLabel : item.link;
              return (
                <div className="App-card" key={item.title}>
                  <div className="App-card-title">{item.title}</div>
                  <div className="App-card-divider"></div>
                  <div className="App-card-content">
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>Link</Trans>
                      </div>
                      <div>
                        <ExternalLink href={item.link}>{linkLabel}</ExternalLink>
                      </div>
                    </div>
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>About</Trans>
                      </div>
                      <div>{item.about}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </SEO>
  );
}
