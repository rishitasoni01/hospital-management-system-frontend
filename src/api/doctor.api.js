import axiosClient from "./axiosClient";
import { MockService } from "../services/mockData";

export const doctorApi = {
  getAllDoctors: async (page = 0, size = 5, sortBy = "id", direction = "asc", specialization = "") => {
    try {
      const response = await axiosClient.get("/api/doctor/doctors", {
        params: { page, size, sortBy, direction, specialization },
      });
      if (response && response.content && response.content.length > 0) {
        return response;
      }
      return MockService.getDoctors(page, size, specialization);
    } catch (error) {
      console.warn("API unavailable, falling back to mock data:", error.message);
      return MockService.getDoctors(page, size, specialization);
    }
  },

  getDoctorById: async (id) => {
    try {
      const res = await axiosClient.get(`/api/doctor/getDoctors/${id}`);
      if (res && res.id) return res;
      return MockService.getDoctorById(id);
    } catch (error) {
      return MockService.getDoctorById(id);
    }
  },

  createDoctor: async (doctorData) => {
    try {
      const res = await axiosClient.post("/api/doctor/createDoctors", doctorData);
      MockService.addDoctor(doctorData);
      return res;
    } catch (error) {
      return MockService.addDoctor(doctorData);
    }
  },

  updateDoctor: async (id, doctorData) => {
    try {
      const res = await axiosClient.put(`/api/doctor/doctors/${id}`, doctorData);
      MockService.updateDoctor(id, doctorData);
      return res;
    } catch (error) {
      return MockService.updateDoctor(id, doctorData);
    }
  },

  deleteDoctor: async (id) => {
    try {
      const res = await axiosClient.delete(`/api/doctor/doctors/${id}`);
      MockService.deleteDoctor(id);
      return res;
    } catch (error) {
      return MockService.deleteDoctor(id);
    }
  },
};
