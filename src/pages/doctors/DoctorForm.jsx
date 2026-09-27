import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { doctorApi } from "../../api/doctor.api";
import { departmentApi } from "../../api/department.api";
import "../../assets/css/doctor-form.css";
import {
  MdPhotoCamera,
  MdInfoOutline
} from "react-icons/md";

import "../../assets/css/doctor-form.css";

function DoctorForm() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
const [specialization, setSpecialization] = useState("");
const [experience, setExperience] = useState("");
const [mobileNumber, setMobileNumber] = useState("");
const [departmentId, setDepartmentId] = useState("");
const [status, setStatus] = useState("AVAILABLE");
  const [departments, setDepartments] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadDepartments();

    if (id) {
      fetchDoctor();
    }
  }, []);

 const loadDepartments = async () => {
  try {
    const departments = await departmentApi.getDepartmentDropdown();
    setDepartments(departments);
  } catch (err) {
    console.log(err);
  }
};

  const fetchDoctor = async () => {

    try {

      const doctor = await doctorApi.getDoctorById(id);

       setName(doctor.name);
    setSpecialization(doctor.specialization);
    setExperience(doctor.experience);
    setMobileNumber(doctor.mobileNumber);
    setDepartmentId(doctor.departmentId);
    } catch (e) {
      
      console.log(e);
       console.log(e.response.data);
    }

  };

  const handleImage = (e) => {

    if (e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }

  };

  const handleCancel = () => {

    if (window.confirm("Discard Changes ?")) {
      navigate("/doctors");
    }

  };

  const handleSave = async () => {

    const doctorData = {

      name,
  specialization,
  departmentId,
 experience: Number(experience),
    mobileNumber
  

    };
console.log(doctorData);
    try {

      if (id) {

        await doctorApi.updateDoctor(id, doctorData);
        alert("Doctor Updated Successfully");

      } else {

        await doctorApi.createDoctor(doctorData);
        alert("Doctor Added Successfully");

      }

      navigate("/doctors");

    } catch (e) {

      console.log(e.response);
      alert("Save Failed");

    }

  };

  console.log("Departments State =", departments);
console.log("Is Array =", Array.isArray(departments));

  return (

    <DashboardLayout>

      <div className="container-fluid doctor-container">

        <div className="doctor-breadcrumb">
          Doctors &gt; Add Doctor
        </div>

        <div className="doctor-header">

          <div>
            <h2>New Medical Professional</h2>
            <p>Add a qualified healthcare provider to your team.</p>
          </div>

          <div>

            

            <button
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save Doctor Profile
            </button>

          </div>

        </div>

        <div className="row mt-4">

          {/* LEFT SIDE */}

          <div className="col-lg-4">

            <div className="card shadow-sm border-0 mb-4">

              <div className="card-body text-center">

                <label htmlFor="doctorImage">

                  <div className="doctor-image-box">

                    {
                      image ?

                        <img
                          src={image}
                          className="doctor-preview"
                          alt=""
                        />

                        :

                        <MdPhotoCamera
                          size={45}
                          color="#888"
                        />

                    }

                  </div>

                </label>

                <input
                  id="doctorImage"
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

                <h5 className="mt-3">
                  Professional Portrait
                </h5>

                <small className="text-muted">
                  PNG, JPG up to 5MB
                </small>

              </div>

            </div>

            <div className="card validation-card">

              <div className="card-body">

                <h5>
                  <MdInfoOutline />
                  Validation Guide
                </h5>

                <ul>

                  <li>Medical council registration required.</li>

                  <li>Minimum experience 1 year.</li>

                  <li>Professional email mandatory.</li>

                  <li>Upload recent profile photo.</li>

                </ul>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="col-lg-8">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                <h4 className="mb-4">
                  Professional Information
                </h4>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label>Full Name</label>

                    <input
                      className="form-control"
                      placeholder="Dr. John Smith"
                     value={name}
                          onChange={(e) => setName(e.target.value)}
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label>Specialization</label>

                    <input
                      className="form-control"
                      placeholder="Cardiologist"
                      value={specialization}
                      onChange={(e)=>setSpecialization(e.target.value)}
                    />

                  </div>
                                  

                  <div className="col-md-6 mb-3">

                    <label>Experience (Years)</label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="5"
                      value={experience}
                      onChange={(e)=>setExperience(e.target.value)}
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label>Mobile Number</label>

                    <div className="input-group">

                      <span className="input-group-text">
                        +91
                      </span>

                      <input
                        className="form-control"
                        placeholder="9876543210"
                        value={mobileNumber}
                        onChange={(e)=>setMobileNumber(e.target.value)}
                      />

                    </div>

                  </div>

                  

                  <div className="col-md-6 mb-3">

                    <label>Department</label>

                    <select
                      className="form-select"
                      value={departmentId}
                      onChange={(e)=>setDepartmentId(Number(e.target.value))}
                    >

                      <option value="">
                        Select Department
                      </option>

                      {
                        departments?.map((dept)=>(
                          <option
                            key={dept.id}
                            value={dept.id}
                          >
                            {dept.name}
                          </option>
                        ))
                      }

                    </select>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default DoctorForm;