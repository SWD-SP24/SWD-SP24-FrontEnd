import React, { useEffect, useState } from "react";
import styles from "./childHealthBook.module.scss";
import API_URLS from "../../config/apiUrls";
import useApi from "../../hooks/useApi";

export default function VaccinationHistoryPage({ childId }) {
  const [vaccinations, setVaccinations] = useState([]);
  const url = `${API_URLS.VACCINE_RECORD.VACCINE_RECORD}?childId=${childId}`;

  const { response, callApi } = useApi({
    url: url,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response?.status === "successful") {
      const vaccinations = response.data;
      setVaccinations(vaccinations);
    }
  }, [response]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return dateString.replace(/\//g, "-");
  };
  return (
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
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {vaccinations?.map((vaccination) => (
            <tr key={vaccination.vaccineRecordId}>
              <td>{vaccination.vaccineName}</td>
              <td>{vaccination.dose}</td>
              <td>{formatDate(vaccination.administeredDate)}</td>
              <td>None</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
