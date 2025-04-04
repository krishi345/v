"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-sm" : "bg-background"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="KrishiMitra Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-xl font-bold">KrishiMitra</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/farmer"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Farmers
              </Link>
              <Link
                href="/consumer"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Consumers
              </Link>
              <Link
                href="/weather"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Weather
              </Link>
              <Link
                href="/news"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                News
              </Link>
              <Link
                href="/call-center"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Call Center
              </Link>
              <Link
                href="/about"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Contact
              </Link>

              {isLoading ? (
                <div className="w-8 h-8 bg-foreground/5 rounded-full animate-pulse"></div>
              ) : isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {session?.user?.name?.[0] || "U"}
                      </div>
                    )}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-foreground/5"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-around">
                <span
                  className={`block w-full h-0.5 bg-current transform transition-transform ${
                    isOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-full h-0.5 bg-current transition-opacity ${
                    isOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-full h-0.5 bg-current transform transition-transform ${
                    isOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden py-4 border-t border-foreground/10">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/farmer"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Farmers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/consumer"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Consumers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/weather"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Weather
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/call-center"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Call Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="block text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
                <li className="pt-2 border-t border-foreground/10">
                  {isLoading ? (
                    <div className="w-full h-10 bg-foreground/5 rounded-md animate-pulse"></div>
                  ) : isAuthenticated ? (
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {session?.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-xs">
                          {session?.user?.name?.[0] || "U"}
                        </div>
                      )}
                      <span className="text-sm font-medium">My Profile</span>
                    </Link>
                  ) : (
                    <Link
                      href="/auth/signin"
                      className="block w-full text-center bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
}
