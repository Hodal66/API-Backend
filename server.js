import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors"
import  swaggerUi  from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

//!!Router
import { swaggerOptions } from "./swagger.js";
import { router as blogRoutes } from "./routes/blogRoutes.js";
import { router as authRoute } from "./routes/auth.js";
// import article from "./routes/article.route";
import { router as contactRoute } from "./routes/contactRoute.js";
import { router as susbscriberRoute} from "./routes/subscribeRoute.js";
dotenv.config();
const app = express();
app.use(cors())

const swaggerSpec = swaggerJSDoc(swaggerOptions);

//connect to DB
const dbURI = process.env.DB_CONNECT;
mongoose.connect(dbURI, () => {
  console.log("Connected to db! ");
});

//!!Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//!!Route Middleware

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/users", authRoute);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/contacts", contactRoute);
// server.use("/api/v1/articles", article);
app.use("/api/v1/subscribes",susbscriberRoute);


app.get("/", (req, res) => {
  return res.redirect("/api-docs");
});

//!!404  page
app.use("/*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Not found",
  });
});
// swagger documentation
// server.use(morgan("dev"));
// server.use("/api/v1/", queryRoutes, authRoutes, article, comment, subscriber);
// server.use(
// 	"/api-docs",
// 	swaggerUi.serve,
// 	swaggerUi.setup(swaggerDoc, { explorer: true })
// );
// server.use(cors());




// server.use(morgan("dev"));
// server.use("/api/v1",authRoute,blogRoutes,contactRoute,susbscriberRoute);
// server.use("/api-docs", swaggerUi.setup(swaggerDoc, {explorer: true}));

// server.use(cors());

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;
