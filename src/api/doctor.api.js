import axiosClient from"./axiosClient";
export const doctorApi={
    getAllDoctors:(page,size,sortBy,direction,specialization)=>
        axiosClient.get("/api/doctor/doctors",{
    params:{
        page,
        size,
        sortBy,
        direction,
        specialization,

    },
}),

  getDoctorById: (id) =>
    axiosClient.get(`/api/doctor/getDoctors/${id}`),

  createDoctor: (doctorData) =>
    axiosClient.post("/api/doctor/createDoctors", doctorData),
  
  updateDoctor: (id, doctorData) =>
    axiosClient.put(`/api/doctor/doctors/${id}`, doctorData),

  
  deleteDoctor: (id) =>
    axiosClient.delete(`/api/doctor/doctors/${id}`),

};

