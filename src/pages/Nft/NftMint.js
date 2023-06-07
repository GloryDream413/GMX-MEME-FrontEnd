import "./Nft.css";
import React from "react";
import { Trans, t } from "@lingui/macro";
import SEO from "components/Common/SEO";
import Footer from "components/Footer/Footer";
import { getPageTitle, isHashZero } from "lib/legacy";

import nft_tmp from "img/nft/tmp.jpg";
import nft_1 from "img/nft/1.jpg";
import nft_2 from "img/nft/2.jpg";
import nft_3 from "img/nft/3.jpg";
import nft_4 from "img/nft/4.jpg";
import nft_5 from "img/nft/5.jpg";

function NftMint({ connectWallet, setPendingTxns, pendingTxns }) {
  return (
    <SEO title={getPageTitle("NFT Mint")}>
      <div className="metaportal_fn_main">
        <div className="metaportal_fn_content">
          <section id="home">
            <div className="container">
              <div className="fn_cs_slider" data-responsive="on">
                <div className="slider_top">
                  <img src={nft_tmp} alt="" />
                  <ul>
                    <li className="prev" data-index="1">
                      <div className="item">
                        <img src={nft_tmp} alt="" />
                        <div className="item_in">
                          <div
                            className="img"
                            data-bg-img={nft_1}
                            style={{ background: "url(" + nft_1 + ") 0% 0% / 100% 100%" }}
                          ></div>
                        </div>
                      </div>
                    </li>
                    <li className="active" data-index="2">
                      <div className="item">
                        <img src={nft_tmp} alt="" />
                        <div className="item_in">
                          <div
                            className="img"
                            data-bg-img={nft_2}
                            style={{ background: "url(" + nft_2 + ") 0% 0% / 100% 100%" }}
                          ></div>
                        </div>
                      </div>
                    </li>
                    <li className="next" data-index="3">
                      <div className="item">
                        <img src={nft_tmp} alt="" />
                        <div className="item_in">
                          <div
                            className="img"
                            data-bg-img={nft_3}
                            style={{ background: "url(" + nft_3 + ") 0% 0% / 100% 100%" }}
                          ></div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section id="fun_facts">
            <div className="container">
              <div className="fn_cs_counter_list">
                <ul>
                  <li>
                    <div className="item">
                      <h3 className="fn__gradient_title">
                        <span className="prefix"></span>
                        <span
                          className="fn_cs_counter"
                          data-from="0"
                          data-to="9999"
                          data-speed="3000"
                          data-decimals="0"
                        >
                          0
                        </span>
                        <span className="suffix"></span>
                      </h3>
                      <p>Total Items</p>
                      <div className="divider"></div>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <h3 className="fn__gradient_title">
                        <span className="prefix"></span>
                        <span className="fn_cs_counter" data-from="0" data-to="3.9" data-speed="3000" data-decimals="1">
                          0
                        </span>
                        <span className="suffix">k+</span>
                      </h3>
                      <p>Total Owners</p>
                      <div className="divider"></div>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <h3 className="fn__gradient_title">
                        <span className="prefix"></span>
                        <span className="fn_cs_counter" data-from="0" data-to="2.4" data-speed="3000" data-decimals="1">
                          0
                        </span>
                        <span className="suffix"></span>
                      </h3>
                      <p>Floor Price (ETH)</p>
                      <div className="divider"></div>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <h3 className="fn__gradient_title">
                        <span className="prefix"></span>
                        <span className="fn_cs_counter" data-from="0" data-to="144" data-speed="3000" data-decimals="0">
                          0
                        </span>
                        <span className="suffix">k+</span>
                      </h3>
                      <p>Volume Traded (ETH)</p>
                      <div className="divider"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section id="about2">
            <div className="container small">
              <div className="fn_cs_shortabout">
                <div className="about_left">
                  <h3 className="fn__maintitle" data-text="MINT NFT">
                    MINT NFT
                  </h3>
                  <div className="fn_cs_divider">
                    <div className="divider">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="desc">
                    <p>
                      As the first hero of the Meta Legends, collection has over 9,999 unique skins drawn from the
                      different missions and challenges he faced throughout his life.
                    </p>
                  </div>
                  <div>
                    <input type="text" placeholder="Input NFT Amount" className="text-input mb-sm" />
                    <button className="default-btn" style={{ marginRight: "20px" }}>
                      Mint NFT
                    </button>
                    <button className="default-btn">Join Discord</button>
                  </div>
                </div>
                <div className="about_right">
                  <div
                    className="abs_img"
                    data-bg-img={nft_5}
                    style={{
                      background: "url(" + nft_5 + ")",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="fn_cs_steps gap" data-cols="4" data-gap="60">
                <ul>
                  <li>
                    <div className="item">
                      <div className="item_in">
                        <h3 className="fn__gradient_title">01</h3>
                        <p>Connect your Wallet</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <div className="item_in">
                        <h3 className="fn__gradient_title">02</h3>
                        <p>Select Your Quantity</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <div className="item_in">
                        <h3 className="fn__gradient_title">03</h3>
                        <p>Confirm The Transaction</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                      <div className="item_in">
                        <h3 className="fn__gradient_title">04</h3>
                        <p>Receive Your NFT’s</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="fn_cs_join">
                <div className="join_in">
                  <h3 className="fn__maintitle upper" data-text="Join Our Community">
                    Join Our Community
                  </h3>
                  <p>
                    There are many variations of passages of lorem ipsum available, but the majority have suffered
                    alteration in some form, by injected humour, or randomised words which don't look even slightly
                    believable.
                  </p>
                  <div className="buttons">
                    <a href="https://opensea.io/" className="metaportal_fn_button" target="_blank" rel="noreferrer">
                      <span>Buy On Opensea</span>
                    </a>
                    <a href="#" className="metaportal_fn_button" target="_blank">
                      <span>WhiteList Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </SEO>
  );
}

export default NftMint;
