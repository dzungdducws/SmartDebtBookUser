import axios from "axios";
import { store } from "../redux/store"; // import store Redux trực tiếp
import { Alert } from "react-native";
import { navigateScreen } from "../navigation/navigation-service";
import { SCREEN } from "../navigation/screen-types";
import { logout } from "../redux/slice/userSlice";
import i18n from "../utils/i18n/i18n";
import LoaderHandler from "../lib/components/LoadingIndicator/LoaderHandler";

const API_BASE_URL = "https://smart-debt-book-api.vercel.app";
const API_BASE_URL_2 = "https://smart-debt-book-api.vercel-v2.app";
const api = axios.create({
  baseURL: API_BASE_URL,
});
const apiv2 = axios.create({
  baseURL: API_BASE_URL_2,
  headers: {
    "Content-Type": "application/json",
  },
});

if (__DEV__) {
  const devInterceptors = (instance: any) => {
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
  };
  devInterceptors(api);
  devInterceptors(apiv2);
}
const attachInterceptors = (instance: any) => {
  api.interceptors.response.use(
    (response: any) => {
      LoaderHandler.hideLoader();
      if (response.status === 401) {
        Alert.alert(
          i18n.t("main:loi"),
          i18n.t("main:phien_dang_nhap_het_han, vui_long_dang_nhap_lai"),
          [
            {
              text: "OK",
              onPress: () => {
                store.dispatch(logout());
                navigateScreen(SCREEN.LOADING);
              },
            },
          ],
          { cancelable: false }
        );
        return Promise.reject(response);
      }
      return response;
    },
    (error) => {
      LoaderHandler.hideLoader();

      if (error.response && error.response.status === 401) {
        Alert.alert(
          i18n.t("main:loi"),
          i18n.t("main:phien_dang_nhap_het_han, vui_long_dang_nhap_lai"),
          [
            {
              text: "OK",
              onPress: () => {
                store.dispatch(logout());
                navigateScreen(SCREEN.LOADING);
              },
            },
          ],
          { cancelable: false }
        );
      }

      return Promise.reject(error);
    }
  );

  api.interceptors.request.use(
    async (config: any) => {
      // Cho phép axios không throw lỗi nếu status < 500
      config.validateStatus = (status: number) => status < 500;

      // Lấy token từ Redux store
      const state = store.getState();
      const token = state.userSlice.accessToken;

      // Gắn token vào header nếu có
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      // Hiển thị loader
      LoaderHandler.showLoader();

      return config;
    },
    (error) => {
      // Ẩn loader nếu request bị lỗi
      LoaderHandler.hideLoader();
      return Promise.reject(error);
    }
  );
};
attachInterceptors(api);
attachInterceptors(apiv2);

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
  getMain: async (
    uri: string,
    params?: any,
    slot = {
      version: 2,
      isFile: false,
    }
  ) => {
    console.log(uri);
    console.log(params);
    if (slot.version === 2) {
      const res = await apiv2.get(uri, { ...params });
      return res.data;
    }
    const res = await api.get(uri, { ...params });
    return res.data;
  },

  postMain: async (
    uri: string,
    params?: any,
    slot = {
      version: 2,
      isFile: false,
    }
  ) => {
    const headers = slot.isFile
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };
    if (slot.version === 2) {
      const res = await apiv2.post(uri, params, { headers });
      return res.data;
    }
    const res = await api.post(uri, params, { headers });
    return res.data;
  },

  putMain: async (
    uri: string,
    params?: any,
    slot = {
      version: 2,
      isFile: false,
    }
  ) => {
    const headers = slot.isFile
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };
    if (slot.version === 2) {
      const res = await apiv2.put(uri, params, { headers });
      return res.data;
    }
    const res = await api.put(uri, params, { headers });
    return res.data;
  },
};
