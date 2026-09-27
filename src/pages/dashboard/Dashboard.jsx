import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import RecentPatients from "../../components/dashboard/RecentPatients";
import RecentAppointments from "../../components/dashboard/RecentAppointments";

function Dashboard() {

  
  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-4">
        <small className="text-primary fw-bold">
          ADMINISTRATIVE OVERVIEW
        </small>
        <h1 className="fw-bold">Hospital Dashboard</h1>
      </div>

      {/* STATS */}
      <div className="row g-3">
        <div className="col-md-3">
          <StatCard title="Total Patients" value="12,482" subtitle="Active records" />
        </div>

        <div className="col-md-3">
          <StatCard title="Active Doctors" value="156" subtitle="On duty" />
        </div>

        <div className="col-md-3">
          <StatCard title="Appointments Today" value="42" subtitle="Scheduled" />
        </div>

        <div className="col-md-3">
          <StatCard title="Pending Billing" value="$14,203" subtitle="Outstanding" />
        </div>
      </div>

      {/* MIDDLE SECTION (NO NEW FILE) */}
      <div className="row g-3 mt-3">

        {/* CHART AREA (INLINE) */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-3">
            <h5>Admission Trends</h5>

            <div
  style={{
    height: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f7fb",
    borderRadius: "10px",
    color: "#888",
    fontWeight: "500"
  }}
>
  No Chart Data Yet
</div>
          </div>
        </div>

        {/* EXISTING COMPONENT */}
        <div className="col-lg-4">
          <RecentPatients />
        </div>

      </div>

      {/* TABLE */}
      <div className="mt-4">
        <RecentAppointments />
      </div>

    </DashboardLayout>
  );
}

export default Dashboard;