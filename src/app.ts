import express from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const apiRouter = express.Router();
const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

RegisterRoutes(apiRouter);
app.use('/api', apiRouter);

const swaggerFilePath = path.join(process.cwd(), "build/swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));

app.use(
  "/docs",
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: "https://unpkg.com/swagger-ui-dist@4/swagger-ui.css",
    customJs: [
      "https://unpkg.com/swagger-ui-dist@4/swagger-ui-bundle.js",
      "https://unpkg.com/swagger-ui-dist@4/swagger-ui-standalone-preset.js"
    ]
  })
);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
