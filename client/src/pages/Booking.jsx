import { useEffect, useState } from "react";

function Booking() {
    const [step, setStep] = useState(1);

    // Step 1
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [slotsLoading, setSlotsLoading] = useState(false);

    // Step 2
    const [theaters, setTheaters] = useState([]);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [theatersLoading, setTheatersLoading] = useState(false);

    // Step 3
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    // Step 4
    const [occasion, setOccasion] = useState("");

    // Step 5
    const [cakes, setCakes] = useState([]);
    const [selectedCake, setSelectedCake] = useState(null);
    const [selectedCakeOption, setSelectedCakeOption] = useState(null);
    const [cakesLoading, setCakesLoading] = useState(false);

    // Step 6
    const [decors, setDecors] = useState([]);
    const [selectedDecor, setSelectedDecor] = useState(null);
    const [selectedDecorOption, setSelectedDecorOption] = useState(null);
    const [decorLoading, setDecorLoading] = useState(false);

    // Fetch slots
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                setSlotsLoading(true);

                const response = await fetch("http://localhost:5000/api/slots");
                const data = await response.json();

                if (data.success) {
                    setSlots(data.slots);
                }
            } catch (error) {
                console.error("Failed to fetch slots:", error);
            } finally {
                setSlotsLoading(false);
            }
        };

        fetchSlots();
    }, []);

    // Fetch theaters when Step 2 starts
    useEffect(() => {
        if (step !== 2) return;

        const fetchTheaters = async () => {
            try {
                setTheatersLoading(true);

                const response = await fetch(
                    "http://localhost:5000/api/theaters"
                );

                const data = await response.json();

                if (data.success) {
                    setTheaters(data.theaters);
                }
            } catch (error) {
                console.error("Failed to fetch theaters:", error);
            } finally {
                setTheatersLoading(false);
            }
        };

        fetchTheaters();
    }, [step]);

    const availableSlots = slots.filter(
        (slot) => slot.status === "available"
    );

    const handleContinue = () => {
        if (step === 1) {
            if (!date || !selectedSlot) return;

            setStep(2);
        }
    };

    useEffect(() => {
        if (step !== 5) return;

        const fetchCakes = async () => {
            try {
                setCakesLoading(true);

                const response = await fetch(
                    "http://localhost:5000/api/addons"
                );

                const data = await response.json();

                if (data.success) {
                    const cakeAddOns = data.addons.filter(
                        (addOn) => addOn.category === "CAKE"
                    );

                    setCakes(cakeAddOns);
                }
            } catch (error) {
                console.error("Failed to fetch cakes:", error);
            } finally {
                setCakesLoading(false);
            }
        };

        fetchCakes();
    }, [step]);

    {/*decor */ }
    useEffect(() => {
        if (step !== 6) return;

        const fetchDecors = async () => {
            try {
                setDecorLoading(true);

                const response = await fetch(
                    "http://localhost:5000/api/addons"
                );

                const data = await response.json();

                if (data.success) {
                    const decorAddOns = data.addons.filter(
                        (addOn) => addOn.category === "DECOR"
                    );

                    setDecors(decorAddOns);
                }
            } catch (error) {
                console.error("Failed to fetch decor:", error);
            } finally {
                setDecorLoading(false);
            }
        };

        fetchDecors();
    }, [step]);

    return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-5xl">
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                    Booking
                </p>

                <h1 className="mt-3 text-5xl font-bold">
                    Book your experience.
                </h1>

                <p className="mt-5 max-w-xl text-white/50">
                    Complete your booking in a few simple steps.
                </p>

                {/* Step indicator */}
                <div className="mt-10 flex items-center gap-6">
                    {/* Step 1 */}
                    <div
                        className={`flex items-center gap-3 ${step >= 1 ? "text-white" : "text-white/30"
                            }`}
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-medium text-black">
                            1
                        </div>

                        <span className="text-sm">
                            Date & Time
                        </span>
                    </div>

                    <div className="h-px w-12 bg-white/10" />
                    {/* Step 2 */}
                    <div
                        className={`flex items-center gap-3 ${step >= 2 ? "text-white" : "text-white/30"
                            }`}
                    >
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 2
                                ? "bg-white text-black"
                                : "border border-white/20 text-white/40"
                                }`}
                        >
                            2
                        </div>

                        <span className="text-sm">
                            Theatre
                        </span>
                    </div>

                    <div className="h-px w-12 bg-white/10" />
                    {/* Step 3 */}
                    <div
                        className={`flex items-center gap-3 ${step >= 3 ? "text-white" : "text-white/30"
                            }`}
                    >
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 3
                                ? "bg-white text-black"
                                : "border border-white/20 text-white/40"
                                }`}
                        >
                            3
                        </div>

                        <span className="text-sm">
                            Contact Details
                        </span>
                    </div>

                    {/* Step 3 → Step 4 line */}
                    <div className="h-px w-12 bg-white/10" />

                    {/* Step 4 */}
                    <div
                        className={`flex items-center gap-3 ${step >= 4 ? "text-white" : "text-white/30"
                            }`}
                    >
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 4
                                ? "bg-white text-black"
                                : "border border-white/20 text-white/40"
                                }`}
                        >
                            4
                        </div>

                        <span className="text-sm">
                            Occasion
                        </span>
                    </div>

                    <div className="h-px w-12 bg-white/10" />
                    {/*Step 5 */}
                    <div
                        className={`flex items-center gap-3 ${step >= 5 ? "text-white" : "text-white/30"
                            }`}
                    >
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 5
                                ? "bg-white text-black"
                                : "border border-white/20 text-white/40"
                                }`}
                        >
                            5
                        </div>

                        <span className="text-sm">
                            Cakes
                        </span>
                    </div>

                    <div className="h-px w-12 bg-white/10" />
                    {/* Step 6 */}
                    <div
                        className={`flex items-center gap-3 ${step >= 6 ? "text-white" : "text-white/30"
                            }`}
                    >
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 6
                                ? "bg-white text-black"
                                : "border border-white/20 text-white/40"
                                }`}
                        >
                            6
                        </div>

                        <span className="text-sm">
                            Decor
                        </span>
                    </div>

                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        {/* Date */}
                        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
                            <h2 className="text-xl font-semibold">
                                Select Date
                            </h2>

                            <input
                                type="date"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    setSelectedSlot(null);
                                }}
                                className="mt-5 rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-white/30"
                            />
                        </section>

                        {/* Slots */}
                        {date && (
                            <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
                                <h2 className="text-xl font-semibold">
                                    Select Time
                                </h2>

                                {slotsLoading ? (
                                    <p className="mt-5 text-sm text-white/40">
                                        Loading available slots...
                                    </p>
                                ) : availableSlots.length === 0 ? (
                                    <p className="mt-5 text-sm text-white/40">
                                        No available slots.
                                    </p>
                                ) : (
                                    <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                                        {availableSlots.map((slot) => {
                                            const isSelected =
                                                selectedSlot?._id === slot._id;

                                            return (
                                                <button
                                                    key={slot._id}
                                                    type="button"
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`rounded-xl border px-4 py-4 text-left transition ${isSelected
                                                        ? "border-white bg-white text-black"
                                                        : "border-white/10 bg-black hover:border-white/30"
                                                        }`}
                                                >
                                                    <p className="font-medium">
                                                        {slot.time}
                                                    </p>

                                                    <p
                                                        className={`mt-1 text-xs ${isSelected
                                                            ? "text-black/60"
                                                            : "text-white/40"
                                                            }`}
                                                    >
                                                        Available
                                                    </p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Continue */}
                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={handleContinue}
                                disabled={!date || !selectedSlot}
                                className="rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Continue
                            </button>
                        </div>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
                        <h2 className="text-2xl font-semibold">
                            Select Theatre
                        </h2>

                        <p className="mt-2 text-sm text-white/40">
                            Choose your preferred theatre.
                        </p>

                        {theatersLoading ? (
                            <p className="mt-8 text-sm text-white/40">
                                Loading theatres...
                            </p>
                        ) : theaters.length === 0 ? (
                            <p className="mt-8 text-sm text-white/40">
                                No theatres available.
                            </p>
                        ) : (
                            <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                {theaters.map((theater) => {
                                    const isSelected =
                                        selectedTheater?._id === theater._id;

                                    return (
                                        <button
                                            key={theater._id}
                                            type="button"
                                            onClick={() => setSelectedTheater(theater)}
                                            className={`rounded-2xl border p-6 text-left transition ${isSelected
                                                ? "border-white bg-white text-black"
                                                : "border-white/10 bg-black hover:border-white/30"
                                                }`}
                                        >
                                            <p
                                                className={`text-xs uppercase tracking-[0.2em] ${isSelected
                                                    ? "text-black/50"
                                                    : "text-white/40"
                                                    }`}
                                            >
                                                Theatre
                                            </p>

                                            <h3 className="mt-2 text-2xl font-semibold">
                                                {theater.name}
                                            </h3>

                                            <p
                                                className={`mt-4 text-sm ${isSelected
                                                    ? "text-black/60"
                                                    : "text-white/40"
                                                    }`}
                                            >
                                                Base Price: ₹{theater.basePrice}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Selected booking information */}
                        {selectedTheater && (
                            <div className="mt-8 rounded-2xl border border-white/10 bg-black p-5">
                                <p className="text-sm text-white/40">
                                    Booking Summary
                                </p>

                                <div className="mt-3 space-y-2 text-sm">
                                    <p>
                                        <span className="text-white/40">Date:</span>{" "}
                                        {date}
                                    </p>

                                    <p>
                                        <span className="text-white/40">Time:</span>{" "}
                                        {selectedSlot.time}
                                    </p>

                                    <p>
                                        <span className="text-white/40">Theatre:</span>{" "}
                                        {selectedTheater.name}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 flex justify-between">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="rounded-full border border-white/20 px-7 py-3 text-sm hover:bg-white/10"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(3)}
                                disabled={!selectedTheater}
                                className="rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Continue
                            </button>
                        </div>
                    </section>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
                        <h2 className="text-2xl font-semibold">
                            Contact Details
                        </h2>

                        <p className="mt-2 text-sm text-white/40">
                            Enter your contact information to continue.
                        </p>

                        <div className="mt-8 space-y-5">
                            {/* Name */}
                            <div>
                                <label className="text-sm text-white/60">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-white/30"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-sm text-white/60">
                                    Phone
                                </label>

                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-white/30"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm text-white/60">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-white/30"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex justify-between">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="rounded-full border border-white/20 px-7 py-3 text-sm hover:bg-white/10"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(4)}
                                disabled={!name || !phone || !email}
                                className="rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Continue
                            </button>
                        </div>
                    </section>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
                        <h2 className="text-2xl font-semibold">
                            Occasion
                        </h2>

                        <p className="mt-2 text-sm text-white/40">
                            Tell us the occasion for your theatre experience.
                        </p>

                        <div className="mt-8">
                            <label className="text-sm text-white/60">
                                Occasion
                            </label>

                            <input
                                type="text"
                                value={occasion}
                                onChange={(e) => setOccasion(e.target.value)}
                                placeholder="Enter your occasion"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-white/30"
                            />
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button
                                type="button"
                                onClick={() => setStep(3)}
                                className="rounded-full border border-white/20 px-7 py-3 text-sm hover:bg-white/10"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(5)}
                                disabled={!occasion}
                                className="rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Continue
                            </button>
                        </div>
                    </section>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
                        <h2 className="text-2xl font-semibold">
                            Choose a Cake
                        </h2>

                        <p className="mt-2 text-sm text-white/40">
                            Add a cake to make your experience special.
                        </p>

                        {cakesLoading ? (
                            <p className="mt-8 text-sm text-white/40">
                                Loading cakes...
                            </p>
                        ) : cakes.length === 0 ? (
                            <p className="mt-8 text-sm text-white/40">
                                No cakes available.
                            </p>
                        ) : (
                            <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                {cakes.map((cake) => {
                                    const isSelected = selectedCake?._id === cake._id;

                                    return (
                                        <div
                                            key={cake._id}
                                            className={`rounded-2xl border p-6 transition ${isSelected
                                                ? "border-white bg-white text-black"
                                                : "border-white/10 bg-black"
                                                }`}
                                        >
                                            <h3 className="text-xl font-semibold">
                                                {cake.name}
                                            </h3>

                                            <p
                                                className={`mt-2 text-sm ${isSelected
                                                    ? "text-black/50"
                                                    : "text-white/40"
                                                    }`}
                                            >
                                                Select your preferred size
                                            </p>

                                            <div className="mt-5 flex flex-wrap gap-3">
                                                {cake.options.map((option) => {
                                                    const optionSelected =
                                                        selectedCake?._id === cake._id &&
                                                        selectedCakeOption?._id === option._id;

                                                    return (
                                                        <button
                                                            key={option._id}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedCake(cake);
                                                                setSelectedCakeOption(option);
                                                            }}
                                                            className={`rounded-xl border px-4 py-3 text-left transition ${optionSelected
                                                                ? "border-black bg-black text-white"
                                                                : isSelected
                                                                    ? "border-black/20 text-black hover:bg-black/10"
                                                                    : "border-white/10 text-white hover:border-white/30"
                                                                }`}
                                                        >
                                                            <p className="text-sm font-medium">
                                                                {option.name}
                                                            </p>

                                                            <p className="mt-1 text-xs opacity-60">
                                                                ₹{option.price}
                                                            </p>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="mt-8 flex justify-between">
                            <button
                                type="button"
                                onClick={() => setStep(4)}
                                className="rounded-full border border-white/20 px-7 py-3 text-sm hover:bg-white/10"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(6)}
                                disabled={!selectedCake || !selectedCakeOption}
                                className="rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Continue
                            </button>
                        </div>
                    </section>
                )}

                {/* STEP 6 */}
                {step === 6 && (
                    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
                        <h2 className="text-2xl font-semibold">
                            Choose Decoration
                        </h2>

                        <p className="mt-2 text-sm text-white/40">
                            Select a decoration package for your experience.
                        </p>

                        {decorLoading ? (
                            <p className="mt-8 text-sm text-white/40">
                                Loading decorations...
                            </p>
                        ) : decors.length === 0 ? (
                            <p className="mt-8 text-sm text-white/40">
                                No decorations available.
                            </p>
                        ) : (
                            <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                {decors.map((decor) => {
                                    const isSelected =
                                        selectedDecor?._id === decor._id;

                                    return (
                                        <div
                                            key={decor._id}
                                            className={`rounded-2xl border p-6 transition ${isSelected
                                                ? "border-white bg-white text-black"
                                                : "border-white/10 bg-black"
                                                }`}
                                        >
                                            <h3 className="text-xl font-semibold">
                                                {decor.name}
                                            </h3>

                                            <p
                                                className={`mt-2 text-sm ${isSelected
                                                    ? "text-black/50"
                                                    : "text-white/40"
                                                    }`}
                                            >
                                                Select a decoration package
                                            </p>

                                            <div className="mt-5 flex flex-wrap gap-3">
                                                {decor.options.map((option) => {
                                                    const optionSelected =
                                                        selectedDecor?._id === decor._id &&
                                                        selectedDecorOption?._id === option._id;

                                                    return (
                                                        <button
                                                            key={option._id}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedDecor(decor);
                                                                setSelectedDecorOption(option);
                                                            }}
                                                            className={`rounded-xl border px-4 py-3 text-left transition ${optionSelected
                                                                ? "border-black bg-black text-white"
                                                                : isSelected
                                                                    ? "border-black/20 text-black hover:bg-black/10"
                                                                    : "border-white/10 text-white hover:border-white/30"
                                                                }`}
                                                        >
                                                            <p className="text-sm font-medium">
                                                                {option.name}
                                                            </p>

                                                            <p className="mt-1 text-xs opacity-60">
                                                                ₹{option.price}
                                                            </p>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="mt-8 flex justify-between">
                            <button
                                type="button"
                                onClick={() => setStep(5)}
                                className="rounded-full border border-white/20 px-7 py-3 text-sm hover:bg-white/10"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(7)}
                                disabled={!selectedDecor || !selectedDecorOption}
                                className="rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                Continue
                            </button>
                        </div>
                    </section>
                )}

            </div>
        </main>
    );
}

export default Booking;