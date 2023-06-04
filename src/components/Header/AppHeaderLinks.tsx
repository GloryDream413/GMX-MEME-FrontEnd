import React from "react";
import { FiX } from "react-icons/fi";
import { Trans } from "@lingui/macro";
import { Link } from "react-router-dom";

import { HeaderLink } from "./HeaderLink";
import "./Header.css";
import { isHomeSite } from "lib/legacy";
import ExternalLink from "components/ExternalLink/ExternalLink";
import logoImg from "img/logo.png";

type Props = {
  small?: boolean;
  clickCloseIcon?: () => void;
  openSettings?: () => void;
  redirectPopupTimestamp: number;
  showRedirectModal: (to: string) => void;
};

export function AppHeaderLinks({
  small,
  openSettings,
  clickCloseIcon,
  redirectPopupTimestamp,
  showRedirectModal,
}: Props) {
  return (
    <div className="App-header-links">
      {small && (
        <div className="App-header-links-header">
          <Link className="App-header-link-main" to="/">
            <img src={logoImg} alt="POOPE Logo" />
          </Link>
          <div
            className="App-header-menu-icon-block mobile-cross-menu"
            onClick={() => clickCloseIcon && clickCloseIcon()}
          >
            <FiX className="App-header-menu-icon" />
          </div>
        </div>
      )}
      <div className="App-header-link-container">
        <HeaderLink
          to="/"
          isHomeLink={true}
          redirectPopupTimestamp={redirectPopupTimestamp}
          showRedirectModal={showRedirectModal}
        >
          <Trans>Home</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink
          to="/dashboard"
          redirectPopupTimestamp={redirectPopupTimestamp}
          showRedirectModal={showRedirectModal}
        >
          <Trans>Dashboard</Trans>
        </HeaderLink>
      </div>
      {/* <div className="header-dropdown">
        <div className="dropbtn">
          <a href="#/nft" aria-current="page">
            NFT
          </a>
        </div>
        <div className="header-dropdown-content">
          <a href="#/nft">
            <div>
              <div>Mint</div>
            </div>
          </a>
          <a href="#/nft-stake">
            <div>
              <div>Stake NFT</div>
            </div>
          </a>
        </div>
      </div> */}
      <div className="App-header-link-container">
        <HeaderLink to="/earn" redirectPopupTimestamp={redirectPopupTimestamp} showRedirectModal={showRedirectModal}>
          <Trans>Earn</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <HeaderLink to="/buy" redirectPopupTimestamp={redirectPopupTimestamp} showRedirectModal={showRedirectModal}>
          <Trans>Buy</Trans>
        </HeaderLink>
      </div>
      {/* <div className="App-header-link-container">
        <HeaderLink
          to="/referrals"
          redirectPopupTimestamp={redirectPopupTimestamp}
          showRedirectModal={showRedirectModal}
        >
          <Trans>Referrals</Trans>
        </HeaderLink>
      </div> */}
      <div className="App-header-link-container">
        <HeaderLink
          to="/ecosystem"
          redirectPopupTimestamp={redirectPopupTimestamp}
          showRedirectModal={showRedirectModal}
        >
          <Trans>Ecosystem</Trans>
        </HeaderLink>
      </div>
      <div className="App-header-link-container">
        <ExternalLink href="https://docs.poope.finance">
          <Trans>About</Trans>
        </ExternalLink>
      </div>
      {small && !isHomeSite() && (
        <div className="App-header-link-container">
          {/* eslint-disable-next-line */}
          <a href="#" onClick={openSettings}>
            <Trans>Settings</Trans>
          </a>
        </div>
      )}
    </div>
  );
}
