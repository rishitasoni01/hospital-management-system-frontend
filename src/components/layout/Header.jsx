import React from "react";
import { MdNotifications, MdSettings, MdSearch } from "react-icons/md";

function Header() {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom"
      style={{ height: "70px" }}
    >
      {/* SEARCH BAR */}
      <div style={{ width: "400px" }} className="position-relative">
        <MdSearch
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "#888",
          }}
          size={20}
        />

        <input
          type="text"
          placeholder="Search patients, records, or staff..."
          className="form-control ps-5"
        />
      </div>

      
      <div className="d-flex align-items-center gap-4">

        {/* ICONS */}
        <div className="position-relative">
    <MdNotifications size={22} style={{ cursor: "pointer" }} />

    <span
      className="position-absolute badge rounded-pill bg-danger"
      style={{
        top: "-8px",
        right: "-10px",
        fontSize: "10px"
      }}
    >
      3
    </span>
 

</div>
        <MdSettings size={22} style={{ cursor: "pointer" }} />

       <span style={{ color: "#2563eb", cursor: "pointer", fontWeight: "500" }}>
  Support
</span>
        {/* PROFILE */}
        <div className="d-flex align-items-center gap-2">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#2563eb",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            D
          </div>

          <div>
            <div className="fw-bold" style={{ fontSize: "14px" }}>
              Dr. Rishita Soni
            </div>
            <small className="text-muted">Chief Admin</small>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Header;