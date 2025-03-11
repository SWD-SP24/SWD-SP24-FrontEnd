import React from "react";
import styles from "./childHealthBook.module.scss";

const VaccinationHistoryPage = () => (
  <>
    <h2>💉Vaccination History</h2>
    <table className={styles.infoTable_indicators}>
      <colgroup>
        <col style={{ width: "25%" }} />
        <col style={{ width: "25%" }} />
        <col style={{ width: "25%" }} />
        <col style={{ width: "25%" }} />
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Dose Number</th>
          <th>Date</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hepatitis B</td>
          <td>1/2</td>
          <td>2024-01-05</td>
          <td>No reaction</td>
        </tr>
        <tr>
          <td>Hepatitis B</td>
          <td>1/2</td>
          <td>2024-01-05</td>
          <td>No reaction</td>
        </tr>
        <tr>
          <td>Hepatitis B</td>
          <td>1/2</td>
          <td>2024-01-05</td>
          <td>No reaction</td>
        </tr>
      </tbody>
    </table>
  </>
);

export default VaccinationHistoryPage;
