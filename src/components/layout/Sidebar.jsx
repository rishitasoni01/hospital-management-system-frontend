import React, { useState } from 'react';
import {
  MdDashboard,
  MdPeople,
  MdLocalHospital,
  MdEvent,
  MdDescription,
  MdHelp,
  MdLogout,
  MdClose,
  MdFlashOn,
  MdMedicalServices
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const menus = [
    { name: "Dashboard", icon: <MdDashboard size={20} />, path: "/" },
    { name: "Patients", icon: <MdPeople size={20} />, path: "/patients" },
    { name: "Doctors", icon: <MdLocalHospital size={20} />, path: "/doctors" },
    { name: "Departments", icon: <MdEvent size={20} />, path: "/department" },
    { name: "Appointments", icon: <MdDescription size={20} />, path: "/appointments" },
    { name: "Medical Records", icon: <MdMedicalServices size={20} />, path: "/medicalrecords" },
  ];

  return (
    <>
      <div className={`sidebar-container p-3 d-flex flex-column justify-content-between ${isOpen ? 'sidebar-mobile-open' : ''}`}>
        <div>
          {/* Header Branding */}
          <div className="d-flex justify-content-between align-items-center px-2 py-3 mb-2">
            <div className="d-flex align-items-center gap-2">
              <div
                className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center fw-bold shadow"
                style={{ width: "38px", height: "38px", fontSize: "1.2rem" }}
              >
                +
              </div>
              <div>
                <h5 className="fw-bold mb-0 text-white" style={{ fontFamily: "var(--font-heading)" }}>Medi Verse Hospital</h5>
                <small className="text-secondary" style={{ fontSize: "10px", letterSpacing: "1px" }}>HOSPITAL SYSTEM</small>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              className="btn text-white p-1 d-lg-none border-0"
              onClick={onClose}
              aria-label="Close Sidebar"
            >
              <MdClose size={24} />
            </button>
          </div>

          <hr style={{ borderColor: "rgba(255,255,255,0.15)" }} />

          {/* Navigation Items */}
          <div className="mt-3">
            {menus.map((item, index) => {
              const isActive = location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  to={item.path}
                  key={index}
                  onClick={onClose}
                  style={{ textDecoration: "none" }}
                >
                  <div className={`sidebar-item ${isActive ? "active" : ""}`}>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          {/* Emergency Quick Action */}
          <div
            onClick={() => setShowEmergencyModal(true)}
            className="p-3 mb-4 rounded-3 text-center text-white fw-bold shadow-sm cursor-pointer d-flex align-items-center justify-content-center gap-2"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              cursor: "pointer",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <MdFlashOn size={20} className="animate-bounce" />
            <span>Emergency Entry</span>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 border-top border-secondary border-opacity-25">
            <div className="sidebar-item" onClick={() => alert("Help Center: Contact IT Admin at ext 4402")}>
              <MdHelp size={18} />
              <span>Help Center</span>
            </div>

            <div className="sidebar-item text-danger-subtle" onClick={() => alert("Logged out successfully.")}>
              <MdLogout size={18} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.7)", zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header bg-danger text-white rounded-top-4">
                <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                  <MdFlashOn size={24} /> Emergency Trauma Triage
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowEmergencyModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <p className="text-muted small">Instant notification will be sent to the Trauma Care Team & ICU Duty Doctor.</p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Emergency alert broadcasted to Trauma Unit Level 1!");
                  setShowEmergencyModal(false);
                }}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Patient Name / Identifier</label>
                    <input type="text" className="form-control" placeholder="e.g. Unknown Male / John Doe" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Triage Level</label>
                    <select className="form-select">
                      <option value="CRITICAL">Critical (Red Code)</option>
                      <option value="URGENT">Urgent (Yellow Code)</option>
                      <option value="STABLE">Stable Triage</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Chief Complaint</label>
                    <textarea className="form-control" rows="2" placeholder="Brief notes on symptoms/trauma..."></textarea>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button type="button" className="btn btn-light" onClick={() => setShowEmergencyModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-danger px-4">Broadcast Emergency</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
