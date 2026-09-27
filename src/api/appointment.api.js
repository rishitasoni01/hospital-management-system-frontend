import axiosClient from "./axiosClient";
import { MockService } from "../services/mockData";

export const appointmentApi = {
  getAllAppointments: async (page = 0, size = 5, sortBy = "id", direction = "asc") => {
    try {
      const response = await axiosClient.get("/api/v1/appointment/all", {
        params: { page, size, sortBy, direction },
      });
      if (response && response.content && response.content.length > 0) {
        return response;
      }
      return MockService.getAppointments(page, size);
    } catch (error) {
      console.warn("API unavailable, falling back to mock data:", error.message);
      return MockService.getAppointments(page, size);
    }
  },

  createAppointment: async (appointmentData) => {
    try {
      const res = await axiosClient.post("/api/v1/appointment/createAppointments", appointmentData);
      MockService.addAppointment(appointmentData);
      return res;
    } catch (error) {
      return MockService.addAppointment(appointmentData);
    }
  },

  getAppointmentById: async (id) => {
    try {
      const res = await axiosClient.get(`/api/v1/appointment/${id}`);
      if (res && res.id) return res;
      return MockService.getAppointmentById(id);
    } catch (error) {
      return MockService.getAppointmentById(id);
    }
  },

  updateAppointment: async (id, appointmentData) => {
    try {
      const res = await axiosClient.put(`/api/v1/appointment/update/${id}`, appointmentData);
      MockService.updateAppointment(id, appointmentData);
      return res;
    } catch (error) {
      return MockService.updateAppointment(id, appointmentData);
    }
  },

  deleteAppointment: async (id) => {
    try {
      const res = await axiosClient.delete(`/api/v1/appointment/delete/${id}`);
      MockService.deleteAppointment(id);
      return res;
    } catch (error) {
      return MockService.deleteAppointment(id);
    }
  },
};