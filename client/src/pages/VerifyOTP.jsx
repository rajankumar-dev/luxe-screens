import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const savedEmail = localStorage.getItem("verificationEmail");

        if (!savedEmail) {
            navigate("/signup");
            return;
        }

        setEmail(savedEmail);
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }

        if (otp.length !== 6) {
            setError("OTP must be 6 digits.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/verify-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        otp,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "OTP verification failed.");
                return;
            }

            localStorage.removeItem("verificationEmail");

            navigate("/login");
        } catch (error) {
            setError("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setError("");
        setMessage("");

        try {
            setResending(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/resend-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to resend OTP.");
                return;
            }

            setMessage("A new OTP has been sent to your email.");
        } catch (error) {
            setError("Unable to connect to server.");
        } finally {
            setResending(false);
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
                        Verify your email
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-white/50">
                        We've sent a 6-digit verification code to
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                        {email}
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

                {/* OTP Form */}
                <form onSubmit={handleSubmit}>
                    <label className="mb-2 block text-sm text-white/80">
                        Verification Code
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
                        className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-4 text-center text-xl tracking-[0.5em] outline-none transition placeholder:text-sm placeholder:tracking-normal placeholder:text-white/30 focus:border-white/50"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>
                </form>

                {/* Resend */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-white/50">
                        Didn't receive the code?
                    </p>

                    <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={resending}
                        className="mt-2 text-sm font-medium text-white underline underline-offset-4 disabled:opacity-50"
                    >
                        {resending ? "Sending..." : "Resend OTP"}
                    </button>
                </div>

                {/* Back */}
                <p className="mt-8 text-center text-sm text-white/50">
                    Wrong email?{" "}
                    <Link
                        to="/signup"
                        className="text-white underline underline-offset-4"
                    >
                        Go back
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default VerifyOTP;