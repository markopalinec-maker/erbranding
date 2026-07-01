'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const leftNavItems = [
    { href: '/', label: 'HOME' },
    { href: '/projects', label: 'PROJECTS' },
  ];

  const rightNavItems = [
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/99 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-5" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-8">
          {/* Left Navigation */}
          <ul className="flex items-center justify-self-end gap-8">
            {leftNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-xs tracking-widest uppercase transition-colors hover:text-white ${
                    pathname === item.href ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center Logo */}
          <Link
            href="/"
            className="justify-self-center text-white font-bold tracking-wider text-sm md:text-base"
          >
            ERBRANDING.STUDIO
          </Link>

          {/* Right Navigation */}
          <ul className="flex items-center justify-self-start gap-8">
            {rightNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-xs tracking-widest uppercase transition-colors hover:text-white ${
                    pathname === item.href ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-center relative">
          {/* Center Logo for Mobile */}
          <Link href="/" className="text-white font-bold tracking-wider text-sm">
            ERBRANDING.STUDIO
          </Link>

          {/* Hamburger Button - Absolute positioned right */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-0 w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden overflow-hidden max-h-[50vh] overflow-y-auto bg-black/95">
            <div className="py-6 px-4 space-y-6">
              <ul className="space-y-4">
                {leftNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm tracking-widest uppercase transition-colors block ${
                        pathname === item.href ? 'text-white' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-neutral-800 pt-4">
                <ul className="space-y-4">
                  {rightNavItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-sm tracking-widest uppercase transition-colors block ${
                          pathname === item.href ? 'text-white' : 'text-white/50 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
