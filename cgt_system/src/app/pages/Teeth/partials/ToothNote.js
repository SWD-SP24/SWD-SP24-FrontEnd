import React, { use, useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { useParams } from "react-router";
import API_URLS from "../../../config/apiUrls";
import { toDMY } from "../../../util/dateFormat";
import UpdateToothRecord from "./UpdateToothRecord";
import CreateToothRecord from "./CreateToothRecord";

export default function ToothNote({ toothNumber, setToothRecord, dob }) {
  const id = useParams().childId;
  const [toothData, setToothData] = useState({
    recordId: "",
    eruptionDate: "",
    note: "",
  });
  const { response, callApi } = useApi({
    url: `${API_URLS.TEETH_RECORD.TEETH_RECORD}?childId=${id}&pageNumber=1&pageSize=999`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response?.data) {
      const tooth = response.data.find(
        (tooth) => tooth.toothId === toothNumber + 2
      );
      if (tooth) {
        setToothData({
          recordId: tooth.id,
          eruptionDate: tooth.eruptionDate || "",
          note: tooth.note || "",
        });
      } else {
        setToothData({ eruptionDate: "", note: "" });
      }
      setToothRecord(response.data);
    }
  }, [response, toothNumber]);
  return (
    <div>
      {toothData.recordId !== "" &&
      toothData.eruptionDate !== "" &&
      toothData.note !== "string" ? (
        <UpdateToothRecord
          toothData={toothData}
          setToothData={setToothData}
          refetch={callApi}
          dob={dob}
        />
      ) : (
        <CreateToothRecord
          toothId={toothNumber + 2}
          refetch={callApi}
          dob={dob}
        />
      )}
    </div>
  );
}
