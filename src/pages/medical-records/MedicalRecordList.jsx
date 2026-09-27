
import DashboardLayout from "../../components/layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import {
  MdVisibility,
  MdEdit,
  MdFileDownload,
} from "react-icons/md";
import { medicalRecordApi } from "../../api/medicalRecord.api";
import { useNavigate } from "react-router-dom";

function MedicalRecordList() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
useEffect(() => {
  fetchMedicalRecords();
}, []);

const fetchMedicalRecords = async () => {
  try {
    const response = await medicalRecordApi.getAllMedicalRecords(
      0,
      10,
      "id",
      "desc"
    );

    console.log(response); // <-- Add this
    setRecords(response.content || []);
  } catch (error) {
    console.error(error);
  }
};

  const badgeColor = (type) => {
    switch (type) {
      case "danger":
        return {
          background: "#fee2e2",
          color: "#dc2626",
        };
      case "primary":
        return {
          background: "#dbeafe",
          color: "#2563eb",
        };
      default:
        return {
          background: "#f3f4f6",
          color: "#4b5563",
        };
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid py-3 px-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              Dashboard &gt; Medical Records
            </div>

            <h2
              className="fw-bold mb-1"
              style={{
                color: "#1f2937",
              }}
            >
              Medical Records Management
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Access and manage high-precision patient diagnostic history.
            </p>
          </div>

          <button
            className="btn text-white px-4"
            style={{
              background: "#2563eb",
              borderRadius: "6px",
              height: "44px",
            }}
onClick={() => navigate("/medicalrecords/create")}
          >
            + Create Record
          </button>
        </div>

        {/* Filter Section */}
        <div
          className="card border-0 shadow-sm mb-4"
          style={{
            borderRadius: "10px",
          }}
        >
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="small fw-bold text-secondary">
                  DEPARTMENT
                </label>

                <select className="form-select">
                  <option>All Departments</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="small fw-bold text-secondary">
                  DATE RANGE
                </label>

                <div className="d-flex gap-2">
                  <input
                    type="date"
                    className="form-control"
                  />

                  <input
                    type="date"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <label className="small fw-bold text-secondary">
                  STATUS
                </label>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm">
                    Active
                  </button>

                  <button className="btn btn-light btn-sm border">
                    Archived
                  </button>
                </div>
              </div>

              <div className="col-md-2 text-end">
                <MdFileDownload
                  size={22}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: "10px",
          }}
        >
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead
                style={{
                  background: "#f8fafc",
                }}
              >
                <tr>
                 

                  <th>ID</th>
            <th>Appointment ID</th>
        <th>Diagnosis</th>
        <th>Prescription</th>
         <th>Notes</th>
              <th>Actions</th>
                </tr>
              </thead>

             <tbody>
  {records.map((record) => (
    <tr key={record.id}>
      <td>{record.id}</td>

      <td>{record.appointmentId}</td>

      <td>{record.diagnosis}</td>

      <td>{record.prescription}</td>

      <td>{record.notes}</td>

      <td>
        <div className="d-flex gap-3">
          <MdVisibility
            size={18}
            color="#6b7280"
            style={{ cursor: "pointer" }}
          />

          <MdEdit
            size={18}
            color="#6b7280"
            style={{ cursor: "pointer" }}
          />
        </div>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <span
              style={{
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Showing {records.length} records
            </span>

            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-sm btn-light">
                &lt;
              </button>

              <button className="btn btn-sm btn-primary">
                1
              </button>

              <button className="btn btn-sm btn-light">
                2
              </button>

              <button className="btn btn-sm btn-light">
                3
              </button>

              <span>...</span>

              <button className="btn btn-sm btn-light">
                124
              </button>

              <button className="btn btn-sm btn-light">
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <small className="text-secondary">
                  TOTAL RECORDS
                </small>

                <h3 className="fw-bold mt-2">
                  12,402
                </h3>

                <span
                  style={{
                    color: "#2563eb",
                    fontSize: "14px",
                  }}
                >
                  +3% this month
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <small className="text-secondary">
                  PENDING UPLOADS
                </small>

                <h3 className="fw-bold mt-2">
                  42
                </h3>

                <span
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  Awaiting doctor review
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <small className="text-secondary">
                  SYSTEM INTEGRITY
                </small>

                <h3 className="fw-bold mt-2">
                  99.9%
                </h3>

                <div
                  className="progress mt-3"
                  style={{
                    height: "6px",
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: "99%",
                    }}
                  />
                </div>

                <small className="text-secondary">
                  Data Sync Accuracy
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MedicalRecordList;