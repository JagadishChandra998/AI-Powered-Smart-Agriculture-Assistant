import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./FarmDetails.css";

const FarmDetails = () => {

    const { farmId } = useParams();

    const navigate = useNavigate();

    const [farm, setFarm] = useState(null);
    const [crops, setCrops] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchFarmDetails = async () => {

        try {

            setLoading(true);
            setError("");

            const farmResponse = await api.get(
                `/farms/${farmId}`
            );

            setFarm(farmResponse.data.farm);

            const cropResponse = await api.get(
                `/crops/farm/${farmId}`
            );

            setCrops(cropResponse.data.crops || []);

        } catch (error) {

            console.error(
                "Farm details error:",
                error.response?.data || error.message
            );

            setError(
                error.response?.data?.message ||
                "Failed to load farm details"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchFarmDetails();

    }, [farmId]);


    if (loading) {
        return (
            <div className="farm-details-page">
                <p>Loading farm details...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="farm-details-page">

                <div className="farm-error">
                    {error}
                </div>

                <button
                    onClick={() => navigate("/farms")}
                    className="back-btn"
                >
                    ← Back to Farms
                </button>

            </div>
        );
    }


    if (!farm) {
        return (
            <div className="farm-details-page">

                <h2>Farm not found</h2>

                <button
                    onClick={() => navigate("/farms")}
                    className="back-btn"
                >
                    ← Back to Farms
                </button>

            </div>
        );
    }


    return (

        <div className="farm-details-page">

            {/* HEADER */}

            <div className="farm-details-header">

                <button
                    className="back-btn"
                    onClick={() => navigate("/farms")}
                >
                    ← Back to Farms
                </button>

            </div>


            {/* FARM INFORMATION */}

            <div className="farm-info-card">

                <div className="farm-title-section">

                    <div className="farm-big-icon">
                        🌾
                    </div>

                    <div>

                        <h1>
                            {farm.farmName}
                        </h1>

                        <p>
                            📍 {farm.location}
                        </p>

                    </div>

                </div>


                <div className="farm-info-grid">

                    <div className="info-item">

                        <span>
                            📐 Area
                        </span>

                        <strong>
                            {farm.area} acres
                        </strong>

                    </div>


                    <div className="info-item">

                        <span>
                            🌱 Soil Type
                        </span>

                        <strong>
                            {farm.soilType || "Not specified"}
                        </strong>

                    </div>


                    <div className="info-item">

                        <span>
                            📍 Location
                        </span>

                        <strong>
                            {farm.location}
                        </strong>

                    </div>


                    <div className="info-item">

                        <span>
                            🌾 Crops
                        </span>

                        <strong>
                            {crops.length}
                        </strong>

                    </div>

                </div>


                <div className="farm-actions">

                    <button
                        className="edit-farm-btn"
                        onClick={() => navigate("/farms")}
                    >
                        ✏️ Edit Farm
                    </button>

                    <button
                        className="add-crop-btn"
                        onClick={() =>
                            navigate(
                                `/farms/${farmId}/crops`
                            )
                        }
                    >
                        🌱 Manage Crops
                    </button>

                </div>

            </div>


            {/* CROPS */}

            <div className="farm-crops-section">

                <div className="section-header">

                    <div>

                        <h2>
                            🌱 Crops in this Farm
                        </h2>

                        <p>
                            Manage the crops growing
                            on this farm
                        </p>

                    </div>

                    <button
                        className="add-crop-btn"
                        onClick={() =>
                            navigate(
                                `/farms/${farmId}/crops`
                            )
                        }
                    >
                        + Add Crop
                    </button>

                </div>


                {crops.length === 0 ? (

                    <div className="no-crops">

                        <div>
                            🌱
                        </div>

                        <h3>
                            No crops added
                        </h3>

                        <p>
                            Add your first crop to
                            start managing this farm.
                        </p>

                        <button
                            className="add-crop-btn"
                            onClick={() =>
                                navigate(
                                    `/farms/${farmId}/crops`
                                )
                            }
                        >
                            + Add First Crop
                        </button>

                    </div>

                ) : (

                    <div className="farm-crops-grid">

                        {crops.map((crop) => (

                            <div
                                className="farm-crop-card"
                                key={crop._id}
                            >

                                <div className="crop-card-icon">
                                    🌾
                                </div>

                                <h3>
                                    {crop.cropName}
                                </h3>

                                <p>
                                    <strong>
                                        Variety:
                                    </strong>{" "}
                                    {crop.variety}
                                </p>

                                <p>
                                    <strong>
                                        Area:
                                    </strong>{" "}
                                    {crop.area}
                                </p>

                                <p>
                                    <strong>
                                        Season:
                                    </strong>{" "}
                                    {crop.season}
                                </p>

                                <p>
                                    <strong>
                                        Growth Stage:
                                    </strong>{" "}
                                    {crop.growthStage}
                                </p>

                                <p>
                                    <strong>
                                        Sowing:
                                    </strong>{" "}
                                    {new Date(
                                        crop.sowingDate
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default FarmDetails;