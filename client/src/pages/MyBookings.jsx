import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login to view your bookings.");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/bookings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(
                        data.message || "Failed to load bookings.",
                    );
                    return;
                }

                setBookings(data.bookings || []);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
                setError("Unable to connect to server.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-black px-6 py-16 text-white">
                <div className="mx-auto max-w-6xl">
                    <p className="text-white/50">
                        Loading your bookings...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-black px-6 py-16 text-white">
                <div className="mx-auto max-w-6xl">
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
                        <p className="text-red-400">{error}</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        Account
                    </p>

                    <h1 className="mt-3 text-4xl font-bold">
                        My Bookings
                    </h1>

                    <p className="mt-4 text-white/50">
                        View and manage your Luxe Screens bookings.
                    </p>
                </div>

                {/* Empty State */}
                {bookings.length === 0 ? (
                    <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                        <h2 className="text-2xl font-semibold">
                            No bookings yet
                        </h2>

                        <p className="mt-3 text-white/50">
                            You haven't made any bookings yet.
                        </p>

                        <Link
                            to="/booking"
                            className="mt-7 inline-block rounded-full bg-white px-7 py-3 text-sm font-medium text-black hover:bg-white/90"
                        >
                            Book Now
                        </Link>
                    </div>
                ) : (
                    <div className="mt-10 space-y-5">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6"
                            >
                                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">

                                    {/* Booking Info */}
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-xl font-semibold">
                                                {booking.theaterId?.name ||
                                                    "Theatre"}
                                            </h2>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs ${booking.paymentStatus ===
                                                        "PAID"
                                                        ? "bg-green-500/10 text-green-400"
                                                        : booking.paymentStatus ===
                                                            "FAILED"
                                                            ? "bg-red-500/10 text-red-400"
                                                            : "bg-yellow-500/10 text-yellow-400"
                                                    }`}
                                            >
                                                {booking.paymentStatus}
                                            </span>
                                        </div>

                                        <div className="mt-5 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                                            <p>
                                                <span className="text-white/40">
                                                    Date:
                                                </span>{" "}
                                                {new Date(
                                                    booking.date,
                                                ).toLocaleDateString()}
                                            </p>

                                            <p>
                                                <span className="text-white/40">
                                                    Time:
                                                </span>{" "}
                                                {booking.slotId?.time || "-"}
                                            </p>

                                            <p>
                                                <span className="text-white/40">
                                                    Guests:
                                                </span>{" "}
                                                {booking.guests}
                                            </p>

                                            <p>
                                                <span className="text-white/40">
                                                    Occasion:
                                                </span>{" "}
                                                {booking.occasion}
                                            </p>

                                            <p>
                                                <span className="text-white/40">
                                                    Payment:
                                                </span>{" "}
                                                {booking.paymentMethod}
                                            </p>

                                            <p>
                                                <span className="text-white/40">
                                                    Total:
                                                </span>{" "}
                                                ₹{booking.total}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Booking ID */}
                                    <div className="rounded-2xl border border-white/10 bg-black p-4 md:min-w-56">
                                        <p className="text-xs uppercase tracking-[0.15em] text-white/40">
                                            Booking ID
                                        </p>

                                        <p className="mt-2 break-all text-xs text-white/60">
                                            {booking._id}
                                        </p>
                                    </div>
                                </div>

                                {/* Add-ons */}
                                {(booking.cake ||
                                    booking.decor ||
                                    booking.gift) && (
                                        <div className="mt-6 border-t border-white/10 pt-5">
                                            <p className="text-sm font-medium">
                                                Add-ons
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/50">
                                                {booking.cake && (
                                                    <span className="rounded-full border border-white/10 px-3 py-1.5">
                                                        Cake:{" "}
                                                        {booking.cake.option}
                                                    </span>
                                                )}

                                                {booking.decor && (
                                                    <span className="rounded-full border border-white/10 px-3 py-1.5">
                                                        Decor:{" "}
                                                        {booking.decor.option}
                                                    </span>
                                                )}

                                                {booking.gift && (
                                                    <span className="rounded-full border border-white/10 px-3 py-1.5">
                                                        Gift:{" "}
                                                        {booking.gift.option}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyBookings;