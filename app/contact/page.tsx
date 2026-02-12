import ContactForm from '@/components/ContactForm'
import ScrollReveal from '@/components/ScrollReveal'

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Get in Touch
            </h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto">
              Have a project idea? Want to collaborate? Or just want to say hi?
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <ContactForm />
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-text-secondary mb-4">Or find me on</p>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="text-text-secondary hover:text-accent-indigo transition-colors"
              >
                GitHub
              </a>
              <span className="text-text-secondary">•</span>
              <a
                href="#"
                className="text-text-secondary hover:text-accent-indigo transition-colors"
              >
                Twitter
              </a>
              <span className="text-text-secondary">•</span>
              <a
                href="#"
                className="text-text-secondary hover:text-accent-indigo transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="mt-20 glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="font-heading text-xl font-bold mb-4 text-center">
              About Collaborations
            </h2>
            <p className="text-text-secondary text-center">
              I&apos;m always interested in creative projects that push boundaries, especially those
              at the intersection of technology and art. Whether it&apos;s interactive experiences,
              generative systems, or experimental interfaces—let&apos;s build something remarkable
              together.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  )
}
