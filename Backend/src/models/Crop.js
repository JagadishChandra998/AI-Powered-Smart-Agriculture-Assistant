import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
    {
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        farmId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farm",
            required: true
        },

        cropName: {
            type: String,
            required: true,
            trim: true
        },

        variety: {
            type: String,
            trim: true
        },

        sowingDate: {
            type: Date,
            required: true
        },

        season: {
            type: String,
            required: true,
            enum: [
                "Kharif",
                "Rabi",
                "Zaid",
                "Other"
            ]
        },

        growthStage: {
            type: String,
            required: true,
            enum: [
                "Seed",
                "Germination",
                "Seedling",
                "Vegetative",
                "Flowering",
                "Fruiting",
                "Maturity",
                "Harvest" 
            ]
        },

        expectedHarvestDate: {
            type: Date
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Harvested",
                "Completed"
            ],
            default: "Active"
        }

    },
    {
        timestamps:true
    }

);

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;