import Farm from "../models/Farm.js";

export const createFarm = async (req, res) => {
    try {

        const { farmName, location, area, soilType, irrigationType } = req.body;

        if (!farmName || !location || !area === undefined || !soilType || !irrigationType) {
            return res.status(400).json({
                message: "All farm fields are required"

            })
        };

        const farm = await Farm.create({
            farmerId: req.user.userId,
            farmName,
            location,
            area,
            soilType,
            irrigationType
        });
        res.status(200).json({
            success:true,
            farm,
            message:"Farm created successfully"
        });

    }
    catch (error) {
        console.error("Create farm error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const getfarms = async (req, res) =>{
    try{

        const farms = await Farm.find({
            farmerId:req.user.userId
        }).sort({createdAt: -1});

        res.status(200).json({
            farms
        });
    }
    catch(error){
        console.error("Get farms error", error.message);

        res.status(500).json({
            message:"Server Error"
        })
    }
};

export const getfarmById = async (req, res) =>{
    try{

        const farm = await Farm.findOne({
            _id: req.params.id,
            farmerId:req.user.userId
        });

        if(!farm){
            return res.status(404).json({
                message: "Farm not found"
            });
        }

        res.status(200).json({
            farm
        });
    }
    catch(error){
        console.error("Get farms error", error.message);

        res.status(500).json({
            message:"Server Error"
        })
    }
};

export const updateFarm = async (req, res) => {
    try {

        const farm = await Farm.findOneAndUpdate(
            {
                _id: req.params.id,
                farmerId: req.user.userId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!farm) {
            return res.status(404).json({
                message: "Farm not found"
            });
        }

        res.status(200).json({
            message:"Farm update successfully",
            farm
        });
    }
    catch (error) {
        console.error("Get farms error", error.message);

        res.status(500).json({
            message: "Server Error"
        })
    }
};

export const deleteFarm = async (req, res) => {
    try {

        const farm = await Farm.findOneAndDelete({
            _id:req.params.id,
            farmerId:req.user.userId,
        })

        if (!farm) {
            return res.status(404).json({
                message: "Farm not found"
            });
        }

        res.status(200).json({
            message:"Farm deleted successfully",
            farm
        });
    }
    catch (error) {
        console.error("Get farms error", error.message);

        res.status(500).json({
            message: "Server Error"
        })
    }
};

export const getFarmOptions = async (req, res) =>{
    try{

        const soilType = Farm.schema.path("soilType").enumValues;

        const irrigationType = Farm.schema.path("irrigationType").enumValues;

        res.status(200).json({
            soilType,
            irrigationType
        });
    }
    catch(error){
        console.error("Get farms option error", error.message);

        res.status(500).json({
            message: "Server Error"
        })
    }
}