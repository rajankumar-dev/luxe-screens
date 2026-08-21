import { useState } from "react";
import { apiUrl } from "../config/api.js";

const AIPlanner = () => {
    const [occasion, setOccasion] = useState("");
    const [budget, setBudget] = useState("");
    const [guestCount, setGuestCount] = useState("");

    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setRecommendation(null);

        if (!occasion || !budget || !guestCount) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${apiUrl}/api/ai/planner`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        occasion,
                        budget,
                        guestCount,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message || "Failed to generate recommendation."
                );
                return;
            }

            setRecommendation(data.recommendation);
        } catch (error) {
            console.error("AI Planner Error:", error);
            setError("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-5xl">

                {/* Heading */}
                <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        AI Experience Planner
                    </p>

                    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                        Let AI plan your experience.
                    </h1>

                    <p className="mt-5 text-white/50">
                        Tell us about your occasion, budget and guest count.
                        Our AI will recommend a theatre and add-ons for you.
                    </p>
                </div>

                {/* Planner Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
                >
                    <div className="grid gap-6 md:grid-cols-3">

                        {/* Occasion */}
                        <div>
                            <label className="text-sm text-white/60">
                                Occasion
                            </label>

                            <input
                                type="text"
                                value={occasion}
                                onChange={(e) =>
                                    setOccasion(e.target.value)
                                }
                                placeholder="e.g. Anniversary"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30"
                            />
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="text-sm text-white/60">
                                Budget
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                placeholder="e.g. 6000"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30"
                            />
                        </div>

                        {/* Guest Count */}
                        <div>
                            <label className="text-sm text-white/60">
                                Guest Count
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={guestCount}
                                onChange={(e) =>
                                    setGuestCount(e.target.value)
                                }
                                placeholder="e.g. 4"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30"
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                            <p className="text-sm text-red-400">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Planning your experience..."
                            : "Get AI Recommendation"}
                    </button>
                </form>

                {/* Recommendation */}
                {recommendation && (
                    <section className="mt-12">

                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                                Your Recommendation
                            </p>

                            <h2 className="mt-3 text-3xl font-bold">
                                Your experience is ready.
                            </h2>
                        </div>

                        {/* Theatre */}
                        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                Recommended Theatre
                            </p>

                            <h3 className="mt-3 text-2xl font-semibold">
                                {recommendation.theater?.name}
                            </h3>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
                                {recommendation.theater?.reason}
                            </p>
                        </div>

                        {/* Add-ons */}
                        {recommendation.addons &&
                            recommendation.addons.length > 0 && (
                                <div className="mt-6">
                                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                                        Recommended Add-ons
                                    </p>

                                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {recommendation.addons.map(
                                            (addon, index) => (
                                                <div
                                                    key={`${addon.category}-${index}`}
                                                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                                >
                                                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                                        {addon.category}
                                                    </p>

                                                    <h3 className="mt-3 text-lg font-semibold">
                                                        {addon.name}
                                                    </h3>

                                                    <p className="mt-2 text-sm text-white/50">
                                                        {addon.option}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                        {/* Summary */}
                        {recommendation.summary && (
                            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-7">
                                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                    AI Summary
                                </p>

                                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">
                                    {recommendation.summary}
                                </p>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </main>
    );
};

export default AIPlanner;