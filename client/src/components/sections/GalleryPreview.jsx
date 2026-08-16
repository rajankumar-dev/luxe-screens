import React from 'react'

const GalleryPreview = () => {
    return (
        <>
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

                        <button className="w-fit rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10">
                            View Gallery
                        </button>
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
        </>
    )
}

export default GalleryPreview
