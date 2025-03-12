import Cookies from "js-cookie";
import React from "react";
import Images from "../../assets/img/images";
import Profit from "./partials/Profit";
import RevenueChart from "./partials/RevenueChart";
import TotalStatis from "./partials/TotalStatis";
import TotalUsers from "./partials/TotalUsers";
export default function Dashboard() {
  const storedUser = Cookies.get("user");
  const user = JSON.parse(storedUser);
  console.log(user);
  return (
    <div>
      <div class="row">
        {/* <!-- User Stats --> */}
        <div class="col-lg-8 mb-4 order-0">
          <div class="card">
            <div class="d-flex align-items-end row">
              <div class="col-sm-7">
                <div class="card-body">
                  <h5 class="card-title text-primary">
                    Welcome back {user.fullName}! 🎉
                  </h5>
                  <p class="mb-4">
                    You have done <span class="fw-bold">72%</span> more sales
                    today. Check your new badge in your profile.
                  </p>

                  <a href="javascript:;" class="btn btn-sm btn-outline-primary">
                    View Badges
                  </a>
                </div>
              </div>
              <div class="col-sm-5 text-center text-sm-left">
                <div class="card-body pb-0 px-0 px-md-4">
                  <img
                    src={Images.boyWithStatis}
                    height="140"
                    alt="View Badge User"
                    data-app-dark-img="illustrations/man-with-laptop-dark.png"
                    data-app-light-img="illustrations/man-with-laptop-light.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Profit --> */}
        <Profit />
        {/* <!-- Total Revenue --> */}
        <RevenueChart />
        {/* <!--/ Total Statis of Vaccine & Child --> */}
        <TotalStatis />
      </div>
      <div class="row">
        {/* <!-- Total Users --> */}
        <TotalUsers />

        {/* <!-- Expense Overview --> */}
        <div class="col-md-6 col-lg-4 order-1 mb-4">
          <div class="card" style={{ height: "335px" }}>
            <div class="card-header">
              <ul class="nav nav-pills" role="tablist">
                <li class="nav-item">
                  <button
                    type="button"
                    class="nav-link active"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-tabs-line-card-income"
                    aria-controls="navs-tabs-line-card-income"
                    aria-selected="true"
                  >
                    Income
                  </button>
                </li>

                <li class="nav-item">
                  <button type="button" class="nav-link" role="tab">
                    Profit
                  </button>
                </li>
              </ul>
            </div>
            <div class="card-body px-0">
              <div class="tab-content p-0">
                <div
                  class="tab-pane fade show active"
                  id="navs-tabs-line-card-income"
                  role="tabpanel"
                >
                  <div class="d-flex p-4 pt-3">
                    <div class="avatar flex-shrink-0 me-3">
                      <img src={Images.wallet} alt="User" />
                    </div>
                    <div>
                      <small class="text-muted d-block">Total Balance</small>
                      <div class="d-flex align-items-center">
                        <h6 class="mb-0 me-1">$459.10</h6>
                        <small class="text-success fw-semibold">
                          <i class="bx bx-chevron-up"></i>
                          42.9%
                        </small>
                      </div>
                    </div>
                  </div>
                  <div id="incomeChart"></div>
                  <div class="d-flex justify-content-center pt-4 gap-2">
                    <div class="flex-shrink-0">
                      <div id="expensesOfWeek"></div>
                    </div>
                    <div>
                      <p class="mb-n1 mt-1">Expenses This Week</p>
                      <small class="text-muted">$39 less than last week</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--/ Expense Overview --> */}

        {/* <!-- Transactions --> */}
        <div class="col-md-6 col-lg-4 order-2 mb-4" style={{ height: "335px" }}>
          <div class="card h-100">
            <div class="card-header d-flex align-items-center justify-content-between">
              <h5 class="card-title m-0 me-2">Transactions</h5>
              <div class="dropdown">
                <button
                  class="btn p-0"
                  type="button"
                  id="transactionID"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="transactionID"
                >
                  <a class="dropdown-item" href="javascript:void(0);">
                    Last 28 Days
                  </a>
                  <a class="dropdown-item" href="javascript:void(0);">
                    Last Month
                  </a>
                  <a class="dropdown-item" href="javascript:void(0);">
                    Last Year
                  </a>
                </div>
              </div>
            </div>
            <div class="card-body" style={{ height: "335px" }}>
              <ul class="p-0 m-0">
                <li class="d-flex mb-4 pb-1">
                  <div class="avatar flex-shrink-0 me-3">
                    <img
                      src="../assets/img/icons/unicons/paypal.png"
                      alt="User"
                      class="rounded"
                    />
                  </div>
                  <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                    <div class="me-2">
                      <small class="text-muted d-block mb-1">Paypal</small>
                      <h6 class="mb-0">Send money</h6>
                    </div>
                    <div class="user-progress d-flex align-items-center gap-1">
                      <h6 class="mb-0">+82.6</h6>
                      <span class="text-muted">USD</span>
                    </div>
                  </div>
                </li>
                <li class="d-flex mb-4 pb-1">
                  <div class="avatar flex-shrink-0 me-3">
                    <img
                      src="../assets/img/icons/unicons/wallet.png"
                      alt="User"
                      class="rounded"
                    />
                  </div>
                  <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                    <div class="me-2">
                      <small class="text-muted d-block mb-1">Wallet</small>
                      <h6 class="mb-0">Mac'D</h6>
                    </div>
                    <div class="user-progress d-flex align-items-center gap-1">
                      <h6 class="mb-0">+270.69</h6>
                      <span class="text-muted">USD</span>
                    </div>
                  </div>
                </li>
                <li class="d-flex mb-4 pb-1">
                  <div class="avatar flex-shrink-0 me-3">
                    <img
                      src="../assets/img/icons/unicons/chart.png"
                      alt="User"
                      class="rounded"
                    />
                  </div>
                  <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                    <div class="me-2">
                      <small class="text-muted d-block mb-1">Transfer</small>
                      <h6 class="mb-0">Refund</h6>
                    </div>
                    <div class="user-progress d-flex align-items-center gap-1">
                      <h6 class="mb-0">+637.91</h6>
                      <span class="text-muted">USD</span>
                    </div>
                  </div>
                </li>
                <li class="d-flex mb-4 pb-1">
                  <div class="avatar flex-shrink-0 me-3">
                    <img
                      src="../assets/img/icons/unicons/cc-success.png"
                      alt="User"
                      class="rounded"
                    />
                  </div>
                  <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                    <div class="me-2">
                      <small class="text-muted d-block mb-1">Credit Card</small>
                      <h6 class="mb-0">Ordered Food</h6>
                    </div>
                    <div class="user-progress d-flex align-items-center gap-1">
                      <h6 class="mb-0">-838.71</h6>
                      <span class="text-muted">USD</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!--/ Transactions --> */}
      </div>
    </div>
  );
}
