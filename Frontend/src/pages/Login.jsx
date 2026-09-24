import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        try {
            if (isLogin) {
                // LOGIN
                const response = await api.post(
                    "/auth/login",
                    {
                        email: formData.email,
                        password: formData.password
                    }
                );

                const { token, user } = response.data;

                localStorage.setItem("token", token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

                navigate("/dashboard");

            } else {
                // REGISTER
                const response = await api.post(
                    "/auth/register",
                    formData
                );

                setMessage(response.data.message);

                // Switch to login after successful registration
                setIsLogin(true);

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    location: ""
                });
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError("");
        setMessage("");

        setFormData({
            name: "",
            email: "",
            password: "",
            location: ""
        });
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* Left Side */}
                <div className="auth-info">

                    <div className="logo">
                        🌱
                    </div>

                    <h1>
                        Smart Agriculture
                    </h1>

                    <p>
                        AI-powered assistance for
                        smarter and more informed
                        farming.
                    </p>

                    <div className="features">

                        <div>
                            🌦️
                            <span>
                                Weather Insights
                            </span>
                        </div>

                        <div>
                            🤖
                            <span>
                                AI Agriculture Assistant
                            </span>
                        </div>

                        <div>
                            🌾
                            <span>
                                Crop Management
                            </span>
                        </div>

                    </div>

                </div>


                {/* Right Side */}
                <div className="auth-form-container">

                    <h2>
                        {isLogin
                            ? "Welcome Back!"
                            : "Create Account"}
                    </h2>

                    <p className="subtitle">
                        {isLogin
                            ? "Login to continue to your farm dashboard"
                            : "Create your farmer account to get started"}
                    </p>

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {!isLogin && (
                            <>
                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Bhubaneswar"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="auth-button"
                        >
                            {isLogin
                                ? "Login"
                                : "Create Account"}
                        </button>

                    </form>

                    <div className="switch-auth">

                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}

                        <button
                            onClick={switchMode}
                            className="switch-button"
                        >
                            {isLogin
                                ? "Register"
                                : "Login"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;