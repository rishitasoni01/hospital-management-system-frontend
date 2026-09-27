import React from "react";

function RecentPatients() {
  const patients = [
    { name: "John Doe", dept: "Cardiology", status: "stable" },
    { name: "Elena Smith", dept: "Neurology", status: "critical" },
    { name: "Marcus Knight", dept: "Orthopedic", status: "stable" },
    { name: "Alice Wong", dept: "Pediatrics", status: "recovering" },
  ];

  return (
    <div className="card border-0 shadow-sm p-3">
      <h5 className="mb-3">Recent Patients</h5>

      {patients.map((p, index) => (
        <div
          key={index}
          className="d-flex justify-content-between align-items-center py-2 border-bottom"
        >
          <div>
            <div className="fw-semibold">{p.name}</div>
            <small className="text-muted">{p.dept}</small>
          </div>

          <span
            style={{
              fontSize: "12px",
              padding: "4px 8px",
              borderRadius: "10px",
              background:
                p.status === "critical"
                  ? "#ffe5e5"
                  : p.status === "recovering"
                  ? "#fff3cd"
                  : "#e6f4ea",
              color:
                p.status === "critical"
                  ? "#d32f2f"
                  : p.status === "recovering"
                  ? "#b26a00"
                  : "#2e7d32",
            }}
          >
            {p.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RecentPatients;