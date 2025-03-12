import React, { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import splitName from "../../../util/splitName.js";
import showToast from "../../../util/showToast.js";

export default function UpdateForm({ userData, setUser, apiUrl }) {
  console.log(userData);

  const { isLoading, response, callApi } = useApi({
    url: apiUrl,
    method: "PUT",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hospital, setHospital] = useState("");

  useEffect(() => {
    if (userData) {
      const nameParts = splitName(userData.fullName);
      setFirstName(nameParts[0] || "");
      setLastName(nameParts[1] || "");
      setPhone(userData.phoneNumber || "");
      setAddress(userData.address || "");
      setState(userData.state || "");
      setZipCode(userData.zipcode || "");
      setCountry(userData.country || "");
      setSpecialization(userData.specialization || "");
      setHospital(userData.hospital || "");
    }
  }, [userData]);

  useEffect(() => {
    if (response) {
      showToast({
        icon: "success",
        text: "Information updated successfully!",
        targetElement: document.querySelector(".info"),
      });
      setUser(response.data);
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra và thêm số 0 vào đầu số điện thoại nếu chưa có
    let formattedPhone = phone;
    if (!formattedPhone.startsWith("0") && formattedPhone) {
      formattedPhone = "0" + formattedPhone;
    }

    const data = {
      fullName: `${firstName} ${lastName}`,
      phoneNumber: formattedPhone, // Sử dụng số điện thoại đã định dạng
      address: address,
      state: state,
      zipcode: zipCode,
      country: country,
      specialization: specialization,
      hospital: hospital,
    };

    await callApi(data);
  };

  return (
    <form id="formAccountSettings" onSubmit={handleSubmit}>
      <div className="row">
        <div className="mb-3 col-md-6">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            className="form-control"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label" htmlFor="phoneNumber">
            Phone Number
          </label>
          <div className="input-group input-group-merge">
            <span className="input-group-text">VN (+84)</span>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
              placeholder="xxxx-xxx-xxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            className="form-control"
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {userData.role === "doctor" && (
          <>
            <div className="mb-3 col-md-6">
              <label htmlFor="specialization" className="form-label">
                Specialization
              </label>
              <input
                className="form-control"
                type="text"
                name="specialization"
                id="specialization"
                placeholder="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label htmlFor="hospital" className="form-label">
                Hospital
              </label>
              <input
                className="form-control"
                type="text"
                name="hospital"
                id="hospital"
                placeholder="Hospital"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <div className="mt-2">
        <button type="submit" className="btn btn-primary me-2">
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </form>
  );
}
