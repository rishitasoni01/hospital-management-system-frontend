import React from "react";

function StatCard({ title, value, subtitle }) {
  return (
    <div
      className="card border-0 shadow-sm p-3 h-100"
      style={{
        borderRadius: "12px",
        transition: "0.3s",
        cursor: "pointer",
      }}
    >
      <h6 className="text-muted">{title}</h6>
      <h3 className="fw-bold">{value}</h3>
      <small className="text-secondary">{subtitle}</small>
    </div>
  );
}

export default StatCard;