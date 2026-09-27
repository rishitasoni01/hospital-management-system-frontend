import axiosClient from "./axiosClient";
import React from 'react'

export const patientApi={
    getAllPatient:(page,size,sortBy,direction)=>
        axiosClient.get("api/patients",{
            params:{
                page,size,sortBy,direction,
            },
        }),

      createPatient: (patientData)=> {
    axiosClient.post("api/patients",patientData)
      } ,

      updatePatient:(id,patientData)=>{
        axiosClient.put(`api/patients/${id}`,patientData)
      },

      deletePatient: (id) =>{
        return axiosClient.delete(`api/patients/${id}`)
      },

      getPatientById:(id)=>{
        return axiosClient.get(`api/patients/${id}`)
      },
    
};
 
 