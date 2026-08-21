
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//hero slider images
import hero1 from "../assets/images/hero-1.jpg";
import hero2 from "../assets/images/hero-2.jpg";
import hero3 from "../assets/images/hero-3.jpg";

//theater images
import luxeGold from "../assets/images/theaters/luxe-gold.jpg";
import luxePremium from "../assets/images/theaters/luxe-premium.jpg";
import { apiUrl } from "../config/api.js";

const Home = () => {
    const [theaters, setTheaters] = useState([]);
    const [theatersLoading, setTheatersLoading] = useState(true);

    // AddOns
    const [addons, setAddons] = useState([]);
    const [addonsLoading, setAddonsLoading] = useState(true);
    const [currentHero, setCurrentHero] = useState(0);

    const heroImages = [hero1, hero2, hero3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHero((prev) => (prev + 1) % heroImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchTheaters = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/api/theaters`
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error(
                        data.message || "Failed to fetch theaters"
                    );
                    return;
                }

                setTheaters(data.theaters || []);
            } catch (error) {
                console.error("Failed to fetch theaters:", error);
            } finally {
                setTheatersLoading(false);
            }
        };

        fetchTheaters();
    }, []);

    // Fetch AddOns
    useEffect(() => {
        const fetchAddons = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/api/addons`
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error(
                        data.message || "Failed to fetch addons"
                    );
                    return;
                }

                setAddons(data.addons || []);
            } catch (error) {
                console.error("Failed to fetch addons:", error);
            } finally {
                setAddonsLoading(false);
            }
        };

        fetchAddons();
    }, []);

    return (
        <>
            {/* Hero */}
            <section className="flex min-h-[calc(100vh-81px)] items-center">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="mb-5 text-sm uppercase tracking-[0.3em] text-white/50">
                            Private Theatre Experience
                        </p>

                        <h2 className="max-w-3xl text-5xl font-bold leading-tight sm:text-6xl">
                            Your Moment.
                            <br />
                            Your Screen.
                            <br />
                            <span className="text-white/50">
                                Your Experience.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                            A private theatre experience designed around your
                            special moments.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/booking"
                                className="rounded-full bg-white px-7 py-3 font-medium text-black hover:bg-white/90"
                            >
                                Book Your Experience
                            </Link>

                            <Link
                                to="/ai-planner"
                                className="rounded-full border border-white/20 px-7 py-3 font-medium hover:bg-white/10"
                            >
                                Plan With AI
                            </Link>

                            <Link
                                to="/gallery"
                                className="rounded-full border border-white/20 px-7 py-3 font-medium hover:bg-white/10"
                            >
                                Explore Theatres
                            </Link>
                        </div>
                    </div>

                    {/* Hero slideshow placeholder */}
                    <div className="relative h-[450px] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                        {heroImages.map((image, index) => (
                            <img
                                key={image}
                                src={image}
                                alt={`Luxe Screens theatre experience ${index + 1}`}
                                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${currentHero === index
                                    ? "opacity-100"
                                    : "opacity-0"
                                    }`}
                            />
                        ))}

                        <div className="absolute inset-0 bg-black/30" />

                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                            <span className="text-sm text-white/80">
                                {String(currentHero + 1).padStart(2, "0")} / 03
                            </span>

                            <div className="flex gap-2">
                                {heroImages.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setCurrentHero(index)}
                                        aria-label={`Show slide ${index + 1}`}
                                        className={`h-2 w-2 rounded-full transition ${currentHero === index
                                            ? "bg-white"
                                            : "bg-white/30"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section
                id="services"
                className="border-t border-white/10 px-6 py-24"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                            Services
                        </p>

                        <h2 className="mt-3 text-4xl font-bold">
                            Make your occasion special.
                        </h2>
                    </div>

                    {addonsLoading ? (
                        <div className="mt-12">
                            <p className="text-sm text-white/40">
                                Loading services...
                            </p>
                        </div>
                    ) : addons.length === 0 ? (
                        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                            <p className="text-white/40">
                                No services available.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {addons.map((addon) => (
                                <div
                                    key={addon._id}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10"
                                >
                                    <div className="mb-8 flex items-center justify-between">
                                        <div className="h-10 w-10 rounded-full border border-white/20" />

                                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
                                            {addon.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold">
                                        {addon.name}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-white/50">
                                        Experience designed for your special
                                        moment.
                                    </p>

                                    {addon.options &&
                                        addon.options.length > 0 && (
                                            <div className="mt-5 space-y-2">
                                                {addon.options.map((option) => (
                                                    <div
                                                        key={option._id}
                                                        className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2"
                                                    >
                                                        <span className="text-sm text-white/70">
                                                            {option.name}
                                                        </span>

                                                        <span className="text-sm text-white/50">
                                                            ₹{option.price}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Gallery Preview */}
            <section
                id="gallery"
                className="border-t border-white/10 px-6 py-24"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                                Our Theatres
                            </p>

                            <h2 className="mt-3 text-4xl font-bold">
                                Explore our theatres.
                            </h2>
                        </div>

                        <Link
                            to="/gallery"
                            className="w-fit rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10"
                        >
                            View Gallery
                        </Link>
                    </div>

                    {/* Loading */}
                    {theatersLoading ? (
                        <div className="mt-12">
                            <p className="text-sm text-white/40">
                                Loading theatres...
                            </p>
                        </div>
                    ) : theaters.length === 0 ? (
                        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                            <p className="text-white/40">
                                No theatres available.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-12 grid gap-5 md:grid-cols-2">
                            {theaters.map((theater) => (
                                <div
                                    key={theater._id}
                                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10"
                                >
                                    {/* Theatre Image */}
                                    <div className="h-64 overflow-hidden">
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

                                    {/* Theatre Content */}
                                    <div className="p-6">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                            Private Theatre
                                        </p>

                                        <h3 className="mt-2 text-2xl font-semibold">
                                            {theater.name}
                                        </h3>

                                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/50">
                                            <p>
                                                Base Price: ₹{theater.basePrice}
                                            </p>

                                            <p>
                                                Capacity: {theater.maxCapacity}
                                            </p>

                                            <p>
                                                Screen: {theater.screen}
                                            </p>

                                            <p>
                                                Sound: {theater.sound}
                                            </p>
                                        </div>

                                        <Link
                                            to="/booking"
                                            className="mt-6 inline-block rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
                                        >
                                            Book This Theatre
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ */}
            <section
                id="faq"
                className="border-t border-white/10 px-6 py-24"
            >
                <div className="mx-auto max-w-4xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        FAQ
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                        Frequently asked questions.
                    </h2>

                    <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
                        {[
                            "How does the private theatre experience work?",
                            "What can I add to my booking?",
                            "How does the booking process work?",
                        ].map((question) => (
                            <details key={question} className="group py-6">
                                <summary className="cursor-pointer list-none text-lg font-medium">
                                    {question}
                                </summary>

                                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
                                    More information about this experience
                                    will be provided here.
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section
                id="contact"
                className="border-t border-white/10 px-6 py-24"
            >
                <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        Contact
                    </p>

                    <h2 className="mt-4 text-4xl font-bold">
                        Ready to create your experience?
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-white/50">
                        Get in touch with Luxe Screens and plan your private
                        theatre experience.
                    </p>

                    <Link
                        to="/contact"
                        className="mt-8 inline-block rounded-full bg-white px-7 py-3 font-medium text-black hover:bg-white/90"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;

