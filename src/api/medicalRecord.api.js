import axiosClient from "./axiosClient";
import { MockService } from "../services/mockData";

export const medicalRecordApi = {
  getAllMedicalRecords: async (page = 0, size = 10, sortBy = "id", direction = "desc") => {
    try {
      const response = await axiosClient.get("/api/records/medical-records", {
        params: { page, size, sortBy, direction },
      });
      if (response && response.content && response.content.length > 0) {
        return response;
      }
      return MockService.getMedicalRecords(page, size);
    } catch (error) {
      console.warn("API unavailable, falling back to mock data:", error.message);
      return MockService.getMedicalRecords(page, size);
    }
  },

  getMedicalRecordById: async (id) => {
    try {
      const res = await axiosClient.get(`/api/records/medical-records/${id}`);
      if (res && res.id) return res;
      return MockService.getMedicalRecords().content.find((r) => r.id === Number(id)) || MockService.getMedicalRecords().content[0];
    } catch (error) {
      return MockService.getMedicalRecords().content.find((r) => r.id === Number(id)) || MockService.getMedicalRecords().content[0];
    }
  },

  getRecordsByPatientId: async (patientId) => {
    try {
      const res = await axiosClient.get(`/api/records/medical-recordsByPatient/${patientId}`);
      if (res && res.length > 0) return res;
      return MockService.getMedicalRecords().content;
    } catch (error) {
      return MockService.getMedicalRecords().content;
    }
  },

  createMedicalRecord: async (recordData) => {
    try {
      const res = await axiosClient.post("/api/records/createMedicalRecords", recordData);
      MockService.addMedicalRecord(recordData);
      return res;
    } catch (error) {
      return MockService.addMedicalRecord(recordData);
    }
  },

  updateMedicalRecord: async (id, recordData) => {
    try {
      const res = await axiosClient.put(`/api/records/updateMedicalRecords/${id}`, recordData);
      return res;
    } catch (error) {
      return recordData;
    }
  },

  deleteMedicalRecord: async (id) => {
    try {
      return await axiosClient.delete(`/api/records/deleteMedicalRecords/${id}`);
    } catch (error) {
      return true;
    }
  },
};