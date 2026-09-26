import Crop from "../models/Crop.js";
import Farm from "../models/Farm.js";

export const createCrop = async (req, res) => {
    try {

        const { farmId, cropName, variety, sowingDate, season, growthStage, expectedHarvestDate } = req.body;

        if (!farmId || !cropName || !variety || !sowingDate || !season || !growthStage) {
            return res.status(400).json({
                message: "Required crop fields are missing"
            });
        }

        const farm = await Farm.findOne({
            _id:farmId,
            farmerId: req.user.userId
        });

        if (!farm) {
            return res.status(404).json({
                message: "Farm not found"
            });
        }

        const crop = await Crop.create({
            farmerId: req.user.userId,
            farmId,
            cropName,
            variety,
            sowingDate,
            season,
            growthStage,
            expectedHarvestDate
        });

        res.status(200).json({
            success: true,
            message: "Crop cteated Successfuly",
            crop
        })
    }
    catch (error) {
        console.error("create Crop error :", error.message);

        res.status(500).json({
            message: "Server error"

        })
    }
};

export const getCropByFarm = async (req, res) => {
    try {

        const farm = await Farm.findOne({
            _id: req.params.id,
            farmerId: req.user.userId
        });

        if (!farm) {
            return res.status(404).json({
                message: "Farm not found"
            });
        };

        const crops = await Crop.find({
            farmId: req.params.id,
            farmerId: req.user.userId
        }).sort({
            createdAt: -1
        });
        res.status(200).json({
            message:"get crop successfully",
            crops
        });

    }
    catch (error) {
        console.error("Get crops error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const getCropById = async (req, res) => {
    try {

        const crop = await Crop.findOne({
            _id: req.params.id,
            farmerId: req.user.userId
        }).populate("farmId", "farmName location");

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"

            })
        }

        res.status(200).json({
            crop
        });

    }
    catch (error) {
        console.error("Get cropBy Id error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const updateCrop = async (req, res) => {
    try {

        const crop = await Crop.findOneAndUpdate(
            {
                _id: req.params.id,
                farmerId: req.user.userId
            },
            req.body,
            {
                // new:true,
                returnDocument:"after",
                runValidators:true
            }
        );

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }

        res.status(200).json({
            message: "Crop updated successfully",
            crop
        });

    }
    catch (error) {
        console.error("Update crop error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const deleteCrop = async (req, res) => {
    try {

        const crop = await Crop.findOneAndDelete(
            {
                _id: req.params.id,
                farmerId: req.user.userId
            });

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }

        res.status(200).json({
            message: "Crop delete successfully",
            crop
        });

    }
    catch (error) {
        console.error("delete crop error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const getCropOptions = async (req, res) =>{
    try{

        const growthStage = Crop.schema.path("growthStage").enumValues;

        const season = Crop.schema.path("season").enumValues;

        res.status(200).json({
            growthStage,
            season
        });
    }
    catch(error){
        console.error("get crop option error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
}