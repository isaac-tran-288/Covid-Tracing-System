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

        if(data.role === "terminal") {
          localStorage.setItem("terminal", response.data.terminalId);
        }
  
        return response.data;
      });
  },

  //Verify business details
  verifyBusiness: data => {
    return axios.post("/api/auth/verifyBusiness/", data);
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("terminal");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  getCurrentTerminal: () => {
    return JSON.parse(localStorage.getItem("terminal"));
  }
}