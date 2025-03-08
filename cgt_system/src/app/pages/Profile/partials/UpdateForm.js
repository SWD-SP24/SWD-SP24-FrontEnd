import React, { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import splitName from "../../../util/splitName.js";
import showToast from "../../../util/showToast.js";
export default function UpdateForm({ userData, setUser, apiUrl }) {
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
    }
  }, [userData]);

  useEffect(() => {
    if (response) {
      showToast({
        icon: "success",
        text: "Information updated successful !",
        targetElement: document.querySelector(".info"),
      });
      setUser(response.data);
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullName: `${firstName} ${lastName}`,
      phoneNumber: phone,
      address: address,
      state: state,
      zipcode: zipCode,
      country: country,
    };
    await callApi(data);
  };

  return (
    <form id="formAccountSettings" onSubmit={handleSubmit}>
      <div class="row">
        <div class="mb-3 col-md-6">
          <label for="firstName" class="form-label">
            First Name
          </label>
          <input
            class="form-control"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="lastName" class="form-label">
            Last Name
          </label>
          <input
            class="form-control"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div class="mb-3 col-md-6">
          <label class="form-label" for="phoneNumber">
            Phone Number
          </label>
          <div class="input-group input-group-merge">
            <span class="input-group-text">VN (+84)</span>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              class="form-control"
              placeholder="xxx-xxx-xxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div class="mb-3 col-md-6">
          <label for="address" class="form-label">
            Address
          </label>
          <input
            class="form-control"
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div class="mt-2">
        <button type="submit" class="btn btn-primary me-2">
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
