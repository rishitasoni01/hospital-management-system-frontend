import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appointmentApi } from "../../api/appointment.api";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  MdCalendarToday, 
  MdAccessTime, 
  MdCancel, 
  MdPendingActions, 
  MdSearch, 
  MdVisibility, 
  MdRefresh,
  MdAdd,
  MdEdit,
  MdDelete
} from "react-icons/md";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [deptFilter, setDeptFilter] = useState("All Departments");

  useEffect(() => {
    fetchAppointments();
  }, [page, size]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentApi.getAllAppointments(page, size, "id", "asc");
      const list = response.content || [];
      setAppointments(list);
      setTotalPages(response.totalPages || 1);
      setTotalElements(response.totalElements || list.length);
      applyFilters(list, searchQuery, statusFilter, deptFilter);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (data, search, statusVal, deptVal) => {
    let result = [...data];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.patientName?.toLowerCase().includes(q) ||
          a.doctorName?.toLowerCase().includes(q) ||
          a.reason?.toLowerCase().includes(q)
      );
    }
    if (statusVal && statusVal !== "All Statuses") {
      result = result.filter(
        (a) => a.status?.toLowerCase() === statusVal.toLowerCase()
      );
    }
    if (deptVal && deptVal !== "All Departments") {
      result = result.filter(
        (a) => a.department?.toLowerCase() === deptVal.toLowerCase()
      );
    }
    setFilteredAppointments(result);
  };

  useEffect(() => {
    applyFilters(appointments, searchQuery, statusFilter, deptFilter);
  }, [searchQuery, statusFilter, deptFilter, appointments]);

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Cancel and delete this appointment schedule?")) return;
    try {
      await appointmentApi.deleteAppointment(id);
      fetchAppointments();
    } catch (error) {
      console.error("Delete appointment error:", error);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All Statuses");
    setDeptFilter("All Departments");
  };

  const getStatusBadgeClass = (status) => {
    if (!status) return "bg-secondary-subtle text-secondary";
    switch (status.toLowerCase()) {
      case "confirmed":
        return "badge-status-confirmed";
      case "pending":
        return "badge-status-pending";
      case "completed":
        return "badge-status-completed";
      case "cancelled":
        return "badge-status-cancelled";
      default:
        return "bg-secondary-subtle text-secondary";
    }
  };

  return (
    <DashboardLayout>
      {/* Top Header Section */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Appointment Management</h2>
          <p className="text-muted small mb-0">Efficiently schedule and monitor patient visits across all departments.</p>
        </div>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 shadow-sm fw-semibold"
          onClick={() => navigate("/appointments/create")}
        >
          <MdAdd size={20} /> Book Appointment
        </button>
      </div>

      {/* Stats Cards Row Section */}
      <div className="row g-3 mb-4">
        {/* Today's Visits */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-uppercase text-muted small fw-bold tracking-wider">Today's Visits</span>
              <div className="p-2 bg-primary-subtle text-primary rounded-3">
                <MdCalendarToday size={20} />
              </div>
            </div>
            <h2 className="fw-bold text-dark m-0">42</h2>
            <p className="text-success small m-0 mt-2 fw-medium">
              <span>↑ 12%</span> <span className="text-muted fw-normal">vs yesterday</span>
            </p>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-uppercase text-muted small fw-bold tracking-wider">Pending Requests</span>
              <div className="p-2 bg-warning-subtle text-warning rounded-3">
                <MdPendingActions size={20} />
              </div>
            </div>
            <h2 className="fw-bold text-dark m-0">15</h2>
            <p className="text-muted small m-0 mt-2 fw-normal">Needs immediate review</p>
          </div>
        </div>

        {/* Cancellations */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-uppercase text-muted small fw-bold tracking-wider">Cancellations</span>
              <div className="p-2 bg-danger-subtle text-danger rounded-3">
                <MdCancel size={20} />
              </div>
            </div>
            <h2 className="fw-bold text-dark m-0">3</h2>
            <p className="text-muted small m-0 mt-2 fw-normal">Scheduled today</p>
          </div>
        </div>

        {/* Fulfillment Rate */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100 text-white" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "16px" }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-uppercase text-light small opacity-75 fw-bold">Fulfillment Rate</span>
              <span className="badge bg-secondary text-white small fw-bold">88%</span>
            </div>
            <div className="mt-3">
              <div className="progress bg-secondary bg-opacity-50" style={{ height: "8px" }}>
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "88%" }}></div>
              </div>
              <p className="small text-light opacity-75 mt-3 mb-0">Target completion rate reached</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar Section */}
      <div className="card border-0 shadow-sm mb-4 bg-white p-3">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <div className="position-relative">
              <MdSearch size={20} style={{ position: "absolute", top: "50%", left: "12px", transform: "translateY(-50%)", color: "#64748b" }} />
              <input 
                type="text" 
                className="form-control ps-5 py-2 bg-light border-0" 
                placeholder="Search patient or doctor name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="col-6 col-md-3">
            <select 
              className="form-select bg-light border-0 py-2 text-muted fw-medium"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Statuses</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="col-6 col-md-3">
            <select 
              className="form-select bg-light border-0 py-2 text-muted fw-medium"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Orthopedics</option>
            </select>
          </div>

          <div className="col-12 col-md-2 d-flex justify-content-end">
            <button
              className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-1"
              title="Reset Filters"
              onClick={resetFilters}
            >
              <MdRefresh size={20} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Appointments Table Card */}
      <div className="card border-0 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th className="px-4">Patient Name</th>
                <th>Doctor Name</th>
                <th>Date</th>  
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    Loading appointments schedule...
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted fw-semibold">
                    No appointments found matching your search.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-4">
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center me-3 shadow-sm"
                          style={{ width: "38px", height: "38px", fontSize: "14px" }}
                        >
                          {appointment.patientName
                            ?.split(" ")
                            .map((word) => word.charAt(0))
                            .join("")
                            .toUpperCase() || "P"}
                        </div>
                        <div>
                          <div className="fw-semibold text-dark">
                            {appointment.patientName}
                          </div>
                          <small className="text-muted">#APP-{appointment.id}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="fw-medium text-secondary">
                        {appointment.doctorName}
                      </div>
                    </td>

                    <td>
                      <div className="fw-medium text-dark">
                        {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : "2026-09-28"}
                      </div>
                    </td>

                    <td>
                      <div className="text-muted small d-flex align-items-center gap-1">
                        <MdAccessTime size={14} />
                        {appointment.appointmentTime || "09:30 AM"}
                      </div>
                    </td>
                   
                    <td className="text-secondary small">
                      {appointment.reason || "General Consultation"}
                    </td>

                    <td>
                      <span className={`badge px-3 py-1 rounded-pill ${getStatusBadgeClass(appointment.status)}`}>
                        {appointment.status || "Pending"}
                      </span>
                    </td>

                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-3">
                        <MdVisibility
                          size={20}
                          className="text-primary cursor-pointer hover-scale"
                          onClick={() => handleView(appointment)}
                          title="View Details"
                          style={{ cursor: "pointer" }}
                        />
                        <MdEdit
                          size={20}
                          className="text-warning cursor-pointer hover-scale"
                          onClick={() => navigate(`/appointments/edit/${appointment.id}`)}
                          title="Edit Appointment"
                          style={{ cursor: "pointer" }}
                        />
                        <MdDelete
                          size={20}
                          className="text-danger cursor-pointer hover-scale"
                          onClick={() => handleDelete(appointment.id)}
                          title="Delete Appointment"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="card-footer bg-white border-0 py-3 d-flex flex-column flex-sm-row justify-content-between align-items-center border-top gap-2">
          <span className="text-muted small">
            Showing {filteredAppointments.length} of {totalElements} scheduled appointments
          </span>

          <nav>
            <ul className="pagination pagination-sm m-0 gap-1">
              <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages).keys()].map((index) => (
                <li key={index} className={`page-item ${page === index ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPage(index)}>
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages - 1}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {showModal && selectedAppointment && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-primary text-white p-4">
                <h5 className="modal-title fw-bold mb-0">Appointment Details</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">PATIENT NAME</label>
                    <div className="fw-semibold text-dark">{selectedAppointment.patientName}</div>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">ATTENDING DOCTOR</label>
                    <div className="fw-semibold text-dark">{selectedAppointment.doctorName}</div>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">SCHEDULED DATE</label>
                    <div className="fw-semibold text-dark">
                      {selectedAppointment.appointmentDate ? new Date(selectedAppointment.appointmentDate).toLocaleDateString() : "2026-09-28"}
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">SLOT TIME</label>
                    <div className="fw-semibold text-dark">{selectedAppointment.appointmentTime || "09:30 AM"}</div>
                  </div>
                  <div className="col-12">
                    <label className="text-muted small fw-semibold">REASON / SYMPTOMS</label>
                    <div className="p-3 bg-light rounded-3 text-secondary small">
                      {selectedAppointment.reason || "General health consultation and medical review."}
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="text-muted small fw-semibold">STATUS</label>
                    <div>
                      <span className={`badge px-3 py-1 rounded-pill ${getStatusBadgeClass(selectedAppointment.status)}`}>
                        {selectedAppointment.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light p-3">
                <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AppointmentList;