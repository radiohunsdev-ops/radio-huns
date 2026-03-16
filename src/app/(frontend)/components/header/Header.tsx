'use client'
import { usePathname } from 'next/navigation'
import HeaderLogo from './HeaderLogo'
import Link from 'next/link'
import { navLinks } from '../../lib'
import ListenNow from './ListenNow'

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="relative z-10 max-w-8xl container px-15 mx-auto py-6 flex items-center justify-between text-white">
      <HeaderLogo />

      <nav className="hidden lg:flex items-center gap-4 font-serif text-md">
        {navLinks.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative group transition-colors duration-300
                ${isActive ? 'text-[#F9B855]' : 'text-white'}
                hover:text-[#F9B855]
              `}
            >
              {item.label}

              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-orange-300 transition-all duration-300
                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                `}
              />
            </Link>
          )
        })}
      </nav>
      <ListenNow />
    </header>
  )
}

export default Header
