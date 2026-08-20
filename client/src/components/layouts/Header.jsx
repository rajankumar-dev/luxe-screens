import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="border-b border-white/10">
            <nav className="mx-auto max-w-7xl px-6 py-5">

                {/* Top Header */}
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="text-2xl font-bold tracking-wide"
                    >
                        Luxe Screens
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-8 md:flex">
                        <Link to="/" className="text-sm text-white/80 hover:text-white">
                            Home
                        </Link>

                        <Link to="/services" className="text-sm text-white/80 hover:text-white">
                            Services
                        </Link>

                        <Link to="/gallery" className="text-sm text-white/80 hover:text-white">
                            Gallery
                        </Link>

                        <Link
                            to="/ai-planner"
                            className="text-sm text-white/80 hover:text-white"
                        >
                            AI Planner
                        </Link>

                        <Link to="/faq" className="text-sm text-white/80 hover:text-white">
                            FAQ
                        </Link>

                        <Link to="/contact" className="text-sm text-white/80 hover:text-white">
                            Contact
                        </Link>
                        <Link
                            to="/waitlist"
                            className="text-sm text-white/80 hover:text-white"
                        >
                            Waitlist
                        </Link>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-3 md:flex">

                        {user ? (
                            <Link
                                to="/profile"
                                className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
                            >
                                Profile
                            </Link>
                        ) : (
                            <Link
                                to="/signup"
                                className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
                            >
                                Sign Up
                            </Link>
                        )}

                        <Link
                            to="/booking"
                            className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
                        >
                            Book Now
                        </Link>

                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-2xl md:hidden"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>

                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 md:hidden">

                        <Link to="/" onClick={closeMenu} className="text-sm text-white/80 hover:text-white">
                            Home
                        </Link>

                        <Link to="/services" onClick={closeMenu} className="text-sm text-white/80 hover:text-white">
                            Services
                        </Link>

                        <Link to="/gallery" onClick={closeMenu} className="text-sm text-white/80 hover:text-white">
                            Gallery
                        </Link>
                        <Link
                            to="/ai-planner"
                            onClick={closeMenu}
                            className="text-sm text-white/80 hover:text-white"
                        >
                            AI Planner
                        </Link>

                        <Link to="/faq" onClick={closeMenu} className="text-sm text-white/80 hover:text-white">
                            FAQ
                        </Link>
                        <Link
                            to="/waitlist"
                            onClick={closeMenu}
                            className="text-sm text-white/80 hover:text-white"
                        >
                            Waitlist
                        </Link>

                        <Link to="/contact" onClick={closeMenu} className="text-sm text-white/80 hover:text-white">
                            Contact
                        </Link>

                        {user ? (
                            <Link
                                to="/profile"
                                onClick={closeMenu}
                                className="rounded-full border border-white/20 px-5 py-2 text-center text-sm hover:bg-white hover:text-black"
                            >
                                Profile
                            </Link>
                        ) : (
                            <Link
                                to="/signup"
                                onClick={closeMenu}
                                className="rounded-full border border-white/20 px-5 py-2 text-center text-sm hover:bg-white hover:text-black"
                            >
                                Sign Up
                            </Link>
                        )}

                        <Link
                            to="/booking"
                            onClick={closeMenu}
                            className="rounded-full border border-white/20 px-5 py-2 text-center text-sm hover:bg-white hover:text-black"
                        >
                            Book Now
                        </Link>

                    </div>
                )}

            </nav>
        </header>
    );
};

export default Header;