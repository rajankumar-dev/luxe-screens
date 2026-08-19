import { useState } from "react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is Luxe Screens?",
            answer:
                "Luxe Screens is a premium private theatre experience where you can book a private screening space for special occasions, celebrations and memorable moments.",
        },
        {
            question: "How can I book a private theatre?",
            answer:
                "You can select your preferred date, time slot and theatre from the booking page and then customize your experience with the available options.",
        },
        {
            question: "What occasions can I celebrate at Luxe Screens?",
            answer:
                "You can celebrate birthdays, anniversaries, proposals, date nights and other special occasions with a personalized private theatre experience.",
        },
        {
            question: "Can I add a cake, decoration or gift to my booking?",
            answer:
                "Yes. You can personalize your booking by selecting available cakes, decoration packages and gifts during the booking process.",
        },
        {
            question: "Can I choose a specific date and time?",
            answer:
                "Yes. Available dates and time slots are shown during the booking process, allowing you to choose a suitable time for your experience.",
        },
        {
            question: "How do I know if my booking is confirmed?",
            answer:
                "After completing the booking process, you can view your booking details from the My Bookings section of your account.",
        },
        {
            question: "Can I view my previous bookings?",
            answer:
                "Yes. You can view your booking details from the My Bookings section after logging into your account.",
        },
        {
            question: "What payment options are available?",
            answer:
                "Payment is completed through the payment step provided during the booking process.",
        },
    ];

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-4xl">

                {/* Heading */}
                <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        FAQ
                    </p>

                    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                        Frequently asked questions.
                    </h1>

                    <p className="mt-5 text-white/50">
                        Find answers to some of the most common questions
                        about the Luxe Screens experience.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="mt-12 space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-white/10 bg-white/5"
                        >
                            <button
                                type="button"
                                onClick={() => handleToggle(index)}
                                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                            >
                                <span className="text-base font-medium sm:text-lg">
                                    {faq.question}
                                </span>

                                <span className="shrink-0 text-2xl text-white/50">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="border-t border-white/10 px-6 py-5">
                                    <p className="text-sm leading-7 text-white/50">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                        Still have a question?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-white/50">
                        If you need more information about your experience,
                        feel free to get in touch with us.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default FAQ;