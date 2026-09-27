import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { departmentApi } from "../../api/department.api";
import { useNavigate } from "react-router-dom";
import {
  MdSearch,
  MdVisibility,
  MdEdit,
  MdDelete,
  MdBusiness,
  MdPeople,
  MdBed,
  MdAssignmentLate,
  MdLocationOn,
  MdAdd
} from "react-icons/md";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, [page, size]);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await departmentApi.getAllDepartments(page, size, "id", "asc");
      setDepartments(response.content || []);
      setTotalPage(response.totalPages || 1);
      setTotalElements(response.totalElements || (response.content ? response.content.length : 0));
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete department configuration?")) return;
    try {
      await departmentApi.deleteDepartment(id);
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPage - 1) setPage(page + 1);
  };

  const handleView = (department) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  const filtered = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase()) ||
    (dept.description && dept.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout>
      {/* 1. Page Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
        <div>
          <small className="text-primary fw-bold text-uppercase tracking-wider">
            Clinical Portal
          </small>
          <h2 className="fw-bold mb-1 text-dark">Department Management</h2>
          <p className="text-muted small mb-0">
            Configure hospital wings, assign department heads, and monitor staff allocation.
          </p>
        </div>
        <button
          className="btn btn-primary px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
          onClick={() => navigate("/department/add")}
        >
          <MdAdd size={20} /> Add Department
        </button>
      </div>

      {/* 2. Top Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-uppercase text-muted small fw-bold">Total Departments</div>
              <MdBusiness size={24} className="text-primary" />
            </div>
            <h2 className="fw-bold mt-2 mb-1 text-dark">{totalElements}</h2>
            <p className="text-success fw-semibold small mb-0">↗ +2 this quarter</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-uppercase text-muted small fw-bold">Total Medical Staff</div>
              <MdPeople size={24} className="text-success" />
            </div>
            <h2 className="fw-bold mt-2 mb-1 text-dark">1,482</h2>
            <p className="text-muted small mb-0">98.2% Active Duty</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-uppercase text-muted small fw-bold">In-Patient Capacity</div>
              <MdBed size={24} className="text-warning" />
            </div>
            <h2 className="fw-bold mt-2 mb-1 text-dark">842</h2>
            <p className="text-muted small mb-0">85% Occupancy Rate</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-uppercase text-muted small fw-bold">Pending Requests</div>
              <MdAssignmentLate size={24} className="text-danger" />
            </div>
            <h2 className="fw-bold mt-2 mb-1 text-dark">12</h2>
            <p className="text-danger fw-semibold small mb-0">⚠ Needs Attention</p>
          </div>
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="row g-4 mb-4">
        {/* Left Side: Registry Table */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
              <h5 className="fw-bold mb-0">Department Registry</h5>
              <div className="position-relative w-100 w-sm-50">
                <MdSearch size={18} style={{ position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)", color: "#64748b" }} />
                <input
                  type="text"
                  className="form-control form-control-sm ps-5 bg-light border-0"
                  placeholder="Search departments..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Department Name</th>
                    <th>Description</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">Loading departments...</td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">No departments found.</td>
                    </tr>
                  ) : (
                    filtered.map((dept) => (
                      <tr key={dept.id}>
                        <td>#DEPT-{dept.id}</td>
                        <td className="fw-semibold text-dark">{dept.name}</td>
                        <td className="text-muted small">{dept.description}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-3">
                            <MdVisibility
                              size={18}
                              className="text-primary cursor-pointer hover-scale"
                              onClick={() => handleView(dept)}
                              title="View Details"
                              style={{ cursor: "pointer" }}
                            />
                            <MdEdit
                              size={18}
                              className="text-warning cursor-pointer hover-scale"
                              onClick={() => navigate(`/department/edit/${dept.id}`)}
                              title="Edit Department"
                              style={{ cursor: "pointer" }}
                            />
                            <MdDelete
                              size={18}
                              className="text-danger cursor-pointer hover-scale"
                              onClick={() => handleDelete(dept.id)}
                              title="Delete Department"
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

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
              <small className="text-muted">Showing {filtered.length} departments</small>
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

        {/* Right Side: Staff Allocation Panel */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-3">Staff Allocation & Roster</h5>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>Physicians & Specialists</span>
                <span>42%</span>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar bg-primary" style={{ width: "42%" }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>Nursing & Patient Care</span>
                <span>38%</span>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar bg-success" style={{ width: "38%" }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>Technical Admin</span>
                <span>15%</span>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar bg-warning" style={{ width: "15%" }}></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>Support Services</span>
                <span>5%</span>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div className="progress-bar bg-info" style={{ width: "5%" }}></div>
              </div>
            </div>

            <hr />
            
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0">Shift Duty Distribution</h6>
                <span className="badge bg-primary-subtle text-primary small">Morning Peak</span>
              </div>
              <div className="d-flex justify-content-between align-items-end pt-3" style={{ height: "80px" }}>
                <div className="bg-primary rounded-top" style={{ height: "40%", width: "12%" }}></div>
                <div className="bg-primary rounded-top" style={{ height: "65%", width: "12%" }}></div>
                <div className="bg-primary rounded-top" style={{ height: "90%", width: "12%" }}></div>
                <div className="bg-primary rounded-top" style={{ height: "75%", width: "12%" }}></div>
                <div className="bg-primary rounded-top" style={{ height: "50%", width: "12%" }}></div>
                <div className="bg-primary rounded-top" style={{ height: "30%", width: "12%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Facility Distribution */}
      <div className="row g-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-1">Hospital Campus Wing Map</h5>
            <p className="text-muted small mb-3">Live map layout of department wings, triage, and operating theatres.</p>
            
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-5">
                <div className="card border p-3 mb-3 d-flex flex-row align-items-center justify-content-between border-start border-primary border-4 rounded-3">
                  <div>
                    <div className="fw-bold small">North Wing - Level 4</div>
                    <small className="text-muted">Surgery & Intensive Care Unit</small>
                  </div>
                  <MdLocationOn size={22} className="text-primary" />
                </div>

                <div className="card border p-3 d-flex flex-row align-items-center justify-content-between border-start border-secondary border-4 rounded-3">
                  <div>
                    <div className="fw-bold small">South Wing - Level 1</div>
                    <small className="text-muted">Outpatient Clinics & Radiology</small>
                  </div>
                  <MdLocationOn size={22} className="text-muted" />
                </div>
              </div>

              <div className="col-12 col-md-7 text-center">
                <div className="rounded-3 border overflow-hidden shadow-sm" style={{ height: "300px" }}>
                  <iframe
                    title="Apple Hospital Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.9216875675397!2d75.86395217476066!3d22.69395902851246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce495ee903f%3A0xf0b46034bc2ce47c!2sApple%20Hospital!5e0!3m2!1sen!2sin!4v1781432356400!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Details Modal */}
      {showModal && selectedDepartment && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-primary text-white p-4">
                <h5 className="modal-title fw-bold mb-0">Department Details</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <p><strong>Department ID:</strong> #DEPT-{selectedDepartment.id}</p>
                <p><strong>Name:</strong> {selectedDepartment.name}</p>
                <p><strong>Description:</strong> {selectedDepartment.description || "N/A"}</p>
                <p><strong>Head Physician:</strong> {selectedDepartment.head || "Dr. Cameron Vance"}</p>
              </div>
              <div className="modal-footer bg-light p-3">
                <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default DepartmentList;