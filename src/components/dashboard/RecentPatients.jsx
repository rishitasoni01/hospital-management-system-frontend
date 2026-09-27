import React from "react";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";

function RecentPatients() {
  const patients = [
    { name: "John Doe", dept: "Cardiology Wing", status: "stable", room: "ICU-4" },
    { name: "Elena Smith", dept: "Neurology Center", status: "critical", room: "Ward 3B" },
    { name: "Marcus Knight", dept: "Orthopedic Surgery", status: "stable", room: "Ward 1A" },
    { name: "Alice Wong", dept: "Pediatrics Clinic", status: "recovering", room: "Ped-12" },
  ];

  return (
    <div className="card border-0 shadow-sm p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold mb-0">Recent In-Patients</h5>
          <small className="text-muted">Live ward status</small>
        </div>
        <Link to="/patients" className="text-primary small fw-semibold text-decoration-none d-flex align-items-center gap-1">
          View All <MdArrowForward size={14} />
        </Link>
      </div>

      <div className="d-flex flex-column gap-3">
        {patients.map((p, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center p-2 rounded-3 hover-bg-light"
            style={{ transition: "background-color 0.2s" }}
          >
            <div className="d-flex align-items-center gap-3">
              <div 
                className="rounded-circle text-primary bg-primary-subtle fw-bold d-flex align-items-center justify-content-center"
                style={{ width: "38px", height: "38px", fontSize: "14px" }}
              >
                {p.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="fw-semibold text-dark lh-sm">{p.name}</div>
                <small className="text-muted">{p.dept} • <span className="fw-medium text-secondary">{p.room}</span></small>
              </div>
            </div>

            <span
              className={`badge rounded-pill text-capitalize px-3 py-1 ${
                p.status === "critical"
                  ? "bg-danger-subtle text-danger"
                  : p.status === "recovering"
                  ? "bg-warning-subtle text-warning"
                  : "bg-success-subtle text-success"
              }`}
              style={{ fontSize: "11px" }}
            >
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentPatients;