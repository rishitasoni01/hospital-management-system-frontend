import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
// import "../DepartmentList.css"; // Alag CSS file import ki hai
import { useState, useEffect } from "react";
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
const [selectedDepartment, setSelectedDepartment] =useState(null);
const [search, setSearch] = useState("");

  useEffect(()=>{
 const fetchDepartments = async () => {

    setLoading(true);

    try {

      const response =
        await departmentApi.getAllDepartments(
          page,
          size,
          "id",
          "asc"
        );

      console.log(response);

      setDepartments(response.content || []);
      setTotalPage(response.totalPages || 0);
      setTotalElements(
        response.totalElements || 0
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  fetchDepartments();

}, [page, size]);

const handleDelete = async (id) => {

  try {

    await departmentApi.deleteDepartment(id);

    const response =
      await departmentApi.getAllDepartments(
        page,
        size,
        "id",
        "asc"
      );

    setDepartments(response.content);

  } catch (error) {

    console.log(error);

  }

};

const handlePrevious = () => {

  if (page > 0) {
    setPage(page - 1);
  }

};

const handleNext = () => {

  if (page < totalPage - 1) {
    setPage(page + 1);
  }

};

const handleView = (department) => {
  setSelectedDepartment(department);
  setShowModal(true);
};

  return (

    <DashboardLayout>
      {/* 1. Page Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <small className="text-primary fw-bold text-uppercase tracking-wider">
            Clinical Portal
          </small>
          <h2 className="fw-bold mb-1">Department Management</h2>
          <p className="text-muted mb-0">
            Configure hospital wings, assign department heads, and monitor staff allocation.
          </p>
        </div>
       <button
  className="btn btn-primary px-4 py-2 fw-semibold"
  onClick={() => navigate("/department/add")}
>
  + Add Department
</button>
      </div>

      {/* 2. Top Summary Cards (4 Columns) */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-uppercase text-muted small fw-bold">Total Departments</div>
              <MdBusiness size={24} className="text-primary" />
            </div>
            <h2 className="fw-bold mt-2 mb-1">
                                   {totalElements}
                            </h2>
            <p className="text-success fw-semibold small mb-0">↗ +2 this quarter</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-uppercase text-muted small fw-bold">Total Medical Staff</div>
              <MdPeople size={24} className="text-primary" />
            </div>
            <h2 className="fw-bold mt-2 mb-1">1,482</h2>
            <p className="text-muted small mb-0">98.2% Active Duty</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-uppercase text-muted small fw-bold">In-Patient Capacity</div>
              <MdBed size={24} className="text-primary" />
            </div>
            <h2 className="fw-bold mt-2 mb-1">842</h2>
            <p className="text-muted small mb-0">85% Occupancy Rate</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-uppercase text-muted small fw-bold">Pending Requests</div>
              <MdAssignmentLate size={24} className="text-danger" />
            </div>
            <h2 className="fw-bold mt-2 mb-1">12</h2>
            <p className="text-danger fw-semibold small mb-0">⚠ Needs Attention</p>
          </div>
        </div>
      </div>

      {/* 3. Main Content Area (Registry Table + Staff Allocation Side Panel) */}
      <div className="row g-4">
        {/* Left Side: Registry Table */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Registry</h5>
              <div className="position-relative w-50">
                <MdSearch size={18} className="search-icon-position" />
                <input
                  type="text"
                  className="form-control form-control-sm ps-5"
                  placeholder="Search departments, staff, or codes..."
                  value={search}
                 onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <table className="table align-middle hms-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DEPARTMENT NAME</th>
                  <th>DESCRIPTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
  {departments
    .filter((dept) =>
      dept.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((dept) => (
      <tr key={dept.id}>
        <td>{dept.id}</td>
        <td className="fw-semibold">
          {dept.name}
        </td>

        <td>
          {dept.description}
        </td>

        <td>
          <div className="d-flex gap-3">

            <MdVisibility
              size={18}
              className="action-icon text-primary"
              onClick={() => handleView(dept)}
            />

          <MdEdit
    size={18}
    className="action-icon text-warning"
    onClick={() => navigate(`/department/edit/${dept.id}`)}
    style={{ cursor: "pointer" }}
/>

            <MdDelete
              size={18}
              className="action-icon text-danger"
              onClick={() =>
                handleDelete(dept.id)
              }
            />

          </div>
        </td>
      </tr>
    ))}
</tbody> 
            </table>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
             
             <div className="d-flex justify-content-end mt-3">

  <nav>

    <ul className="pagination mb-0">

      <li className="page-item">
        <button
          className="page-link"
          onClick={handlePrevious}
          disabled={page === 0}
        >
          Previous
        </button>
      </li>

      {[...Array(totalPage)].map((_, index) => (

        <li
          key={index}
          className={`page-item ${
            page === index
              ? "active"
              : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              setPage(index)
            }
          >
            {index + 1}
          </button>
        </li>

      ))}

      <li className="page-item">
        <button
          className="page-link"
          onClick={handleNext}
          disabled={page === totalPage - 1}
        >
          Next
        </button>
      </li>

    </ul>

  </nav>

</div>
          </div>
        </div>
        </div>

        {/* Right Side: Staff Allocation Panel */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-4">Staff Allocation</h5>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>Physicians</span>
                <span>42%</span>
              </div>
              <div className="progress style-progress">
                <div className="progress-bar bg-primary" style={{ width: "42%" }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>Nursing Staff</span>
                <span>38%</span>
              </div>
              <div className="progress style-progress">
                <div className="progress-bar bg-success" style={{ width: "38%" }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>Technical Admin</span>
                <span>15%</span>
              </div>
              <div className="progress style-progress">
                <div className="progress-bar bg-warning" style={{ width: "15%" }}></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between small fw-semibold mb-1">
                <span>Support Services</span>
                <span>5%</span>
              </div>
              <div className="progress style-progress">
                <div className="progress-bar bg-info" style={{ width: "5%" }}></div>
              </div>
            </div>

            <hr />
            
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0">Shift Overview</h6>
                <span className="badge bg-primary-light text-primary small">Morning Peak</span>
              </div>
              <div className="d-flex justify-content-between align-items-end h-75px pt-3">
                <div className="bar bg-primary" style={{ height: "40%", width: "12%" }}></div>
                <div className="bar bg-primary" style={{ height: "65%", width: "12%" }}></div>
                <div className="bar bg-primary" style={{ height: "90%", width: "12%" }}></div>
                <div className="bar bg-primary" style={{ height: "75%", width: "12%" }}></div>
                <div className="bar bg-primary" style={{ height: "50%", width: "12%" }}></div>
                <div className="bar bg-primary" style={{ height: "30%", width: "12%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Facility Distribution */}
      <div className="row g-4 mt-2">
        <div className="col-12">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-1">Facility Distribution</h5>
            <p className="text-muted small mb-4">Map view of department wings and patient triage zones.</p>
            
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="card border p-3 mb-3 d-flex flex-row align-items-center justify-content-between b-left-blue">
                  <div>
                    <div className="fw-bold small">North Wing - Level 4</div>
                    <small className="text-muted">Surgery & Intensive Care</small>
                  </div>
                  <MdLocationOn size={20} className="text-primary" />
                </div>

                <div className="card border p-3 d-flex flex-row align-items-center justify-content-between b-left-gray">
                  <div>
                    <div className="fw-bold small">South Wing - Level 1</div>
                    <small className="text-muted">Outpatient & Reception</small>
                  </div>
                  <MdLocationOn size={20} className="text-muted" />
                </div>
              </div>
              <div className="col-md-7 text-center">
  <div
    className="mock-map-bg rounded border overflow-hidden"
    style={{ height: "450px" }}
  >
    <iframe
      title="Apple Hospital Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.9216875675397!2d75.86395217476066!3d22.69395902851246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce495ee903f%3A0xf0b46034bc2ce47c!2sApple%20Hospital!5e0!3m2!1sen!2sin!4v1781432356400!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
      

{showModal && selectedDepartment && (
  <div
    className="modal d-block"
    style={{
      backgroundColor: "rgba(0,0,0,0.5)"
    }}
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">
            Department Details
          </h5>

          <button
            className="btn-close"
            onClick={() =>
              setShowModal(false)
            }
          ></button>
        </div>

        <div className="modal-body">

          <p>
            <strong>ID:</strong>{" "}
            {selectedDepartment.id}
          </p>

          <p>
            <strong>Name:</strong>{" "}
            {selectedDepartment.name}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {selectedDepartment.description}
          </p>

        </div>

      </div>
    </div>
  </div>
)}



    </DashboardLayout>
  );
}

export default DepartmentList;