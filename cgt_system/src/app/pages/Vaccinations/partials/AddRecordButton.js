import React, { use, useEffect, useRef } from "react";
import useApi from "../../../hooks/useApi";
import API_URLS from "../../../config/apiUrls";
import { useParams } from "react-router";
import { toDMY } from "../../../util/dateFormat";
import AddVaccineModal from "./AddVaccineModal";

export default function AddRecordButton({ refetch }) {
  const { response, callApi } = useApi({
    url: `${API_URLS.VACCINATIONS.VACCINE}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <>
      <button
        className="btn add-new btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalAddRecord"
      >
        <span>
          <i className="icon-base bx bx-plus icon-sm me-0 me-sm-2"></i>
          <span className="d-none d-sm-inline-block">Add New Record</span>
        </span>
      </button>
      {response && (
        <AddVaccineModal refetch={refetch} vaccines={response.data} />
      )}
    </>
  );
}
