import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Coffee,
  Code2,
  Gamepad2,
  Sparkles,
  Mail,
  Linkedin,
  Briefcase,
  Award,
  Heart,
  Tv,
  BookOpen,
  Zap,
  Database,
  Cloud,
  Terminal,
  GitBranch,
} from 'lucide-react'
import { Typewriter } from '../components/Typewriter'
import { RotatingSubtitle } from '../components/RotatingSubtitle'
import { ProjectCard } from '../components/ProjectCard'
import { fetchPinnedRepos, fetchRepoStats, type GitHubRepo } from '../lib/github'
import { useScrollAnimation } from '../lib/useScrollAnimation'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

function Portfolio() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [repoStats, setRepoStats] = useState<Record<string, number>>({})
  const [isVisible, setIsVisible] = useState(false)

  const skillsSection = useScrollAnimation(0.1)
  const projectsSection = useScrollAnimation(0.1)
  const experienceSection = useScrollAnimation(0.1)
  const hobbiesSection = useScrollAnimation(0.1)
  const aboutSection = useScrollAnimation(0.1)
  const contactSection = useScrollAnimation(0.1)

  useEffect(() => {
    setIsVisible(true)

    // Fetch GitHub repos
    fetchPinnedRepos('redomar').then((fetchedRepos) => {
      setRepos(fetchedRepos)

      // Fetch stats for each repo
      fetchedRepos.forEach(async (repo) => {
        const stats = await fetchRepoStats('redomar', repo.name)
        setRepoStats((prev) => ({ ...prev, [repo.name]: stats.commits }))
      })
    })
  }, [])

  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Swirly gradient overlays */}
      <div className="fixed inset-0 swirly-gradient-1 pointer-events-none" />
      <div className="fixed inset-0 swirly-gradient-2 pointer-events-none" />
      <div className="fixed inset-0 swirly-gradient-3 pointer-events-none" />
      <div className="fixed inset-0 swirly-gradient-4 pointer-events-none" />

      {/* Main content container with side margins */}
      <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center py-20 overflow-hidden">
          {/* Decorative floating elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-pastel-orange/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pastel-lavender/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-40 right-20 w-24 h-24 bg-pastel-red/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          <div className="relative w-full max-w-4xl mx-auto text-center z-10">
            <div className="mb-8 inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-pastel-orange to-pastel-purple p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=400&fit=crop&q=80"
                    alt="Developer"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-foreground drop-shadow-lg title-font">
              Mohamed Omar
            </h1>

            <div className="text-2xl md:text-3xl text-foreground/90 mb-10 min-h-[120px] leading-relaxed font-medium">
              <RotatingSubtitle />
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-base text-foreground/80">
              <span className="flex items-center gap-2 px-5 py-3 backdrop-blur-sm bg-white/50 border-2 border-pastel-orange/40 hover:scale-105 transition-transform shadow-lg">
                <Coffee className="w-6 h-6 text-pastel-orange" />
                <span className="font-semibold">Coffee Lover</span>
              </span>
              <span className="flex items-center gap-2 px-5 py-3 backdrop-blur-sm bg-white/50 border-2 border-pastel-purple/40 hover:scale-105 transition-transform shadow-lg">
                <Code2 className="w-6 h-6 text-pastel-purple" />
                <span className="font-semibold">JS/TS Enthusiast</span>
              </span>
              <span className="flex items-center gap-2 px-5 py-3 backdrop-blur-sm bg-white/50 border-2 border-pastel-lavender/40 hover:scale-105 transition-transform shadow-lg">
                <Gamepad2 className="w-6 h-6 text-pastel-lavender" />
                <span className="font-semibold">Gamer & Tinkerer</span>
              </span>
              <span className="flex items-center gap-2 px-5 py-3 backdrop-blur-sm bg-white/50 border-2 border-pastel-red/40 hover:scale-105 transition-transform shadow-lg">
                <Sparkles className="w-6 h-6 text-pastel-red" />
                <span className="font-semibold">Eternal Learner</span>
              </span>
            </div>
          </div>
        </section>

        {/* Skills & Tech Stack Section */}
        <section
          ref={skillsSection.ref as any}
          className={`py-20 transition-all duration-1000 relative z-10 ${
            skillsSection.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="backdrop-blur-md bg-gradient-to-br from-pastel-lavender/40 to-pastel-purple/40 border border-pastel-lavender/50 p-10 md:p-14 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 drop-shadow-sm text-center">
              Tech Stack & Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="w-8 h-8 text-pastel-purple" />
                  <h3 className="text-2xl font-bold text-foreground">Languages</h3>
                </div>
                <div className="space-y-3">
                  {['JavaScript', 'TypeScript', 'Java', 'Python', 'HTML/CSS'].map((lang) => (
                    <div key={lang} className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm border border-pastel-purple/30">
                      <Terminal className="w-5 h-5 text-pastel-purple" />
                      <span className="text-lg">{lang}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-pastel-orange" />
                  <h3 className="text-2xl font-bold text-foreground">Frameworks</h3>
                </div>
                <div className="space-y-3">
                  {['React', 'Node.js', 'Express', 'Spring Boot', 'TanStack'].map((fw) => (
                    <div key={fw} className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm border border-pastel-orange/30">
                      <Sparkles className="w-5 h-5 text-pastel-orange" />
                      <span className="text-lg">{fw}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Cloud className="w-8 h-8 text-pastel-lavender" />
                  <h3 className="text-2xl font-bold text-foreground">Tools & More</h3>
                </div>
                <div className="space-y-3">
                  {['Git', 'Docker', 'AWS', 'Kubernetes', 'CI/CD'].map((tool) => (
                    <div key={tool} className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm border border-pastel-lavender/30">
                      <GitBranch className="w-5 h-5 text-pastel-lavender" />
                      <span className="text-lg">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={projectsSection.ref as any}
          className={`py-16 transition-all duration-1000 relative z-10 ${
            projectsSection.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 drop-shadow-sm">
              Featured Projects
            </h2>
            <p className="text-lg text-foreground/80">
              <Typewriter
                text="A collection of things I've built while learning, exploring, and getting distracted by shiny new technologies."
                delay={15}
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo, index) => (
              <div
                key={repo.name}
                className="transition-all duration-500"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  opacity: projectsSection.isVisible ? 1 : 0,
                  transform: projectsSection.isVisible
                    ? 'translateY(0)'
                    : 'translateY(20px)',
                }}
              >
                <ProjectCard repo={repo} commits={repoStats[repo.name]} />
              </div>
            ))}
          </div>

          {repos.length === 0 && (
            <div className="text-center py-12 text-foreground/70">
              <Typewriter text="Loading projects from GitHub..." delay={30} />
            </div>
          )}
        </section>

        {/* Experience Timeline Section */}
        <section
          ref={experienceSection.ref as any}
          className={`py-20 transition-all duration-1000 relative z-10 ${
            experienceSection.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="backdrop-blur-md bg-gradient-to-br from-pastel-orange/40 to-pastel-red/40 border border-pastel-orange/50 p-10 md:p-14 shadow-2xl">
            <div className="flex items-center justify-center gap-4 mb-10">
              <Briefcase className="w-10 h-10 text-foreground" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground drop-shadow-sm">
                Experience Journey
              </h2>
            </div>

            <div className="space-y-8">
              {[
                {
                  role: 'Senior Cloud Engineer',
                  company: 'PwC UK',
                  period: '2024 - 2025',
                  desc: 'Led development of enterprise React applications for AI tools. Set engineering standards for secure API integration.',
                },
                {
                  role: 'Cloud Engineer',
                  company: 'PwC UK',
                  period: '2023 - 2024',
                  desc: 'Architected infrastructure with Terraform. Migrated 10+ services to Azure with Kubernetes.',
                },
                {
                  role: 'Integration Engineer',
                  company: 'OGL Computer',
                  period: '2021 - 2022',
                  desc: 'Led architectural decisions for Java Spring Boot microservices. Built robust CRM integrations.',
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-6 bg-white/50 backdrop-blur-sm border-l-4 border-pastel-orange hover:scale-[1.02] transition-transform"
                >
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="text-sm font-bold text-foreground/70">{job.period}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{job.role}</h3>
                    <p className="text-lg text-pastel-orange font-semibold mb-2">{job.company}</p>
                    <p className="text-base text-foreground/80 leading-relaxed">{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hobbies & Interests Section */}
        <section
          ref={hobbiesSection.ref as any}
          className={`py-20 transition-all duration-1000 relative z-10 ${
            hobbiesSection.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="backdrop-blur-md bg-gradient-to-br from-pastel-red/40 to-pastel-lavender/40 border border-pastel-red/50 p-10 md:p-14 shadow-2xl">
            <div className="flex items-center justify-center gap-4 mb-10">
              <Heart className="w-10 h-10 text-foreground" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground drop-shadow-sm">
                Beyond Code
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/50 backdrop-blur-sm border border-pastel-red/30 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3 mb-4">
                  <Gamepad2 className="w-8 h-8 text-pastel-red" />
                  <h3 className="text-2xl font-bold text-foreground">Gaming</h3>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  From strategy games to RPGs, I love exploring virtual worlds and solving complex challenges. Gaming inspires my problem-solving approach to code.
                </p>
              </div>

              <div className="p-8 bg-white/50 backdrop-blur-sm border border-pastel-lavender/30 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3 mb-4">
                  <Tv className="w-8 h-8 text-pastel-lavender" />
                  <h3 className="text-2xl font-bold text-foreground">Anime</h3>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  A huge fan of anime and manga. I appreciate the storytelling, art, and the way anime explores complex themes and character development.
                </p>
              </div>

              <div className="p-8 bg-white/50 backdrop-blur-sm border border-pastel-orange/30 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3 mb-4">
                  <Coffee className="w-8 h-8 text-pastel-orange" />
                  <h3 className="text-2xl font-bold text-foreground">Coffee Connoisseur</h3>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Coffee isn't just a drink, it's fuel for creativity. I'm always experimenting with different brewing methods and beans from around the world.
                </p>
              </div>

              <div className="p-8 bg-white/50 backdrop-blur-sm border border-pastel-purple/30 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-pastel-purple" />
                  <h3 className="text-2xl font-bold text-foreground">Tinkering</h3>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  I love taking things apart (physically and digitally) to understand how they work. Always experimenting with new tools, setups, and configurations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section with Image */}
        <section
          ref={aboutSection.ref as any}
          className={`py-20 transition-all duration-1000 relative z-10 ${
            aboutSection.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="backdrop-blur-md bg-gradient-to-br from-pastel-purple/40 to-pastel-lavender/40 border border-pastel-purple/50 p-10 md:p-12 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 drop-shadow-sm">
                About Me
              </h2>

              <div className="space-y-5 text-lg text-foreground/85 leading-relaxed">
                <p>
                  I'm a programmer who loves building things with JavaScript and TypeScript. My journey started with a game engine written in pure Java (check out redomar/javagame), and I've been hooked on creating software ever since.
                </p>

                <p>
                  When I'm not coding, you'll find me gaming, watching anime, or tinkering with my setup. I'm the kind of person who starts a project, gets sidetracked optimizing configurations, then discovers another shiny idea. One day I'll finish them all... probably.
                </p>

                <p>
                  I'm ambitious, nerdy, and always learning. Whether it's exploring new frameworks, diving into system architecture, or perfecting my development environment, I'm constantly pushing myself to grow.
                </p>
              </div>
            </div>

            <div className="relative h-full min-h-[400px] overflow-hidden border border-pastel-lavender/50 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80"
                alt="Coding workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pastel-purple/60 to-transparent" />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactSection.ref as any}
          className={`py-20 transition-all duration-1000 relative z-10 ${
            contactSection.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="backdrop-blur-md bg-gradient-to-br from-pastel-orange/40 to-pastel-red/40 border border-pastel-orange/50 p-10 md:p-14 shadow-2xl">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Mail className="w-10 h-10 text-foreground" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground drop-shadow-sm">
                Let's Connect
              </h2>
            </div>

            <p className="text-xl text-foreground/85 mb-10 leading-relaxed text-center max-w-2xl mx-auto">
              Have a project in mind? Want to collaborate? Or just want to chat about tech, coffee, or the latest anime?
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-base font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 text-base bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 text-base bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 text-base bg-input border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors resize-none"
                  placeholder="What's on your mind?"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 text-base bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send Message (Coming Soon)
              </button>
            </form>

            <div className="mt-10 pt-10 border-t-2 border-pastel-orange/40">
              <p className="text-xl text-foreground/85 mb-6 text-center font-semibold">
                Or connect with me on:
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="https://linkedin.com/in/redomar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-sm border-2 border-pastel-lavender/40 hover:scale-105 transition-transform shadow-lg text-lg font-semibold"
                >
                  <Linkedin className="w-6 h-6 text-pastel-lavender" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/redomar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-sm border-2 border-pastel-purple/40 hover:scale-105 transition-transform shadow-lg text-lg font-semibold"
                >
                  <GitBranch className="w-6 h-6 text-pastel-purple" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-12 text-center border-t-2 border-pastel-lavender/30">
          <p className="text-lg text-foreground/80 font-medium mb-2">
            © 2025 Mohamed Omar
          </p>
          <p className="text-base text-foreground/60">
            Built with React, TypeScript, and lots of coffee ☕
          </p>
        </footer>
      </div>
    </div>
  )
}
