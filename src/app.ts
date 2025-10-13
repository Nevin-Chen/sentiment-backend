import express, { Response as ExResponse, Request as ExRequest, json, urlencoded} from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from 'swagger-ui-express';
import fs from "fs";
import path from "path";
const apiRouter = express.Router();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(json());

RegisterRoutes(apiRouter);
app.use('/api', apiRouter);

const swaggerFilePath = path.join(process.cwd(), "build/swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
