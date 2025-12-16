import axios from "axios";
import { store } from "../redux/store"; // import store Redux trực tiếp

const API_BASE_URL = "https://smart-debt-book-api.vercel.app";
const API_BASE_URL_2 = "https://smart-debt-book-api.vercel-v2.app";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const apiv2 = axios.create({
  baseURL: API_BASE_URL_2,
  headers: {
    "Content-Type": "application/json",
  },
});

if (__DEV__) {
  api.interceptors.request.use((request) => {
    console.tron?.display?.({
      name: "API Request",
      preview: `${request.method?.toUpperCase()} ${request.url}`,
      value: request,
    });
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      console.tron?.display?.({
        name: "API Response",
        preview: `${response.status} ${response.config.url}`,
        value: response,
      });
      return response;
    },
    (error) => {
      console.tron?.display?.({
        name: "API Error",
        preview: `${error.response?.status} ${error.config?.url}`,
        value: error,
      });
      return Promise.reject(error);
    }
  );
}

api.interceptors.request.use(
  async (config: any) => {
    const state = store.getState();
    const token = state.userSlice.accessToken;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  checkHealth: async () => {
    const response = await api.get("/auth/checkHealth");
    return response.data;
  },
  login: async (email: string, password: string) => {
    const params = {
      email,
      password,
    };

    const response = await api.post("/auth/login", params);

    return response.data;
  },

  register: async (userData: {
    fullname: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
};

export const _api = {
  getMain: async (uri: string, params?: any, version = 2) => {
    console.log(uri);
    console.log(params);
    if (version === 2) {
      const res = await apiv2.get(uri, { ...params });
      return res.data;
    }
    const res = await api.get(uri, { ...params });
    return res.data;
  },

  postMain: async (uri: string, params?: any, version = 2) => {
    if (version === 2) {
      const res = await apiv2.post(uri, params);
      return res.data;
    }
    const res = await api.post(uri, params);
    return res.data;
  },
};
