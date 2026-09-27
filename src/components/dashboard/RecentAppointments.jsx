import React from "react";
import { Link } from "react-router-dom";
import { MdArrowForward, MdAccessTime } from "react-icons/md";

function RecentAppointments() {
  const appointments = [
    {
      patient: "Robert Fox",
      doctor: "Dr. Cameron Vance",
      dept: "Cardiology",
      time: "09:30 AM",
      status: "Completed",
    },
    {
      patient: "Alice Wong",
      doctor: "Dr. Sarah Smith",
      dept: "Neurology",
      time: "10:15 AM",
      status: "Pending",
    },
    {
      patient: "John Doe",
      doctor: "Dr. Michael Brown",
      dept: "Orthopedic",
      time: "11:00 AM",
      status: "Cancelled",
    },
  ];

  return (
    <div className="card border-0 shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold mb-0">Recent Appointments</h5>
          <small className="text-muted">Today's scheduled clinical consultations</small>
        </div>
        <Link to="/appointments" className="text-primary small fw-semibold text-decoration-none d-flex align-items-center gap-1">
          Manage All <MdArrowForward size={14} />
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Attending Doctor</th>
              <th>Department</th>
              <th>Scheduled Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item, index) => (
              <tr key={index}>
                <td className="fw-semibold text-dark">{item.patient}</td>
                <td className="text-secondary">{item.doctor}</td>
                <td>
                  <span className="badge bg-light text-dark border fw-medium">{item.dept}</span>
                </td>
                <td className="text-muted small">
                  <span className="d-flex align-items-center gap-1">
                    <MdAccessTime size={14} /> {item.time}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge rounded-pill px-3 py-1 ${
                      item.status === "Completed"
                        ? "bg-success-subtle text-success border border-success-subtle"
                        : item.status === "Pending"
                        ? "bg-warning-subtle text-warning border border-warning-subtle"
                        : "bg-danger-subtle text-danger border border-danger-subtle"
                    }`}
                    style={{ fontSize: "11px" }}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentAppointments;