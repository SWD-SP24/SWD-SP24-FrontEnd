import React from "react";
import BillingRow from "./BillingRow";

export default function BillingTable({ billings }) {
  console.log(billings);

  return (
    <div className="justify-content-between dt-layout-table">
      <div className="d-md-flex justify-content-between align-items-center table-responsive dt-layout-full">
        <table
          className="datatables-users table border-top dtr-column dataTable"
          id="DataTables_Table_0"
          aria-describedby="DataTables_Table_0_info"
          style={{ width: "100%" }}
        >
          <colgroup>
            <col data-dt-column="1" style={{ width: "41.775px" }} />
            <col data-dt-column="2" style={{ width: "167.137px" }} />
            <col data-dt-column="3" style={{ width: "163.488px" }} />
            <col data-dt-column="4" style={{ width: "106.95px" }} />
            <col data-dt-column="5" style={{ width: "227.137px" }} />
            <col data-dt-column="6" style={{ width: "10.125px" }} />
            <col data-dt-column="7" style={{ width: "80.387px" }} />
          </colgroup>

          <thead>
            <tr>
              <th
                data-dt-column="1"
                rowSpan="1"
                colSpan="1"
                className="dt-orderable-asc dt-orderable-desc dt-ordering-desc"
                aria-sort="descending"
                aria-label="User: Activate to remove sorting"
                tabIndex="0"
              >
                <span className="dt-column-title" role="button">
                  #
                </span>
                <span className="dt-column-order"></span>
              </th>
              <th
                data-dt-column="2"
                rowSpan="1"
                colSpan="1"
                className="dt-orderable-asc dt-orderable-desc"
                aria-label="Role: Activate to sort"
                tabIndex="0"
              >
                <span className="dt-column-title" role="button">
                  Old Plan
                </span>
                <span className="dt-column-order"></span>
              </th>
              <th
                data-dt-column="3"
                rowSpan="1"
                colSpan="1"
                className="dt-orderable-asc dt-orderable-desc"
                aria-label="Role: Activate to sort"
                tabIndex="0"
              >
                <span className="dt-column-title" role="button">
                  New Plan
                </span>
                <span className="dt-column-order"></span>
              </th>
              <th
                data-dt-column="4"
                rowSpan="1"
                colSpan="1"
                className="dt-orderable-asc dt-orderable-desc"
                aria-label="Plan: Activate to sort"
                tabIndex="0"
              >
                <span className="dt-column-title" role="button">
                  Total
                </span>
                <span className="dt-column-order"></span>
              </th>
              <th
                data-dt-column="5"
                rowSpan="1"
                colSpan="1"
                className="dt-orderable-asc dt-orderable-desc"
                aria-label="Status: Activate to sort"
                tabIndex="0"
              >
                <span className="dt-column-title" role="button">
                  Issued Date
                </span>
                <span className="dt-column-order"></span>
              </th>
              <th
                data-dt-column="6"
                rowSpan="1"
                colSpan="1"
                className="dt-orderable-asc dt-orderable-desc"
                aria-label="Status: Activate to sort"
                tabIndex="0"
              >
                <span className="dt-column-title" role="button">
                  Payment
                </span>
                <span className="dt-column-order"></span>
              </th>
              <th
                data-dt-column="7"
                rowSpan="1"
                colSpan="1"
                className="dt-orderable-asc dt-orderable-desc ps-0"
                aria-label="Status: Activate to sort"
                tabIndex="0"
              >
                <span className="dt-column-title" role="button">
                  Action
                </span>
                <span className="dt-column-order"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {billings.length > 0 ? (
              billings.map((billingItem, index) => (
                <BillingRow
                  key={billingItem.paymentId}
                  billingItem={billingItem}
                  index={index}
                />
              ))
            ) : (
              <tr>
                <td colspan="7" class="dt-empty">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
