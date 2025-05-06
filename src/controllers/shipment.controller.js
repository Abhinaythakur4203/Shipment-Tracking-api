import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { Shipment } from "../models/shipment.model.js";

const createShipment = asyncHandler(async (req, res) => {
    const { shipmentId, containerId, route, currentLocation, currentETA } = req.body;

    if (!shipmentId || !containerId || !route || !currentLocation?.lat || !currentLocation?.lng || !currentLocation?.locationName) {
        throw new ApiError(400, "All fields, including currentLocation (lat, lng, locationName), are required");
    }

    const shipment = await Shipment.create({
        shipmentId,
        containerId,
        route,
        currentLocation,
        currentETA,
    });

    res.status(201).json(new ApiResponse(201, shipment, "Shipment created successfully"));
});

const getAllShipments = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const shipments = await Shipment.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const totalShipments = await Shipment.countDocuments(); // Get the total number of shipments

    if (!shipments || shipments.length === 0) {
        throw new ApiError(404, "No shipments found");
    }

    res.status(200).json(
        new ApiResponse(200, {
            shipments,
            totalShipments,
            totalPages: Math.ceil(totalShipments / limit),
            currentPage: parseInt(page),
        }, "Shipments retrieved successfully")
    );
});

const getShipmentById = asyncHandler(async (req, res) => {
    const { shipmentId } = req.params;

    if (!shipmentId) {
        throw new ApiError(400, "Shipment ID is required");
    }

    const shipment = await Shipment.findOne({ shipmentId });
    if (!shipment) {
        throw new ApiError(404, "Shipment not found");
    }

    res.status(200).json(new ApiResponse(200, shipment, "Shipment retrieved successfully"));
});

const updateShipment = asyncHandler(async (req, res) => {
    const { shipmentId } = req.params;
    const { currentLocation, currentETA, status } = req.body;

    if (!shipmentId) {
        throw new ApiError(400, "Shipment ID is required");
    }

    if (currentLocation && (!currentLocation.lat || !currentLocation.lng || !currentLocation.locationName)) {
        throw new ApiError(400, "currentLocation must include lat, lng, and locationName");
    }

    const shipment = await Shipment.findOneAndUpdate(
        { shipmentId },
        { currentLocation, currentETA, status },
        { new: true }
    );

    if (!shipment) {
        throw new ApiError(404, "Shipment not found");
    }

    res.status(200).json(new ApiResponse(200, shipment, "Shipment updated successfully"));
});

const updateShipmentLocation = asyncHandler(async (req, res) => {
    const { shipmentId } = req.params;
    const { lat, lng, locationName } = req.body;

    if (!lat || !lng || !locationName) {
        throw new ApiError(400, "lat, lng, and locationName are required");
    }

    const shipment = await Shipment.findOne({ shipmentId });
    if (!shipment) throw new ApiError(404, "Shipment not found");

    shipment.currentLocation = { lat, lng, locationName };

    // Dummy ETA update logic
    shipment.currentETA = new Date(Date.now() + 2 * 60 * 60 * 1000);

    await shipment.save();
    res.status(200).json(new ApiResponse(200, shipment, "Location updated"));
});

const getShipmentETA = asyncHandler(async (req, res) => {
    const { shipmentId } = req.params;

    const shipment = await Shipment.findOne({ shipmentId });
    if (!shipment) throw new ApiError(404, "Shipment not found");

    res.status(200).json(new ApiResponse(200, { currentETA: shipment.currentETA }, "ETA retrieved"));
});


const deleteShipment = asyncHandler(async (req, res) => {
    const { shipmentId } = req.params;

    if (!shipmentId) {
        throw new ApiError(400, "Shipment ID is required");
    }

    const shipment = await Shipment.findOneAndDelete({ shipmentId });
    if (!shipment) {
        throw new ApiError(404, "Shipment not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Shipment deleted successfully"));
});



export {
    createShipment,
    getShipmentById,
    updateShipment,
    updateShipmentLocation,
    getShipmentETA,
    deleteShipment,
    getAllShipments,
};