import React from 'react'

const Hero = () => {
    return (
        <>

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









        </>
    )
}

export default Hero
