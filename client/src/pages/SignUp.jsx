import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api.js";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${apiUrl}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed.");
                return;
            }

            // localStorage.setItem("verificationEmail", email);

            navigate("/login");
        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-6 py-12 text-white">
            <div className="w-full max-w-md">

                {/* Logo */}
                {/* <div className="mb-10 text-center">
                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-[0.15em]"
                    >
                        LUXE SCREENS
                    </Link>
                </div> */}

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Create your account
                    </h1>

                    <p className="mt-3 text-sm text-white/50">
                        Create an account to continue your luxury experience.
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

                    {/* Name */}
                    <div>
                        <label className="mb-2 block text-sm text-white/80">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            autoComplete="name"
                            className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/30 focus:border-white/50"
                        />
                    </div>

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
                        <label className="mb-2 block text-sm text-white/80">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/30 focus:border-white/50"
                        />

                        <p className="mt-2 text-xs text-white/40">
                            Must be at least 8 characters.
                        </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-2 block text-sm text-white/80">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/30 focus:border-white/50"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {/* Login */}
                <p className="mt-7 text-center text-sm text-white/50">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-white underline underline-offset-4 hover:text-white/80"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </main>
    );
};

export default Signup;