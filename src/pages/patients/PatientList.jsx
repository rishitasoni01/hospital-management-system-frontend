import React ,{useState,useEffect} from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import {patientApi} from "../../api/patient.api";
import {
  MdSearch,
  MdVisibility,
  MdEdit,
  MdMoreVert,
  MdPeople,
  MdLocalHospital,
  MdAssignment,
  MdDescription,
   MdDelete,
} from "react-icons/md";

function PatientList() {

  const navigate = useNavigate();
  const[patients,setPatient]=useState([]);
  const[loading,setLoading]=useState(true);

  const[page,setPage]=useState(0);
  const[size,setSize]=useState(5);
  const[totalPage,setTotalPage]=useState(0);
  const[totalElements,setTotalElements]=useState(0);
 const [showModal, setShowModal] = useState(false);
 const [selectedPatient, setSelectedPatient] = useState(null);
  const [genderFilter, setGenderFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(()=>{

      const fetchPatient= async()=>{
          setLoading(true);

          try{
            const response= await patientApi.getAllPatient(page,size,"id","desc");
            setPatient(response.content||[]);
            setTotalPage(response.totalPages||0);
            setTotalElements(response.totalElements||0);
            setFilteredPatients(response.content || []);   
           console.log(response);
          }
          catch(error){
            console.log("not abble to fecth patient date",error);

          }
          finally{
          setLoading(false);
          }

       }
       fetchPatient();
  },[page,size]);

  const handleDelete = async (id) => {

    try{

  await patientApi.deletePatient(id);

     const response = await patientApi.getAllPatient(
        page,size,"id","asc"
      );
     setPatient(response.content);

    }
    catch(error){
      console.log(error);
    }
  }
  const handleView=(patient)=>{
    setSelectedPatient(patient);
    setShowModal(true);
  }

const handlePrevious = ()=>{
  if(page>0){
    setPage(page-1);
  }
};

const handleNext = () =>{
if(page< totalPage-1){
  setPage(page+1);
}
}

 const handleFilter = async()=>{
 console.log("Gender Filter:", genderFilter);
  console.log("Status Filter:", statusFilter);
  console.log("Patients:", patients);
  let filtered=[...patients];

  patients.forEach(patient => {
  console.log(
    patient.firstName,
    patient.gender,
    patient.status
  );
});

  if(genderFilter){
    filtered=filtered.filter(patient=>
      patient.gender===genderFilter
    );
  }

  if(statusFilter){
    filtered=filtered.filter(patient=>
      statusFilter==="ACTIVE"
      ? patient.status===true
      : patient.status===false
    );
  }

  console.log("Filtered Result:", filtered);
  setFilteredPatients(filtered);
};
  
   
  return (

    <DashboardLayout>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <small className="text-primary fw-bold">
            CLINICAL RECORDS
          </small>

          <h2 className="fw-bold mb-1">
            Patient Management
          </h2>

          <p className="text-muted mb-0">
            View and manage clinical records for all registered patients.
          </p>
        </div>

        <button
  className="btn btn-primary px-4 py-2"
  onClick={() => navigate("/patients/registration")}
  style={{
    background: "#2563eb",
    border: "none",
  }}
>
  + Add Patient
</button>
      </div>

      {/* Filter Card */}
      <div className="card border-0 shadow-sm p-4">
        <div className="row g-3 align-items-center">

          <div className="col-md-5">
  <div className="position-relative">
    <MdSearch
      size={20}
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        color: "#888",
      }}
    />

    <input
      type="text"
      className="form-control ps-5"
      placeholder="Search patients by name, ID, phone..."
    />
  </div>
</div>

          {/* Gender */}
          <div className="col-md-2">
            <select className="form-select"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          {/* Status */}
          <div className="col-md-2">
            <select className="form-select"
            value={statusFilter}
            onChange={(e)=> setStatusFilter(e.target.value)}
            >
              <option value="">Status:All</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* More Filters */}
          <div className="col-md-3">
            <button className="btn btn-outline-secondary w-100"
            onClick={handleFilter}
            >
               Filter
               
            </button>
      
            
          </div>

        </div>
      </div>

      {/* Table Section */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <h5 className="mb-3">Patient Records</h5>

          <table className="table align-middle">
            <thead>
              <tr>
                <th>PATIENT NAME</th>
                {/* <th>ID</th> */}
                <th>GENDER</th>
                <th>AGE</th>
                <th>MOBILE NUMBER</th>
                <th>Status</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

           <tbody>
  {filteredPatients.map((patient) => (
   
    <tr key={patient.id}>
      <td>
        <div className="d-flex align-items-center gap-3">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#2563eb",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            
            {`${patient.firstName?.charAt(0) || ""}${patient.lastName?.charAt(0) || ""}`.toUpperCase()}
          </div>

          <div>
            <div className="fw-semibold">
              {patient.firstName} {patient.lastName}
            </div>

            <small className="text-muted">
              Registered Patient
            </small>
          </div>
        </div>
      </td>

      {/* <td>{patient.id}</td> */}

      <td>{patient.gender}</td>

      <td>{patient.age}</td>

      <td>{patient.mobileNumber}</td>

      <td>
        <span
          className={`badge ${
            patient.status
              ? "bg-success"
              : "bg-danger"
          }`}
        >
          {patient.status ? "Active" : "Inactive"}
        </span>
      </td>

      <td>
  <div className="d-flex gap-3">

    <MdVisibility
      size={20}
      style={{
        cursor: "pointer",
        color: "#2563eb",
      }}
onClick={() => handleView(patient)}

      
    />

    <MdEdit
      size={20}
      style={{
        cursor: "pointer",
        color: "#f59e0b",
      }}

      onClick={()=>navigate(`/patients/edit/${patient.id}`)} 
      />

    <MdDelete
      size={20}
      style={{
        cursor: "pointer",
        color: "#dc2626",
      }}
      onClick={() => handleDelete(patient.id)}
    />

  </div>
</td>
    </tr>
  ))}
</tbody>
          </table>
<div className="d-flex justify-content-end mt-3">
  <nav>
    <ul className="pagination mb-0">

      <li className="page-item">
        <button className="page-link" onClick={handlePrevious}
        disabled={page===0}
        >
          Previous
        </button>
      </li>

      {

  [...Array(totalPage)].map((_, index) => (
    <li
      key={index}
      className={`page-item ${
        page === index ? "active" : ""
      }`}
    >
      <button
        className="page-link"
        onClick={() => setPage(index)}
      >
        {index + 1}
      </button>
    </li>
  ))
}

      <li className="page-item">
        <button className="page-link" onClick={handleNext}
        disabled={page===totalPage-1}
        
        >
          Next 
        </button>
      </li>

    </ul>
  </nav>
</div>
        </div>
      </div>
            {/* Summary Cards */}
      <div className="row mt-4 g-4">

        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">

  <div className="text-uppercase text-muted small fw-bold">
    Total Patients
  </div>

  <MdPeople size={24} />

</div>

            <h2 className="fw-bold mt-2">{totalElements}</h2>

            <p className="text-success fw-semibold mb-0">
              ↗ +12% this month
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100">
           <div className="d-flex justify-content-between align-items-center">

  <div className="text-uppercase text-muted small fw-bold">
    In Treatment
  </div>

  <MdLocalHospital size={24} />

</div>

            <h2 className="fw-bold mt-2">156</h2>

            <p className="text-muted mb-0">
              Occupancy: 78%
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">

  <div className="text-uppercase text-muted small fw-bold">
    Daily Admissions
  </div>

  <MdAssignment size={24} />

</div>

            <h2 className="fw-bold mt-2">12</h2>

            <p className="text-danger fw-semibold mb-0">
              ↘ -2% from avg
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center">

  <div className="text-uppercase text-muted small fw-bold">
    Records Pending
  </div>

  <MdDescription size={24} />

</div>

            <h2 className="fw-bold mt-2">43</h2>

            <p className="text-muted mb-0">
              Requires verification
            </p>
          </div>
        </div>

      </div>


      {showModal && selectedPatient && (
  <div
    className="modal d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">
            Patient Details
          </h5>

          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>

        <div className="modal-body">

          <p>
            <strong>First Name:</strong>{" "}
            {selectedPatient.firstName}
          </p>

          <p>
            <strong>Last Name:</strong>{" "}
            {selectedPatient.lastName}
          </p>

          <p>
            <strong>Gender:</strong>{" "}
            {selectedPatient.gender}
          </p>

          <p>
            <strong>Age:</strong>{" "}
            {selectedPatient.age}
          </p>

          <p>
            <strong>Mobile:</strong>{" "}
            {selectedPatient.mobileNumber}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {selectedPatient.address}
          </p>

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
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