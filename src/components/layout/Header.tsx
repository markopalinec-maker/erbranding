'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const leftNavItems = [
    { href: '/', label: 'HOME' },
    { href: '/projects', label: 'PROJECTS' },
  ];

  const rightNavItems = [
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
          <ul className="flex items-center gap-8">
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
            className="absolute left-1/2 -translate-x-1/2 text-white font-bold tracking-wider text-sm md:text-base"
          >
            ERBRANDING.STUDIO
          </Link>

          {/* Right Navigation */}
          <ul className="flex items-center gap-8">
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
      </nav>
    </header>
  );
}
