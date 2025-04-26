import { Router } from "express";
import {
    createShipment,
    getShipmentById,
    updateShipment,
    updateShipmentLocation,
    deleteShipment,
    getShipmentETA,
} from "../controllers/shipment.controller.js";

const router = Router();

// Create a new shipment
router.post("/", createShipment);

// Get a shipment by ID
router.get("/:shipmentId", getShipmentById);

// Update a shipment's details
router.put("/:shipmentId", updateShipment);

// Update a shipment's location
router.patch("/:shipmentId/location", updateShipmentLocation);

// Get the ETA of a shipment
router.get("/:shipmentId/eta", getShipmentETA);

// Delete a shipment
router.delete("/:shipmentId", deleteShipment);

export default router;
