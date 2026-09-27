import axiosClient from "./axiosClient";

export const appointmentApi = {

  getAllAppointments: (
    page,
    size,
    sortBy,
    direction
  ) =>
    axiosClient.get(
      "/api/v1/appointment/all",
      {
        params: {
          page,
          size,
          sortBy,
          direction,
        },
      }
    ),

  //   deleteAppointment: (id) =>
  // axiosClient.delete(`/api/v1/appointment/delete/${id}`),
    
  createAppointment: (appointmentData) =>
    axiosClient.post(
      "/api/v1/appointment/createAppointments",
      appointmentData
    ),
 getAppointmentById: (id) =>
    axiosClient.get(`/api/v1/appointment/${id}`),

  // Update
  updateAppointment: (id, appointmentData) =>
    axiosClient.put(
      `/api/v1/appointment/update/${id}`,
      appointmentData
    ),

};