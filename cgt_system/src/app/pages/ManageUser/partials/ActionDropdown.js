import { useState } from "react";
import { useNavigate } from "react-router";

const DropdownMenu = ({ id }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setShow(!show);
  };

  const handleEdit = () => {
    navigate(`/admin/users/${id}`);
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  return (
    <div
      className="dropdown"
      style={{ position: "relative", textAlign: "center" }}
    >
      <button
        type="button "
        className="dropdown-toggle btn btn-primary btn-icon rounded-pill hide-arrow"
        onClick={handleToggle}
        aria-expanded="false"
      >
        <i class="bx bx-dots-vertical-rounded" style={{ color: "white" }}></i>
      </button>
      {show && (
        <button
          className="dropdown-menu show "
          style={{ position: "absolute", left: "auto", right: 0 }}
        >
          <button className="dropdown-item" onClick={handleEdit}>
            &#9998; Edit
          </button>
          <button className="dropdown-item" onClick={handleDelete}>
            &#128465; Block
          </button>
        </button>
      )}
    </div>
  );
};

export default DropdownMenu;
