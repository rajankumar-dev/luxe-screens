import { useState } from "react";
import { apiUrl } from "../config/api.js";

const Waitlist = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!name || !email || !phone) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${apiUrl}/api/waitlist`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message || "Failed to join waitlist."
                );
                return;
            }

            setMessage(
                data.message || "You have successfully joined the waitlist."
            );

            setName("");
            setEmail("");
            setPhone("");
        } catch (error) {
            console.error("Waitlist Error:", error);
            setError("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-5xl">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        Waitlist
                    </p>

                    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                        Be the first to know.
                    </h1>

                    <p className="mt-5 text-white/50">
                        Join our waitlist and stay updated about upcoming
                        Luxe Screens locations and experiences.
                    </p>
                </div>

                {/* Form */}
                <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">

                    <form onSubmit={handleSubmit}>

                        {/* Name */}
                        <div>
                            <label className="text-sm text-white/60">
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30"
                            />
                        </div>

                        {/* Email */}
                        <div className="mt-5">
                            <label className="text-sm text-white/60">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30"
                            />
                        </div>

                        {/* Phone */}
                        <div className="mt-5">
                            <label className="text-sm text-white/60">
                                Phone
                            </label>

                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                                <p className="text-sm text-red-400">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Success */}
                        {message && (
                            <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
                                <p className="text-sm text-green-400">
                                    {message}
                                </p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-7 w-full rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Joining..."
                                : "Join Waitlist"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Waitlist;