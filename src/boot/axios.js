import axios from "axios";

import { LocalStorage } from "quasar";
// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const api = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: process.env.API_URL,
  headers: {
    Accept: "application/json",
    "X-Authorization": process.env.API_SECRET,
  },
});

/** Check if any user logged in **/
const authInterceptor = (config) => {
  /** add auth token */
  const token = LocalStorage.getItem("access_token");
  // console.log(token)
  if (token && token !== "undefined" && token.length > 0) {

    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  return config;
};

/** Adding the request interceptors */
api.interceptors.request.use(authInterceptor);

export default ({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
};

// Here we define a named export
// that we can later use inside .js files:
export { axios, api };
