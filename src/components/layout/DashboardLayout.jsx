import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="d-flex vh-100 overflow-hidden bg-app">
      {/* Sidebar Drawer */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div 
          className="sidebar-backdrop d-lg-none"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden" style={{ minWidth: 0 }}>
        <Header onToggleSidebar={toggleSidebar} />

        <main className="flex-grow-1 overflow-auto p-3 p-md-4">
          <div className="container-fluid max-w-7xl mx-auto p-0 animate-slide-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
