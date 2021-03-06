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
import article from "./routes/article.route.js";
import { router as contactRoute } from "./routes/contactRoute.js";
//import susbscriberRoute from "./routes/subscribeRoute.js";
dotenv.config();
const app = express();
app.use(cors())

const swaggerSpec = swaggerJSDoc(swaggerOptions);

//connect to DB
const enviroment = process.env.NODE_ENV;

const dbURI = process.env.DB_CONNECT;
const TEST_DB_CONNECT = process.env.TEST_DB_CONNECT;

const connectionUrl = (enviroment=='dev') ? dbURI : TEST_DB_CONNECT;
console.log("env: "+enviroment+"  ---- url: "+connectionUrl)

mongoose.connect("mongodb+srv://hodalAndela:0000@cluster0.oqg7g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => {
  console.log("Connected to db! ");
});

//!!Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//!!Route Middleware

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/users", authRoute);
// app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/contacts", contactRoute);
app.use("/api/v1/articles", article);
//app.use('/api/v1/newsletter', susbscriberRoute);


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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
export default app;

