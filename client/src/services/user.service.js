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

//BUSINESS FUNCTIONS
const newBusinessLocation = data => {
    return axios.put("/api/business/location", data);
}

//CHECKIN FUNCTIONS
const checkin = data => {
    console.log(data);
    return axios.post("/api/checkin/create", data);
};

//ADMIN FUNCTIONS
const approvalBusiness = () => {
    return axios.get("/api/admin/approval/business");
}

const approvalTracers = () => {
    return axios.get("/api/admin/approval/tracers");
}

const approveAccount = data => {
    return axios.put("/api/admin/account/approve", data);
}

const rejectAccount = data => {
    return axios.delete("/api/admin/account/reject/" + data.id + "/" + data.type);
}

//TRACER FUNCTIONS
const locationQuery = data => {
    return axios.get("/api/tracer/query/location/" + data.location);
}

const timeQuery = data => {
    return axios.get("/api/tracer/query/time/" + data.startTime._d + "/" + data.endTime._d);
}

const individualQuery = data => {
    if(data.phone == "") {
        data.phone = "null";
    } else if (data.username == "") {
        data.username = "null";
    }
    
    return axios.get("/api/tracer/query/individual/" + data.phone + "/" + data.username);
}

export default {
    getPublicContent,
    getMemberBoard,
    getBusinessBoard,
    getTracerBoard,
    getAdminBoard,
    getTerminalBoard,
    newBusinessLocation,
    checkin,
    approvalBusiness,
    approvalTracers,
    approveAccount,
    rejectAccount,
    locationQuery,
    timeQuery,
    individualQuery
};