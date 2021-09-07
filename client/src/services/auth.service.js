import axios from "axios";

export default {
  register: (name, email, password) => {
    let data = {
      name: name,
      email: email,
      password: password,
    }
    console.log(data);
    return axios.post("/api/auth/signup", data);
  },

  login: (name, password) => {
    return axios
      .post("/api/auth/signin", {
        name,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  },

  registerBusiness: (name, email, password) => {
    //add other details later
    let data = {
      name: name,
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

  logout: () => {
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  }
}