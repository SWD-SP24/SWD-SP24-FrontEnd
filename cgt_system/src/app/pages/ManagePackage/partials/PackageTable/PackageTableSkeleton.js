import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PackageTableSkeleton() {
  return (
    <div className="justify-content-between dt-layout-table">
      <div className="d-md-flex justify-content-between align-items-center table-responsive dt-layout-full">
        <table
          className="datatables-users table border-top dtr-column dataTable"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>
                <Skeleton height={20} width={100} />
              </th>
              <th>
                <Skeleton height={20} width={70} />
              </th>
              <th>
                <Skeleton height={20} width={100} />
              </th>
              <th>
                <Skeleton height={20} width={80} />
              </th>
              <th>
                <Skeleton height={20} width={90} />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton height={25} width={"90%"} />
                  </td>
                  <td>
                    <Skeleton height={25} width={"60%"} />
                  </td>
                  <td>
                    <Skeleton height={25} width={"80%"} />
                  </td>
                  <td>
                    <Skeleton height={25} width={"50%"} />
                  </td>
                  <td>
                    <Skeleton height={25} width={"70%"} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
