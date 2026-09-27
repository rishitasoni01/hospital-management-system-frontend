import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import { patientApi } from '../../api/patient.api';

function PatientDetails() {

  const [patient,setPatient]=useState(null)
  const { id } = useParams();

    useEffect(()=>{

      fetchPatient();

    },[]);

const fetchPatient= async()=>{

    try{

    const response= await patientApi.getPatientById(id);
    setPatient(response);

    }
    catch(error){

  console.log(error)
    }
}
  if (!patient) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>PatientDetails</h3>
      <p>First Name: {patient.firstName}</p>
      <p>Last Name: {patient.lastName}</p>
      <p>Gender:{patient.gender}</p>
      <p>Age:{patient.age}</p>
      <p>Mobile: {patient.mobileNumber}</p>
      <p>Address: {patient.address}</p>
    </div>
  )
}

export default PatientDetails
