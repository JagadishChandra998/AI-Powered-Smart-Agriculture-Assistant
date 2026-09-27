import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <nav className="navbar">

            <div
                className="navbar-logo"
                onClick={() => navigate("/dashboard")}
            >
                <span className="logo-icon">
                    🌾
                </span>

                <span>
                    Smart Agriculture
                </span>
            </div>


            <div className="navbar-links">

                <button
                    onClick={() => navigate("/dashboard")}
                >
                    🏠 Dashboard
                </button>

                <button
                    onClick={() => navigate("/farms")}
                >
                    🌾 Farms
                </button>

                <button
                    onClick={() => navigate("/weather")}
                >
                    ☁️ Weather
                </button>

                <button
                    onClick={() => navigate("/ai-assistant")}
                >
                    🤖 AI Assistant
                </button>

            </div>


            <div className="navbar-actions">

                <button
                    className="profile-btn"
                    onClick={() => navigate("/profile")}
                >
                    👤
                </button>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
};

export default Navbar;