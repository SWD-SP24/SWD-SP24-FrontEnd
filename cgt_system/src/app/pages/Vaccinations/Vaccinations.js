import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API_URLS from "../../config/apiUrls";
import useApi from "../../hooks/useApi";
import VaccineTable from "./partials/VaccineTable";

export default function Vaccinations() {
  const childId = useParams().id;
  const url = `${API_URLS.VACCINATIONS.VACCINATIONS_SCHEDULE}?pageNumber=1&pageSize=7&sortByAge=true`;

  const { response, callApi } = useApi({
    url: url,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <div class="card mb-6">
      <h5 class="card-header pb-0 text-md-start text-center">Vaccine List</h5>
      <VaccineTable vaccineList={response} refetch={callApi} />
    </div>
  );
}
