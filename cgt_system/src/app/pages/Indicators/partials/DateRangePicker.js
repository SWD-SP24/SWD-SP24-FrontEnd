import API_URLS from "../../../config/apiUrls";
import { toDMY } from "../../../util/dateFormat";
function DateRangePicker({ fromDateRef, toDateRef, refetch, childId }) {
  const handleFromDateChange = () => {
    let today = new Date();
    let fromDate = new Date(fromDateRef.current.value);
    let toDate = new Date(toDateRef.current.value);

    if (toDateRef.current.value) {
      if (fromDate > toDate) {
        let temp = fromDateRef.current.value;
        fromDateRef.current.value = toDateRef.current.value;
        toDateRef.current.value = temp;
      }
    }

    // Ensure "From Date" does not exceed today
    if (fromDate > today) {
      fromDateRef.current.value = today.toISOString().split("T")[0];
    }

    if (fromDateRef.current.value != "" && toDateRef.current.value != "") {
      console.log(toDateRef.current.value);
      const url = `${
        API_URLS.INDICATORS.INDICATORS
      }?childrenId=${childId}&startTime=${toDMY(
        fromDateRef.current.value
      )}&endTime=${toDMY(toDateRef.current.value)}`;
      refetch(null, url);
    }
  };

  const handleToDateChange = () => {
    let today = new Date();
    let fromDate = new Date(fromDateRef.current.value);
    let toDate = new Date(toDateRef.current.value);

    if (fromDateRef.current.value) {
      if (toDate < fromDate) {
        let temp = fromDateRef.current.value;
        fromDateRef.current.value = toDateRef.current.value;
        toDateRef.current.value = temp;
      }
    }

    // Ensure "To Date" does not exceed today
    if (toDate > today) {
      toDateRef.current.value = today.toISOString().split("T")[0];
    }

    if (fromDateRef.current.value != "" && toDateRef.current.value != "") {
      console.log(toDateRef.current.value);
      const url = `${
        API_URLS.INDICATORS.INDICATORS
      }?childrenId=${childId}&startTime=${toDMY(
        fromDateRef.current.value
      )}&endTime=${toDMY(toDateRef.current.value)}`;
      refetch(null, url);
    }
  };

  return (
    <div className="dt-length mb-md-6 mb-0 d-flex">
      <div className="col mb-0">
        <input
          ref={fromDateRef}
          className="form-control"
          type="date"
          id="fromDateInput"
          onChange={handleFromDateChange}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="d-flex align-items-center mx-3">-</div>

      <div className="col mb-0">
        <input
          ref={toDateRef}
          className="form-control"
          type="date"
          id="toDateInput"
          onChange={handleToDateChange}
          max={new Date().toISOString().split("T")[0]} // Ensures users can't pick a future date
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
