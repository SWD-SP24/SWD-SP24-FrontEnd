import { useState } from "react";

const DropdownMenu = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  const handleEdit = () => {
    console.log("Edit clicked");
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
        type="button"
        className="btn p-0 dropdown-toggle hide-arrow"
        onClick={handleToggle}
      >
        &#x22EE;
      </button>
      {show && (
        <div
          className="dropdown-menu show"
          style={{ position: "absolute", left: "auto", right: 0 }}
        >
          <button className="dropdown-item" onClick={handleEdit}>
            &#9998; Edit
          </button>
          <button className="dropdown-item" onClick={handleDelete}>
            &#128465; Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
