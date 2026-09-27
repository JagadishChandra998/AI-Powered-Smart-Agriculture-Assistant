import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [farms, setFarms] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);

                const profileResponse =
                    await api.get("/auth/profile");

                setUser(profileResponse.data.user);


                const farmsResponse =
                    await api.get("/farms");

                setFarms(
                    farmsResponse.data.farms || []
                );

            } catch (error) {

                console.error(
                    "Dashboard error:",
                    error.response?.data ||
                    error.message
                );

            } finally {

                setLoading(false);

            }
        };


        loadDashboard();

    }, []);


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };


    const totalFarms = farms.length;

    const totalArea = farms.reduce(
        (total, farm) => {

            return total +
                Number(farm.area || 0);

        },
        0
    );

    const totalCrops = farms.reduce(
        (total, farm) => {

            return total +
                Number(farm.cropCount || 0);

        },
        0
    );


    return (

        <div className="dashboard-page">

            <nav className="dashboard-navbar">
                <div
                    className="dashboard-logo"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <span>
                        🌾
                    </span>

                    <strong>
                        Smart Agriculture
                    </strong>

                </div>


                <div className="dashboard-nav-links">

                    <button
                        className="active"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        🏠 Dashboard
                    </button>


                    <button
                        onClick={() =>
                            navigate("/farms")
                        }
                    >
                        🌾 My Farms
                    </button>


                    <button
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        👤 Profile
                    </button>

                </div>


                <button
                    className="dashboard-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </nav>

            <main className="dashboard-content">

                <section className="welcome-section">

                    <div>

                        <p className="welcome-small">
                            Welcome back 👋
                        </p>

                        <h1>
                            Hello, {user?.name || "Farmer"}!
                        </h1>

                        <p className="welcome-description">
                            Manage your farms, crops and
                            agricultural activities from
                            one place.
                        </p>

                    </div>

                    <div className="welcome-icon">
                        🌱
                    </div>

                </section>

                <section className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon">
                            🌾
                        </div>

                        <div>

                            <span>
                                My Farms
                            </span>

                            <strong>
                                {loading
                                    ? "..."
                                    : totalFarms
                                }
                            </strong>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon">
                            📐
                        </div>

                        <div>

                            <span>
                                Total Farm Area
                            </span>

                            <strong>
                                {loading
                                    ? "..."
                                    : `${totalArea} acres`
                                }
                            </strong>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon">
                            🌱
                        </div>

                        <div>

                            <span>
                                Total Crops
                            </span>

                            <strong>
                                {loading
                                    ? "..."
                                    : totalCrops
                                }
                            </strong>

                        </div>

                    </div>

                    <div className="stat-card">

                        <div className="stat-icon">
                            🤖
                        </div>

                        <div>

                            <span>
                                AI Assistant
                            </span>

                            <strong>
                                Ready
                            </strong>

                        </div>

                    </div>


                </section>

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <h2>
                                🌾 My Farms
                            </h2>

                            <p>
                                View and manage your farms
                            </p>

                        </div>

                        <button
                            className="view-all-btn"
                            onClick={() =>
                                navigate("/farms")
                            }
                        >
                            View All →
                        </button>

                    </div>



                    {farms.length === 0 ? (

                        <div className="empty-farms">

                            <div className="empty-icon">
                                🌱
                            </div>

                            <h3>
                                No farms added yet
                            </h3>

                            <p>
                                Add your first farm to
                                start managing your
                                agricultural data.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/farms")
                                }
                            >
                                + Add Your First Farm
                            </button>

                        </div>

                    ) : (

                        <div className="farm-preview-grid">

                            {farms
                                .slice(0, 3)
                                .map((farm) => (

                                    <div
                                        className="dashboard-farm-card"
                                        key={farm._id}
                                    >

                                        <div className="farm-card-top">

                                            <span className="farm-icon">
                                                🌾
                                            </span>

                                            <span className="farm-area">
                                                {farm.area} acres
                                            </span>

                                        </div>


                                        <h3>
                                            {farm.farmName}
                                        </h3>


                                        <p>
                                            📍 {farm.location}
                                        </p>


                                        <p>
                                            🌱 {farm.soilType ||
                                                "Soil not specified"}
                                        </p>


                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/farms/${farm._id}`
                                                )
                                            }
                                        >
                                            View Farm →
                                        </button>

                                    </div>

                                ))}

                        </div>

                    )}

                </section>

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Frequently used features
                            </p>

                        </div>

                    </div>


                    <div className="quick-actions">


                        <button
                            onClick={() =>
                                navigate("/farms")
                            }
                        >

                            <span>
                                🌾
                            </span>

                            <div>

                                <strong>
                                    Manage Farms
                                </strong>

                                <small>
                                    Add and manage your farms
                                </small>

                            </div>

                        </button>

                        <button
                            onClick={() =>
                                navigate("/farms")
                            }
                        >
                            <span>
                                🌱
                            </span>

                            <div>

                                <strong>
                                    Manage Crops
                                </strong>

                                <small>
                                    Manage crops in your farms
                                </small>

                            </div>

                        </button>



                        <button
                            onClick={() =>
                                navigate("/weather")
                            }
                        >

                            <span>
                                ☁️
                            </span>

                            <div>

                                <strong>
                                    Weather
                                </strong>

                                <small>
                                    Check weather conditions
                                </small>

                            </div>

                        </button>



                        <button
                            onClick={() =>
                                navigate("/ai-assistant")
                            }
                        >

                            <span>
                                🤖
                            </span>

                            <div>

                                <strong>
                                    AI Assistant
                                </strong>

                                <small>
                                    Get agricultural guidance
                                </small>

                            </div>

                        </button>


                    </div>

                </section>


            </main>

        </div>
    );
};

export default Dashboard;