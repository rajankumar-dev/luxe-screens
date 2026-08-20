
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import luxeGold from "../assets/images/theaters/luxe-gold.jpg";
import luxePremium from "../assets/images/theaters/luxe-premium.jpg";

const Gallery = () => {
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTheaters = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/theaters"
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || "Failed to fetch theatres.");
                    return;
                }

                setTheaters(data.theaters || []);
            } catch (error) {
                console.error("Failed to fetch theatres:", error);
                setError("Unable to connect to server.");
            } finally {
                setLoading(false);
            }
        };

        fetchTheaters();
    }, []);

    return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        Gallery
                    </p>

                    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                        Explore our theatres.
                    </h1>

                    <p className="mt-5 text-white/50">
                        Discover the private theatre spaces designed for
                        your special moments.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="mt-12">
                        <p className="text-sm text-white/40">
                            Loading theatres...
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

                {/* Empty */}
                {!loading && !error && theaters.length === 0 && (
                    <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                        <p className="text-white/40">
                            No theatres available.
                        </p>
                    </div>
                )}

                {/* Theatres */}
                {!loading && !error && theaters.length > 0 && (
                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        {theaters.map((theater) => (
                            <div
                                key={theater._id}
                                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10"
                            >
                                {/* Image Placeholder */}


                                <div className="h-72 overflow-hidden bg-white/[0.03]">
                                    <img
                                        src={
                                            theater.name === "Luxe Gold"
                                                ? luxeGold
                                                : luxePremium
                                        }
                                        alt={theater.name}
                                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-7">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                        Private Theatre
                                    </p>

                                    <h2 className="mt-2 text-2xl font-semibold">
                                        {theater.name}
                                    </h2>

                                    <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-white/40">
                                                Base Price
                                            </p>

                                            <p className="mt-1 font-medium">
                                                ₹{theater.basePrice}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-white/40">
                                                Capacity
                                            </p>

                                            <p className="mt-1 font-medium">
                                                {theater.maxCapacity} Guests
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-white/40">
                                                Screen
                                            </p>

                                            <p className="mt-1 font-medium">
                                                {theater.screen}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-white/40">
                                                Sound
                                            </p>

                                            <p className="mt-1 font-medium">
                                                {theater.sound}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        to="/booking"
                                        className="mt-7 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                                    >
                                        Book This Theatre
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Gallery;
