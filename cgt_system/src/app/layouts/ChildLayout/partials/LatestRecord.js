import React, { useEffect } from "react";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";

export default function LatestRecord({ id }) {
  const { response, callApi } = useApi({
    url: `${API_URLS.INDICATORS.LATEST_RECORD}?childrenId=${id}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    console.log(response);
  }, [response]);

  if (!response) return <div>Loading...</div>;
  return (
    <>
      <div className="d-flex align-items-center me-5 gap-4">
        <div className="avatar">
          <div className="avatar-initial bg-label-primary rounded w-px-40 h-px-40">
            <i className="icon-base bx bx-trending-up icon-lg"></i>
          </div>
        </div>
        <div>
          <h6 className="mb-0">{response.data.height} cm</h6>
          <span>Height</span>
        </div>
      </div>
      <div className="d-flex align-items-center gap-4">
        <div className="avatar">
          <div className="avatar-initial bg-label-primary rounded w-px-40 h-px-40">
            <i className="icon-base bx bx-body icon-lg"></i>
          </div>
        </div>
        <div>
          <h6 className="mb-0">{response.data.weight} kg</h6>
          <span>Weight</span>
        </div>
      </div>
    </>
  );
}
