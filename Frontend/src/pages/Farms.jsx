import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Farms.css";

const Farms = () => {

    const navigate = useNavigate();

    const [farms, setFarms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editingFarm, setEditingFarm] = useState(null);

    const [formData, setFormData] = useState({
        farmName: "",
        location: "",
        area: "",
        soilType: "Loamy",
        irrigationType: "Rainfed"
    });

    const [farmOptions, setFarmOptions] = useState({
        soilType: [],
        irrigationType: []
    })

    // Get farms
    const fetchFarms = async () => {
        try {
            const response = await api.get("/farms");

            setFarms(response.data.farms);

        } catch (error) {
            console.error(
                "Get farms error:",
                error.response?.data?.message
            );
        } finally {
            setLoading(false);
        }
    };

    const fatchFarmOption = async () => {
        try {

            const response = await api.get("/farms/options");

            setFarmOptions(response.data);
        }
        catch (error) {
            console.error(
                "Fetch farm options error:",
                error.response?.data || error.message
            );
        }
    }

    useEffect(() => {
        fetchFarms();
        fatchFarmOption();
    }, []);

    // Handle input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // // Create farm
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingFarm) {
                // UPDATE
                await api.put(`/farms/${editingFarm._id}`, {
                    ...formData,
                    area: Number(formData.area)
                });

                setEditingFarm(null);

            } else {
                // CREATE
                await api.post("/farms", {
                    ...formData,
                    area: Number(formData.area)
                });
            }

            setFormData({
                farmName: "",
                location: "",
                area: "",
                soilType: "Loamy",
                irrigationType: "Rainfed"
            });

            setShowForm(false);

            fetchFarms();

        } catch (error) {
            console.error(
                "Farm error:",
                error.response?.data?.message
            );
        }
    };

    // Delete farm
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this farm?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/farms/${id}`);

            fetchFarms();

        } catch (error) {
            console.error(
                "Delete farm error:",
                error.response?.data?.message
            );
        }
    };

    const handleEdit = (farm) => {
        setEditingFarm(farm);

        setFormData({
            farmName: farm.farmName,
            location: farm.location,
            area: farm.area,
            soilType: farm.soilType,
            irrigationType: farm.irrigationType
        });

        setShowForm(true);
    };

    return (
        <div className="farms-page">

            <div className="farms-header">

                <div>
                    <h1>My Farms</h1>

                    <p>
                        Manage your farms and their
                        agricultural information.
                    </p>
                </div>

                <button
                    className="add-farm-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    + Add Farm
                </button>

            </div>


            {/* ADD FARM FORM */}

            {showForm && (
                <div className="farm-form-card">

                    <h2>
                        {editingFarm ? "Edit Farm" : "Add New Farm"}
                    </h2>
                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">
                                <label>
                                    Farm Name
                                </label>

                                <input
                                    type="text"
                                    name="farmName"
                                    placeholder="e.g. My Rice Farm"
                                    value={formData.farmName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Bhubaneswar, Odisha"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Area (acres)
                                </label>

                                <input
                                    type="number"
                                    name="area"
                                    placeholder="e.g. 5"
                                    min="0"
                                    value={formData.area}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>
                                    Soil Type
                                </label>

                                <select
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleChange}
                                    required
                                >
                                
                                    {
                                        farmOptions.soilType.map((type) => (
                                            <option
                                                key={type}
                                                value={type}
                                            >
                                                {type}
                                            </option>
                                        ))
                                    }

                                </select>
                            </div>


                            <div className="form-group">
                                <label>
                                    Irrigation Type
                                </label>

                                <select
                                    name="irrigationType"
                                    value={formData.irrigationType}
                                    onChange={handleChange}
                                    required
                                >
                              
                                    {
                                        farmOptions.irrigationType.map((watering) => (
                                            <option
                                            key={watering}
                                            value={watering}
                                            >
                                                {watering}
                                            </option>
                                        ))
                                    }

                                </select>
                            </div>

                        </div>

                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="save-btn"
                            >
                                {editingFarm ? "Update Farm" : "Save Farm"}
                            </button>

                        </div>

                    </form>

                </div>
            )}


            {/* FARM LIST */}

            {loading ? (
                <p className="loading">
                    Loading farms...
                </p>
            ) : farms.length === 0 ? (

                <div className="empty-state">
                    <div className="empty-icon">
                        🌱
                    </div>

                    <h2>No farms added yet</h2>

                    <p>
                        Add your first farm to start
                        managing your crops.
                    </p>
                </div>

            ) : (

                <div className="farm-grid">

                    {farms.map((farm) => (

                        <div
                            className="farm-card"
                            key={farm._id}
                        >

                            <div className="farm-card-header">

                                <div className="farm-icon">
                                    🌾
                                </div>

                                <div>
                                    <h2>
                                        {farm.farmName}
                                    </h2>

                                    <p>
                                        📍 {farm.location}
                                    </p>
                                </div>

                            </div>


                            <div className="farm-details">

                                <div>
                                    <span>
                                        Area
                                    </span>

                                    <strong>
                                        {farm.area} acres
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Soil
                                    </span>

                                    <strong>
                                        {farm.soilType}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Irrigation
                                    </span>

                                    <strong>
                                        {farm.irrigationType}
                                    </strong>
                                </div>

                            </div>

                            <button
                                className="edit-btn"
                                onClick={() => handleEdit(farm)}
                            >
                                ✏️ Edit Farm
                            </button>

                            <button
                                className="crops-btn"
                                onClick={() =>
                                    navigate(`/farms/${farm._id}/crops`)
                                }
                            >
                                🌱 View Crops
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(farm._id)
                                }
                            >
                                Delete Farm
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Farms;