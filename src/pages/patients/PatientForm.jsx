import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {useNavigate }   from "react-router-dom";
import {patientApi} from "../../api/patient.api";
import {useParams} from "react-router-dom";
import {
  MdPhotoCamera,
  MdInfoOutline,
} from "react-icons/md";

function PatientForm() {
const[save,setSave]=useState(0);
const[firstName,setFirstName]=useState("");
const[lastName,setLastName]=useState("");
const[gender,setGender]=useState("");
const[age,setAge]=useState("");
const [mobileNumber, setMobileNumber] = useState("");
const [address, setAddress] = useState("");
const navigate = useNavigate();
const {id}= useParams();

useEffect(()=>{
  if(id){
    fetchPatient();
  }
},[id]);

const fetchPatient = async () => {
  try {

    const patient = await patientApi.getPatientById(id);

    setFirstName(patient.firstName);
    setLastName(patient.lastName);
    setGender(patient.gender);
    setAge(patient.age);
    setMobileNumber(patient.mobileNumber);
    setAddress(patient.address);

  } catch (error) {
    console.log(error);
  }
};

const handelCancel=()=>{

  const confimCancel=window.confirm(
    "Are you sure?unsaved changes will be lost."
  );

  if (confimCancel){
  navigate("/patients");
  }
};

const handleSave = async()=>{

  const patientData={
   firstName,
   lastName,
   gender,
   age,
   mobileNumber,
   address,
   status:true


  };
  console.log(patientData);

  try{
    if(id){

  await patientApi.updatePatient(id, patientData);
  alert("Patient Updated Successfully");

}else{

  await patientApi.createPatient(patientData);
  alert("Patient Added Successfully");

}


    navigate("/patients");
  }

catch(error){

console.log(error.response);
  console.log(error.response?.data);
  alert("save failed");
}

}

  return (
    <DashboardLayout>
      <div className="container-fluid px-4 py-3">

        {/* Breadcrumb */}
        <div
          className="mb-2"
          style={{
            fontSize: "12px",
            color: "#6b7280",
          }}
        >
          Patients &gt; Add Patient
        </div>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2
            className="fw-bold mb-0"
            style={{
              color: "#1f2937",
            }}
          >
            Registration
          </h2>

          <div className="d-flex gap-2">
            <button className="btn btn-light border px-4" onClick={handelCancel}>
              Cancel
            </button>

            <button
              className="btn text-white px-4"
              style={{
                background: "#2563eb",
              }}
                onClick={handleSave}
            >
               save Patient

            </button>
          </div>
        </div>

        <div className="row">

          {/* Left Side */}
          <div className="col-lg-8">

            {/* Personal Info */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">

                <h5 className="fw-bold mb-4">
                  Personal Information
                </h5>

                <div className="row g-4">

                  <div className="col-md-6">
                    <label className="form-label">
                      First Name
                    </label>

                    <input
                      className="form-control"
                      placeholder="e.g., Jonathan"
                      value={firstName}
                      onChange={(e)=>setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Last Name
                    </label>

                    <input
                      className="form-control"
                      placeholder="e.g., Doe"
                      value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Gender
                    </label>

                    <select
                     className="form-select"
                     value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    >

                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Age
                    </label>

                    <input
                      className="form-control"
                      placeholder="Enter age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">
                      Mobile Number
                    </label>

                    <div className="input-group">
                      <span className="input-group-text">
                        +91
                      </span>

                      <input
                        className="form-control"
                        placeholder="9876543210"
                         value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">
                      Residential Address
                    </label>

                    <textarea
                      rows="4"
                      className="form-control"
                      placeholder="Enter full primary address..."
                       value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                </div>

              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">

                <h5 className="fw-bold mb-4">
                  Emergency Contact
                </h5>

                <div className="row">

                  <div className="col-md-6">
                    <label className="form-label">
                      Contact Name
                    </label>

                    <input
                      className="form-control"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Relationship
                    </label>

                    <input
                      className="form-control"
                      placeholder="e.g. Spouse"
                    />
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* Right Side */}
          <div className="col-lg-4">

            {/* Upload Card */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body text-center p-4">

                <div
                  className="mx-auto mb-3 d-flex justify-content-center align-items-center"
                  style={{
                    width: "120px",
                    height: "120px",
                    border: "2px dashed #d1d5db",
                    borderRadius: "12px",
                  }}
                >
                  <MdPhotoCamera
                    size={40}
                    color="#6b7280"
                  />
                </div>

                <h6 className="fw-bold">
                  Patient Portrait
                </h6>

                <small className="text-muted">
                  JPG or PNG, Max size 2MB
                </small>
              </div>
            </div>

            {/* Tips */}
            <div
              className="card mb-4"
              style={{
                background: "#0f172a",
                color: "white",
              }}
            >
              <div className="card-body">

                <h6 className="fw-bold mb-4">
                  <MdInfoOutline /> Registration Tips
                </h6>

                <ul
                  style={{
                    fontSize: "14px",
                  }}
                >
                  <li>
                    Verify government-issued ID.
                  </li>

                  <li>
                    Check duplicate records.
                  </li>

                  <li>
                    Ensure contact info is updated.
                  </li>
                </ul>

              </div>
            </div>

            {/* Progress */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">

                <div className="d-flex justify-content-between">
                  <span>Form Completion</span>

                  <span
                    style={{
                      color: "#2563eb",
                      fontWeight: "600",
                    }}
                  >
                    65%
                  </span>
                </div>

                <div
                  className="progress mt-3"
                  style={{
                    height: "8px",
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: "65%",
                    }}
                  />
                </div>

                <small className="text-muted">
                  Required fields: 4 left
                </small>

              </div>
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default PatientForm;