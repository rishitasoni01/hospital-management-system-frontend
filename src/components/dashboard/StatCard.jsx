import React from "react";

function StatCard({ title, value, subtitle, icon, trend, isPositive = true, color = "#2563eb" }) {
  return (
    <div
      className="card border-0 shadow-sm p-3 p-md-4 h-100 card-hover position-relative overflow-hidden"
      style={{
        borderRadius: "16px",
        cursor: "pointer",
        background: "white",
      }}
    >
      <div 
        className="position-absolute top-0 start-0 h-100" 
        style={{ width: "4px", backgroundColor: color }} 
      />
      
      <div className="d-flex justify-content-between align-items-start mb-2">
        <span className="text-uppercase text-muted fw-bold" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
          {title}
        </span>
        {icon && (
          <div 
            className="p-2 rounded-3 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: `${color}15`, color: color }}
          >
            {icon}
          </div>
        )}
      </div>

      <h2 className="fw-bold mb-1 text-dark" style={{ fontFamily: "var(--font-heading)" }}>{value}</h2>

      <div className="d-flex align-items-center gap-2">
        {trend && (
          <span 
            className={`badge rounded-pill fw-semibold ${isPositive ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"}`}
            style={{ fontSize: "11px" }}
          >
            {isPositive ? "↗" : "↘"} {trend}
          </span>
        )}
        <small className="text-secondary" style={{ fontSize: "0.8rem" }}>{subtitle}</small>
      </div>
    </div>
  );
}

export default StatCard;