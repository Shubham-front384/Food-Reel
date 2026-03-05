import axios from "axios";

const api = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const registerUser = async (data) => {
  const response = await api.post("/user/register", data);

  return response;
}

export const loginUser = async (data) => {
  const response = await api.post("/user/login", data);

  return response;
}

export const registerPartner = async (data) => {
  const response = await api.post("/food-partner/register", data);

  return response;
}

export const loginPartner = async (data) => {
  const response = await api.post("/food-partner/login", data);

  return response;
}
