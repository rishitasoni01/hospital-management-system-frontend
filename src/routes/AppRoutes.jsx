import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import PatientList from "../pages/patients/PatientList";
import DoctorList from "../pages/doctors/DoctorList";
import DepartmentList from "../pages/departments/DepartmentList";
import AppointmentList from "../pages/appointments/AppointmentList";
import MedicalRecordList from "../pages/medical-records/MedicalRecordList";
import PatientForm from "../pages/patients/PatientForm";
import PatientDetails from "../pages/patients/PatientDetails";
import DoctorForm from "../pages/doctors/DoctorForm";
import AppointmentForm from "../pages/appointments/AppointmentForm";
import DepartmentForm from "../pages/departments/DepartmentForm";
import MedicalRecordForm from "../pages/medical-records/MedicalRecordForm";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patients" element={<PatientList />} />
      <Route path="/patients/registration" element={<PatientForm />}/>
      <Route path="/doctors" element={<DoctorList/>} />
      <Route path="/department" element={<DepartmentList />} />
      <Route path="/appointments" element={<AppointmentList />} />
      <Route path="/medicalrecords" element={<MedicalRecordList />}/>
      <Route path="/patients/edit/:id" element={<PatientForm/>}/>
      <Route path="/patients/patientdetails/:id" element={<PatientDetails/>}/>
      <Route path="/doctor/add" element={<DoctorForm />} />
      <Route path="/doctor/edit/:id" element={<DoctorForm/>}></Route>
      <Route path="/appointments/create" element={<AppointmentForm/>}></Route>
      <Route path="/department/add" element={<DepartmentForm/>}></Route>
      <Route path="/medicalrecords/create" element={<MedicalRecordForm/>}></Route>
      <Route path="/appointments/edit/:id" element={<AppointmentForm />}/>
      <Route path="/department/edit/:id" element={<DepartmentForm />}/>
    </Routes>
  );
}

export default AppRoutes;