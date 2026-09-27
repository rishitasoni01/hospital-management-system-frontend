
import React,{useState,useEffect} from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
 import {doctorApi} from"../../api/doctor.api";
 import { useNavigate } from "react-router-dom";
import{
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

function DoctorList() {
  const navigate = useNavigate();

const[doctors,setDoctors]=useState([]);
const[loading,setLoading]=useState(true);
const [status, setStatus] = useState("");
const[page,setPage]=useState(0);
const[size,setSize]=useState(2);
const[totalPage,setTotalPages]=useState(0);
const[totalElements,setTotalElements]=useState(0);
const[specialization,setSpecialization]=useState("");

 useEffect(() => {

     const fetchDoctor= async ()=>{

      setLoading(true);

     try{
      
      const response = await doctorApi.getAllDoctors(page,size,"id","asc",specialization);

          setDoctors(response.content||[]);
          setTotalPages(response.totalPages||0);
          setTotalElements(response.totalElements||0);

     }
     catch(error){
      console.error("not able to fetch doctors data",error);
     }
     finally{
      setLoading(false);
     }
    };
 
    
 fetchDoctor();

    }, [page,size,specialization]);

const handlePrevious = ()=> {
          if(page>0){
            setPage(page-1);
          }
    }
    const handleNext =() =>{

      if(page<totalPage-1){
        setPage(page + 1)
      }
    }

    const handleDelete = async (id) => {
  try {
    await doctorApi.deleteDoctor(id);

    const response = await doctorApi.getAllDoctors(
      page,
      size,
      "id",
      "asc",
      specialization
    );

    setDoctors(response.content || []);
    setTotalPages(response.totalPages || 0);
    setTotalElements(response.totalElements || 0);

  } catch (error) {
    console.error("Unable to delete doctor", error);
  }
};


  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          {/* <small className="text-primary fw-bold">
            CLINICAL RECORDS
          </small> */}

          <h2 className="fw-bold mb-1">
            Doctor Management
          </h2>

          <p className="text-muted mb-0">
            View and manage  all registered doctors.
          </p>
        </div>

       
      </div>

           
      {/* {/* 2. Summary Cards (Top par shift kar diye saare layout constraints fix karke) */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted small fw-bold" style={{ fontSize: "0.7rem" }}>Total Doctors</span>
              <MdPeople size={20} className="text-secondary" />
            </div>
            <h2 className="fw-bold my-1">{totalElements}</h2>
            <small className="text-success fw-semibold" style={{ fontSize: "0.8rem" }}>
              ↗ +12% this month
            </small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted small fw-bold" style={{ fontSize: "0.7rem" }}>On Duty</span>
              <MdLocalHospital size={20} className="text-secondary" />
            </div>
            <h2 className="fw-bold my-1">38</h2>
            <div className="progress mt-2" style={{ height: "5px", borderRadius: "10px" }}>
              <div className="progress-bar bg-primary" role="progressbar" style={{ width: "35%", borderRadius: "10px" }}></div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-uppercase text-muted small fw-bold" style={{ fontSize: "0.7rem" }}>Specializations</span>
              <MdAssignment size={20} className="text-secondary" />
            </div>
            <h2 className="fw-bold my-1">18</h2>
            <small className="text-muted" style={{ fontSize: "0.8rem" }}>Global clinic coverage</small>
          </div>
        </div>

        {/* Custom Blue Action Button Card from image layout */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-white p-3 h-100 d-flex flex-column align-items-center justify-content-center" 
               style={{ backgroundColor: "#0d6efd", cursor: "pointer", borderRadius: "8px" }}
               onClick={() =>navigate("/doctor/add")}  
               
               >
            <MdLocalHospital size={28} className="mb-1" />
            <span className="fw-bold" style={{ fontSize: "0.95rem" }}>Add New Doctor</span>
          </div>
        </div>
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

    
  </div>
</div>

          {/* Gender */}
          <div className="col-md-2">
            <select className="form-select"
            value={specialization}
            onChange={(e)=>{
              console.log("selected",e.target.value);
              setSpecialization(e.target.value);
              
              setPage(0);
            }}
          >
              <option value="">All Specialization</option>
              <option value="cardiologist">cardiologist</option>
              <option value="neurologist">neurologist</option>
              <option value="pediatrics">pediatrics</option>
            </select>
          </div>

          {/* Status */}
          <div className="col-md-2">
           <select
  className="form-select"
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

          {/* More Filters */}
          <div className="col-md-3">
            <button className="btn btn-outline-secondary w-100">
              More Filters
            </button>
          </div>

        </div>
      </div>

      {/* Table Section */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <h5 className="mb-3">Doctor Directory</h5>

          <table className="table align-middle">
            <thead>
              <tr>
                <th>DOCTOR NAME</th>
                <th>ID</th>
                <th>SPECIALIZATION</th>
                <th>EXPERIENCE</th>
                <th>MOBILE NUMBER</th>
                <th>Status</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

           <tbody>
  {doctors.map((doctor) => (
    <tr key={doctor.id}>
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
           {doctor.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <div className="fw-semibold">
              {doctor.name}
            </div>

            <small className="text-muted">
              {doctor.specialization}
            </small>
          </div>
        </div>
      </td>

      <td>{doctor.id}</td>

      <td>{doctor.specialization}</td>

      <td>{doctor.experience}</td>

      <td>{doctor.mobileNumber}</td>

      <td>
        
  <span
  className={`badge ${
    doctor.status === "AVAILABLE"
      ? "bg-success"
      : doctor.status === "ON_LEAVE"
      ? "bg-warning text-dark"
      : "bg-danger"
  }`}
>
  {doctor.status === "AVAILABLE"
    ? "Available"
    : doctor.status === "ON_LEAVE"
    ? "On Leave"
    : "Unavailable"}
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
    />

    <MdEdit
      size={20}
      style={{
        cursor: "pointer",
        color: "#f59e0b",
      }}
       onClick={() => navigate(`/doctor/edit/${doctor.id}`)}
    />

    <MdDelete
      size={20}
      style={{
        cursor: "pointer",
        color: "#dc2626",
      }}
      onClick={() => handleDelete(doctor.id)}
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
        <button className="page-link"
        onClick={handlePrevious}
        disabled={page===0}>
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
        <button className="page-link"
        onClick={handleNext}
    
        disabled={page===totalPage-1}>
          Next
        </button>
      </li>

    </ul>
  </nav>
</div>
        </div>
      </div>
           

      {/* </div> */}

    </DashboardLayout>
  );
}

export default DoctorList;