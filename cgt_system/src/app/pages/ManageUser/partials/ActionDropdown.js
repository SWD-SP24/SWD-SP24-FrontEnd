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
    <div class="btn-group">
      <button
        type="button"
        class="btn btn-primary btn-icon rounded-pill dropdown-toggle hide-arrow"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i
          class="icon-base bx bx-dots-vertical-rounded"
          style={{ color: "white" }}
        ></i>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <a class="dropdown-item" onClick={handleEdit}>
            &#128065; View
          </a>
        </li>
        <li>
          <a class="dropdown-item" onClick={handleDelete}>
            &#128465; Block
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
