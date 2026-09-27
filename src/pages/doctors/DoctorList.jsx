import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { doctorApi } from "../../api/doctor.api";
import { useNavigate } from "react-router-dom";
import {
  MdSearch,
  MdVisibility,
  MdEdit,
  MdPeople,
  MdLocalHospital,
  MdAssignment,
  MdDelete,
  MdRefresh,
  MdAdd,
  MdEmail,
  MdPhone,
  MdMeetingRoom
} from "react-icons/md";

function DoctorList() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPage, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [specialization, setSpecialization] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, [page, size, specialization]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await doctorApi.getAllDoctors(page, size, "id", "asc", specialization);
      const list = response.content || [];
      setDoctors(list);
      setTotalPages(response.totalPages || 1);
      setTotalElements(response.totalElements || list.length);
      applyFilters(list, searchQuery, status);
    } catch (error) {
      console.error("Not able to fetch doctors data", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (data, search, statusVal) => {
    let result = [...data];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name?.toLowerCase().includes(q) ||
          d.specialization?.toLowerCase().includes(q) ||
          d.mobileNumber?.includes(q)
      );
    }
    if (statusVal) {
      result = result.filter((d) => d.status === statusVal);
    }
    setFilteredDoctors(result);
  };

  useEffect(() => {
    applyFilters(doctors, searchQuery, status);
  }, [searchQuery, status, doctors]);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPage - 1) setPage(page + 1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this doctor from active registry?")) return;
    try {
      await doctorApi.deleteDoctor(id);
      fetchDoctors();
    } catch (error) {
      console.error("Unable to delete doctor", error);
    }
  };

  const handleView = (doc) => {
    setSelectedDoctor(doc);
    setShowModal(true);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Doctor Directory & Staff Management</h2>
          <p className="text-muted small mb-0">
            View physician duty rosters, department assignments, and contact details.
          </p>
        </div>

        <button
          className="btn btn-primary px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
          onClick={() => navigate("/doctor/add")}
        >
          <MdAdd size={20} /> Add New Doctor
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 p-md-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted small fw-bold" style={{ fontSize: "0.75rem" }}>Total Doctors</span>
              <MdPeople size={22} className="text-primary" />
            </div>
            <h2 className="fw-bold my-1 text-dark">{totalElements}</h2>
            <small className="text-success fw-semibold">↗ +12% this month</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 p-md-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted small fw-bold" style={{ fontSize: "0.75rem" }}>On Duty</span>
              <MdLocalHospital size={22} className="text-success" />
            </div>
            <h2 className="fw-bold my-1 text-dark">38</h2>
            <div className="progress mt-2" style={{ height: "6px", borderRadius: "10px" }}>
              <div className="progress-bar bg-success" role="progressbar" style={{ width: "75%", borderRadius: "10px" }}></div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 p-md-4 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted small fw-bold" style={{ fontSize: "0.75rem" }}>Specializations</span>
              <MdAssignment size={22} className="text-warning" />
            </div>
            <h2 className="fw-bold my-1 text-dark">18</h2>
            <small className="text-muted">Global clinic coverage</small>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div 
            className="card border-0 shadow-sm text-white p-3 p-md-4 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer card-hover" 
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", borderRadius: "14px" }}
            onClick={() => navigate("/doctor/add")}  
          >
            <MdLocalHospital size={30} className="mb-1" />
            <span className="fw-bold">Register New Staff</span>
          </div>
        </div>
      </div>

      {/* Filter Card */}
      <div className="card border-0 shadow-sm p-3 p-md-4 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-5">
            <div className="position-relative">
              <MdSearch
                size={20}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                  color: "#64748b",
                }}
              />
              <input
                type="text"
                className="form-control ps-5 py-2 bg-light border-0"
                placeholder="Search doctors by name, specialty, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="col-6 col-md-3">
            <select
              className="form-select py-2 bg-light border-0"
              value={specialization}
              onChange={(e) => {
                setSpecialization(e.target.value);
                setPage(0);
              }}
            >
              <option value="">All Specializations</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="neurologist">Neurologist</option>
              <option value="pediatrics">Pediatrics</option>
            </select>
          </div>

          <div className="col-6 col-md-2">
            <select
              className="form-select py-2 bg-light border-0"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(0);
              }}
            >
              <option value="">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="ON_LEAVE">On Leave</option>
              <option value="UNAVAILABLE">Unavailable</option>
            </select>
          </div>

          <div className="col-12 col-md-2">
            <button 
              className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-1"
              onClick={() => {
                setSearchQuery("");
                setSpecialization("");
                setStatus("");
              }}
            >
              <MdRefresh size={18} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>ID</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Mobile Number</th>
                  <th>Duty Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      Loading doctor records...
                    </td>
                  </tr>
                ) : filteredDoctors.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted fw-semibold">
                      No doctors found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center shadow-sm"
                            style={{ width: "40px", height: "40px", fontSize: "14px" }}
                          >
                            {doctor.name?.charAt(0)?.toUpperCase() || "D"}
                          </div>
                          <div>
                            <div className="fw-semibold text-dark">{doctor.name}</div>
                            <small className="text-muted">{doctor.specialization}</small>
                          </div>
                        </div>
                      </td>

                      <td>#DOC-{doctor.id}</td>

                      <td>
                        <span className="badge bg-light text-dark border text-capitalize">
                          {doctor.specialization}
                        </span>
                      </td>

                      <td>{doctor.experience}</td>

                      <td className="text-secondary">{doctor.mobileNumber}</td>

                      <td>
                        <span
                          className={`badge rounded-pill ${
                            doctor.status === "AVAILABLE"
                              ? "badge-status-available"
                              : doctor.status === "ON_LEAVE"
                              ? "badge-status-on_leave"
                              : "badge-status-unavailable"
                          }`}
                        >
                          {doctor.status === "AVAILABLE"
                            ? "Available"
                            : doctor.status === "ON_LEAVE"
                            ? "On Leave"
                            : "Unavailable"}
                        </span>
                      </td>

                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-3">
                          <MdVisibility
                            size={20}
                            className="text-primary cursor-pointer hover-scale"
                            onClick={() => handleView(doctor)}
                            title="View Profile"
                            style={{ cursor: "pointer" }}
                          />
                          <MdEdit
                            size={20}
                            className="text-warning cursor-pointer hover-scale"
                            onClick={() => navigate(`/doctor/edit/${doctor.id}`)}
                            title="Edit Doctor"
                            style={{ cursor: "pointer" }}
                          />
                          <MdDelete
                            size={20}
                            className="text-danger cursor-pointer hover-scale"
                            onClick={() => handleDelete(doctor.id)}
                            title="Delete Doctor"
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

          {/* Pagination Footer */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center p-3 border-top gap-2">
            <span className="text-muted small">
              Showing {filteredDoctors.length} of {totalElements} registered doctors
            </span>
            <nav>
              <ul className="pagination pagination-sm mb-0 gap-1">
                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={handlePrevious} disabled={page === 0}>
                    Previous
                  </button>
                </li>
                {[...Array(totalPage)].map((_, index) => (
                  <li key={index} className={`page-item ${page === index ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(index)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${page === totalPage - 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={handleNext} disabled={page === totalPage - 1}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Doctor Modal */}
      {showModal && selectedDoctor && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-primary text-white p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-white text-primary fw-bold d-flex align-items-center justify-content-center shadow" style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}>
                    {selectedDoctor.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h5 className="modal-title fw-bold mb-0">{selectedDoctor.name}</h5>
                    <small className="text-white-50">{selectedDoctor.qualification || selectedDoctor.specialization}</small>
                  </div>
                </div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">SPECIALIZATION</label>
                    <div className="fw-semibold text-dark text-capitalize">{selectedDoctor.specialization}</div>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">EXPERIENCE</label>
                    <div className="fw-semibold text-dark">{selectedDoctor.experience}</div>
                  </div>
                  <div className="col-12">
                    <label className="text-muted small fw-semibold">MOBILE NUMBER</label>
                    <div className="d-flex align-items-center gap-2 text-dark fw-semibold">
                      <MdPhone className="text-primary" /> {selectedDoctor.mobileNumber}
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="text-muted small fw-semibold">EMAIL</label>
                    <div className="d-flex align-items-center gap-2 text-secondary">
                      <MdEmail className="text-primary" /> {selectedDoctor.email || `${selectedDoctor.name?.toLowerCase().replace(/[^a-z]/g, '')}@cityhospital.org`}
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">DUTY LOCATION</label>
                    <div className="d-flex align-items-center gap-2 text-dark">
                      <MdMeetingRoom className="text-primary" /> {selectedDoctor.roomNo || "Suite 402"}
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">CURRENT STATUS</label>
                    <div>
                      <span className={`badge rounded-pill ${selectedDoctor.status === "AVAILABLE" ? "badge-status-available" : "badge-status-on_leave"}`}>
                        {selectedDoctor.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light p-3">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button 
                  className="btn btn-primary btn-sm px-3"
                  onClick={() => {
                    setShowModal(false);
                    navigate(`/doctor/edit/${selectedDoctor.id}`);
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default DoctorList;