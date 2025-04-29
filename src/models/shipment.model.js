import mongoose, { Schema } from "mongoose";

const shipmentSchema = new Schema({
    shipmentId: {
        type: String,
        required: true,
        unique: true,
    },
    containerId: {
        type: String,
        required: true,
    },
    route: [{
        lat: Number,
        lng: Number,
        locationName: String,
        isCurrent: Boolean,
        _id: false, 
    }],
    currentLocation: {
        type: {
            lat: Number,
            lng: Number,
            locationName: String,
        },
        required: true,
        _id: false, 
    },
    currentETA: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Transit', 'Delivered', 'Delayed'],
        default: 'Pending',
    },
}, {
    timestamps: true,
});

export const Shipment = mongoose.model('Shipment', shipmentSchema);
