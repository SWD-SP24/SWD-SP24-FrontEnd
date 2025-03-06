import React from "react";
import UpgradePlanModal from "../../../UpgradePlanModal/UpgradePlanModal";

export default function Summary({ checkoutInfo, isYearly }) {
  return (
    <>
      <div className="col-lg-5 card-body p-md-8">
        <h4 className="mb-2">Summary</h4>
        <p className="mb-8">
          Review the upgrade details before proceeding with payment.
        </p>
        <div className="bg-lighter p-6 rounded">
          <p>{checkoutInfo?.membershipPackage?.summary}</p>
          <div className="d-flex align-items-center mb-4">
            <h1 className="text-heading mb-0">
              $
              {isYearly
                ? checkoutInfo?.membershipPackage?.yearlyPrice
                : checkoutInfo?.membershipPackage?.price}
            </h1>
            <sub className="h6 text-body mb-n3">
              {isYearly ? "/year" : "/month"}
            </sub>
            {isYearly && (
              <s className="text-body-secondary ms-2 mt-3 fs-4">
                ${(checkoutInfo?.membershipPackage?.price * 12).toFixed(2)}{" "}
                /year
              </s>
            )}
          </div>
          <div className="d-grid">
            <button
              type="button"
              data-bs-target="#upgradePlanModal"
              data-bs-toggle="modal"
              className="btn btn-label-primary"
            >
              Change Plan
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Subtotal</p>
            <h6 className="mb-0">
              $
              {isYearly
                ? checkoutInfo?.membershipPackage?.price * 12
                : checkoutInfo?.membershipPackage?.price}
            </h6>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <p className="mb-0">Discount</p>
            <h6 className="mb-0">
              - $
              {isYearly
                ? (
                    checkoutInfo?.membershipPackage?.price * 12 -
                    checkoutInfo?.membershipPackage?.yearlyPrice
                  ).toFixed(2)
                : 0}
            </h6>
          </div>

          <hr />
          <div className="d-flex justify-content-between align-items-center mt-2">
            <p className="mb-0">Saved</p>
            <h6 className="mb-0 text-primary">
              - $
              {isYearly
                ? (
                    checkoutInfo?.membershipPackage?.price * 12 -
                    checkoutInfo?.membershipPackage?.yearlyPrice
                  ).toFixed(2)
                : 0}
            </h6>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4 pb-1">
            <p className="mb-0">Total</p>
            <h6 className="mb-0">
              <strong>
                $
                {isYearly
                  ? checkoutInfo?.membershipPackage?.yearlyPrice
                  : checkoutInfo?.membershipPackage?.price}
              </strong>
            </h6>
          </div>
          <div className="d-grid mt-5">
            <button className="btn btn-success">
              <span className="me-2">Proceed with Payment</span>
              <i className="icon-base bx bx-right-arrow-alt scaleX-n1-rtl"></i>
            </button>
          </div>

          <p className="mt-8">
            By continuing, you accept to our Terms of Services and Privacy
            Policy. Please note that payments are non-refundable.
          </p>
        </div>
      </div>
      <UpgradePlanModal />
    </>
  );
}
