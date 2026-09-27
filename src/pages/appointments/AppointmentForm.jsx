import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { appointmentApi } from "../../api/appointment.api";
import { patientApi } from "../../api/patient.api";
import { doctorApi } from "../../api/doctor.api";
import { departmentApi } from "../../api/department.api";
import {
  MdCalendarToday,
  MdAccessTime,
  MdPerson,
  MdLocalHospital,
  MdInfoOutline,
  MdCheckCircle,
  MdArrowBack
} from "react-icons/md";

function AppointmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Form Fields State
  const [patientId, setPatientId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [reason, setReason] = useState("");

  // Data Lists State
  const [patients, setPatients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Mock visual states (not sent to backend)
 const [selectedTimeSlot, setSelectedTimeSlot] = useState("09:00");

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Time slots for visual display
 const timeSlots = ["09:00", "10:30", "14:00"];
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setDataLoading(true);
     
      const [
  patientResponse,
  departmentResponse,
  doctorResponse
] = await Promise.all([
  patientApi.getAllPatient(0, 100, "id", "asc"),
  departmentApi.getDepartmentDropdown(),
  doctorApi.getAllDoctors(0, 100, "id", "asc", "")
]);

setPatients(patientResponse.content || []);
setDepartments(departmentResponse || []);
console.log("Departments =>", departmentResponse);
const doctorList = doctorResponse.content || [];
console.log("Doctor List =>", doctorList);
setDoctors(doctorList);
setFilteredDoctors(doctorList);
      // If id is present, fetch and set form values for Edit Mode
      if (id) {
        await fetchAppointment(id, doctorList);
      }
    } catch (error) {
      console.error("Error loading form dependency data:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchAppointment = async (apptId, doctorList) => {
    try {
      const appt = await appointmentApi.getAppointmentById(apptId);
      if (appt) {
        setPatientId(appt.patientId || "");
        setDoctorId(appt.doctorId || "");
       setAppointmentDate(
  appt.appointmentDate
    ? appt.appointmentDate.split("T")[0]
    : ""
);

setAppointmentTime(
    appt.appointmentTime
        ? appt.appointmentTime.substring(0,5)
        : ""
);
        setStatus(appt.status || "PENDING");
        if (appt.appointmentTime) {
  setSelectedTimeSlot(appt.appointmentTime.substring(0, 5));
}
        setReason(appt.reason || "");

        // Find the doctor's department to auto-select
        const doc = doctorList.find((d) => Number(d.id) === Number(appt.doctorId));
        if (doc) {
          setDepartmentId(doc.departmentId || "");
        }
      }
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  // Filter doctors list based on selected department
  useEffect(() => {

    console.log("Department Selected:", departmentId);

    if (departmentId) {
      const filtered = doctors.filter(
        (doc) => Number(doc.departmentId) === Number(departmentId)
      );

    console.log("Filtered Doctors:", filtered);
      setFilteredDoctors(filtered);
      // Reset doctor selection if the selected doctor is not in the new department list
      if (doctorId && !filtered.some((doc) => Number(doc.id) === Number(doctorId))) {
        setDoctorId("");
      }
    } else {
      setFilteredDoctors(doctors);
    }
  }, [departmentId, doctors]);

  const handleCancel = () => {
    if (window.confirm("Discard changes and return to appointments list?")) {
      navigate("/appointments");
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    if (!patientId) {
      alert("Please select a patient.");
      return;
    }
    if (!doctorId) {
      alert("Please select a doctor.");
      return;
    }
    if (!appointmentDate) {
      alert("Please select an appointment date.");
      return;
    }
    if (!status) {
      alert("Please select a status.");
      return;
    }
    if (!reason.trim()) {
      alert("Please provide a reason for the visit.");
      return;
    }

    // Payload exactly matching AppointmentRequestDTO fields
   const payload = {
  patientId: Number(patientId),
  doctorId: Number(doctorId),
  appointmentDate,
  appointmentTime: selectedTimeSlot + ":00",
  status,
  reason,
};

    setLoading(true);
    try {
      if (id) {
        await appointmentApi.updateAppointment(id, payload);
        alert("Appointment Updated Successfully!");
      } else {
        await appointmentApi.createAppointment(payload);
        alert("Appointment Booked Successfully!");
      }
      navigate("/appointments");
    } catch (error) {
      console.error("Failed to save appointment:", error);
      alert(
        error.response?.data?.message || "An error occurred while saving the appointment."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper selectors for visual displays
  const selectedPatient = patients.find(
  (p) => Number(p.id) === Number(patientId)
);

const selectedPatientName = selectedPatient
  ? `${selectedPatient.firstName} ${selectedPatient.lastName}`
  : "Select Patient";

  const selectedDeptName =
    departments.find((d) => Number(d.id) === Number(departmentId))?.name || "Select Department";

  const selectedDoctorObj = doctors.find((d) => Number(d.id) === Number(doctorId));
  const selectedDoctorName = selectedDoctorObj ? `Dr. ${selectedDoctorObj.name}` : "Select Doctor";

  const formattedDate = appointmentDate
    ? new Date(appointmentDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Not scheduled yet";

  return (
    <DashboardLayout>
      <div className="container-fluid py-4 px-4 bg-light min-vh-100">
        {/* Navigation & Header */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div>
            <button
              onClick={handleCancel}
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 mb-2"
            >
              <MdArrowBack /> Back to List
            </button>
            <h2 className="fw-bold text-dark mb-1">
              {id ? "Edit Appointment" : "New Appointment"}
            </h2>
            <p className="text-muted mb-0">
              Schedule a clinical consultation for a patient record.
            </p>
          </div>
          <div>
            <span className="badge bg-primary px-3 py-2 fs-6 shadow-sm">
              {id ? "Step: Edit Mode" : "Step 1 of 5: Identity"}
            </span>
          </div>
        </div>

        {dataLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading data, please wait...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="row g-4">
            {/* Left Side: Form Sections */}
            <div className="col-lg-8">
              {/* Card 1: Select Patient */}
              <div className="card border-0 shadow-sm mb-4 p-4">
                <div className="d-flex align-items-center mb-3">
                  <span
                    className="badge bg-dark rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "30px", height: "30px", fontSize: "14px" }}
                  >
                    1
                  </span>
                  <h5 className="fw-bold text-dark mb-0">Select Patient</h5>
                </div>
                <div className="form-group">
                  <label className="form-label text-muted small fw-semibold">
                    Patient Name or ID
                  </label>
                  <select
                    className="form-select py-2 bg-light border"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    required
                  >
                    <option value="">Select a registered patient...</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.firstName} {p.lastName} (ID: {p.id})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid 2 & 3: Department and Doctor */}
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm p-4 h-100">
                    <div className="d-flex align-items-center mb-3">
                      <span
                        className="badge bg-dark rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: "30px", height: "30px", fontSize: "14px" }}
                      >
                        2
                      </span>
                      <h5 className="fw-bold text-dark mb-0">Department</h5>
                    </div>
                    <div className="form-group">
                      <label className="form-label text-muted small fw-semibold">
                        Clinical Department
                      </label>
                      <select
                        className="form-select py-2 bg-light border"
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                      >
                        <option value="">Select Department (Optional filter)</option>
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0 shadow-sm p-4 h-100">
                    <div className="d-flex align-items-center mb-3">
                      <span
                        className="badge bg-dark rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: "30px", height: "30px", fontSize: "14px" }}
                      >
                        3
                      </span>
                      <h5 className="fw-bold text-dark mb-0">Doctor</h5>
                    </div>
                    <div className="form-group">
                      <label className="form-label text-muted small fw-semibold">
                        Available Physicians
                      </label>
                      <select
                        className="form-select py-2 bg-light border"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        required
                      >
                        <option value="">Select a physician...</option>
                        {filteredDoctors.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            Dr. {doc.name} ({doc.specialization})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Appointment Timing */}
              <div className="card border-0 shadow-sm mb-4 p-4">
                <div className="d-flex align-items-center mb-3">
                  <span
                    className="badge bg-dark rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "30px", height: "30px", fontSize: "14px" }}
                  >
                    4
                  </span>
                  <h5 className="fw-bold text-dark mb-0">Appointment Timing</h5>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-semibold">Date</label>
                    <input
                      type="date"
                      className="form-control py-2 bg-light border"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-semibold">Time Slot</label>
                    <div className="d-flex gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className={`btn flex-grow-1 py-2 fw-medium ${
                            selectedTimeSlot === slot
                              ? "btn-primary shadow-sm"
                              : "btn-outline-secondary bg-white"
                          }`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Clinical Notes (Reason) */}
              <div className="card border-0 shadow-sm mb-4 p-4">
                <div className="d-flex align-items-center mb-3">
                  <span
                    className="badge bg-dark rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "30px", height: "30px", fontSize: "14px" }}
                  >
                    5
                  </span>
                  <h5 className="fw-bold text-dark mb-0">Clinical Notes</h5>
                </div>
                <div className="form-group">
                  <label className="form-label text-muted small fw-semibold">
                    Reason for Visit
                  </label>
                  <textarea
                    className="form-control bg-light border"
                    rows="4"
                    placeholder="Describe patient symptoms, history, or purpose of consultation..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>

              {/* Card 6: Appointment Status */}
              <div className="card border-0 shadow-sm p-4">
                <div className="d-flex align-items-center mb-3">
                  <span
                    className="badge bg-dark rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "30px", height: "30px", fontSize: "14px" }}
                  >
                    6
                  </span>
                  <h5 className="fw-bold text-dark mb-0">Appointment Status</h5>
                </div>
                <div className="form-group">
                  <label className="form-label text-muted small fw-semibold">Status</label>
                  <select
                    className="form-select py-2 bg-light border fw-semibold"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Side: Static Details Column */}
            <div className="col-lg-4">
              {/* Appointment Summary Box */}
              <div className="card border-0 shadow-sm p-4 mb-4 text-white bg-dark">
                <h5 className="fw-bold mb-4 tracking-wider">Appointment Summary</h5>

                <div className="mb-4">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <MdPerson size={20} className="text-info mt-1" />
                    <div>
                      <small className="text-light opacity-75 text-uppercase d-block small">
                        Patient
                      </small>
                      <span className="fw-bold text-white">{selectedPatientName}</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-3">
                    <MdLocalHospital size={20} className="text-info mt-1" />
                    <div>
                      <small className="text-light opacity-75 text-uppercase d-block small">
                        Department & Physician
                      </small>
                      <span className="fw-bold text-white">{selectedDeptName}</span>
                      <small className="d-block text-light opacity-75">{selectedDoctorName}</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-3">
                    <MdCalendarToday size={20} className="text-info mt-1" />
                    <div>
                      <small className="text-light opacity-75 text-uppercase d-block small">
                        Scheduled Date
                      </small>
                      <span className="fw-bold text-white">{formattedDate}</span>
                      <small className="d-block text-light opacity-75">
                        {appointmentDate ? selectedTimeSlot : ""}
                      </small>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 border-top pt-3 border-secondary">
                    <MdAccessTime size={20} className="text-info mt-1" />
                    <div>
                      <small className="text-light opacity-75 text-uppercase d-block small">
                        Consultation Fee
                      </small>
                      <span className="fw-bold text-white">$150.00</span>
                      <small className="d-block text-success fw-semibold">
                        Insurance Verified
                      </small>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <MdCheckCircle size={20} />
                  )}
                  {id ? "Confirm Changes" : "Confirm Booking"}
                </button>
                <small className="d-block text-center mt-3 text-light opacity-50 small">
                  SMS and Email notification will be sent automatically.
                </small>
              </div>

              {/* Schedule Check Box */}
              <div className="card border-0 shadow-sm p-4 mb-4 bg-white border-start border-4 border-danger">
                <div className="d-flex align-items-center gap-2 mb-2 text-danger">
                  <MdInfoOutline size={20} />
                  <span className="fw-bold small text-uppercase">Schedule Check</span>
                </div>
                <p className="text-muted small mb-0">
                  Ensure consultation does not conflict with existing schedules of the selected physician.
                </p>
              </div>

              {/* Selected Doctor Small Profile Card */}
              {selectedDoctorObj && (
                <div className="card border-0 shadow-sm p-4 bg-white">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold"
                      style={{ width: "50px", height: "50px", fontSize: "18px" }}
                    >
                      {selectedDoctorObj.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-0">Dr. {selectedDoctorObj.name}</h6>
                      <small className="text-muted d-block">{selectedDoctorObj.specialization}</small>
                      <small className="text-muted small">
                        {selectedDoctorObj.experience || 5} Years Experience • 4.9/5 Rating
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AppointmentForm;
