import React, { use, useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { useParams } from "react-router";
import API_URLS from "../../../config/apiUrls";
import { toDMY } from "../../../util/dateFormat";
import UpdateToothRecord from "./UpdateToothRecord";
import CreateToothRecord from "./CreateToothRecord";

export default function ToothNote({ toothNumber }) {
  const id = useParams().id;
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
      console.log("tooth nay ne", tooth);
      if (tooth) {
        setToothData({
          recordId: tooth.id,
          eruptionDate: tooth.eruptionDate || "",
          note: tooth.note || "",
        });
      } else {
        setToothData({ eruptionDate: "", note: "" });
      }
      console.log("tooth data day ne", toothData);
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
        />
      ) : (
        <CreateToothRecord toothId={toothNumber + 2} refetch={callApi} />
      )}
    </div>
  );
}
