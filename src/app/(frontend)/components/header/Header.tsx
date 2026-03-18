'use client'

import { usePathname } from 'next/navigation'
import HeaderLogo from './HeaderLogo'
import Link from 'next/link'
import { navLinks } from '../../lib'
import ListenNow from './ListenNow'
import { useEffect, useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const pathname = usePathname()
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setShowHeader(currentScrollY <= lastScrollY || currentScrollY <= 80)
    setLastScrollY(currentScrollY)
    setScrolled(currentScrollY > 80)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
  }, [drawerOpen])

  const renderNavLinks = useCallback(
    (className: string, onClick?: () => void) =>
      navLinks.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClick}
            className={`${className} ${
              isActive ? 'text-[#F9B855]' : scrolled ? 'text-white' : 'text-white'
            } hover:text-[#F9B855] relative`}
          >
            {item.label}
            {!onClick && (
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-orange-300 transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            )}
          </Link>
        )
      }),
    [pathname, scrolled],
  )

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${scrolled ? 'bg-[#E75023]' : 'bg-transparent'} `}
    >
      <div className="relative max-w-8xl container px-6 lg:px-15 mx-auto py-4 flex items-center justify-between text-white">
        <HeaderLogo />

        <nav className="hidden lg:flex items-center gap-4 font-serif text-md">
          {renderNavLinks('relative group transition-colors duration-300')}
        </nav>

        <ListenNow />

        <div className="md:flex lg:hidden items-center">
          <button onClick={() => setDrawerOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0" onClick={() => setDrawerOpen(false)} />

        <div className="fixed top-0 right-0 h-screen w-3/4 md:w-1/2 bg-orange-400/50 backdrop-blur-md shadow-lg flex flex-col p-6 gap-6">
          <button className="self-end" onClick={() => setDrawerOpen(false)}>
            <X size={24} />
          </button>
          {renderNavLinks('font-serif text-lg transition-colors duration-300', () =>
            setDrawerOpen(false),
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
