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
import susbscriberRoute from "./routes/subscribeRoute.js";
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
app.use("/api/v1/articles", article);
app.use("/api/v1/subscribe",susbscriberRoute);


app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "You successfully landed on My brand app API" })
});

//!!404  page
app.use("/*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Not found",
  });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
export default app;
