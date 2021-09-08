import axios from "axios";
import authHeader from "./auth-header";

const getPublicContent = () => {
    return axios.get("/api/test/all");
};

const getMemberBoard = () => {
    return axios.get("/api/test/member", { headers: authHeader() });
};

const getBusinessBoard = () => {
    return axios.get("/api/test/business", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get("/api/test/admin", { headers: authHeader() });
};

const getTracerBoard = () => {
    return axios.get("/api/test/tracer", { headers: authHeader() });
};

const getTerminalBoard = () => {
    return axios.get("/api/test/terminal", { headers: authHeader() });
};

export default {
    getPublicContent,
    getMemberBoard,
    getBusinessBoard,
    getTracerBoard,
    getAdminBoard,
    getTerminalBoard
};