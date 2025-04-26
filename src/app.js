import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

import express from "express";
import cors from "cors";
import helmet from "helmet";


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import shipmentRoutes from "./routes/shipment.routes.js";

app.use("/api/v1/shipments", shipmentRoutes);

export { app };