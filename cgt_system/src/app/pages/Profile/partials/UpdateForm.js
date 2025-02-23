import React, { useRef } from "react";
import useApi from "../../../hooks/useApi";
import API_URLS from "../../../config/apiUrls";

export default function UpdateForm({ userData, refetch, nameParts, apiUrl }) {
  const { response, error, callApi } = useApi({
    url: apiUrl,
    method: "PUT",
  });
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form data: ", {
      fullName: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
      phone: phoneRef.current.value,
    });
    const data = {
      fullName: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
      phone: phoneRef.current.value,
    };

    callApi(data);
    refetch();
  };
  return (
    <form id="formAccountSettings" onSubmit={handleSubmit}>
      <div class="row">
        <div class="mb-3 col-md-6">
          <label for="firstName" class="form-label">
            First Name
          </label>
          <input
            ref={firstNameRef}
            class="form-control"
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={nameParts[0]}
            autofocus
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="lastName" class="form-label">
            Last Name
          </label>
          <input
            ref={lastNameRef}
            class="form-control"
            type="text"
            name="lastName"
            id="lastName"
            defaultValue={nameParts[1]}
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
            placeholder={userData?.data?.role || ""}
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
            placeholder={userData?.data?.membershipPackageId || ""}
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
            value={userData?.data?.email || ""}
            placeholder={userData?.data?.email || ""}
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
              ref={phoneRef}
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              class="form-control"
              defaultValue={userData?.data?.phoneNumber || ""}
              placeholder={userData?.data?.phoneNumber || ""}
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
            placeholder="California"
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
          />
        </div>
        <div class="mb-3 col-md-6">
          <label class="form-label" for="country">
            Country
          </label>
          <select id="country" class="select2 form-select">
            <option value="">Select</option>
            <option value="Australia">Australia</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Belarus">Belarus</option>
            <option value="Brazil">Brazil</option>
            <option value="Canada">Canada</option>
            <option value="China">China</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Japan">Japan</option>
            <option value="Korea">Korea, Republic of</option>
            <option value="Mexico">Mexico</option>
            <option value="Philippines">Philippines</option>
            <option value="Russia">Russian Federation</option>
            <option value="South Africa">South Africa</option>
            <option value="Thailand">Thailand</option>
            <option value="Turkey">Turkey</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
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
