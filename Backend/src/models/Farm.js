import mongoose from "mongoose";

const farmSchema = new mongoose.Schema(
    {
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        farmName: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        area: {
            type: Number,
            required: true,
            min: 0
        },

        soilType: {
            type: String,
            required: true,
            enum: [
                "Loamy",
                "Clay",
                "Sandy",
                "Silt",
                "Black",
                "Red",
                "Other"
            ]
        },

        irrigationType: {
            type: String,
            required: true,
            enum: [
                "Rainfed",
                "Borewell",
                "Canal",
                "Drip",
                "Sprinkler",
                "Other"
            ]
        }
    },
    {
        timestamps: true
    }
);

const Farm = mongoose.model("Farm", farmSchema);

export default Farm;