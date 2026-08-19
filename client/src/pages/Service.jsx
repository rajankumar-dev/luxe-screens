
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
    const [addons, setAddons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAddons = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/addons"
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || "Failed to fetch services.");
                    return;
                }

                setAddons(data.addons || []);
            } catch (error) {
                console.error("Failed to fetch addons:", error);
                setError("Unable to connect to server.");
            } finally {
                setLoading(false);
            }
        };

        fetchAddons();
    }, []);

    const getCategoryTitle = (category) => {
        if (category === "CAKE") return "Cakes";
        if (category === "DECOR") return "Decoration";
        if (category === "GIFT") return "Gifts";

        return category;
    };

    const getCategoryDescription = (category) => {
        if (category === "CAKE") {
            return "Choose a cake package for your special occasion.";
        }

        if (category === "DECOR") {
            return "Create the perfect atmosphere with our decoration packages.";
        }

        if (category === "GIFT") {
            return "Make your experience more memorable with a special gift.";
        }

        return "Choose from our available options.";
    };

    const categories = ["CAKE", "DECOR", "GIFT"];

    return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        Services
                    </p>

                    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                        Make your occasion special.
                    </h1>

                    <p className="mt-5 text-white/50">
                        Personalize your private theatre experience with
                        cakes, decoration and gifts.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="mt-12">
                        <p className="text-sm text-white/40">
                            Loading services...
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="mt-12 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
                        <p className="text-sm text-red-400">
                            {error}
                        </p>
                    </div>
                )}


                {/* Services */}
                {!loading && !error && (
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {addons.map((addon) => (
                            <div
                                key={addon._id}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
                            >
                                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                    {addon.category}
                                </p>

                                <h3 className="mt-2 text-xl font-semibold">
                                    {addon.name}
                                </h3>

                                <p className="mt-2 text-sm text-white/40">
                                    Available options
                                </p>

                                <div className="mt-6 space-y-3">
                                    {addon.options?.map((option) => (
                                        <div
                                            key={option._id}
                                            className="flex items-center justify-between rounded-xl border border-white/10 bg-black px-4 py-3"
                                        >
                                            <span className="text-sm">
                                                {option.name}
                                            </span>

                                            <span className="text-sm text-white/60">
                                                ₹{option.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}



                {/* Booking CTA */}
                {!loading && !error && (
                    <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 px-6 py-14 text-center">
                        <h2 className="text-3xl font-bold">
                            Ready to create your experience?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-white/50">
                            Choose your theatre, customize your experience
                            and make your special moment unforgettable.
                        </p>

                        <Link
                            to="/booking"
                            className="mt-7 inline-block rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90"
                        >
                            Book Your Experience
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Services;

