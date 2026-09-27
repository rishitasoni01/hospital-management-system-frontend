import React from 'react'
import { TbBackground } from 'react-icons/tb'
import{MdDashboard,MdPeople,MdLocalHospital,MdEvent,MdDescription,MdHelp, MdLogout} from "react-icons/md";
import {Link,useLocation} from "react-router-dom";
function Sidebar() {
  const location=useLocation();
    const menus=[
      { name:"Dashboard",
        icon:<MdDashboard/>,
      path:"/",
    },
      {name:"Patient",
        icon:<MdPeople/>,
        path:"/patients",
      },
      {name:"Doctors",
        icon:<MdLocalHospital/>
        ,path:"/doctors",},
      {name:"Departmnets",icon:<MdEvent/>,path:"/department",},
      {name:"Appointments",icon:<MdDescription/>,path:"/appointments",},
      { name:"MedicalRecords", icon:<MdDescription/>,path:"/medicalrecords", },
    
];

return (
    <div style={{

      width: "260px",
        background: "#0b1736",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
    }}>

   <h4 style={{fontWeight:"bold"}}>City General</h4>

      <hr style={{capacity: 0.2}}/>
      <div>
        {
          menus.map((item,index) => (
          <Link
  to={item.path}
  key={index}
  style={{
    textDecoration: "none",
    color: "white",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px",
      marginBottom: "8px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
    className={`sidebar-item ${
  location.pathname === item.path ? "active" : ""
}`}
  >
    {item.icon}
    <span>{item.name}</span>
  </div>
</Link>
)) }
        
      </div>
   <div
  style={{
    marginTop: "20px",
    padding: "12px",
    background: "#d32f2f",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  Emergency Entry
</div>
     <div style={{ marginTop: "30px" }}>

  <div className="sidebar-item">
    <MdHelp />
    <span>Help Center</span>
  </div>

  <div className="sidebar-item">
    <MdLogout />
    <span>Logout</span>
  </div>

</div>
      
    </div>
  );
}

export default Sidebar
