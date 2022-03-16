"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swagger = require("./swagger.js");

var _blogRoutes = require("./routes/blogRoutes.js");

var _auth = require("./routes/auth.js");

var _articleRoute = _interopRequireDefault(require("./routes/article.route.js"));

var _contactRoute = require("./routes/contactRoute.js");

var _subscribeRoute = _interopRequireDefault(require("./routes/subscribeRoute.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//!!Router
_dotenv.default.config();

const app = (0, _express.default)();
app.use((0, _cors.default)());
const swaggerSpec = (0, _swaggerJsdoc.default)(_swagger.swaggerOptions); //connect to DB

const dbURI = process.env.DB_CONNECT;

_mongoose.default.connect(dbURI, () => {
  console.log("Connected to db! ");
}); //!!Middleware


app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _morgan.default)("dev")); //!!Route Middleware

app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerSpec));
app.use("/api/v1/users", _auth.router);
app.use("/api/v1/blogs", _blogRoutes.router);
app.use("/api/v1/contacts", _contactRoute.router);
app.use("/api/v1/articles", _articleRoute.default);
app.use("/api/v1/subscribe", _subscribeRoute.default);
app.get("/", (req, res) => {
  return res.redirect("/api-docs");
}); //!!404  page

app.use("/*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Not found"
  });
});
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
var _default = app;
exports.default = _default;