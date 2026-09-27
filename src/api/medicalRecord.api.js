import axiosClient from "./axiosClient";

export const medicalRecordApi = {
  // Get All Medical Records (Pagination + Sorting)
  getAllMedicalRecords: (page, size, sortBy, direction) =>
    axiosClient.get("/api/records/medical-records", {
      params: {
        page,
        size,
        sortBy,
        direction,
      },
    }),

  // Get Medical Record By Id
  getMedicalRecordById: (id) =>
    axiosClient.get(`/api/records/medical-records/${id}`),

  // Get Medical Records By Patient Id
  getRecordsByPatientId: (patientId) =>
    axiosClient.get(`/api/records/medical-recordsByPatient/${patientId}`),

  // Create Medical Record
  createMedicalRecord: (recordData) =>
    axiosClient.post("/api/records/createMedicalRecords", recordData),

  // Update Medical Record
  updateMedicalRecord: (id, recordData) =>
    axiosClient.put(`/api/records/updateMedicalRecords/${id}`, recordData),

  // Soft Delete Medical Record
  deleteMedicalRecord: (id) =>
    axiosClient.delete(`/api/records/deleteMedicalRecords/${id}`),
};