import { useState } from "react";

const theatres = [
    {
        id: 1,
        name: "Luxe Gold",
        category: "Gold",
        price: 2500,
    },
    {
        id: 2,
        name: "Luxe Premium",
        category: "Premium",
        price: 3500,
    },
    {
        id: 3,
        name: "Luxe Gold Plus",
        category: "Gold",
        price: 3000,
    },
];

function Gallery() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("default");
    const [selectedTheatre, setSelectedTheatre] = useState(null);

    let filteredTheatres = theatres.filter((theatre) => {
        const matchesSearch = theatre.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || theatre.category === category;

        return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
        filteredTheatres.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filteredTheatres.sort((a, b) => b.price - a.price);
    }

    return (
        <main className="min-h-screen bg-black px-6 py-16 text-white">
            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                        Gallery
                    </p>

                    <h1 className="mt-3 text-5xl font-bold">
                        Explore our theatres.
                    </h1>

                    <p className="mt-5 text-white/50">
                        Discover the perfect private theatre for your experience.
                    </p>
                </div>

                {/* Controls */}
                <div className="mt-12 flex flex-col gap-4 md:flex-row">
                    <input
                        type="text"
                        placeholder="Search theatres..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-full border border-white/10 bg-white/5 px-5 py-3 outline-none placeholder:text-white/30 focus:border-white/30 md:flex-1"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-full border border-white/10 bg-white/5 px-5 py-3 outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Gold">Gold</option>
                        <option value="Premium">Premium</option>
                    </select>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="rounded-full border border-white/10 bg-white/5 px-5 py-3 outline-none"
                    >
                        <option value="default">Sort by</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>

                {/* Theatre Cards */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTheatres.map((theatre) => (
                        <article
                            key={theatre.id}
                            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                        >
                            <div className="flex aspect-[4/3] items-center justify-center bg-white/5">
                                <span className="text-sm uppercase tracking-[0.2em] text-white/20">
                                    Theatre Image
                                </span>
                            </div>

                            <div className="p-6">
                                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                    {theatre.category}
                                </p>

                                <h2 className="mt-2 text-2xl font-semibold">
                                    {theatre.name}
                                </h2>

                                <div className="mt-5 flex items-center justify-between">
                                    <p className="text-white/50">
                                        ₹{theatre.price}
                                    </p>

                                    <button
                                        onClick={() => setSelectedTheatre(theatre)}
                                        className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {filteredTheatres.length === 0 && (
                    <p className="mt-16 text-center text-white/40">
                        No theatres found.
                    </p>
                )}
            </div>

            {/* Lightbox */}
            {selectedTheatre && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6"
                    onClick={() => setSelectedTheatre(null)}
                >
                    <div
                        className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-zinc-950 p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedTheatre(null)}
                            className="absolute right-5 top-5 rounded-full border border-white/20 px-3 py-1 text-sm hover:bg-white hover:text-black"
                        >
                            Close
                        </button>

                        <div className="flex aspect-video items-center justify-center rounded-2xl bg-white/5">
                            <span className="text-sm uppercase tracking-[0.2em] text-white/20">
                                {selectedTheatre.name}
                            </span>
                        </div>

                        <h2 className="mt-6 text-3xl font-bold">
                            {selectedTheatre.name}
                        </h2>

                        <p className="mt-2 text-white/50">
                            {selectedTheatre.category} Theatre
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Gallery;