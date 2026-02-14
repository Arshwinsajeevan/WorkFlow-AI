import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const createWorkflow = (data) => api.post("/workflows/", data);
export const getWorkflows = () => api.get("/workflows/");

export const runWorkflow = (data) => api.post("/runs/", data);
export const getLatestRuns = () => api.get("/runs/latest");

export const getSystemHealth = () => api.get("/health/");
