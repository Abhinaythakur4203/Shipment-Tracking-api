import { Router } from "express";
import {
    createShipment,
    getShipmentById,
    updateShipment,
    updateShipmentLocation,
    deleteShipment,
    getShipmentETA,
    getAllShipments,
} from "../controllers/shipment.controller.js";

const router = Router();

// Shipment creation
router.post("/", createShipment);

// Retrieve all shipments with pagination (query params: page, limit)
router.get("/", getAllShipments);

// Retrieve a specific shipment by ID
router.get("/:shipmentId", getShipmentById);

// Update shipment details (full update)
router.put("/:shipmentId", updateShipment);

// Update shipment location (partial update)
router.patch("/:shipmentId/location", updateShipmentLocation);

// Retrieve the ETA of a specific shipment
router.get("/:shipmentId/eta", getShipmentETA);

// Delete a shipment by ID
router.delete("/:shipmentId", deleteShipment);

export default router;
