import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="border-b border-white/10">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                    <Link to="/" className="text-2xl font-bold tracking-wide">
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
                        <Link
                            to="/signup"
                            className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
                        >
                            Sign Up
                        </Link>

                        <Link
                            to="/booking"
                            className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black"
                        >
                            Book Now
                        </Link>
                    </div>

                </nav>
            </header>
        </>
    )
}

export default Header