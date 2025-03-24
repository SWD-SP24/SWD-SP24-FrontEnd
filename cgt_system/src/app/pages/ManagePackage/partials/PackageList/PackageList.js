import React from "react";
import PackageItem from "../PackageItem/PackageItem";

export default function PackageList({
  userAndPackages,
  packages,
  users,
  onFetchPackages,
}) {
  return (
    <>
      {packages.map((packageItem) => {
        let usersUse = users.filter(
          (user) =>
            user.membershipPackageId === packageItem.membershipPackageId &&
            user.role === "member" &&
            user.emailActivation === "activated"
        );
        // Điều chỉnh số lượng user dựa trên packageId
        if (
          packageItem.membershipPackageId === 2 ||
          packageItem.membershipPackageId === 3
        ) {
          usersUse = usersUse.slice(2); // Bỏ đi 2 user đầu tiên
        }

        const totalUserUse = usersUse.length;
        const maxDisplayUsers = 3;
        const displayedUsers = usersUse.slice(0, maxDisplayUsers);
        const remainingUsers = totalUserUse - maxDisplayUsers;
        return (
          <PackageItem
            packageItem={packageItem}
            totalUserUse={totalUserUse}
            displayedUsers={displayedUsers}
            remainingUsers={remainingUsers}
            onFetchPackages={onFetchPackages}
          />
        );
      })}
      {/* <div class="col-xl-4 col-lg-6 col-md-6">
        <div class="card h-100">
          <div class="row h-100">
            <div class="col-sm-5">
              <div class="d-flex align-items-end h-100 justify-content-center mt-sm-0 mt-4 ps-6">
                <img
                  src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/lady-with-laptop-dark.png"
                  class="img-fluid"
                  alt="Image"
                  width="120"
                  data-app-light-img="illustrations/lady-with-laptop-light.png"
                  data-app-dark-img="illustrations/lady-with-laptop-dark.png"
                  style={{ visibility: "visible" }}
                />
              </div>
            </div>
            <div class="col-sm-7">
              <div class="card-body text-sm-end text-center ps-sm-0">
                <button
                  data-bs-target="#addRoleModal"
                  data-bs-toggle="modal"
                  class="btn btn-sm btn-primary mb-4 text-nowrap add-new-role"
                >
                  Add New Package
                </button>
                <p class="mb-0">
                  Add new package, <br />
                  if it doesn't exist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
