import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { patientApi } from '../../api/patient.api';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MdPhone, MdLocationOn, MdArrowBack, MdEdit, MdLocalHospital, MdBloodtype, MdPerson } from 'react-icons/md';

function PatientDetails() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const response = await patientApi.getPatientById(id);
      setPatient(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-5 text-center text-muted">
          <h5>Loading patient dossier...</h5>
        </div>
      </DashboardLayout>
    );
  }

  if (!patient) {
    return (
      <DashboardLayout>
        <div className="p-5 text-center">
          <h5>Patient record not found.</h5>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/patients')}>Back to Registry</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <button className="btn btn-light border d-flex align-items-center gap-2" onClick={() => navigate('/patients')}>
          <MdArrowBack size={18} /> Back to Patients
        </button>
        <button className="btn btn-warning text-dark fw-bold d-flex align-items-center gap-2" onClick={() => navigate(`/patients/edit/${patient.id}`)}>
          <MdEdit size={18} /> Edit Patient Record
        </button>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden mb-4">
        <div className="bg-primary p-4 text-white">
          <div className="d-flex align-items-center gap-4">
            <div className="rounded-circle bg-white text-primary fw-bold d-flex align-items-center justify-content-center shadow" style={{ width: "70px", height: "70px", fontSize: "1.8rem" }}>
              {`${patient.firstName?.charAt(0) || ""}${patient.lastName?.charAt(0) || ""}`.toUpperCase()}
            </div>
            <div>
              <h3 className="fw-bold mb-1">{patient.firstName} {patient.lastName}</h3>
              <div className="d-flex align-items-center gap-3 text-white-50 small">
                <span>Patient ID: #PAT-{patient.id}</span>
                <span>•</span>
                <span>Gender: {patient.gender}</span>
                <span>•</span>
                <span>Age: {patient.age} Yrs</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-4">
          <h5 className="fw-bold mb-3 text-dark">Clinical Information</h5>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-3 bg-light rounded-3">
                <small className="text-muted fw-bold d-block mb-1">MOBILE NUMBER</small>
                <div className="d-flex align-items-center gap-2 text-dark fw-semibold">
                  <MdPhone className="text-primary" /> {patient.mobileNumber || "N/A"}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-3 bg-light rounded-3">
                <small className="text-muted fw-bold d-block mb-1">RESIDENTIAL ADDRESS</small>
                <div className="d-flex align-items-center gap-2 text-dark fw-semibold">
                  <MdLocationOn className="text-primary" /> {patient.address || "N/A"}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-3 bg-light rounded-3">
                <small className="text-muted fw-bold d-block mb-1">RECORD STATUS</small>
                <span className={`badge rounded-pill ${patient.status ? "badge-status-active" : "badge-status-inactive"}`}>
                  {patient.status ? "Active Record" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-3 bg-light rounded-3">
                <small className="text-muted fw-bold d-block mb-1">BLOOD GROUP</small>
                <div className="d-flex align-items-center gap-2 text-danger fw-bold">
                  <MdBloodtype /> {patient.bloodGroup || "O+"}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="p-3 bg-light rounded-3">
                <small className="text-muted fw-bold d-block mb-1">PRIMARY PHYSICIAN</small>
                <div className="d-flex align-items-center gap-2 text-dark fw-semibold">
                  <MdLocalHospital className="text-primary" /> {patient.assignedDoctor || "Dr. Cameron Vance"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PatientDetails;
