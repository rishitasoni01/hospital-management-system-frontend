import React, { useState } from "react";
import { MdNotifications, MdSettings, MdSearch, MdMenu, MdClose, MdCheckCircle } from "react-icons/md";

function Header({ onToggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notificationsList = [
    { id: 1, title: "Emergency Triage Alert", desc: "ICU Bed #4 requested for trauma patient", time: "5m ago", unread: true },
    { id: 2, title: "Lab Results Ready", desc: "CBC & Metabolic Panel for Robert Fox", time: "25m ago", unread: true },
    { id: 3, title: "Shift Change Notice", desc: "Night duty roster updated for Cardiology", time: "2h ago", unread: false },
  ];

  return (
    <header className="sticky-top bg-white border-bottom shadow-sm px-3 px-lg-4 py-2" style={{ zIndex: 1020, height: "70px" }}>
      <div className="d-flex justify-content-between align-items-center h-100">
        
        {/* Left Side: Mobile Menu Button & Search */}
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-light d-lg-none p-2 border-0" 
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar Navigation"
          >
            <MdMenu size={24} className="text-dark" />
          </button>

          <div className="position-relative d-none d-sm-block" style={{ width: "320px", maxWidth: "100%" }}>
            <MdSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                color: "#64748b",
              }}
              size={20}
            />
            <input
              type="text"
              placeholder="Search patients, doctors, records..."
              className="form-control form-control-sm ps-5 bg-light border-0 shadow-none py-2"
              style={{ borderRadius: "10px", fontSize: "0.875rem" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right Side: Quick Actions & Profile */}
        <div className="d-flex align-items-center gap-3 gap-lg-4">

          {/* Notifications Dropdown */}
          <div className="position-relative">
            <div 
              className="p-2 rounded-circle bg-light cursor-pointer text-secondary position-relative hover-scale"
              style={{ cursor: "pointer" }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <MdNotifications size={22} />
              <span
                className="position-absolute badge rounded-pill bg-danger border border-white"
                style={{
                  top: "2px",
                  right: "2px",
                  fontSize: "9px",
                  padding: "3px 6px"
                }}
              >
                2
              </span>
            </div>

            {showNotifications && (
              <div 
                className="position-absolute end-0 mt-2 card border-0 shadow-lg p-0 animate-slide-up" 
                style={{ width: "320px", zIndex: 1050, borderRadius: "14px" }}
              >
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light rounded-top-4">
                  <h6 className="fw-bold mb-0">Notifications</h6>
                  <span className="badge bg-primary-subtle text-primary small">2 New</span>
                </div>
                <div className="list-group list-group-flush" style={{ maxHeight: "280px", overflowY: "auto" }}>
                  {notificationsList.map((n) => (
                    <div key={n.id} className={`list-group-item p-3 border-bottom-0 ${n.unread ? "bg-light bg-opacity-50" : ""}`}>
                      <div className="d-flex justify-content-between align-items-start">
                        <span className="fw-semibold text-dark small">{n.title}</span>
                        <small className="text-muted" style={{ fontSize: "10px" }}>{n.time}</small>
                      </div>
                      <p className="text-muted small mb-0 mt-1" style={{ fontSize: "12px" }}>{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-top bg-light rounded-bottom-4">
                  <small className="text-primary fw-semibold cursor-pointer" onClick={() => setShowNotifications(false)}>
                    Mark all as read
                  </small>
                </div>
              </div>
            )}
          </div>

          {/* Settings Icon */}
          <div 
            className="p-2 rounded-circle bg-light cursor-pointer text-secondary d-none d-sm-flex"
            onClick={() => alert("System Configuration & Role Access Controls.")}
            style={{ cursor: "pointer" }}
          >
            <MdSettings size={22} />
          </div>

          {/* Support Link */}
          <span 
            className="d-none d-md-inline-block fw-semibold text-primary" 
            style={{ cursor: "pointer", fontSize: "14px" }}
            onClick={() => alert("Support Hotline: +1 (800) 555-HMS-HELP")}
          >
            Support
          </span>

          {/* User Profile */}
          <div 
            className="d-flex align-items-center gap-2 ps-2 border-start cursor-pointer"
            style={{ cursor: "pointer" }}
            onClick={() => setShowProfileModal(true)}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "14px",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.3)"
              }}
            >
              RS
            </div>

            <div className="d-none d-sm-block">
              <div className="fw-bold text-dark lh-sm" style={{ fontSize: "13px" }}>
                Dr. Rishita Soni
              </div>
              <small className="text-muted" style={{ fontSize: "11px" }}>Chief Administrator</small>
            </div>
          </div>

        </div>

      </div>

      {/* User Profile Modal */}
      {showProfileModal && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.5)", zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="bg-primary p-4 text-center text-white position-relative">
                <button 
                  type="button" 
                  className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                  onClick={() => setShowProfileModal(false)}
                ></button>
                <div 
                  className="mx-auto rounded-circle bg-white text-primary fw-bold d-flex align-items-center justify-content-center mb-2 shadow"
                  style={{ width: "60px", height: "60px", fontSize: "1.4rem" }}
                >
                  RS
                </div>
                <h6 className="fw-bold mb-0">Dr. Rishita Soni</h6>
                <small className="text-white-50">Chief Medical Administrator</small>
              </div>
              <div className="modal-body p-3">
                <div className="d-flex justify-content-between py-2 border-bottom small">
                  <span className="text-muted">Staff ID:</span>
                  <span className="fw-semibold">HMS-ADM-001</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom small">
                  <span className="text-muted">Department:</span>
                  <span className="fw-semibold">Executive Board</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom small">
                  <span className="text-muted">Status:</span>
                  <span className="badge bg-success-subtle text-success">Active Duty</span>
                </div>
                <div className="mt-3 text-center">
                  <button className="btn btn-outline-danger btn-sm w-100" onClick={() => setShowProfileModal(false)}>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;