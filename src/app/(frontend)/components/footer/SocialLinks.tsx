import { Instagram, Twitter, Facebook } from 'lucide-react'

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: Facebook,
  },
]

export default function SocialLinks() {
  return (
    <div className="flex gap-4 mt-5">
      {socialLinks.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="w-10 h-10 rounded-full border border-current
                     flex items-center justify-center
                     transition hover:bg-[#F6F1E7] hover:text-[#E55322]"
        >
          <Icon size={18} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  )
}
