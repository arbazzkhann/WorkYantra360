import axios from "axios";

const REST_API_BASE_URL = "http://localhost:9191/api/employees";

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployeeById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const updateEmployeeById = (id, employee) => axios.put(`${REST_API_BASE_URL}/${id}`, employee);

export const deleteEmployeeById = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);