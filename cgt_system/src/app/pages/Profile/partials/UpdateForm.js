import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { countries } from "../../../constants/countries.js";
import useApi from "../../../hooks/useApi";
import splitName from "../../../util/splitName.js";
import showToast from "../../../util/showToast.js";
export default function UpdateForm({ userData, setUser, apiUrl }) {
  const { response, callApi } = useApi({
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

  const storedUser = Cookies.get("user");
  const mainUser = JSON.parse(storedUser);

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
    console.log(data);
    await callApi(data);
  };

  const isAdmin = mainUser.role === "admin";
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
            disabled={isAdmin}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isAdmin}
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="Role" class="form-label">
            Role
          </label>
          <input
            class="form-control"
            type="text"
            id="role"
            name="role"
            placeholder={userData?.role || ""}
            disabled
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="Subcription" class="form-label">
            Subcription Type
          </label>
          <input
            class="form-control"
            type="text"
            id="subscription"
            name="subscription"
            placeholder={userData?.membershipPackageId || ""}
            disabled
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="email" class="form-label">
            E-mail
          </label>
          <input
            class="form-control"
            type="text"
            id="email"
            name="email"
            value={userData?.email || ""}
            placeholder={userData?.email || ""}
            disabled
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isAdmin}
            />
          </div>
        </div>
        <div class="mb-3 col-md-6">
          <label for="address" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="address"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={isAdmin}
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="state" class="form-label">
            State
          </label>
          <input
            class="form-control"
            type="text"
            id="state"
            name="state"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={isAdmin}
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="zipCode" class="form-label">
            Zip Code
          </label>
          <input
            type="text"
            class="form-control"
            id="zipCode"
            name="zipCode"
            placeholder="231465"
            maxlength="6"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            disabled={isAdmin}
          />
        </div>
        <div class="mb-3 col-md-6">
          <label class="form-label" for="country">
            Country
          </label>
          <select
            id="country"
            class="select2 form-select"
            disabled={isAdmin}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map((countryItem) => (
              <option
                value={countryItem.value}
                selected={countryItem.value === country}
              >
                {countryItem.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div class="mt-2">
        <button type="submit" class="btn btn-primary me-2">
          Save changes
        </button>
        <button type="reset" class="btn btn-outline-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
