const { verifySignUp } = require("../config/middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Authenticating a user
  app.post(
    "/api/auth/signup", 
    verifySignUp.checkDuplicateUsername, 
    verifySignUp.checkDuplicateEmail, 
    controller.signup
  );

  app.post(
    "/api/auth/signin", 
    controller.signin
  );

  //Authenticating a business
  app.post(
    "/api/auth/business/signup", 
    verifySignUp.checkDuplicateEmail, 
    controller.businessSignup
  );

  app.post(
    "/api/auth/business/signin", 
    controller.businessSignin
  );
};