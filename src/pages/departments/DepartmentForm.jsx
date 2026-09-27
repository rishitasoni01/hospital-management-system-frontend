import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { departmentApi } from "../../api/department.api";

import {
  MdSave,
  MdShield,
  MdDeviceHub,
  MdHistory,
} from "react-icons/md";

function DepartmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
 
  const [description, setDescription] = useState("");
 



  useEffect(() => {
    if(id){
        fetchDepartment();
    }
},[]);

 

  const fetchDepartment = async () => {
    try {
      const dept = await departmentApi.getDepartmentById(id);
      setName(dept.name || "");
      
    console.log(dept);
      setDescription(dept.description || "");
    
     
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Discard changes?")) {
      navigate("/department");
    }
  };

  const handleSave = async () => {
    const departmentData = {
      name,
    
      description,
    
      
    };

    try {
      if (id) {
        await departmentApi.updateDepartment(id, departmentData);
        alert("Department Updated Successfully");
      } else {
        await departmentApi.createDepartment(departmentData);
        alert("Department Added Successfully");
      }
      navigate("/department");
    } catch (e) {
      console.log(e);
      alert("Save Failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="doctor-container">

        {/* Breadcrumb */}
        <div className="doctor-breadcrumb">
          Departments &gt;{" "}
          {id ? "Edit Department" : "Add New Department"}
        </div>

        {/* Page Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">
            {id ? "Edit Department" : "Add New Department"}
          </h2>
          <p className="text-muted mb-0">
            Initialize a new clinical unit and assign key administrative roles.
          </p>
        </div>

        {/* Form Card */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">

            {/* Row 1 - Department Name & Head of Department */}
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label>DEPARTMENT NAME</label>
                <input
                  className="form-control"
                  placeholder="e.g. Cardiology Unit"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              
            </div>

            {/* Row 2 - Clinical Description */}
            <div className="mb-3">
              <label> DESCRIPTION</label>
              <textarea
                className="form-control"
                placeholder="Brief overview of clinical focus and specialized equipment..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

           
            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-3">
              <button
                className="btn btn-light fw-semibold px-4"
                onClick={handleCancel}
              >
                CANCEL
              </button>
              <button
                className="btn btn-primary fw-semibold px-4"
                onClick={handleSave}
              >
                <MdSave size={18} className="me-2" />
                SAVE DEPARTMENT
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100">
              <MdShield size={32} className="text-primary mx-auto mb-3" />
              <h6 className="fw-bold text-uppercase">Authorization</h6>
              <p className="text-muted small mb-0">
                Only Level 4 admins can initialize new units.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100">
              <MdDeviceHub size={32} className="text-primary mx-auto mb-3" />
              <h6 className="fw-bold text-uppercase">Infrastructure</h6>
              <p className="text-muted small mb-0">
                Auto-generates IT assets and network nodes.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100">
              <MdHistory size={32} className="text-primary mx-auto mb-3" />
              <h6 className="fw-bold text-uppercase">History</h6>
              <p className="text-muted small mb-0">
                Last department added: 12 Oct 2023.
              </p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default DepartmentForm;
