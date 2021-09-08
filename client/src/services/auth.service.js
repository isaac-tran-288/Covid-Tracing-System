import axios from "axios";

export default {
  register: (username, email, password) => {
    let data = {
      username: username,
      email: email,
      password: password,
    }
    console.log(data);
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

  registerBusiness: (username, email, password) => {
    //add other details later
    let data = {
      username: username,
      email: email, 
      password: password
    }

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