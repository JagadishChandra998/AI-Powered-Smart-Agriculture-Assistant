import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import "./Crops.css";
const Crops = () => {

    const { farmId } = useParams();

    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingCrop, setEditingCrop] = useState(null);

    const [formData, setFormData] = useState({
        cropName: "",
        variety: "",
        sowingDate: "",
        season: "Kharif",
        growthStage: "Seedling",
        expectedHarvestDate: ""
    });

    const [cropOptions, setCropOptions] = useState({
        growthStage: [],
        season: []
    });

    const fetchCrops = async () => {
        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                `/crops/farm/${farmId}`
            );

            setCrops(response.data.crops);

        } catch (error) {

            console.error(
                "Fetch crops error:",
                error.response?.data || error.message
            );

            setError(
                error.response?.data?.message ||
                "Failed to load crops"
            );

        } finally {
            setLoading(false);
        }
    };

    const fetchCropOptions = async () => {
        try {

            const response = await api.get("/crops/options");

            console.log("CROP OPTIONS:", response.data);


            setCropOptions(response.data);

        } catch (error) {

            console.error(
                "Fetch crop options error:",
                error.response?.data || error.message
            );
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editingCrop) {

                // UPDATE CROP
                const response = await api.put(
                    `/crops/${editingCrop._id}`,
                    formData
                );

                console.log(response.data);

            } else {

                // CREATE CROP
                const response = await api.post(
                    "/crops",
                    {
                        farmId,
                        ...formData
                    }
                );

                console.log(response.data);
            }

            // Close form
            setShowForm(false);

            // Exit edit mode
            setEditingCrop(null);

            // Clear form
            setFormData({
                cropName: "",
                variety: "",
                sowingDate: "",
                season: "Kharif",
                growthStage: "Seedling",
                expectedHarvestDate: ""
            });

            // Reload crops
            fetchCrops();

        } catch (error) {

            console.error(
                "Save crop error:",
                error.response?.data || error.message
            );

            setError(
                error.response?.data?.message ||
                "Failed to save crop"
            );
        }
    };

    const handleEdit = (crop) => {
        setEditingCrop(crop);

        setFormData({
            cropName: crop.cropName || "",
            variety: crop.variety || "",
            sowingDate: crop.sowingDate
                ? crop.sowingDate.substring(0, 10)
                : "",
            season: crop.season || "Kharif",
            growthStage: crop.growthStage || "Seedling",
            expectedHarvestDate: crop.expectedHarvestDate
                ? crop.expectedHarvestDate.substring(0, 10)
                : ""
        });

        setShowForm(true);
    };


    useEffect(() => {

        fetchCrops();
        fetchCropOptions();

    }, [farmId]);

    const handleDelete = async (cropId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this crop?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await api.delete(
                `/crops/${cropId}`
            );

            console.log(response.data);

            // Refresh crop list
            fetchCrops();

        } catch (error) {

            console.error(
                "Delete crop error:",
                error.response?.data || error.message
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete crop"
            );
        }
    };

    if (loading) {
        return (
            <div className="crops-page">
                <p>Loading crops...</p>
            </div>
        );
    }


    return (
        <div className="crops-page">

            <div className="crops-header">

                <div>
                    <h1>🌱 My Crops</h1>

                    <p>
                        Manage the crops in your farm
                    </p>
                </div>

                <button
                    className="add-crop-btn"
                    onClick={() => {
                        setEditingCrop(null);

                        setFormData({
                            cropName: "",
                            variety: "",
                            sowingDate: "",
                            season: "Kharif",
                            growthStage: "Seedling",
                            expectedHarvestDate: ""
                        });

                        setShowForm(true);
                    }}
                >
                    + Add Crop
                </button>

            </div>

            {/* ADD CROP FORM */}

            {showForm && (
                <div className="crop-form-card">

                    <h2>
                        {editingCrop ? "Edit Crop" : "Add New Crop"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="crop-form-grid">

                            <div className="form-group">
                                <label>Crop Name</label>

                                <input
                                    type="text"
                                    name="cropName"
                                    placeholder="e.g. Rice"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>Variety</label>

                                <input
                                    type="text"
                                    name="variety"
                                    placeholder="e.g. Basmati"
                                    value={formData.variety}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>Sowing Date</label>

                                <input
                                    type="date"
                                    name="sowingDate"
                                    value={formData.sowingDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>Season</label>

                                <select
                                    name="season"
                                    value={formData.season}
                                    onChange={handleChange}
                                    required
                                >

                                    {
                                        cropOptions.season.map((season) => (
                                            <option
                                                key={season}
                                                value={season}
                                            >
                                                {season}
                                            </option>
                                        ))
                                    }

                                </select>
                            </div>


                            <div className="form-group">
                                <label>Growth Stage</label>

                                <select
                                    name="growthStage"
                                    value={formData.growthStage}
                                    onChange={handleChange}
                                    required
                                >

                                    {
                                        cropOptions.growthStage.map((stage) => (
                                            <option
                                                key={stage}
                                                value={stage}
                                            >
                                                {stage}
                                            </option>
                                        ))
                                    }

                                </select>
                            </div>


                            <div className="form-group">
                                <label>Expected Harvest Date</label>

                                <input
                                    type="date"
                                    name="expectedHarvestDate"
                                    value={formData.expectedHarvestDate}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>


                        <div className="crop-form-actions">

                            <button
                                type="button"
                                className="cancel-crop-btn"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingCrop(null);

                                    setFormData({
                                        cropName: "",
                                        variety: "",
                                        sowingDate: "",
                                        season: "Kharif",
                                        growthStage: "Seedling",
                                        expectedHarvestDate: ""
                                    });
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="save-crop-btn"
                            >
                                {editingCrop ? "Update Crop" : "Add Crop"}
                            </button>

                        </div>

                    </form>

                </div>
            )}

            {error && (
                <div className="crop-error">
                    {error}
                </div>
            )}


            {!error && crops.length === 0 && (
                <div className="empty-crops">

                    <div className="empty-icon">
                        🌱
                    </div>

                    <h2>No crops added yet</h2>

                    <p>
                        Add your first crop to start
                        managing your farm.
                    </p>

                    <button
                        className="add-crop-btn"
                        onClick={() => setShowForm(true)}
                    >
                        + Add First Crop
                    </button>

                </div>
            )}


            <div className="crop-grid">

                {crops.map((crop) => (

                    <div
                        className="crop-card"
                        key={crop._id}
                    >

                        <div className="crop-icon">
                            🌾
                        </div>

                        <h2>
                            {crop.cropName}
                        </h2>

                        <p>
                            <strong>Variety:</strong>{" "}
                            {crop.variety}
                        </p>

                        <p>
                            <strong>Season:</strong>{" "}
                            {crop.season}
                        </p>

                        <p>
                            <strong>Growth Stage:</strong>{" "}
                            {crop.growthStage}
                        </p>

                        <p>
                            <strong>Sowing Date:</strong>{" "}
                            {new Date(
                                crop.sowingDate
                            ).toLocaleDateString()}
                        </p>


                        <div className="crop-actions">

                            <button
                                onClick={() => handleEdit(crop)}
                            >
                                ✏️ Edit
                            </button>

                            <button
                                onClick={() => handleDelete(crop._id)}
                            >
                                🗑️ Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Crops;