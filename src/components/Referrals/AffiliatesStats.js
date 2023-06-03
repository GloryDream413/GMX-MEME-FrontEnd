import { useMemo, useRef, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { FiPlus, FiTwitter } from "react-icons/fi";
import { useCopyToClipboard } from "react-use";
import { IoWarningOutline } from "react-icons/io5";
import { BiCopy, BiErrorCircle } from "react-icons/bi";
import Card from "../Common/Card";
import Modal from "../Modal/Modal";
import { shortenAddress } from "lib/legacy";
import EmptyMessage from "./EmptyMessage";
import InfoCard from "./InfoCard";
import {
  getReferralCodeTradeUrl,
  getTierIdDisplay,
  getTwitterShareUrl,
  getUSDValue,
  isRecentReferralCodeNotExpired,
  tierRebateInfo,
} from "./referralsHelper";
import { AffiliateCodeForm } from "./AddAffiliateCode";
import TooltipWithPortal from "../Tooltip/TooltipWithPortal";
import { MAINNET, getExplorerUrl } from "config/chains";
import { helperToast } from "lib/helperToast";
import { bigNumberify, formatAmount } from "lib/numbers";
import { getNativeToken, getToken } from "config/tokens";
import { formatDate } from "lib/dates";
import ExternalLink from "components/ExternalLink/ExternalLink";

function AffiliatesStats({
  referralsData,
  handleCreateReferralCode,
  chainId,
  setRecentlyAddedCodes,
  recentlyAddedCodes,
}) {
  const [isAddReferralCodeModalOpen, setIsAddReferralCodeModalOpen] = useState(false);
  const addNewModalRef = useRef(null);

  const [, copyToClipboard] = useCopyToClipboard();
  const open = () => setIsAddReferralCodeModalOpen(true);
  const close = () => setIsAddReferralCodeModalOpen(false);

  const { cumulativeStats, referrerTotalStats, rebateDistributions, referrerTierInfo } = referralsData;
  const allReferralCodes = referrerTotalStats.map((c) => c.referralCode.trim());
  const finalAffiliatesTotalStats = useMemo(
    () =>
      recentlyAddedCodes.filter(isRecentReferralCodeNotExpired).reduce((acc, cv) => {
        if (!allReferralCodes.includes(cv.referralCode)) {
          acc = acc.concat(cv);
        }
        return acc;
      }, referrerTotalStats),
    [allReferralCodes, referrerTotalStats, recentlyAddedCodes]
  );

  const tierId = referrerTierInfo?.tierId;
  let referrerRebates = bigNumberify(0);
  if (cumulativeStats && cumulativeStats.totalRebateUsd && cumulativeStats.discountUsd) {
    referrerRebates = cumulativeStats.totalRebateUsd.sub(cumulativeStats.discountUsd);
  }
  return (
    <div className="referral-body-container">
      <div className="referral-stats">
        <InfoCard
          label={t`Total Traders Referred`}
          tooltipText={t`Amount of traders you referred.`}
          data={cumulativeStats?.registeredReferralsCount || "0"}
        />
        <InfoCard
          label={t`Total Trading Volume`}
          tooltipText={t`Volume traded by your referred traders.`}
          data={getUSDValue(cumulativeStats?.volume)}
        />
        <InfoCard
          label={t`Total Rebates`}
          tooltipText={t`Rebates earned by this account as an affiliate.`}
          data={getUSDValue(referrerRebates, 4)}
        />
      </div>
      <div className="list">
        <Modal
          className="Connect-wallet-modal"
          isVisible={isAddReferralCodeModalOpen}
          setIsVisible={close}
          label={t`Create Referral Code`}
          onAfterOpen={() => addNewModalRef.current?.focus()}
        >
          <div className="edit-referral-modal">
            <AffiliateCodeForm
              handleCreateReferralCode={handleCreateReferralCode}
              recentlyAddedCodes={recentlyAddedCodes}
              setRecentlyAddedCodes={setRecentlyAddedCodes}
              callAfterSuccess={close}
            />
          </div>
        </Modal>
        <Card
          title={
            <div className="referral-table-header">
              <p className="title">
                <Trans>Referral Codes</Trans>{" "}
                <span className="sub-title">
                  {referrerTierInfo && t`Tier ${getTierIdDisplay(tierId)} (${tierRebateInfo[tierId]}% rebate)`}
                </span>
              </p>
              <button className="transparent-btn" onClick={open}>
                <FiPlus />{" "}
                <span className="ml-small">
                  <Trans>Create</Trans>
                </span>
              </button>
            </div>
          }
        >
          <div className="table-wrapper">
            <table className="referral-table">
              <thead>
                <tr>
                  <th className="table-head" scope="col">
                    <Trans>Referral Code</Trans>
                  </th>
                  <th className="table-head" scope="col">
                    <Trans>Total Volume</Trans>
                  </th>
                  <th className="table-head" scope="col">
                    <Trans>Traders Referred</Trans>
                  </th>
                  <th className="table-head" scope="col">
                    <Trans>Total Rebates</Trans>
                  </th>
                </tr>
              </thead>
              <tbody>
                {finalAffiliatesTotalStats.map((stat, index) => {
                  const ownerOnOtherChain = stat?.ownerOnOtherChain;
                  let referrerRebate = bigNumberify(0);
                  if (stat && stat.totalRebateUsd && stat.discountUsd) {
                    referrerRebate = stat.totalRebateUsd.sub(stat.discountUsd);
                  }
                  return (
                    <tr key={index}>
                      <td data-label="Referral Code">
                        <div className="table-referral-code">
                          <span className="referral-text ">{stat.referralCode}</span>
                          <div
                            onClick={() => {
                              copyToClipboard(getReferralCodeTradeUrl(stat.referralCode));
                              helperToast.success("Referral link copied to your clipboard");
                            }}
                            className="referral-code-icon"
                          >
                            <BiCopy />
                          </div>
                          <a
                            href={getTwitterShareUrl(stat.referralCode)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="referral-code-icon"
                          >
                            <FiTwitter />
                          </a>
                        </div>
                      </td>
                      <td data-label="Total Volume">{getUSDValue(stat.volume)}</td>
                      <td data-label="Traders Referred">{stat.registeredReferralsCount}</td>
                      <td data-label="Total Rebates">{getUSDValue(referrerRebate, 4)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      {rebateDistributions?.length > 0 ? (
        <div className="reward-history">
          <Card title={t`Rewards Distribution History`} tooltipText={t`Rewards are airdropped weekly.`}>
            <div className="table-wrapper">
              <table className="referral-table">
                <thead>
                  <tr>
                    <th className="table-head" scope="col">
                      <Trans>Date</Trans>
                    </th>
                    <th className="table-head" scope="col">
                      <Trans>Amount</Trans>
                    </th>
                    <th className="table-head" scope="col">
                      <Trans>Transaction</Trans>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rebateDistributions.map((rebate, index) => {
                    let tokenInfo;
                    try {
                      tokenInfo = getToken(chainId, rebate.token);
                    } catch {
                      tokenInfo = getNativeToken(chainId);
                    }
                    const explorerURL = getExplorerUrl(chainId);
                    return (
                      <tr key={index}>
                        <td className="table-head" data-label="Date">
                          {formatDate(rebate.timestamp)}
                        </td>
                        <td className="table-head" data-label="Amount">
                          {formatAmount(rebate.amount, tokenInfo.decimals, 6, true)} {tokenInfo.symbol}
                        </td>
                        <td className="table-head" data-label="Transaction">
                          <ExternalLink href={explorerURL + `tx/${rebate.transactionHash}`}>
                            {shortenAddress(rebate.transactionHash, 13)}
                          </ExternalLink>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : (
        <EmptyMessage
          tooltipText={t`Rebates are airdropped weekly.`}
          message={t`No rebates distribution history yet.`}
        />
      )}
    </div>
  );
}

export default AffiliatesStats;
