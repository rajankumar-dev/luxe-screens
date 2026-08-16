import React from 'react'

const Header = () => {
    return (
        <>
            <header className="border-b border-white/10">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <h1 className="text-2xl font-bold tracking-wide">
                        Luxe Screens
                    </h1>

                    <div className="hidden items-center gap-8 md:flex">
                        <a href="#home" className="text-sm text-white/80 hover:text-white">
                            Home
                        </a>

                        <a href="#services" className="text-sm text-white/80 hover:text-white">
                            Services
                        </a>

                        <a href="#gallery" className="text-sm text-white/80 hover:text-white">
                            Gallery
                        </a>

                        <a href="#faq" className="text-sm text-white/80 hover:text-white">
                            FAQ
                        </a>

                        <a href="#contact" className="text-sm text-white/80 hover:text-white">
                            Contact
                        </a>
                    </div>

                    <button className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black">
                        Book Now
                    </button>
                </nav>
            </header>
        </>
    )
}

export default Header
