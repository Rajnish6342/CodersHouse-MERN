const authRoute = require("./auth");

const routes = (app) => {
  authRoute(app)
}

module.exports = routes
