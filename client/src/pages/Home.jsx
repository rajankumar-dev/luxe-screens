import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
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
                            <span className="text-white/50">Your Experience.</span>
                        </h2>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                            A private theatre experience designed around your special
                            moments.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <button className="rounded-full bg-white px-7 py-3 font-medium text-black hover:bg-white/90">
                                Book Your Experience
                            </button>

                            <button className="rounded-full border border-white/20 px-7 py-3 font-medium hover:bg-white/10">
                                Explore Theatres
                            </button>
                        </div>
                    </div>

                    {/* Hero slideshow placeholder */}
                    <div className="relative h-[450px] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-sm uppercase tracking-[0.25em] text-white/30">
                                Hero Slideshow
                            </p>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                            <span className="text-sm text-white/60">
                                01 / 03
                            </span>

                            <div className="flex gap-2">
                                <span className="h-2 w-2 rounded-full bg-white" />
                                <span className="h-2 w-2 rounded-full bg-white/30" />
                                <span className="h-2 w-2 rounded-full bg-white/30" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="border-t border-white/10 px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                            Services
                        </p>

                        <h2 className="mt-3 text-4xl font-bold">
                            Make your occasion special.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            "Private Theatre",
                            "Celebrations",
                            "Cakes",
                            "Decor",
                            "Gifts",
                            "Special Occasions",
                        ].map((service) => (
                            <div
                                key={service}
                                className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10"
                            >
                                <div className="mb-12 h-10 w-10 rounded-full border border-white/20" />

                                <h3 className="text-xl font-semibold">{service}</h3>

                                <p className="mt-3 text-sm leading-6 text-white/50">
                                    Experience designed for your special moment.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <section id="gallery" className="border-t border-white/10 px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                                Gallery
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

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="flex aspect-[4/5] items-end rounded-3xl border border-white/10 bg-white/5 p-6"
                            >
                                <span className="text-sm text-white/40">
                                    Theatre {String(item).padStart(2, "0")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="border-t border-white/10 px-6 py-24">
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
                                    More information about this experience will be provided
                                    here.
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="border-t border-white/10 px-6 py-24">
                <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        Contact
                    </p>

                    <h2 className="mt-4 text-4xl font-bold">
                        Ready to create your experience?
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-white/50">
                        Get in touch with Luxe Screens and plan your private theatre
                        experience.
                    </p>

                    <button className="mt-8 rounded-full bg-white px-7 py-3 font-medium text-black hover:bg-white/90">
                        Contact Us
                    </button>
                </div>
            </section>


        </>
    )
}

export default Home
