import Cookies from "js-cookie";
import React from "react";
import Images from "../../assets/img/images";
import OverviewChild from "./partials/OverviewChild";
import OverviewVaccine from "./partials/OverviewVaccine";
import RevenueChart from "./partials/RevenueChart";
import TotalUsers from "./partials/TotalUsers";
import TopStatic from "./partials/TopStatic";
export default function Dashboard() {
  const storedUser = Cookies.get("user");
  const user = JSON.parse(storedUser);
  console.log(user);
  return (
    <div>
      <div class="row">
        {/* <!-- Total Revenue --> */}
        <RevenueChart />
        <TotalUsers />
        {/* <!--/ Total Statis of Vaccine & Child --> */}
        {/* <TotalStatis /> */}
        {/* <!-- Overview --> */}
        <OverviewChild />
        <OverviewVaccine />
        {/* <!-- Total Users --> */}
        <TopStatic />
      </div>

      {/* <!-- Expense Overview --> */}
    </div>
  );
}
