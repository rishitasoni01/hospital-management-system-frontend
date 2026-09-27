import axiosClient from "./axiosClient";

export const departmentApi = {

  getAllDepartments: (page, size, sortBy, direction) =>
    axiosClient.get("/api/department/departments", {
      params: {
        page,
        size,
        sortBy,
        direction,
      },
    }),

  getDepartmentById: (id) =>
    axiosClient.get(`/api/department/department/${id}`),

  createDepartment: (data) =>
    axiosClient.post(
      "/api/department/createDepartments",
      data
    ),

  updateDepartment: (id, data) =>
    axiosClient.put(
      `/api/department/updateDepartments/${id}`,
      data
    ),

  deleteDepartment: (id) =>
    axiosClient.delete(
      `/api/department/departments/${id}`
    ),
    getDepartmentDropdown:() =>
       axiosClient.get("/api/department/dropdown"),
    
};