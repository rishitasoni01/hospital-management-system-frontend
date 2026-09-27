import React from 'react'
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

function DashboardLayout({children}) {
  return (
    <div className="d-flex vh-100">
      <Sidebar/>

      <div className="flex-grow-1">

      <Header/>

      <div className="p-4">
      {children}
    </div>
    </div>
    </div>
  );
}

export default DashboardLayout;
