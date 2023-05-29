import API from "../api";
import authHeader from "./auth.header";

export function getAll() {
  return API.get("/employees", { headers: authHeader() });
}

export function getOne(id) {
  return API.get(`/employees/${id}`, { headers: authHeader() });
}
