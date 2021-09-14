import axios from "axios";
//Hold the URL for the directed sign in (user or terminal)
let URL;

/*
* NOTE: By passing a data object from a page to the backend
* it elminates the need for multiple variables here, and if something
* is added or subtracted in the future the data object here stays the
* same regardless.
*/
export default {
  //REGISTRATION FUNCTION
  register: data => {
    return axios.post("/api/auth/signup", data);
  },

  //LOGIN FUNCTIONS
  login: data => {
    //Determine is a user or terminal is logging in
    data.role === "terminal" ? URL = "/api/auth/terminal/signin" : URL = "/api/auth/signin";

    return axios
      .post(URL, data)
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
  },

  //TRACER FUNCTIONS
  approvalBusiness: data => {
    return axios.post("/api/tracer/approval/business", data);
  },

  approvalTracers: data => {
    return axios.post("/api/tracer/approval/tracers", data);
  },

  locationQuery: data => {
    return axios.post("/api/tracer/query/location", data);
  },

  timeQuery: data => {
    return axios.post("/api/tracer/query/time", data);
  },

  individualQuery: data => {
    return axios.post("/api/tracer/query/individual", data);
  }
}