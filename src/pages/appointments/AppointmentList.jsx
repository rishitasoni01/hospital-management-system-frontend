import React, {
  useState,
  useEffect,
} from "react";

import {useNavigate} from "react-router-dom";
import { appointmentApi } from "../../api/appointment.api";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  MdCalendarToday, 
  MdAccessTime, 
  MdCancel, 
  MdPendingActions, 
  
  MdSearch, 
  MdVisibility, 
 // MdDelete,
  MdRefresh,
  MdAdd,
  MdEdit,
  MdDelete
} from "react-icons/md";

const AppointmentList = () => {
  // Dummy data strictly based on your PDF UI layout (Page 8 & Page 13)
  const [appointments, setAppointments] = useState([]);
const [showModal, setShowModal] = useState(false);
const [selectedAppointment, setSelectedAppointment] = useState(null);
const [totalPages, setTotalPages] = useState(0);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();
const [page, setPage] = useState(0);

const [size, setSize] =useState(5);


const [totalElements, setTotalElements] =useState(0);
  // Helper function to dynamically render status styles based on PDF color codes
  
useEffect(() => {
  fetchAppointments();
}, [page, size]);

const fetchAppointments = async () => {

  try {

    setLoading(true);

    const response =
      await appointmentApi.getAllAppointments(
        page,
        size,
        "id",
        "asc"
      );

    console.log(response);

    setAppointments(
      response.content || []
    );

    setTotalPages(
      response.totalPages || 0
    );

    setTotalElements(
      response.totalElements || 0
    );

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};
const handleView = (appointment) => {
  setSelectedAppointment(appointment);
  setShowModal(true);
};

const handleDelete = async (id) => {

  if (!window.confirm("Delete this appointment?")) return;

  try {

    await appointmentApi.deleteAppointment(id);

    fetchAppointments();

  } catch (error) {

    console.log(error);

  }
};
  const getStatusBadgeClass = (status) => {
     if (!status) {
    return "bg-secondary-subtle text-secondary";
  }
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-success-subtle text-success border border-success-subtle";
      case "pending":
        return "bg-warning-subtle text-warning border border-warning-subtle";
      case "completed":
        return "bg-primary-subtle text-primary border border-primary-subtle";
      case "cancelled":
        return "bg-danger-subtle text-danger border border-danger-subtle";
      default:
        return "bg-secondary-subtle text-secondary";
    }
  };

  return (
    <DashboardLayout>
    <div className="container-fluid py-4 px-4 bg-light min-vh-100">
      {/* Top Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Appointment Management</h2>
          <p className="text-muted mb-0">Efficiently schedule and monitor patient visits across all departments.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 shadow-sm fw-semibold"
        
        onClick={() => navigate("/appointments/create")}>
          <MdAdd size={20} /> Book Appointment
        </button>
      </div>

      {/* Stats Cards Row Section (Strictly matching Image 8 layout) */}
      <div className="row g-4 mb-4">
        {/* Today's Visits */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-uppercase text-muted small fw-bold tracking-wider">Today's Visits</span>
              <div className="p-2 bg-primary-subtle text-primary rounded">
                <MdCalendarToday size={20} />
              </div>
            </div>
            <h2 className="fw-bold text-dark m-0 display-6">42</h2>
            <p className="text-success small m-0 mt-2 fw-medium">
              <span>↑ 12%</span> <span className="text-muted fw-normal">vs yesterday</span>
            </p>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-uppercase text-muted small fw-bold tracking-wider">Pending Requests</span>
              <div className="p-2 bg-warning-subtle text-warning rounded">
                <MdPendingActions size={20} />
              </div>
            </div>
            <h2 className="fw-bold text-dark m-0 display-6">15</h2>
            <p className="text-muted small m-0 mt-2 fw-normal">Needs immediate review</p>
          </div>
        </div>

        {/* Cancellations */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-uppercase text-muted small fw-bold tracking-wider">Cancellations</span>
              <div className="p-2 bg-danger-subtle text-danger rounded">
                <MdCancel size={20} />
              </div>
            </div>
            <h2 className="fw-bold text-dark m-0 display-6">3</h2>
            <p className="text-muted small m-0 mt-2 fw-normal">Scheduled today</p>
          </div>
        </div>

        {/* Fulfillment Rate / Graphical Progress Box */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100 bg-dark text-white">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-uppercase text-light small opacity-75 fw-bold">Fulfillment Rate</span>
              <span className="badge bg-secondary text-white small fw-bold">88%</span>
            </div>
            <div className="mt-3">
              <div className="progress bg-secondary" style={{ height: "8px" }}>
                <div className="progress-bar bg-info" role="progressbar" style={{ width: "88%" }} aria-valuenow="88" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <p className="small text-light opacity-75 mt-3 mb-0">Target completion rate reached</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar Section */}
      <div className="card border-0 shadow-sm mb-4 bg-white p-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <div className="input-group border rounded px-2 bg-light align-items-center">
              <MdSearch size={22} className="text-muted me-2" />
              <input 
                type="text" 
                className="form-control bg-transparent border-0 py-2 shadow-none" 
                placeholder="Search patients, doctors or IDs..." 
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group border rounded px-2 bg-light align-items-center">
              <MdCalendarToday size={18} className="text-muted me-2" />
              <input type="date" className="form-control bg-transparent border-0 py-2 shadow-none text-muted" defaultValue="2023-11-24" />
            </div>
          </div>
          <div className="col-md-2">
            <select className="form-select bg-light border py-2 shadow-none text-muted fw-medium">
              <option>All Statuses</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div className="col-md-2">
            <select className="form-select bg-light border py-2 shadow-none text-muted fw-medium">
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Orthopedics</option>
              <option>Dermatology</option>
            </select>
          </div>
          <div className="col-md-1 d-flex justify-content-end">
            <button
                className="btn btn-outline-secondary p-2 d-flex align-items-center shadow-none"
                      title="Reset Filters"
                      onClick={fetchAppointments}
                                          >
              <MdRefresh size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Appointments Table Card */}
      <div className="card border-0 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-uppercase text-muted small fw-bold border-bottom">
              <tr>
                <th className="px-4 py-3">Patient Name</th>
                <th className="py-3">Doctor Name</th>
                <th className="py-3">Date</th>  
                <th className="py-3">Time</th>
                  <th className="py-3">Reason</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-center">Actions</th>
              </tr>
            </thead>
        <tbody className="border-0">

  {loading ? (
    <tr>
      <td colSpan="7" className="text-center py-4">
        Loading...
      </td>
    </tr>
  ) : appointments.length === 0 ? (

    <tr>
      <td colSpan="7" className="text-center py-4">
        No Appointment Found
      </td>
    </tr>

  ) : (

    appointments.map((appointment) => (
      <tr key={appointment.id} className="border-bottom">

        {/* Patient Info */}
        <td className="px-4 py-3">
          <div className="d-flex align-items-center">

            <div
              className="avatar bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm"
              style={{ width: "40px", height: "40px" }}
            >
              {appointment.patientName
                ?.split(" ")
                .map((word) => word.charAt(0))
                .join("")
                .toUpperCase()}
            </div>

            <div>
              <div className="fw-semibold text-dark">
                {appointment.patientName}
              </div>

             
            </div>

          </div>
        </td>

        {/* Doctor */}
        <td className="py-3">
          <div className="fw-medium text-secondary">
            {appointment.doctorName}
          </div>
        </td>

        {/* Date & Time */}
        <td className="py-3">
          <div className="fw-medium text-dark">
           {new Date(appointment.appointmentDate).toLocaleDateString()}
          </div>
      </td>
      <td>
          <div className="text-muted small d-flex align-items-center gap-1">
            <MdAccessTime size={14} />
            {appointment.appointmentTime?.substring(0,5)}
          </div>
        </td>
       
        <td className="py-3">
           <div>
  {appointment.reason}
  </div>
</td>


        {/* Status */}
        <td className="py-3">
          <span
            className={`badge px-3 py-2 rounded-pill fw-semibold small ${getStatusBadgeClass(
              appointment.status
            )}`}
          >
            {appointment.status}
          </span>
        </td>

        {/* Actions */}
        <td className="py-3 text-center">
  <div className="d-flex justify-content-center gap-3">

    <MdVisibility
      size={20}
      style={{
        cursor: "pointer",
        color: "#2563eb",
      }}
      onClick={() => handleView(appointment)}
    />

    <MdEdit
      size={20}
      style={{
        cursor: "pointer",
        color: "#f59e0b",
      }}
      onClick={() =>
        navigate(`/appointments/edit/${appointment.id}`)
      }
    />

    <MdDelete
      size={20}
      style={{
        cursor: "pointer",
        color: "#dc2626",
      }}
      onClick={() => handleDelete(appointment.id)}
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
        <div className="card-footer bg-white border-0 py-3 d-flex justify-content-between align-items-center border-top">
          <span className="text-muted small">

          Showing {appointments.length} of {totalElements} appointments</span>

        <nav>
  <ul className="pagination pagination-sm m-0 gap-1">

    {/* Previous Button */}
    <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
      <button
        className="page-link"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        ‹
      </button>
    </li>

    {/* Page Numbers */}
   {[...Array(totalPages).keys()].map((index) => (
  <li
    key={index}
    className={`page-item ${page === index ? "active" : ""}`}
  >
    <button
      className="page-link"
      onClick={() => setPage(index)}
    >
      {index + 1}
    </button>
  </li>
))}

    {/* Next Button */}
    <li
      className={`page-item ${
        page === totalPages - 1 ? "disabled" : ""
      }`}
    >
      <button
        className="page-link"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages - 1}
      >
        ›
      </button>
    </li>

  </ul>
</nav>
        </div>
      </div>
    </div>

    {showModal && selectedAppointment && (
  <div
    className="modal d-block"
    tabIndex="-1"
    style={{
      backgroundColor: "rgba(0,0,0,0.5)",
    }}
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">
            Appointment Details
          </h5>

          <button
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>

        <div className="modal-body">

          <p>
            <strong>Patient :</strong>{" "}
            {selectedAppointment.patientName}
          </p>

          <p>
            <strong>Doctor :</strong>{" "}
            {selectedAppointment.doctorName}
          </p>

          <p>
            <strong>Date :</strong>{" "}
            {new Date(
              selectedAppointment.appointmentDate
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>Time :</strong>{" "}
            {selectedAppointment.appointmentTime}
          </p>

          <p>
            <strong>Reason :</strong>{" "}
            {selectedAppointment.reason}
          </p>

          <p>
            <strong>Status :</strong>{" "}
            {selectedAppointment.status}
          </p>

        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
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