import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to send reset OTP.");
                return;
            }

            localStorage.setItem("resetEmail", email);

            setMessage(
                data.message || "Password reset OTP sent to your email.",
            );

            setTimeout(() => {
                navigate("/reset-password");
            }, 1000);
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
                <div className="mb-10 text-center">
                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-[0.12em]"
                    >
                        LUXE SCREENS
                    </Link>
                </div>

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold">
                        Forgot Password?
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-white/50">
                        Enter your registered email address and we'll
                        send you an OTP to reset your password.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Success */}
                {message && (
                    <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                        {message}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm text-white/80">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            autoComplete="email"
                            className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/30 focus:border-white/50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Sending OTP..." : "Send Reset OTP"}
                    </button>
                </form>

                {/* Back to login */}
                <p className="mt-7 text-center text-sm text-white/50">
                    Remember your password?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-white underline underline-offset-4"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </main>
    );
};

export default ForgotPassword;