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
              isActive ? 'text-[#F9B855]' : 'text-white'
            } hover:text-[#F9B855] relative group`}
          >
            {item.label}
            {!onClick && (
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-[#F9B855] transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            )}
          </Link>
        )
      }),
    [pathname],
  )

  const currentNav = navLinks.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/'),
  )

  const showSubMenu = currentNav?.subMenu
  const isAbout = pathname === '/about-us'

  const bgClass = scrolled
    ? isAbout
      ? 'bg-blue-700/95 backdrop-blur-sm shadow-md'
      : 'bg-amber-800/95 backdrop-blur-sm shadow-md'
    : 'bg-transparent'

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 h-auto transition-all duration-500 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        } ${bgClass}`}
      >
        <div className="max-w-8xl container px-6 pt-20 pb-14  lg:pb-12 lg:px-12 mx-auto flex items-center justify-between text-white h-16">
          <HeaderLogo />

          <nav className="hidden lg:flex items-center gap-6 font-serif text-sm">
            {renderNavLinks('transition-colors duration-200 tracking-wide')}
          </nav>

          <div className="hidden lg:block">
            <ListenNow />
          </div>

          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {showSubMenu && (
          <div className="py-8 pb-10 hidden lg:block">
            <div className="flex justify-center px-6 lg:px-12 relative bottom-10">
              <div className="flex flex-wrap pb-5 justify-center gap-1 max-w-5xl">
                {showSubMenu.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`relative shrink-0 px-3 py-1 rounded-md text-sm font-serif tracking-wide transition-all duration-200 ${
                        isActive
                          ? 'text-[#F9B855]  shadow-md border border-white/20 hover:bg-white/20'
                          : 'text-white shadow-2xl hover:shadow-md  hover:text-[#F9B855] bg-white/20 '
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setDrawerOpen(false)} />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-xs z-50 transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        } bg-amber-900/95 backdrop-blur-lg shadow-2xl flex flex-col`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white font-serif text-base font-semibold tracking-wide">Menu</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-0.5">
          {renderNavLinks(
            'block px-3 py-2.5 rounded-lg font-serif text-sm tracking-wide transition-all duration-150 hover:bg-white/10',
            () => setDrawerOpen(false),
          )}

          {showSubMenu && (
            <div className=" border-t border-white/10">
              <p className="px-3 pb-1 text-[12px] uppercase tracking-widest text-white/40 font-sans">
                {currentNav?.label}
              </p>
              <div className="flex flex-wrap justify-center gap-0.5">
                {showSubMenu.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`shrink-0 px-3 py-2 rounded-lg font-serif text-sm tracking-wide transition-all duration-150 ${
                        isActive
                          ? 'text-[#F9B855] bg-white/10'
                          : 'text-white/65 hover:text-[#F9B855] hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </nav>

        <div className="p-5 border-t border-white/10">
          <ListenNow />
        </div>
      </div>
    </>
  )
}

export default Header
