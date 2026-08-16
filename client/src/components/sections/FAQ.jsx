import React from 'react'

const FAQ = () => {
    return (
        <>
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
        </>
    )
}

export default FAQ
