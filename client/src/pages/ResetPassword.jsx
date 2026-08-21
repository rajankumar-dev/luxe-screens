import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api.js";

const ResetPassword = () => {
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const email = localStorage.getItem("resetEmail");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!email) {
            setError("Reset session expired. Please request a new OTP.");
            return;
        }

        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        if (!password || !confirmPassword) {
            setError("Please enter both passwords.");
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
                `${apiUrl}/api/auth/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        otp,
                        newPassword: password,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to reset password.");
                return;
            }

            setMessage(
                data.message || "Password reset successfully.",
            );

            localStorage.removeItem("resetEmail");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
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
                        Reset Password
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-white/50">
                        Enter the OTP sent to your email and create
                        a new password.
                    </p>

                    {email && (
                        <p className="mt-2 text-sm text-white">
                            {email}
                        </p>
                    )}
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

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* OTP */}
                    <div>
                        <label className="mb-2 block text-sm text-white/80">
                            Verification OTP
                        </label>

                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="Enter 6-digit OTP"
                            className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3.5 text-center text-lg tracking-[0.4em] outline-none transition placeholder:text-sm placeholder:tracking-normal placeholder:text-white/30 focus:border-white/50"
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="mb-2 block text-sm text-white/80">
                            New Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/30 focus:border-white/50"
                        />

                        <p className="mt-2 text-xs text-white/40">
                            Password must be at least 8 characters.
                        </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-2 block text-sm text-white/80">
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm new password"
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
                        {loading ? "Resetting Password..." : "Reset Password"}
                    </button>
                </form>

                {/* Login */}
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

export default ResetPassword;