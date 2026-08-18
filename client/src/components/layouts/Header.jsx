import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        navigate("/");
    };

    return (
        <header className="border-b border-white/10">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                <Link
                    to="/"
                    className="text-2xl font-bold tracking-wide"
                >
                    Luxe Screens
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        to="/"
                        className="text-sm text-white/80 hover:text-white"
                    >
                        Home
                    </Link>

                    <Link
                        to="/services"
                        className="text-sm text-white/80 hover:text-white"
                    >
                        Services
                    </Link>

                    <Link
                        to="/gallery"
                        className="text-sm text-white/80 hover:text-white"
                    >
                        Gallery
                    </Link>

                    <Link
                        to="/faq"
                        className="text-sm text-white/80 hover:text-white"
                    >
                        FAQ
                    </Link>

                    <Link
                        to="/contact"
                        className="text-sm text-white/80 hover:text-white"
                    >
                        Contact
                    </Link>
                </div>

                <div className="flex items-center gap-3">

                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
                            >
                                Logout
                            </button>
                        </>
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
            </nav>
        </header>
    );
};

export default Header;