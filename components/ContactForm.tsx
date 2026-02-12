'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <form
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST"
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-8 max-w-2xl mx-auto"
    >
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-heading font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-indigo transition-colors text-text-primary placeholder-text-secondary/50"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-heading font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-indigo transition-colors text-text-primary placeholder-text-secondary/50"
            placeholder="your@email.com"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-heading font-semibold mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-indigo transition-colors text-text-primary placeholder-text-secondary/50"
            placeholder="What's this about?"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-heading font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-indigo transition-colors text-text-primary placeholder-text-secondary/50 resize-none"
            placeholder="Tell me about your project or idea..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-gradient-to-r from-accent-indigo to-accent-violet rounded-lg font-heading font-bold text-white hover:shadow-lg hover:shadow-accent-indigo/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : isSubmitted ? 'Sent! ✓' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
