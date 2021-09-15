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

    //Contact tracer routes
    //==================================
    app.get(
        "/api/test/tracer",
        [authJwt.verifyToken, authJwt.isTracer],
        controller.tracerBoard
    );

    app.get(
        "/api/tracer/approval/business",
        [authJwt.verifyToken, authJwt.isTracer],
        controller.businessApprovals
    );

    app.get(
        "/api/tracer/approval/tracers",
        [authJwt.verifyToken, authJwt.isTracer],
        controller.tracerApprovals
    );

    app.get(
        "/api/tracer/query/location",
        [authJwt.verifyToken, authJwt.isTracer],
        controller.queryLocation
    );

    app.get(
        "/api/tracer/query/time",
        [authJwt.verifyToken, authJwt.isTracer],
        controller.queryTime
    );

    app.get(
        "/api/tracer/query/individual",
        [authJwt.verifyToken, authJwt.isTracer],
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