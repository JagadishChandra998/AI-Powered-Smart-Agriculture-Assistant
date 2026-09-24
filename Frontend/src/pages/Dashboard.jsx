import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await api.get("/auth/profile");

                setUser(response.data.user);
            } catch (error) {
                console.error(
                    error.response?.data?.message
                );
            }
        };

        getProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <div>
            <h1>Smart Agriculture Dashboard</h1>

            {user && (
                <>
                    <h2>Welcome, {user.name}</h2>

                    <p>
                        Location: {user.location}
                    </p>

                    <p>
                        Role: {user.role}
                    </p>
                </>
            )}

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;