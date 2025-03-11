import React from "react";
import Teeth from "./Teeth";

const DentalPage = ({ childId }) => (
  <>
    <h2>🦷 Dental</h2>
    <p>Tracking baby teeth development</p>
    <Teeth childId={childId} />
  </>
);

export default DentalPage;
