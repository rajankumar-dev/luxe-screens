import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to send message.");
                return;
            }

            setSuccess(data.message || "Message sent successfully.");

            setFormData({
                name: "",
                email: "",
                message: "",
            });
        } catch (error) {
            console.error("Contact form error:", error);
            setError("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        Contact
                    </p>

                    <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                        Let&apos;s talk.
                    </h1>

                    <p className="mt-5 text-white/50">
                        Have a question about Luxe Screens? Send us a message
                        and we&apos;ll get back to you.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="mt-12 grid gap-6 lg:grid-cols-2">

                    {/* Contact Information */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                        <p className="text-sm uppercase tracking-[0.2em] text-white/40">
                            Get in touch
                        </p>

                        <h2 className="mt-3 text-3xl font-bold">
                            We&apos;d love to hear from you.
                        </h2>

                        <p className="mt-5 leading-7 text-white/50">
                            Whether you have a question about our theatres,
                            services or booking experience, feel free to reach
                            out to us.
                        </p>

                        <div className="mt-10 space-y-6">

                            <div>
                                <p className="text-sm text-white/40">
                                    Email
                                </p>

                                <p className="mt-2 text-white">
                                    support@luxescreens.com
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-white/40">
                                    Phone
                                </p>

                                <p className="mt-2 text-white">
                                    +91 98765 43210
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-white/40">
                                    Hours
                                </p>

                                <p className="mt-2 text-white">
                                    Monday - Sunday
                                </p>

                                <p className="mt-1 text-white/50">
                                    10:00 AM - 10:00 PM
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                        <h2 className="text-2xl font-bold">
                            Send us a message
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm text-white/60"
                                >
                                    Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-white/30"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm text-white/60"
                                >
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-white/30"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm text-white/60"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message..."
                                    rows="6"
                                    required
                                    className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-white/30"
                                />
                            </div>

                            {/* Success */}
                            {success && (
                                <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
                                    <p className="text-sm text-green-400">
                                        {success}
                                    </p>
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                                    <p className="text-sm text-red-400">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;