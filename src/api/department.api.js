import axiosClient from "./axiosClient";
import { MockService } from "../services/mockData";

export const departmentApi = {
  getAllDepartments: async (page = 0, size = 5, sortBy = "id", direction = "asc") => {
    try {
      const response = await axiosClient.get("/api/department/departments", {
        params: { page, size, sortBy, direction },
      });
      if (response && response.content && response.content.length > 0) {
        return response;
      }
      return MockService.getDepartments(page, size);
    } catch (error) {
      console.warn("API unavailable, falling back to mock data:", error.message);
      return MockService.getDepartments(page, size);
    }
  },

  getDepartmentById: async (id) => {
    try {
      const res = await axiosClient.get(`/api/department/department/${id}`);
      if (res && res.id) return res;
      return MockService.getDepartmentById(id);
    } catch (error) {
      return MockService.getDepartmentById(id);
    }
  },

  createDepartment: async (data) => {
    try {
      const res = await axiosClient.post("/api/department/createDepartments", data);
      MockService.addDepartment(data);
      return res;
    } catch (error) {
      return MockService.addDepartment(data);
    }
  },

  updateDepartment: async (id, data) => {
    try {
      const res = await axiosClient.put(`/api/department/updateDepartments/${id}`, data);
      MockService.updateDepartment(id, data);
      return res;
    } catch (error) {
      return MockService.updateDepartment(id, data);
    }
  },

  deleteDepartment: async (id) => {
    try {
      const res = await axiosClient.delete(`/api/department/departments/${id}`);
      MockService.deleteDepartment(id);
      return res;
    } catch (error) {
      return MockService.deleteDepartment(id);
    }
  },

  getDepartmentDropdown: async () => {
    try {
      const res = await axiosClient.get("/api/department/dropdown");
      if (res && Array.isArray(res) && res.length > 0) return res;
      return [
        { id: 1, name: "Cardiology" },
        { id: 2, name: "Neurology" },
        { id: 3, name: "Pediatrics" },
        { id: 4, name: "Orthopedics" },
        { id: 5, name: "Emergency Triage" },
      ];
    } catch (error) {
      return [
        { id: 1, name: "Cardiology" },
        { id: 2, name: "Neurology" },
        { id: 3, name: "Pediatrics" },
        { id: 4, name: "Orthopedics" },
        { id: 5, name: "Emergency Triage" },
      ];
    }
  },
};