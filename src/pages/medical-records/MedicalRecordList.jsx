import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  MdVisibility,
  MdEdit,
  MdFileDownload,
  MdAdd,
  MdSearch,
  MdMedicalInformation,
  MdCheckCircle
} from "react-icons/md";
import { medicalRecordApi } from "../../api/medicalRecord.api";
import { useNavigate } from "react-router-dom";

function MedicalRecordList() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      setLoading(true);
      const response = await medicalRecordApi.getAllMedicalRecords(0, 10, "id", "desc");
      const list = response.content || [];
      setRecords(list);
      setFilteredRecords(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...records];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.diagnosis?.toLowerCase().includes(q) ||
          r.prescription?.toLowerCase().includes(q) ||
          r.patientName?.toLowerCase().includes(q) ||
          r.notes?.toLowerCase().includes(q)
      );
    }
    if (activeTab === "Active") {
      result = result.filter((r) => r.status === "Active" || !r.status);
    } else if (activeTab === "Archived") {
      result = result.filter((r) => r.status === "Archived");
    }
    setFilteredRecords(result);
  }, [searchQuery, activeTab, records]);

  const handleDownloadReport = (record) => {
    alert(`Downloading medical report PDF for Record #${record.id}...`);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
        <div>
          <small className="text-primary fw-bold text-uppercase tracking-wider">
            Dashboard &gt; Medical Records
          </small>
          <h2 className="fw-bold mb-1 text-dark">Diagnostic History & Medical Records</h2>
          <p className="text-muted small mb-0">
            Access, document, and review high-precision patient diagnostic history and lab reports.
          </p>
        </div>

        <button
          className="btn btn-primary px-4 py-2 d-flex align-items-center gap-2 shadow-sm"
          onClick={() => navigate("/medicalrecords/create")}
        >
          <MdAdd size={20} /> Create Record
        </button>
      </div>

      {/* Filter Section */}
      <div className="card border-0 shadow-sm mb-4 p-3 p-md-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <div className="position-relative">
              <MdSearch size={20} style={{ position: "absolute", top: "50%", left: "12px", transform: "translateY(-50%)", color: "#64748b" }} />
              <input 
                type="text" 
                className="form-control ps-5 py-2 bg-light border-0" 
                placeholder="Search diagnosis, prescription, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="col-6 col-md-3">
            <select className="form-select py-2 bg-light border-0 text-muted fw-medium">
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Pediatrics</option>
              <option>Orthopedics</option>
            </select>
          </div>

          <div className="col-6 col-md-3">
            <div className="btn-group w-100 bg-light p-1 rounded-3">
              <button 
                className={`btn btn-sm border-0 ${activeTab === "All" ? "btn-white shadow-sm fw-bold text-primary" : "text-secondary"}`}
                onClick={() => setActiveTab("All")}
              >
                All
              </button>
              <button 
                className={`btn btn-sm border-0 ${activeTab === "Active" ? "btn-white shadow-sm fw-bold text-primary" : "text-secondary"}`}
                onClick={() => setActiveTab("Active")}
              >
                Active
              </button>
              <button 
                className={`btn btn-sm border-0 ${activeTab === "Archived" ? "btn-white shadow-sm fw-bold text-primary" : "text-secondary"}`}
                onClick={() => setActiveTab("Archived")}
              >
                Archived
              </button>
            </div>
          </div>

          <div className="col-12 col-md-2 text-end">
            <button 
              className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
              onClick={() => alert("Batch exporting all filtered medical records in PDF format.")}
            >
              <MdFileDownload size={20} /> Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th className="px-4">Record ID</th>
                <th>Appt ID</th>
                <th>Diagnosis</th>
                <th>Prescription</th>
                <th>Clinical Notes</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">Loading medical records...</td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted fw-semibold">
                    No medical records found matching your query.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-4 fw-semibold text-dark">#REC-{record.id}</td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        #APP-{record.appointmentId || "101"}
                      </span>
                    </td>
                    <td className="fw-semibold text-primary">{record.diagnosis}</td>
                    <td className="text-secondary small" style={{ maxWidth: "200px" }}>{record.prescription}</td>
                    <td className="text-muted small" style={{ maxWidth: "240px" }}>{record.notes}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-3">
                        <MdVisibility
                          size={18}
                          className="text-primary cursor-pointer hover-scale"
                          onClick={() => handleView(record)}
                          title="View Record Details"
                          style={{ cursor: "pointer" }}
                        />
                        <MdFileDownload
                          size={18}
                          className="text-success cursor-pointer hover-scale"
                          onClick={() => handleDownloadReport(record)}
                          title="Download PDF Report"
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

        {/* Footer */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center p-3 border-top gap-2">
          <span className="text-muted small">Showing {filteredRecords.length} diagnostic records</span>
          <div className="d-flex align-items-center gap-1">
            <button className="btn btn-sm btn-light border" disabled>&lt;</button>
            <button className="btn btn-sm btn-primary">1</button>
            <button className="btn btn-sm btn-light border">&gt;</button>
          </div>
        </div>
      </div>

      {/* Bottom Stats Cards */}
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 p-4 h-100">
            <small className="text-secondary fw-bold text-uppercase">TOTAL RECORDS</small>
            <h3 className="fw-bold text-dark mt-2">12,402</h3>
            <span className="text-primary small fw-semibold">+3% this month</span>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 p-4 h-100">
            <small className="text-secondary fw-bold text-uppercase">PENDING REVIEWS</small>
            <h3 className="fw-bold text-dark mt-2">42</h3>
            <span className="text-muted small">Awaiting doctor verification</span>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0 p-4 h-100">
            <small className="text-secondary fw-bold text-uppercase">SYSTEM INTEGRITY</small>
            <h3 className="fw-bold text-dark mt-2">99.9%</h3>
            <div className="progress mt-2" style={{ height: "6px" }}>
              <div className="progress-bar bg-success" style={{ width: "99.9%" }} />
            </div>
            <small className="text-muted mt-1 d-block">HIPAA & EHR Data Sync Active</small>
          </div>
        </div>
      </div>

      {/* View Record Modal */}
      {showModal && selectedRecord && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-primary text-white p-4">
                <div className="d-flex align-items-center gap-2">
                  <MdMedicalInformation size={24} />
                  <h5 className="modal-title fw-bold mb-0">Medical Diagnostic Record</h5>
                </div>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body p-4">
                <div className="mb-3 p-3 bg-light rounded-3">
                  <small className="text-muted fw-bold text-uppercase">RECORD ID</small>
                  <div className="fw-bold text-dark">#REC-{selectedRecord.id} (Appt #{selectedRecord.appointmentId || "101"})</div>
                </div>

                <div className="mb-3">
                  <label className="text-muted small fw-bold">PRIMARY DIAGNOSIS</label>
                  <div className="p-3 bg-primary-subtle text-primary fw-bold rounded-3">
                    {selectedRecord.diagnosis}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-muted small fw-bold">PRESCRIPTION & DOSAGE</label>
                  <div className="p-3 bg-light rounded-3 text-dark fw-medium">
                    {selectedRecord.prescription}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-muted small fw-bold">CLINICAL NOTES & OBSERVATIONS</label>
                  <div className="p-3 bg-light rounded-3 text-secondary small">
                    {selectedRecord.notes || "No additional clinical notes attached."}
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light p-3">
                <button 
                  className="btn btn-success btn-sm d-flex align-items-center gap-1"
                  onClick={() => handleDownloadReport(selectedRecord)}
                >
                  <MdFileDownload size={18} /> Download Report
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default MedicalRecordList;