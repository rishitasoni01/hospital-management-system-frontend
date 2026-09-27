
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { patientApi } from "../../api/patient.api";
import {
  MdClose,
  MdSave,
  MdAdd,
  MdDelete,
  MdSearch,
  MdWarning,
  MdVerified,
  MdCalendarToday,
  MdPerson,
} from "react-icons/md";

/* ─── ICD-10 sample codes for search ─── */
const ICD10_CODES = [
  { code: "I10", label: "I10 - Essential (primary) hypertension" },
  { code: "E11", label: "E11 - Type 2 diabetes mellitus" },
  { code: "J18", label: "J18 - Pneumonia, unspecified organism" },
  { code: "G43", label: "G43 - Migraine" },
  { code: "M54", label: "M54 - Dorsalgia (back pain)" },
  { code: "K21", label: "K21 - Gastro-oesophageal reflux disease" },
  { code: "F32", label: "F32 - Major depressive disorder" },
  { code: "J45", label: "J45 - Asthma" },
];

function MedicalRecordForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // edit mode

  /* ── Patient ── */
  const [patientId, setPatientId] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);

  /* ── Diagnosis ── */
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [diagnosisSearch, setDiagnosisSearch] = useState("");
  const [diagnosisTags, setDiagnosisTags] = useState([]);
  const [showDiagnosisDrop, setShowDiagnosisDrop] = useState(false);

  /* ── Prescriptions ── */
  const [prescriptions, setPrescriptions] = useState([
    { medication: "", dosage: "", frequency: "" },
  ]);

  /* ── Treatment Plan ── */
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("Routine");

  /* ─────────────────── Handlers ─────────────────── */

  const handlePatientSearch = async () => {
    if (!patientId) return;
    try {
      const patient = await patientApi.getPatientById(patientId);
      setPatientInfo(patient);
    } catch (e) {
      alert("Patient not found");
      setPatientInfo(null);
    }
  };

  const handleAddDiagnosis = (item) => {
    if (!diagnosisTags.find((t) => t.code === item.code)) {
      setDiagnosisTags([...diagnosisTags, item]);
    }
    setDiagnosisSearch("");
    setShowDiagnosisDrop(false);
  };

  const handleRemoveDiagnosis = (code) => {
    setDiagnosisTags(diagnosisTags.filter((t) => t.code !== code));
  };

  const handleAddMedication = () => {
    setPrescriptions([
      ...prescriptions,
      { medication: "", dosage: "", frequency: "" },
    ]);
  };

  const handleRemoveMedication = (index) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updated = [...prescriptions];
    updated[index][field] = value;
    setPrescriptions(updated);
  };

  const handleDiscard = () => {
    if (window.confirm("Discard all changes?")) navigate("/medicalrecords");
  };

  const handleSave = async () => {
    const payload = {
      patientId,
      chiefComplaint,
      diagnoses: diagnosisTags.map((t) => t.label),
      prescriptions,
      clinicalNotes,
      followUpDate,
      urgencyLevel,
    };
    console.log("Medical Record Payload:", payload);
    alert(id ? "Record Updated!" : "Record Saved & Signed!");
    navigate("/medicalrecords");
  };

  /* ─────────────────── Filtered ICD list ─────────────────── */
  const filteredCodes = ICD10_CODES.filter(
    (c) =>
      c.label.toLowerCase().includes(diagnosisSearch.toLowerCase()) ||
      c.code.toLowerCase().includes(diagnosisSearch.toLowerCase())
  );

  /* ═══════════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════════ */
  return (
    <DashboardLayout>
      <div style={{ padding: "24px", background: "#f8fafc", minHeight: "100vh" }}>

        {/* ── Breadcrumb ── */}
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
          Records &nbsp;/&nbsp; <span style={{ color: "#1f2937", fontWeight: 500 }}>New Clinical Entry</span>
        </div>

        {/* ── Page Header ── */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0" style={{ color: "#111827" }}>
            {id ? "Edit Medical Record" : "Create Medical Record"}
          </h2>

          <div className="d-flex gap-2">
            <button
              className="btn btn-light border fw-semibold px-4"
              onClick={handleDiscard}
            >
              <MdClose size={16} className="me-1" />
              Discard
            </button>

            <button
              className="btn btn-primary fw-semibold px-4"
              onClick={handleSave}
            >
              <MdSave size={16} className="me-1" />
              Save &amp; Sign Record
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 1 — Patient Identification + Vitals
        ══════════════════════════════════════════════ */}
        <div className="row g-4 mb-4">

          {/* Left — Patient Identification */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                {/* Section label */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <MdPerson size={18} className="text-primary" />
                  <span className="fw-bold text-uppercase small text-primary">
                    Patient Identification
                  </span>
                  <span className="ms-auto text-muted" style={{ fontSize: 11 }}>
                    ENTRY_REF: #MR-4002-2024
                  </span>
                </div>

                {/* Patient search row */}
                <div className="d-flex gap-2 mb-3">
                  <input
                    className="form-control"
                    placeholder="Enter Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    style={{ borderRadius: 8 }}
                  />
                  <button
                    className="btn btn-primary px-3"
                    onClick={handlePatientSearch}
                    style={{ borderRadius: 8 }}
                  >
                    <MdSearch size={18} />
                  </button>
                </div>

                {/* Patient card */}
                {patientInfo ? (
                  <div className="d-flex gap-3 align-items-start">
                    {/* Avatar */}
                    <div
                      className="rounded d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                      style={{
                        width: 90, height: 100,
                        background: "#64748b", fontSize: 28,
                        borderRadius: 8,
                      }}
                    >
                      {patientInfo.name?.charAt(0) || "P"}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <h5 className="fw-bold mb-1">{patientInfo.name}</h5>
                      <div className="d-flex gap-3 text-muted small mb-2">
                        <span>D.O.B: {patientInfo.dob || "N/A"}</span>
                        <span>ID: {patientInfo.id}</span>
                      </div>

                      {/* Allergy badges */}
                      {patientInfo.allergies?.length > 0 && (
                        <div>
                          <span
                            className="badge me-1 mb-1"
                            style={{
                              background: "#fef2f2",
                              color: "#dc2626",
                              border: "1px solid #fecaca",
                              fontWeight: 600,
                              fontSize: 11,
                            }}
                          >
                            <MdWarning size={12} className="me-1" />
                            HIGH-ALERT ALLERGIES
                          </span>
                          {patientInfo.allergies.map((a, i) => (
                            <span
                              key={i}
                              className="badge me-1 mb-1"
                              style={{
                                background: "#fee2e2",
                                color: "#991b1b",
                                fontSize: 12,
                                padding: "5px 10px",
                              }}
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center text-muted"
                    style={{
                      height: 90, border: "2px dashed #e5e7eb",
                      borderRadius: 10, fontSize: 14,
                    }}
                  >
                    Search a patient by ID to load their profile
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right — Recent Vitals */}
          <div className="col-md-4">
            <div
              className="card border-0 h-100"
              style={{ background: "#1e293b", color: "white" }}
            >
              <div className="card-body p-4">
                <div className="fw-bold text-uppercase mb-3" style={{ fontSize: 13, letterSpacing: 1 }}>
                  Recent Vitals
                </div>

                {/* Blood Pressure */}
                <div
                  className="mb-3 p-3 d-flex justify-content-between align-items-center"
                  style={{ background: "#0f172a", borderRadius: 10 }}
                >
                  <div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>Blood Pressure</div>
                    <div className="fw-bold" style={{ fontSize: 22 }}>
                      118<span style={{ fontSize: 14 }}>/76</span>
                      <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 4 }}>mmHg</span>
                    </div>
                  </div>
                  <span style={{ color: "#f87171", fontSize: 20 }}>↘</span>
                </div>

                {/* Heart Rate */}
                <div
                  className="mb-3 p-3 d-flex justify-content-between align-items-center"
                  style={{ background: "#0f172a", borderRadius: 10 }}
                >
                  <div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>Heart Rate</div>
                    <div className="fw-bold" style={{ fontSize: 22 }}>
                      72 <span style={{ fontSize: 11, color: "#94a3b8" }}>bpm</span>
                    </div>
                  </div>
                  <MdVerified size={20} color="#22c55e" />
                </div>

                {/* Temperature */}
                <div
                  className="p-3 d-flex justify-content-between align-items-center"
                  style={{ background: "#0f172a", borderRadius: 10 }}
                >
                  <div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>Temperature</div>
                    <div className="fw-bold" style={{ fontSize: 22 }}>
                      36.8 <span style={{ fontSize: 11, color: "#94a3b8" }}>°C</span>
                    </div>
                  </div>
                  <MdVerified size={20} color="#22c55e" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 2 — Diagnosis & Chief Complaints
        ══════════════════════════════════════════════ */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">

            {/* Section label */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="fw-bold text-uppercase small text-primary">
                🩺 Diagnosis &amp; Chief Complaints
              </span>
            </div>

            <div className="row g-4">
              {/* Chief Complaint */}
              <div className="col-md-6">
                <label className="fw-semibold small mb-2">Chief Complaint</label>
                <textarea
                  className="form-control"
                  rows={5}
                  placeholder="Describe the primary reason for the patient's visit..."
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  style={{ borderRadius: 10, resize: "none" }}
                />
              </div>

              {/* Clinical Diagnosis */}
              <div className="col-md-6">
                <label className="fw-semibold small mb-2">Clinical Diagnosis (Primary)</label>

                {/* Search input */}
                <div className="position-relative mb-2">
                  <input
                    className="form-control pe-5"
                    placeholder="Search ICD-10 Codes..."
                    value={diagnosisSearch}
                    style={{ borderRadius: 10 }}
                    onChange={(e) => {
                      setDiagnosisSearch(e.target.value);
                      setShowDiagnosisDrop(true);
                    }}
                    onFocus={() => setShowDiagnosisDrop(true)}
                    onBlur={() => setTimeout(() => setShowDiagnosisDrop(false), 150)}
                  />
                  <MdSearch
                    size={18}
                    style={{
                      position: "absolute", right: 12, top: "50%",
                      transform: "translateY(-50%)", color: "#9ca3af",
                    }}
                  />

                  {/* Dropdown */}
                  {showDiagnosisDrop && diagnosisSearch && (
                    <div
                      className="position-absolute w-100 bg-white border rounded shadow-sm"
                      style={{ zIndex: 999, top: "105%", maxHeight: 180, overflowY: "auto" }}
                    >
                      {filteredCodes.length > 0 ? filteredCodes.map((c) => (
                        <div
                          key={c.code}
                          className="px-3 py-2"
                          style={{ cursor: "pointer", fontSize: 13 }}
                          onMouseDown={() => handleAddDiagnosis(c)}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                        >
                          {c.label}
                        </div>
                      )) : (
                        <div className="px-3 py-2 text-muted" style={{ fontSize: 13 }}>
                          No codes found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Selected diagnosis tags */}
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {diagnosisTags.map((tag) => (
                    <span
                      key={tag.code}
                      className="badge d-flex align-items-center gap-1"
                      style={{
                        background: "#eff6ff", color: "#1d4ed8",
                        border: "1px solid #bfdbfe",
                        padding: "7px 10px", fontSize: 12, fontWeight: 500,
                      }}
                    >
                      {tag.label}
                      <MdClose
                        size={14}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveDiagnosis(tag.code)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            SECTION 3 — Prescriptions + Treatment Plan
        ══════════════════════════════════════════════ */}
        <div className="row g-4 mb-4">

          {/* Prescriptions */}
          <div className="col-md-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="fw-bold text-uppercase small text-primary">
                    💊 Prescriptions
                  </div>
                  <button
                    className="btn btn-sm"
                    style={{ color: "#2563eb", background: "none", fontWeight: 600 }}
                    onClick={handleAddMedication}
                  >
                    <MdAdd size={16} className="me-1" />
                    Add Medication
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        <th style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>MEDICATION</th>
                        <th style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>DOSAGE</th>
                        <th style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>FREQUENCY</th>
                        <th style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptions.map((presc, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              placeholder="e.g. Lisinopril 10mg"
                              value={presc.medication}
                              onChange={(e) =>
                                handlePrescriptionChange(index, "medication", e.target.value)
                              }
                              style={{ borderRadius: 8, minWidth: 150 }}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              placeholder="e.g. 1 Tablet"
                              value={presc.dosage}
                              onChange={(e) =>
                                handlePrescriptionChange(index, "dosage", e.target.value)
                              }
                              style={{ borderRadius: 8, minWidth: 90 }}
                            />
                          </td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={presc.frequency}
                              onChange={(e) =>
                                handlePrescriptionChange(index, "frequency", e.target.value)
                              }
                              style={{ borderRadius: 8, minWidth: 120 }}
                            >
                              <option value="">Select</option>
                              <option>Daily (Morning)</option>
                              <option>Daily (Evening)</option>
                              <option>Twice Daily</option>
                              <option>Three Times Daily</option>
                              <option>Once Weekly</option>
                              <option>As Needed (PRN)</option>
                            </select>
                          </td>
                          <td>
                            <MdDelete
                              size={18}
                              style={{ cursor: "pointer", color: "#ef4444" }}
                              onClick={() => handleRemoveMedication(index)}
                            />
                          </td>
                        </tr>
                      ))}

                      {prescriptions.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center text-muted py-4" style={{ fontSize: 13 }}>
                            No medications added yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Treatment Plan */}
          <div className="col-md-5">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="fw-bold text-uppercase small text-primary mb-3">
                  📋 Treatment Plan
                </div>

                {/* Clinical Notes */}
                <label className="fw-semibold small mb-1">Clinical Notes &amp; Instructions</label>
                <textarea
                  className="form-control mb-3"
                  rows={5}
                  placeholder="Instructions for patient recovery and lifestyle adjustments..."
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  style={{ borderRadius: 10, resize: "none" }}
                />

                {/* Follow-up Date + Urgency */}
                <div className="row g-2">
                  <div className="col-7">
                    <label className="fw-semibold small mb-1">Follow-up Date</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: "#f8fafc" }}>
                        <MdCalendarToday size={16} />
                      </span>
                      <input
                        type="date"
                        className="form-control"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                        style={{ borderRadius: "0 8px 8px 0" }}
                      />
                    </div>
                  </div>

                  <div className="col-5">
                    <label className="fw-semibold small mb-1">Urgency Level</label>
                    <select
                      className="form-select"
                      value={urgencyLevel}
                      onChange={(e) => setUrgencyLevel(e.target.value)}
                      style={{ borderRadius: 8 }}
                    >
                      <option>Routine</option>
                      <option>Urgent</option>
                      <option>Emergency</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            FOOTER — Finalize & Sign
        ══════════════════════════════════════════════ */}
        <div
          className="d-flex justify-content-between align-items-center px-4 py-3 rounded"
          style={{ background: "#1e293b", color: "white" }}
        >
          <div className="d-flex align-items-center gap-2" style={{ fontSize: 13, color: "#94a3b8" }}>
            <MdVerified size={16} />
            This record will be cryptographically signed by Dr. Sarah Chen and time-stamped.
          </div>

          <button
            className="btn fw-semibold px-4"
            style={{
              background: "#2563eb", color: "white",
              borderRadius: 8, padding: "10px 24px",
            }}
            onClick={handleSave}
          >
            <MdVerified size={16} className="me-2" />
            Finalize &amp; Sign Clinical Record
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default MedicalRecordForm;
