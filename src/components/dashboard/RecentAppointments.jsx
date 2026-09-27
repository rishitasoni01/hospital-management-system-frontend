import React from "react";

function RecentAppointments() {
  const appointments = [
    {
      patient: "Robert Fox",
      doctor: "Dr. Cameron",
      dept: "Cardiology",
      time: "09:30 AM",
      status: "Completed",
    },
    {
      patient: "Alice Wong",
      doctor: "Dr. Smith",
      dept: "Neurology",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      patient: "John Doe",
      doctor: "Dr. Brown",
      dept: "Orthopedic",
      time: "11:00 AM",
      status: "Cancelled",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#2e7d32";
      case "Pending":
        return "#f9a825";
      case "Cancelled":
        return "#d32f2f";
      default:
        return "#333";
    }
  };

  return (
    <div className="card border-0 shadow-sm p-3">
      <h5 className="mb-3">Recent Appointments</h5>

      <table className="table align-middle">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((item, index) => (
            <tr key={index}>
              <td>{item.patient}</td>
              <td>{item.doctor}</td>
              <td>{item.dept}</td>
              <td>{item.time}</td>

              <td>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "white",
                    backgroundColor: getStatusColor(item.status),
                  }}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentAppointments;