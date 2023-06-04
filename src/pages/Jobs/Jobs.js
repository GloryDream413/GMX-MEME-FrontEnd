import React from "react";
import "./Jobs.css";
import SEO from "components/Common/SEO";
import Footer from "components/Footer/Footer";
import { getPageTitle } from "lib/legacy";
import Card from "components/Common/Card";
import { t, Trans } from "@lingui/macro";
import ExternalLink from "components/ExternalLink/ExternalLink";

function Jobs() {
  return (
    <SEO title={getPageTitle("Job Openings")}>
      <div className="default-container page-layout Referrals">
        <div className="section-title-block">
          <div className="section-title-icon" />
          <div className="section-title-content">
            <div className="Page-title">
              <Trans>Jobs</Trans>
            </div>
            <div className="Page-description">
              <Trans>Job openings at $POOPE.</Trans>
            </div>
          </div>
        </div>
        <div className="jobs-page-body">
          <NoJob />
        </div>
      </div>
      <Footer />
    </SEO>
  );
}

function NoJob() {
  return (
    <Card title={t`No open positions at $POOPE currently`}>
      <div className="body-para">
        <p className="subheading">
          <Trans>
            $POOPE is not actively looking for new hires at the moment. However, if you think you can contribute to the
            project, please email <ExternalLink href="mailto:jobs@gmx.io">jobs@gmx.io</ExternalLink>.
          </Trans>
        </p>
      </div>
    </Card>
  );
}

export default Jobs;
