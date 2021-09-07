import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getMemberBoard = () => {
    return axios.get(API_URL + "member", { headers: authHeader() });
};

const getBusinessBoard = () => {
    return axios.get(API_URL + "business", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getTracerBoard = () => {
    return axios.get(API_URL + "tracer", { headers: authHeader() });
};

export default {
    getPublicContent,
    getMemberBoard,
    getBusinessBoard,
    getTracerBoard,
    getAdminBoard,
};