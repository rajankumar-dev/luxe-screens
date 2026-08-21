import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api.js";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { email, password } = formData;

        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${apiUrl}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed.");
                return;
            }

            // Save JWT token
            localStorage.setItem("token", data.token);

            // Save user data
            localStorage.setItem("user", JSON.stringify(data.user));

            // Go to homepage
            window.location.href = "/";
        } catch (error) {
            setError("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
            <div className="w-full max-w-md">

                {/* Logo */}
                {/* <div className="mb-10 text-center">
                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-[0.12em]"
                    >
                        LUXE SCREENS
                    </Link>
                </div> */}

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold">
                        Welcome back
                    </h1>

                    <p className="mt-3 text-sm text-white/50">
                        Sign in to continue your Luxe Screens experience.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm text-white/80">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            autoComplete="email"
                            className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/30 focus:border-white/50"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm text-white/80">
                                Password
                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-xs text-white/50 hover:text-white"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/30 focus:border-white/50"
                        />
                    </div>

                    {/* Login */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>

                {/* Signup */}
                <p className="mt-7 text-center text-sm text-white/50">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-white underline underline-offset-4"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;