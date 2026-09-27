import axiosClient from "./axiosClient";
import { MockService } from "../services/mockData";

export const patientApi = {
  getAllPatient: async (page = 0, size = 5, sortBy = "id", direction = "desc") => {
    try {
      const response = await axiosClient.get("api/patients", {
        params: { page, size, sortBy, direction },
      });
      if (response && response.content && response.content.length > 0) {
        return response;
      }
      return MockService.getPatients(page, size);
    } catch (error) {
      console.warn("API unavailable, falling back to mock data:", error.message);
      return MockService.getPatients(page, size);
    }
  },

  createPatient: async (patientData) => {
    try {
      const res = await axiosClient.post("api/patients", patientData);
      MockService.addPatient(patientData);
      return res;
    } catch (error) {
      return MockService.addPatient(patientData);
    }
  },

  updatePatient: async (id, patientData) => {
    try {
      const res = await axiosClient.put(`api/patients/${id}`, patientData);
      MockService.updatePatient(id, patientData);
      return res;
    } catch (error) {
      return MockService.updatePatient(id, patientData);
    }
  },

  deletePatient: async (id) => {
    try {
      const res = await axiosClient.delete(`api/patients/${id}`);
      MockService.deletePatient(id);
      return res;
    } catch (error) {
      return MockService.deletePatient(id);
    }
  },

  getPatientById: async (id) => {
    try {
      const res = await axiosClient.get(`api/patients/${id}`);
      if (res && res.id) return res;
      return MockService.getPatientById(id);
    } catch (error) {
      return MockService.getPatientById(id);
    }
  },
};