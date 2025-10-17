import { Github, Linkedin, Coffee, Code, Cloud, Gamepad2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Coral */}
      <section className="bg-[#ED727E] p-8 md:p-16 m-6 md:m-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
            {/* Text Content */}
            <div className="flex flex-col gap-4">
              <h1 className="text-7xl md:text-9xl font-anton uppercase text-white leading-tight">
                Mohamed
                <br />
                Omar
              </h1>
              <p className="text-2xl md:text-3xl font-bebas-neue text-white tracking-wide">
                Senior Software Developer
              </p>
            </div>
            {/* Photo - Bento Style */}
            <div className="relative aspect-square md:aspect-[3/4]">
              <Image
                src="/me.jpeg"
                alt="Mohamed Omar - Senior Software Developer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Yellow */}
      <section className="bg-[#F9D871] p-8 md:p-16 m-6 md:m-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-archivo-black uppercase text-gray-900 mb-6">
            About
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xl md:text-2xl font-sans text-gray-800 leading-relaxed">
                I'm a Senior Cloud Engineer at PwC UK, specializing in building
                enterprise React applications and architecting cloud
                infrastructure. I love creating scalable solutions with modern
                technologies.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Coffee className="w-8 h-8" />
                <span className="text-xl font-bebas-neue tracking-wide">
                  Coffee Enthusiast
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-8 h-8" />
                <span className="text-xl font-bebas-neue tracking-wide">
                  Gaming & Anime Fan
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="w-8 h-8" />
                <span className="text-xl font-bebas-neue tracking-wide">
                  Tech Tinkerer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Peach */}
      <section className="bg-[#F0916F] p-8 md:p-16 m-6 md:m-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-archivo-black uppercase text-white mb-8">
            Experience
          </h2>
          <div className="space-y-8">
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-3xl font-bebas-neue tracking-wide text-white">
                Senior Cloud Engineer
              </h3>
              <p className="text-xl font-bebas-neue text-white/80">
                PwC UK • 2024-2025
              </p>
              <ul className="mt-3 space-y-2 text-lg text-white/90">
                <li>
                  • Led development of enterprise React applications for AI
                  tools
                </li>
                <li>• Set engineering standards for secure API integration</li>
              </ul>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-3xl font-bebas-neue tracking-wide text-white">
                Cloud Engineer
              </h3>
              <p className="text-xl font-bebas-neue text-white/80">
                PwC UK • 2023-2024
              </p>
              <ul className="mt-3 space-y-2 text-lg text-white/90">
                <li>• Architected infrastructure with Terraform</li>
                <li>• Migrated 10+ services to Azure with Kubernetes</li>
              </ul>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-3xl font-bebas-neue tracking-wide text-white">
                Integration Engineer
              </h3>
              <p className="text-xl font-bebas-neue text-white/80">
                OGL Computer • 2021-2022
              </p>
              <ul className="mt-3 space-y-2 text-lg text-white/90">
                <li>
                  • Led architectural decisions for Java Spring Boot
                  microservices
                </li>
                <li>• Built CRM integrations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Blue */}
      <section className="bg-[#395D76] p-8 md:p-16 m-6 md:m-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-archivo-black uppercase text-white mb-8">
            Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bebas-neue tracking-wide text-white mb-4">
                Languages
              </h3>
              <ul className="space-y-2 text-lg text-white/90">
                <li>• JavaScript</li>
                <li>• TypeScript</li>
                <li>• Java</li>
                <li>• Python</li>
              </ul>
            </div>
            <div>
              <h3 className="text-3xl font-bebas-neue tracking-wide text-white mb-4">
                Frameworks
              </h3>
              <ul className="space-y-2 text-lg text-white/90">
                <li>• React</li>
                <li>• Node.js</li>
                <li>• Spring Boot</li>
                <li>• TanStack</li>
              </ul>
            </div>
            <div>
              <h3 className="text-3xl font-bebas-neue tracking-wide text-white mb-4">
                Tools
              </h3>
              <ul className="space-y-2 text-lg text-white/90">
                <li>• Docker</li>
                <li>• Kubernetes</li>
                <li>• AWS</li>
                <li>• Terraform</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Coral */}
      <section className="bg-[#ED727E] p-8 md:p-16 m-6 md:m-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-archivo-black uppercase text-white mb-8">
            Let's Connect
          </h2>
          <div className="flex gap-6">
            <a
              href="https://github.com/redomar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white px-6 py-3 hover:bg-white/90 transition-colors"
            >
              <Github className="w-6 h-6" />
              <span className="text-xl font-bebas-neue tracking-wide">
                GitHub
              </span>
            </a>
            <a
              href="https://linkedin.com/in/redomar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white px-6 py-3 hover:bg-white/90 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
              <span className="text-xl font-bebas-neue tracking-wide">
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
