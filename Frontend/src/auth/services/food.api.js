import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/food",
  withCredentials: true,
});

export const getFoodReels = async () => {
  const response = await api.get("/");

  return response.data;
};

export const getFoodPartnerInfo = async (id) => {
  const response = await api.get(`/${id}`);

  return response.data;
}

export const createFoodReels = async (formData) => {
  const response = await api.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
