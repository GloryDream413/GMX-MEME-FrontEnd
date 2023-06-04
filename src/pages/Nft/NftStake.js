import "./Nft.css";
import React from "react";
import { Trans, t } from "@lingui/macro";
import SEO from "components/Common/SEO";
import Footer from "components/Footer/Footer";
import { getPageTitle, isHashZero } from "lib/legacy";

import nft_4 from "img/nft/4.jpg";

function NftStake({ connectWallet, setPendingTxns, pendingTxns }) {
  return (
    <SEO title={getPageTitle("NFT Stake")}>
      <div className="default-container page-layout">
        <div className="fn_cs_join" style={{ padding: "79px 40px 0px" }}>
          <div className="join_in">
            <h3 className="fn__maintitle upper" data-text="NFT Stake">
              NFT Stake
            </h3>
            <p>Earn $POOPE from platform's collected fees with your NFT.</p>
          </div>
          <div className="fn_cs_counter_list">
            <ul>
              <li>
                <div className="item">
                  <h3 className="fn__gradient_title">
                    <span className="prefix"></span>
                    <span className="fn_cs_counter" data-from="0" data-to="9999" data-speed="3000" data-decimals="0">
                      #8
                    </span>
                    <span className="suffix"></span>
                  </h3>
                  <p>Current epoch</p>
                  <div className="divider"></div>
                </div>
              </li>
              <li>
                <div className="item">
                  <h3 className="fn__gradient_title">
                    <span className="prefix"></span>
                    <span className="fn_cs_counter" data-from="0" data-to="3.9" data-speed="3000" data-decimals="1">
                      4,742
                    </span>
                  </h3>
                  <p>Staked NFT</p>
                  <div className="divider"></div>
                </div>
              </li>
              <li>
                <div className="item">
                  <h3 className="fn__gradient_title">
                    <span className="prefix"></span>
                    <span className="fn_cs_counter" data-from="0" data-to="2.4" data-speed="3000" data-decimals="1">
                      62,280
                    </span>
                    <span className="suffix"></span>
                  </h3>
                  <p>Total Reward</p>
                  <div className="divider"></div>
                </div>
              </li>
              <li>
                <div className="item">
                  <h3 className="fn__gradient_title">
                    <span className="prefix"></span>
                    <span className="fn_cs_counter" data-from="0" data-to="144" data-speed="3000" data-decimals="0">
                      121.38%
                    </span>
                  </h3>
                  <p>Max APR</p>
                  <div className="divider"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="fn_cs_shortabout" style={{ marginTop: "100px" }}>
          <div className="about_left">
            <h3 className="fn__maintitle" data-text="Stake NFT">
              Stake NFT
            </h3>
            <div className="fn_cs_divider">
              <div className="divider">
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="desc">
              <p>
                As the first hero of the Meta Legends, collection has over 9,999 unique skins drawn from the different
                missions and challenges he faced throughout his life.
              </p>
            </div>
            <div>
              <button className="default-btn" style={{ marginRight: "20px" }}>
                Stake
              </button>
              <button className="default-btn" style={{ marginRight: "20px" }}>
                Unstake
              </button>
            </div>
          </div>
          <div className="nft_list about_right">
            <img className="nft_list_item" src={nft_4} />
            <img className="nft_list_item" src={nft_4} />
            <img className="nft_list_item" src={nft_4} />
            <img className="nft_list_item" src={nft_4} />
            <img className="nft_list_item" src={nft_4} />
            <img className="nft_list_item" src={nft_4} />
          </div>
        </div>
      </div>
      <Footer />
    </SEO>
  );
}

export default NftStake;
