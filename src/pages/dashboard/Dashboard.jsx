import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import RecentPatients from "../../components/dashboard/RecentPatients";
import RecentAppointments from "../../components/dashboard/RecentAppointments";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts";
import { MdPeople, MdLocalHospital, MdCalendarToday, MdAttachMoney, MdAdd, MdRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [chartTimeframe, setChartTimeframe] = useState("Weekly");

  const weeklyAdmissionData = [
    { day: "Mon", Admissions: 28, Discharges: 18, Emergency: 8 },
    { day: "Tue", Admissions: 35, Discharges: 24, Emergency: 12 },
    { day: "Wed", Admissions: 42, Discharges: 30, Emergency: 15 },
    { day: "Thu", Admissions: 38, Discharges: 28, Emergency: 10 },
    { day: "Fri", Admissions: 48, Discharges: 35, Emergency: 18 },
    { day: "Sat", Admissions: 30, Discharges: 22, Emergency: 14 },
    { day: "Sun", Admissions: 22, Discharges: 16, Emergency: 9 },
  ];

  const monthlyAdmissionData = [
    { day: "Week 1", Admissions: 180, Discharges: 140, Emergency: 55 },
    { day: "Week 2", Admissions: 210, Discharges: 175, Emergency: 62 },
    { day: "Week 3", Admissions: 245, Discharges: 190, Emergency: 70 },
    { day: "Week 4", Admissions: 230, Discharges: 205, Emergency: 58 },
  ];

  const currentChartData = chartTimeframe === "Weekly" ? weeklyAdmissionData : monthlyAdmissionData;

  return (
    <DashboardLayout>

      {/* HEADER & QUICK ACTIONS */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <small className="text-primary fw-bold text-uppercase tracking-wider">
            ADMINISTRATIVE OVERVIEW
          </small>
          <h1 className="fw-bold mb-0 text-dark">Hospital Command Center</h1>
          <p className="text-muted small mb-0">Real-time clinical metrics, bed occupancy, and patient triage monitoring.</p>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button 
            className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
            onClick={() => navigate("/patients/registration")}
          >
            <MdAdd size={20} /> Register Patient
          </button>
          <button 
            className="btn btn-outline-primary d-flex align-items-center gap-2 bg-white"
            onClick={() => navigate("/appointments/create")}
          >
            <MdCalendarToday size={18} /> Book Appointment
          </button>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard 
            title="Total Patients" 
            value="12,482" 
            subtitle="Active registered records" 
            icon={<MdPeople size={22} />}
            trend="+12%"
            isPositive={true}
            color="#2563eb"
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard 
            title="Active Doctors" 
            value="156" 
            subtitle="On duty across 18 depts" 
            icon={<MdLocalHospital size={22} />}
            trend="+4"
            isPositive={true}
            color="#10b981"
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard 
            title="Appointments Today" 
            value="42" 
            subtitle="Scheduled visits" 
            icon={<MdCalendarToday size={22} />}
            trend="+18%"
            isPositive={true}
            color="#f59e0b"
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard 
            title="Pending Billing" 
            value="$14,203" 
            subtitle="Outstanding invoices" 
            icon={<MdAttachMoney size={22} />}
            trend="-3%"
            isPositive={false}
            color="#ef4444"
          />
        </div>
      </div>

      {/* CHARTS & RECENT PATIENTS ROW */}
      <div className="row g-3 mb-4">

        {/* CHART AREA */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div>
                <h5 className="fw-bold mb-0">Admission & Emergency Trends</h5>
                <small className="text-muted">In-patient admission vs emergency triage rate</small>
              </div>

              <div className="btn-group btn-group-sm bg-light p-1 rounded-3">
                <button 
                  className={`btn border-0 py-1 ${chartTimeframe === "Weekly" ? "btn-white shadow-sm fw-bold text-primary" : "text-secondary"}`}
                  onClick={() => setChartTimeframe("Weekly")}
                >
                  Weekly
                </button>
                <button 
                  className={`btn border-0 py-1 ${chartTimeframe === "Monthly" ? "btn-white shadow-sm fw-bold text-primary" : "text-secondary"}`}
                  onClick={() => setChartTimeframe("Monthly")}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorEmergency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "10px", border: "none", color: "#fff", fontSize: "12px" }}
                  />
                  <Area type="monotone" dataKey="Admissions" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorAdmissions)" />
                  <Area type="monotone" dataKey="Emergency" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorEmergency)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RECENT PATIENTS PANEL */}
        <div className="col-12 col-lg-4">
          <RecentPatients />
        </div>

      </div>

      {/* RECENT APPOINTMENTS TABLE */}
      <div className="mt-2">
        <RecentAppointments />
      </div>

    </DashboardLayout>
  );
}

export default Dashboard;