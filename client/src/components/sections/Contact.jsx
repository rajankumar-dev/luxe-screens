import React from 'react'

const Contact = () => {
    return (
        <>

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

export default Contact
