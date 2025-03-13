import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import Avatar from "../../components/Avatar/Avatar";
import API_URLS from "../../config/apiUrls";
import useApi from "../../hooks/useApi";
import calculateAge from "../../util/calculateAge";
import "./childLayout.scss";
import EditChildButton from "./partials/EditChildButton";
import RemoveChildButton from "./partials/RemoveChildButton";
import LatestRecord from "./partials/LatestRecord";
import baby_girl from "../../assets/img/illustrations/baby_girl.jpg";
import baby_boy from "../../assets/img/illustrations/baby_boy.jpg";
import ChildAvatar from "../../components/Avatar/ChildAvatar";
export default function ChildLayout() {
  const params = useParams();
  const id = params.childId;

  const permissions = Cookies.get("permissions");
  const location = useLocation();
  const storedUser = Cookies.get("user");
  const parent = JSON.parse(storedUser);
  const apiUrl = `${API_URLS.CHILDREN.GET_CHILDREN_WITH_ID}${id}`;
  const [activePill, setActivePill] = useState("");
  const nav = useNavigate();
  const { response, callApi } = useApi({
    url: apiUrl,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response?.data) {
      // Chắc chắn rằng response.data đã tồn tại
      console.log("API Response:", response.data); // Debug dữ liệu nhận được
      if (response.data.dob) {
        const name = response.data.fullName;
        const age = calculateAge(response.data.dob);
        const bloodType = response.data.bloodType;
        const gender = response.data.gender;
        localStorage.setItem("name", name);
        localStorage.setItem("userAge", age);
        localStorage.setItem("bloodType", bloodType);
        localStorage.setItem("gender", gender);
        console.log(
          "Lưu tuổi và máu vào localStorage:",
          age,
          bloodType,
          gender
        ); // Kiểm tra xem có lưu được không
      }
    }
  }, [response]);

  useEffect(() => {
    const active = Object.keys(pillRoutes).find(
      (key) => pillRoutes[key] === location.pathname
    );
    setActivePill(active || "");
  }, [location.pathname]);

  const handlePillClick = (pill) => {
    nav(pillRoutes[pill]);
  };
  const pillRoutes = {
    "": `/member/children/${id}`,
    indicators: `/member/children/${id}/indicators`,
    teeth: `/member/children/${id}/teeth`,
    vaccinations: `/member/children/${id}/vaccinations`,
  };
  if (!response) {
    return <div> loading</div>;
  }
  console.log(location.pathname);
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-5 order-1 order-md-0 ">
        {/* <!-- User Card --> */}
        <div
          className="card mb-6  "
          style={{ position: "sticky", top: "90px", zIndex: "1" }}
        >
          <div className="card-body pt-12 text-container">
            <ul class="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div className="user-avatar-section">
              <ChildAvatar
                childData={response.data}
                src={
                  response.data.avatar
                    ? response.data.avatar
                    : response.data.gender === "male"
                    ? baby_boy
                    : baby_girl
                }
                className={"img-fluid border rounded mb-4"}
                apiUrl={apiUrl}
                refetch={callApi}
              />
            </div>
            <div className="d-flex justify-content-around flex-wrap my-6 gap-0 gap-md-3 gap-lg-4">
              <LatestRecord id={id} />
            </div>
            <div className="info-container">
              <ul className="list-unstyled mb-6">
                <li className="mb-2">
                  <span className="h6 text-subtitle">Full Name: </span>
                  <span className="text-data">{response.data.fullName}</span>
                </li>
                <li className="mb-2">
                  <span className="h6 text-subtitle">Parent Email: </span>
                  <span className="text-data">{parent.email}</span>
                </li>

                <li className="mb-2">
                  <span className="h6 text-subtitle">Age: </span>
                  <span className="text-data">
                    {calculateAge(response.data.dob)}
                  </span>
                </li>
                <li className="mb-2">
                  <span className="h6 text-subtitle">Gender: </span>
                  <span className="text-data">
                    {response.data.gender === "male" ? "Male" : "Female"}
                  </span>
                </li>
                <li className="mb-2">
                  <span className="h6 text-subtitle">Date of Birth: </span>
                  <span className="text-data">{response.data.dob}</span>
                </li>
                <li className="mb-2">
                  <span className="h6 text-subtitle">Blood Type: </span>
                  <span className="text-data">{response.data.bloodType}</span>
                </li>
                <li className="mb-2">
                  <span className="h6 text-subtitle">Allergies: </span>
                  <span className="text-data">
                    {response.data.allergies ? response.data.allergies : "None"}
                  </span>
                </li>
                <li className="mb-2">
                  <span className="h6 text-subtitle">Chronic Condition: </span>
                  <span className="text-data">
                    {response.data.chronicConditions
                      ? response.data.chronicConditions
                      : "None"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-center">
              <EditChildButton childData={response.data} refetch={callApi} />
              <RemoveChildButton childId={response.data.childrenId} />
            </div>
          </div>
        </div>
        {/* <!-- /User Card --> */}
      </div>
      <div className="col-xl-8 col-lg-7 order-0 order-md-1">
        {/* <!-- User Pills --> */}
        <div className="nav-align-top">
          <ul className="nav nav-pills flex-column flex-md-row mb-6 flex-wrap row-gap-2">
            {Object.keys(pillRoutes).map((key) => (
              <li className="nav-item" role="button" key={key}>
                <button
                  className={`nav-link ${activePill === key ? "active" : ""}`}
                  onClick={() => handlePillClick(key)}
                >
                  {key === ""
                    ? "Overview"
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* <!--/ User Pills --> */}
        <Outlet context={permissions} childId={response.data.childrenId} />
      </div>
    </div>
  );
}
