const { authJwt } = require("../config/middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", 
        controller.allAccess
    );

    //Public user routes
    //==================================
    app.get(
        "/api/test/member",
        [authJwt.verifyToken],
        controller.memberBoard
    );

    //Business routes
    //==================================
    app.get(
        "/api/test/business",
        [authJwt.verifyToken, authJwt.isBusiness],
        controller.businessBoard
    );

    //Admininstrator routes
    //==================================
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
    
    app.get(
        "/api/admin/approval/business",
        //[authJwt.verifyToken, authJwt.isAdmin],
        controller.businessApprovals
    );

    app.get(
        "/api/admin/approval/tracers",
        //[authJwt.verifyToken, authJwt.isAdmin],
        controller.tracerApprovals
    );

    app.put(
        "/api/admin/account/approve",
        //[authJwt.verifyToken, authJwt.isAdmin],
        controller.approveAccount
    );

    app.delete(
        "/api/admin/account/reject",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.rejectAccount
    );

    //Contact tracer routes
    //==================================
    app.get(
        "/api/test/tracer",
        [authJwt.verifyToken, authJwt.isTracer],
        controller.tracerBoard
    );

    app.get(
        "/api/tracer/query/location/:location",
        //[authJwt.verifyToken, authJwt.isTracer],
        controller.queryLocation
    );

    app.get(
        "/api/tracer/query/time/:startTime/:endTime",
        //[authJwt.verifyToken, authJwt.isTracer],
        controller.queryTime
    );

    app.get(
        "/api/tracer/query/individual/:phone/:username",
        //[authJwt.verifyToken, authJwt.isTracer],
        controller.queryIndividual
    );

    //Terminal routes
    //==================================
    app.get(
        "/api/test/terminal",
        controller.terminalBoard
    );

    //Terminal routes
    //==================================
    app.post(
        "/api/checkin/create",
        controller.createCheckin
    );
};