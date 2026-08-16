import React from 'react'

const Services = () => {
    return (
        <>
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
        </>
    )
}

export default Services
