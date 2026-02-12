import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const inspirations = [
    { name: 'Creative Coding', href: '#' },
    { name: 'Generative Art', href: '#' },
    { name: 'WebGL', href: '#' },
    { name: 'Three.js', href: '#' },
  ]

  const social = [
    { name: 'GitHub', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'LinkedIn', href: '#' },
  ]

  return (
    <footer className="relative mt-20 border-t border-white/5">
      <div className="gradient-line absolute top-0 left-0 right-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4 text-gradient">
              The Island
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              A showcase of creative works at the intersection of technology and art.
              Exploring the boundaries of what&apos;s possible on the web.
            </p>
          </div>

          {/* Inspirations */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-text-primary">
              Inspirations
            </h4>
            <ul className="space-y-2">
              {inspirations.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-accent-indigo text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 text-text-primary">
              Connect
            </h4>
            <ul className="space-y-2">
              {social.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-accent-indigo text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-text-secondary">
          <p>© {currentYear} The Island. Built on The Island.</p>
          <p className="mt-2 md:mt-0">
            Where technology meets art.
          </p>
        </div>
      </div>
    </footer>
  )
}
