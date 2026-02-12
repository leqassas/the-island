export interface ShowcaseProject {
  title: string
  description: string
  tech: string[]
  url: string
  color: string
  icon: string
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    title: 'THE EYE',
    description:
      'An interactive oracle. An SVG eye that tracks your cursor with physics-based lerp movement, blinks autonomously every 3-7 seconds, breathes organically via sine waves, has micro-jitter movements, and gets irritated if you stare too long. Delivers daily AI-generated insights.',
    tech: ['React', 'SVG', 'GSAP', 'Gemini AI'],
    url: 'https://the-eye-five.vercel.app',
    color: '#8b5cf6',
    icon: '👁️',
  },
  {
    title: 'Mechanical Keyboard',
    description:
      'A 3D interactive mechanical keyboard with spring physics (react-spring), realistic click-down/click-up sounds, random wobble on key press, and a built-in terminal with AI chat. Each key has glossy/matte textures, specular highlights, and ambient occlusion.',
    tech: ['React', '@react-spring/web', 'Web Audio'],
    url: 'https://mechanical-keyboard-nine.vercel.app',
    color: '#06b6d4',
    icon: '⌨️',
  },
  {
    title: "Founder's Forge",
    description:
      'A startup learning platform featuring modular framework cards, AI-powered chat, real-time market pulse analytics, and a rocket loader splash screen. Custom cursor with physics-based trailing hue effect using Framer Motion springs.',
    tech: ['React', 'Framer Motion', 'AI Integration'],
    url: 'https://founders-forge.vercel.app',
    color: '#f59e0b',
    icon: '🚀',
  },
  {
    title: 'Maison',
    description:
      'A luxury restaurant website with elegant design, custom hooks, component architecture, and data-driven content management. Built with attention to culinary aesthetics and user experience.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    url: 'https://maison-three.vercel.app',
    color: '#14b8a6',
    icon: '🍽️',
  },
  {
    title: 'Amr Elkhelawy',
    description:
      'A music composer portfolio for film scoring, game audio, and sonic branding. Features an interactive audio player with tracks across genres (thriller, melancholic, hope, mystery), Spotify embeds for discography, and a philosophy section about subconscious narrative in music.',
    tech: ['React', 'Web Audio', 'Spotify Embed API'],
    url: 'https://amr-elkhelawy.vercel.app',
    color: '#ec4899',
    icon: '🎵',
  },
  {
    title: 'Connectome',
    description:
      'A brain neural network simulation with 800 neurons rendered in 3D WebGL. Features bloom post-processing, orbit controls, neuron type classification (pyramidal, interneuron, sensory), adjustable excitation levels, simulation speed control, and burst signals.',
    tech: ['React Three Fiber', '@react-three/drei', 'Three.js', 'Post-processing'],
    url: 'https://connectome-sigma.vercel.app',
    color: '#6366f1',
    icon: '🧠',
  },
]

export const experimentProjects: ShowcaseProject[] = [
  {
    title: 'Particle Physics',
    description: 'Interactive particle system with gravitational forces and collision detection.',
    tech: ['Canvas', 'Physics'],
    url: '#',
    color: '#6366f1',
    icon: '⚛️',
  },
  {
    title: 'Generative Patterns',
    description: 'Algorithmically generated patterns using recursive functions and noise.',
    tech: ['P5.js', 'Algorithms'],
    url: '#',
    color: '#8b5cf6',
    icon: '🔮',
  },
  {
    title: 'Audio Visualizer',
    description: 'Real-time audio visualization with frequency analysis and dynamic graphics.',
    tech: ['Web Audio API', 'Canvas'],
    url: '#',
    color: '#06b6d4',
    icon: '🎧',
  },
]
