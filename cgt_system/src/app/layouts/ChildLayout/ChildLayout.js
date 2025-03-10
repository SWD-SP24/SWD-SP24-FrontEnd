import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
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
export default function ChildLayout() {
  const params = useParams();
  console.log("Params in ChildLayout:", params); // Debugging
  const id = params.childId;

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
        const age = calculateAge(response.data.dob);
        const bloodType = response.data.bloodType;
        const gender = response.data.gender;
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

  if (!response) {
    return <div> loading</div>;
  }

  const handlePillClick = (pill) => {
    setActivePill(pill);
    if (pill === "") {
      nav(`/member/children/${id}`);
    }
    if (pill === "indicators") {
      nav(`/member/children/${id}/indicators`);
    }
    if (pill === "teeth") {
      nav(`/member/children/${id}/teeth`);
    }
    if (pill === "vaccinations") {
      nav(`/member/children/${id}/vaccinations`);
    }
  };

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
              <div className=" d-flex align-items-center flex-column">
                <Avatar
                  src={
                    response.data.avatar
                      ? response.data.avatar
                      : response.data.gender === "male"
                      ? baby_boy
                      : baby_girl
                  }
                  className="img-fluid border rounded mb-4"
                />
                <div className="user-info text-center">
                  <h4 className="te xt-data">{response.data.fullName}</h4>
                </div>
              </div>
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
            <li className="nav-item" role="button">
              <button
                className={"nav-link " + (activePill === "" ? "active" : "")}
                onClick={() => handlePillClick("")}
              >
                <i className="icon-base bx bx-line-chart icon-sm me-1_5"></i>
                Overview
              </button>
            </li>
            <li className="nav-item" role="button">
              <button
                className={
                  "nav-link " + (activePill === "indicators" ? "active" : "")
                }
                onClick={() => handlePillClick("indicators")}
              >
                <i className="icon-base bx bx-list-ol icon-sm me-1_5"></i>
                Indicators
              </button>
            </li>
            <li className="nav-item" role="button">
              <button
                className={
                  "nav-link " + (activePill === "teeth" ? "active" : "")
                }
                onClick={() => handlePillClick("teeth")}
              >
                <i className="icon-base bx bx-smile icon-sm me-1_5"></i>Teeth
              </button>
            </li>
            <li className="nav-item" role="button">
              <button
                className={
                  "nav-link " + (activePill === "vaccinations" ? "active" : "")
                }
                onClick={() => handlePillClick("vaccinations")}
              >
                <i className="icon-base bx bx-injection icon-sm me-1_5"></i>
                Vaccinations
              </button>
            </li>
          </ul>
        </div>
        {/* <!--/ User Pills --> */}
        <Outlet childId={response.data.childrenId} />
      </div>
    </div>
  );
}
