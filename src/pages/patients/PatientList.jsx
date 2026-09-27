import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { patientApi } from "../../api/patient.api";
import {
  MdSearch,
  MdVisibility,
  MdEdit,
  MdPeople,
  MdLocalHospital,
  MdAssignment,
  MdDescription,
  MdDelete,
  MdRefresh,
  MdAdd,
  MdPhone,
  MdLocationOn,
  MdClose
} from "react-icons/md";

function PatientList() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchPatients();
  }, [page, size]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await patientApi.getAllPatient(page, size, "id", "desc");
      const list = response.content || [];
      setPatients(list);
      setTotalPage(response.totalPages || 1);
      setTotalElements(response.totalElements || list.length);
      applyFilters(list, searchQuery, genderFilter, statusFilter);
    } catch (error) {
      console.error("Unable to fetch patient data", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (data, search, gender, status) => {
    let result = [...data];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
          (p.mobileNumber && p.mobileNumber.includes(q)) ||
          (p.address && p.address.toLowerCase().includes(q))
      );
    }
    if (gender) {
      result = result.filter((p) => p.gender === gender);
    }
    if (status) {
      result = result.filter((p) =>
        status === "ACTIVE" ? p.status === true : p.status === false
      );
    }
    setFilteredPatients(result);
  };

  useEffect(() => {
    applyFilters(patients, searchQuery, genderFilter, statusFilter);
  }, [searchQuery, genderFilter, statusFilter, patients]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this patient record?")) return;
    try {
      await patientApi.deletePatient(id);
      fetchPatients();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setGenderFilter("");
    setStatusFilter("");
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
        <div>
          <small className="text-primary fw-bold text-uppercase tracking-wider">
            CLINICAL RECORDS
          </small>
          <h2 className="fw-bold mb-1 text-dark">Patient Registry</h2>
          <p className="text-muted small mb-0">
            View and manage medical histories and triage data for all registered patients.
          </p>
        </div>

        <button
          className="btn btn-primary px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
          onClick={() => navigate("/patients/registration")}
        >
          <MdAdd size={20} /> Add Patient
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-uppercase text-muted small fw-bold">Total Patients</span>
              <MdPeople size={24} className="text-primary" />
            </div>
            <h2 className="fw-bold text-dark m-0">{totalElements}</h2>
            <p className="text-success fw-semibold small m-0 mt-2">↗ +12% this month</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-uppercase text-muted small fw-bold">In Treatment</span>
              <MdLocalHospital size={24} className="text-success" />
            </div>
            <h2 className="fw-bold text-dark m-0">156</h2>
            <p className="text-muted small m-0 mt-2">Ward Occupancy: 78%</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-uppercase text-muted small fw-bold">Daily Admissions</span>
              <MdAssignment size={24} className="text-warning" />
            </div>
            <h2 className="fw-bold text-dark m-0">12</h2>
            <p className="text-danger fw-semibold small m-0 mt-2">↘ -2% from avg</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-uppercase text-muted small fw-bold">Records Pending</span>
              <MdDescription size={24} className="text-info" />
            </div>
            <h2 className="fw-bold text-dark m-0">43</h2>
            <p className="text-muted small m-0 mt-2">Requires verification</p>
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
                placeholder="Search by patient name, phone, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="col-6 col-md-2">
            <select
              className="form-select py-2 bg-light border-0"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div className="col-6 col-md-2">
            <select
              className="form-select py-2 bg-light border-0"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className="col-12 col-md-3 d-flex gap-2">
            <button
              className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-1"
              onClick={resetFilters}
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
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Mobile Number</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      Loading patient records...
                    </td>
                  </tr>
                ) : filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <p className="text-muted mb-0 fw-semibold">No patients match your search filter.</p>
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center shadow-sm"
                            style={{ width: "40px", height: "40px", fontSize: "14px" }}
                          >
                            {`${patient.firstName?.charAt(0) || ""}${patient.lastName?.charAt(0) || ""}`.toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-semibold text-dark">
                              {patient.firstName} {patient.lastName}
                            </div>
                            {/* <small className="text-muted">ID: #PAT-{patient.id}</small> */}
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark border">
                          {patient.gender || "N/A"}
                        </span>
                      </td>

                      <td>{patient.age} yrs</td>

                      <td className="text-secondary">{patient.mobileNumber}</td>

                      <td>
                        <span className={`badge rounded-pill ${patient.status ? "badge-status-active" : "badge-status-inactive"}`}>
                          {patient.status ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-3">
                          <MdVisibility
                            size={20}
                            className="text-primary cursor-pointer hover-scale"
                            onClick={() => handleView(patient)}
                            title="View Details"
                            style={{ cursor: "pointer" }}
                          />
                          <MdEdit
                            size={20}
                            className="text-warning cursor-pointer hover-scale"
                            onClick={() => navigate(`/patients/edit/${patient.id}`)}
                            title="Edit Record"
                            style={{ cursor: "pointer" }}
                          />
                          <MdDelete
                            size={20}
                            className="text-danger cursor-pointer hover-scale"
                            onClick={() => handleDelete(patient.id)}
                            title="Delete Patient"
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
              Showing {filteredPatients.length} of {totalElements} registered patients
            </span>
            <nav>
              <ul className="pagination pagination-sm mb-0 gap-1">
                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(page - 1)} disabled={page === 0}>
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
                  <button className="page-link" onClick={() => setPage(page + 1)} disabled={page === totalPage - 1}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Patient Details Modal */}
      {showModal && selectedPatient && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-primary text-white p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-white text-primary fw-bold d-flex align-items-center justify-content-center shadow" style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}>
                    {`${selectedPatient.firstName?.charAt(0) || ""}${selectedPatient.lastName?.charAt(0) || ""}`.toUpperCase()}
                  </div>
                  <div>
                    <h5 className="modal-title fw-bold mb-0">
                      {selectedPatient.firstName} {selectedPatient.lastName}
                    </h5>
                    <small className="text-white-50">Patient Record #PAT-{selectedPatient.id}</small>
                  </div>
                </div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">GENDER</label>
                    <div className="fw-semibold text-dark">{selectedPatient.gender}</div>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">AGE</label>
                    <div className="fw-semibold text-dark">{selectedPatient.age} years</div>
                  </div>
                  <div className="col-12">
                    <label className="text-muted small fw-semibold">MOBILE NUMBER</label>
                    <div className="d-flex align-items-center gap-2 text-dark fw-semibold">
                      <MdPhone className="text-primary" /> {selectedPatient.mobileNumber}
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="text-muted small fw-semibold">RESIDENTIAL ADDRESS</label>
                    <div className="d-flex align-items-start gap-2 text-secondary">
                      <MdLocationOn className="text-primary mt-1" /> {selectedPatient.address || "Not provided"}
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">STATUS</label>
                    <div>
                      <span className={`badge rounded-pill ${selectedPatient.status ? "badge-status-active" : "badge-status-inactive"}`}>
                        {selectedPatient.status ? "Active Record" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="text-muted small fw-semibold">BLOOD GROUP</label>
                    <div className="fw-bold text-danger">{selectedPatient.bloodGroup || "O+"}</div>
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
                    navigate(`/patients/edit/${selectedPatient.id}`);
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

export default PatientList;