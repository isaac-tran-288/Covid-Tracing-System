import axios from "axios";

export default {
  register: (data) => {
    return axios.post("/api/auth/signup", data);
  },

  login: (username, password) => {
    return axios
      .post("/api/auth/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  },

  registerBusiness: (data) => {
    return axios.post("/api/auth/business/signup", data);
  },

  loginBusiness: (email, password) => {
    return axios
      .post("/api/auth/business/signin", {email, password})
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  },

  registerAdmin: (data) => {
    return axios.post("/api/auth//admin/signup", data);
  },

  loginAdmin: (username, password) => {
    return axios
      .post("/api/auth/admin/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  },

  registerTracer: (data) => {
    return axios.post("/api/auth//tracer/signup", data);
  },

  loginTracer: (username, password) => {
    return axios
      .post("/api/auth/tracer/signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  },
  loginTerminal: (email, password, tabletId, location) => {
    return axios
      .post("/api/auth/terminal/signin", {email, password, tabletId, location})
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("terminal", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  }
}