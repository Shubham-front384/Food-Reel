import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/food",
  withCredentials: true,
});

// GLOBAL ERROR HANDLING
api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/user/login"
    ) {
      window.location.href = "/user/login";
    }

    return Promise.reject(error);
  }
);

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

export const likeFoodApi = async (id) => {
  const response = await api.post("/like", { id });
  
  return response.data;
};

export const saveFoodApi = async (id) => {
  const response = await api.post("/save", { id });

  return response.data;
};

export const getSavedFoodApi = async () => {
  const response = await api.get("/saved");
  return response.data;
};
