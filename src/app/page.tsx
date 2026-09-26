"use client";

import {
  Github,
  Linkedin,
  Coffee,
  Code,
  Cloud,
  Gamepad2,
  Sparkles,
  Zap,
  Computer,
  Funnel,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProjectCard } from "@/components/project-card";

function TypewriterText({
  text,
  speed = 100,
  wordDisplayTime = 2000,
  className = "",
}: {
  text: string;
  speed?: number;
  wordDisplayTime?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [currentWord, setCurrentWord] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstWord, setIsFirstWord] = useState(true);

  const words = useState(() =>
    text.split(/[,\s]+/).filter((word) => word.length > 0)
  )[0];

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  useEffect(() => {
    const startNewWord = () => {
      let newWord;
      if (isFirstWord) {
        // Always show first word initially
        newWord = words[0];
        setIsFirstWord(false);
      } else {
        // Random word for subsequent iterations
        newWord = getRandomWord();
      }
      setCurrentWord(newWord);
      setDisplayText("");
      setCurrentIndex(0);
      setIsTyping(true);
    };

    // Start with first word
    if (!currentWord) {
      startNewWord();
      return;
    }

    if (isTyping && currentIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentWord[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (isTyping && currentIndex >= currentWord.length) {
      setIsTyping(false);
    } else if (!isTyping && currentWord) {
      // Wait before showing next word (only after typing is complete)
      const timeout = setTimeout(() => {
        startNewWord();
      }, wordDisplayTime);
      return () => clearTimeout(timeout);
    }
  }, [
    currentIndex,
    currentWord,
    isTyping,
    speed,
    wordDisplayTime,
    isFirstWord,
  ]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span
        className={`inline-block ml-1 text-[#00d4ff] ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
      >
        ▁
      </span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9F7F3] dark:bg-[#0d0d10] relative overflow-hidden transition-colors duration-300">
      <ThemeToggle />
      {/* Flowing decorative lines */}
      <div
        className="flowing-line top-[20%] text-[#ff0080] opacity-60"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="flowing-line top-[40%] text-[#00d4ff] opacity-60"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="flowing-line top-[60%] text-[#00ff88] opacity-60"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Hero Section - Bento Grid */}
      <section className="p-4 md:p-8 max-w-[1600px] mx-auto">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[200px]">
          {/* Main Hero Card - Large */}
          <div className="md:col-span-8 md:row-span-3 bg-white dark:bg-[#1a1a1f] relative overflow-hidden vhs-scanlines retro-border transition-colors duration-300">
            <div className="absolute inset-0 holographic-gradient opacity-20"></div>
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div className="lens-flare">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-anton uppercase text-[#1a1a1f] dark:text-white leading-[0.9] tracking-tight transition-colors duration-300">
                  Mohamed Omar
                </h1>
                <div className="mt-2 text-xl md:text-2xl font-bebas-neue text-[#1a1a1f]/70 dark:text-white/80 tracking-[0.3em] transition-colors duration-300">
                  https://Redomar.co.uk
                </div>
              </div>
              <div className="mt-8">
                <h2
                  className="text-4xl md:text-6xl font-bebas-neue tracking-wide"
                  style={{
                    background:
                      "linear-gradient(90deg, #ff0080, #00d4ff, #00ff88)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  SENIOR SOFTWARE DEVELOPER
                </h2>
                <h3 className="text-xl md:text-md font-anton uppercase text-[#1a1a1f] dark:text-white mb-2 tracking-widest transition-colors duration-300">
                  Experianced in Cloud Solutions & React Applications
                </h3>
              </div>
            </div>
          </div>

          {/* Photo Card */}
          <div className="md:col-span-4 md:row-span-3 hover:bg-gradient-to-br from-[#ff0080]/50 to-[#00d4ff]/50 relative overflow-hidden vhs-scanlines retro-border p-6 md:p-8">
            {/* Unsplash retro computer image */}
            <div className="absolute inset-0 opacity-60">
              <Image
                src="/outlook.jpeg"
                alt="Mohamed Omar"
                fill
                className="object-cover"
                style={{ objectPosition: "87% center" }}
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
            <div className="absolute top-4 right-4 z-20 bg-black/80 px-6 py-3 font-mono text-white tracking-wider border-2 border-[#00d4ff] min-w-[50px]">
              <TypewriterText
                text="Programmer, Photographer, Adventurer, Scripter, Gamer, Muslim, Reader, Bot_Laner"
                speed={100}
                wordDisplayTime={3000}
                className="text-sm font-bold"
              />
            </div>
          </div>

          {/* About Card - Wide */}
          <div className="md:col-span-7 md:row-span-2 bg-white dark:bg-[#1a1a1f] relative overflow-hidden retro-border p-6 md:p-8 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff0080]/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-anton uppercase text-[#1a1a1f] dark:text-white mb-4 tracking-tight transition-colors duration-300">
                ABOUT
              </h2>
              <div className="h-1 w-32 holographic-gradient mb-6"></div>
              <p className="text-lg md:text-xl text-[#1a1a1f]/90 dark:text-white/90 leading-relaxed font-sans mb-6 transition-colors duration-300">
                I'm a Senior Cloud Engineer at PwC UK, specializing in building
                enterprise React applications and architecting cloud
                infrastructure. I love creating scalable solutions with modern
                technologies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-[#1a1a1f]/5 dark:bg-white/5 p-3 border border-[#00d4ff]/30 transition-colors duration-300">
                  <Coffee className="w-6 h-6 text-[#00d4ff]" />
                  <span className="text-sm font-bebas-neue tracking-wide text-[#1a1a1f] dark:text-white transition-colors duration-300">
                    COFFEE ENTHUSIAST
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-[#1a1a1f]/5 dark:bg-white/5 p-3 border border-[#ff0080]/30 transition-colors duration-300">
                  <Gamepad2 className="w-6 h-6 text-[#ff0080]" />
                  <span className="text-sm font-bebas-neue tracking-wide text-[#1a1a1f] dark:text-white transition-colors duration-300">
                    GAMING & ANIME
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-[#1a1a1f]/5 dark:bg-white/5 p-3 border border-[#00ff88]/30 transition-colors duration-300">
                  <Code className="w-6 h-6 text-[#00ff88]" />
                  <span className="text-sm font-bebas-neue tracking-wide text-[#1a1a1f] dark:text-white transition-colors duration-300">
                    TECH TINKERER
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Tech Card */}
          <div className="md:col-span-5 md:row-span-2 bg-gradient-to-br from-[#00d4ff] to-[#b200ff] relative overflow-hidden vhs-scanlines p-6 md:p-8">
            {/* Unsplash retro computer image */}
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
                alt="Retro tech aesthetic"
                fill
                className="object-cover mix-blend-overlay"
                unoptimized
              />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="text-xs font-bebas-neue tracking-[0.3em] text-white/80 mb-2">
                  DIGITAL INNOVATION
                </div>
                <h3 className="text-5xl md:text-7xl font-anton uppercase text-white leading-tight mb-4">
                  CLOUD
                  <br />
                  ARCHITECT
                </h3>
              </div>
              <div className="flex gap-4">
                <Cloud className="w-16 h-16 text-white/20" />
                <Sparkles className="w-16 h-16 text-white/20" />
                <Zap className="w-16 h-16 text-white/20" />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border-4 border-white/20 rounded-full"></div>
          </div>

          {/* Experience Cards */}
          <div className="md:col-span-4 md:row-span-2 bg-white dark:bg-[#1a1a1f] relative overflow-hidden retro-border p-6 transition-colors duration-300">
            <div className="absolute inset-0 holographic-gradient-alt opacity-5"></div>
            <div className="relative z-10">
              <div className="text-xs font-bebas-neue tracking-[0.3em] text-[#ff0080] mb-2">
                2024-2025
              </div>
              <h3 className="text-2xl md:text-3xl font-anton uppercase text-[#1a1a1f] dark:text-white mb-2 transition-colors duration-300">
                Senior Cloud Engineer
              </h3>
              <p className="text-sm font-bebas-neue text-[#1a1a1f]/60 dark:text-white/60 mb-4 transition-colors duration-300">
                PWC UK
              </p>
              <ul className="space-y-2 text-sm text-[#1a1a1f]/80 dark:text-white/80 transition-colors duration-300">
                <li>→ Led development of enterprise React applications</li>
                <li>→ Set engineering standards for secure API integration</li>
              </ul>
            </div>
            <div className="absolute bottom-4 right-4 w-20 h-20">
              <Cloud className="size-20 text-[#ff0080]/30" />
            </div>
          </div>

          <div className="md:col-span-4 md:row-span-2 bg-white dark:bg-[#1a1a1f] relative overflow-hidden retro-border p-6 transition-colors duration-300">
            <div className="absolute inset-0 holographic-gradient opacity-5"></div>
            <div className="relative z-10">
              <div className="text-xs font-bebas-neue tracking-[0.3em] text-[#00d4ff] mb-2">
                2023-2024
              </div>
              <h3 className="text-2xl md:text-3xl font-anton uppercase text-[#1a1a1f] dark:text-white mb-2 transition-colors duration-300">
                Software Engineer Consultant
              </h3>
              <p className="text-sm font-bebas-neue text-[#1a1a1f]/60 dark:text-white/60 mb-4 transition-colors duration-300">
                PWC UK
              </p>
              <ul className="space-y-2 text-sm text-[#1a1a1f]/80 dark:text-white/80 transition-colors duration-300">
                <li>→ Integrated ServiceNow with GitHub and cloud platforms</li>
                <li>→ Migrated services to Azure with Kubernetes</li>
              </ul>
            </div>
            <div className="absolute bottom-4 right-4 w-20 h-20">
              <Zap className="size-20 text-[#00d4ff]/30" />
            </div>
          </div>

          <div className="md:col-span-4 md:row-span-2 bg-white dark:bg-[#1a1a1f] relative overflow-hidden retro-border p-6 transition-colors duration-300">
            <div className="absolute inset-0 holographic-gradient-alt opacity-5"></div>
            <div className="relative z-10">
              <div className="text-xs font-bebas-neue tracking-[0.3em] text-[#00ff88] mb-2">
                2021-2022
              </div>
              <h3 className="text-2xl md:text-3xl font-anton uppercase text-[#1a1a1f] dark:text-white mb-2 transition-colors duration-300">
                Integration Engineer
              </h3>
              <p className="text-sm font-bebas-neue text-[#1a1a1f]/60 dark:text-white/60 mb-4 transition-colors duration-300">
                OGL COMPUTER
              </p>
              <ul className="space-y-2 text-sm text-[#1a1a1f]/80 dark:text-white/80 transition-colors duration-300">
                <li>
                  → Led architectural decisions for Spring Boot microservices
                </li>
                <li>→ Built CRM integrations</li>
              </ul>
            </div>
            <div className="absolute bottom-4 right-4 w-20 h-20">
              <Computer className="size-20 text-[#00ff88]/30" />
            </div>
          </div>

          {/* Skills Section - Magazine Style */}
          <div className="md:col-span-12 md:row-span-2 bg-white dark:bg-[#1a1a1f] relative overflow-hidden retro-border p-6 md:p-8 transition-colors duration-300">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff0080] rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00d4ff] rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-anton uppercase text-[#1a1a1f] dark:text-white mb-6 tracking-tight transition-colors duration-300">
                TECH STACK
              </h2>
              <div className="h-1 w-48 holographic-gradient mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1a1a1f]/5 dark:bg-white/5 p-6 border-l-4 border-[#ff0080] transition-colors duration-300">
                  <h3 className="text-2xl font-bebas-neue tracking-widest text-[#ff0080] mb-4">
                    LANGUAGES
                  </h3>
                  <div className="space-y-2 text-[#1a1a1f]/90 dark:text-white/90 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#ff0080]"></div>
                      <span>JavaScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#ff0080]"></div>
                      <span>TypeScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#ff0080]"></div>
                      <span>Java</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#ff0080]"></div>
                      <span>Python</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1a1a1f]/5 dark:bg-white/5 p-6 border-l-4 border-[#00d4ff] transition-colors duration-300">
                  <h3 className="text-2xl font-bebas-neue tracking-widest text-[#00d4ff] mb-4">
                    FRAMEWORKS
                  </h3>
                  <div className="space-y-2 text-[#1a1a1f]/90 dark:text-white/90 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00d4ff]"></div>
                      <span>React</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00d4ff]"></div>
                      <span>Node.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00d4ff]"></div>
                      <span>Spring Boot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00d4ff]"></div>
                      <span>TanStack</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1a1a1f]/5 dark:bg-white/5 p-6 border-l-4 border-[#00ff88] transition-colors duration-300">
                  <h3 className="text-2xl font-bebas-neue tracking-widest text-[#00ff88] mb-4">
                    TOOLS
                  </h3>
                  <div className="space-y-2 text-[#1a1a1f]/90 dark:text-white/90 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00ff88]"></div>
                      <span>Docker</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00ff88]"></div>
                      <span>Kubernetes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00ff88]"></div>
                      <span>AWS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00ff88]"></div>
                      <span>Terraform</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="md:col-span-full md:row-span-3 bg-white dark:bg-[#1a1a1f] relative overflow-hidden retro-border transition-colors duration-300">
            <div className="bg-amber-100/90 h-full flex flex-col">
              {/* Header Section */}
              <div className="p-8 md:p-12">
                <h2 className="text-5xl md:text-7xl font-anton uppercase text-[#1a1a1f] mb-4 tracking-tight">
                  FEATURED PROJECTS
                </h2>
                <div className="h-1 w-48 holographic-gradient mb-4"></div>
                <p className="text-lg text-[#1a1a1f]/80 max-w-3xl">
                  A collection of personal projects showcasing my passion for
                  software development, from microservice architectures to game
                  development. Each project represents a learning journey and
                  experimentation with different technologies.
                </p>
              </div>

              {/* Project Cards */}
              <div className="*:border-b *:border-white">
                <ProjectCard
                  icon={Funnel}
                  iconColor="bg-[#ff6600]"
                  repoName="Redomar/Syphon"
                  displayName="Project Syphon"
                  branches={2}
                  commits={93}
                  pullRequests={0}
                  stars={0}
                />
                <ProjectCard
                  icon={Gamepad2}
                  iconColor="bg-rose-500"
                  repoName="Redomar/JavaGame"
                  displayName="JavaGame"
                  branches={16}
                  commits={410}
                  pullRequests={1}
                  stars={61}
                />
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="md:col-span-8 md:row-span-2 bg-gradient-to-br from-[#ff0080] via-[#b200ff] to-[#00d4ff] relative overflow-hidden vhs-scanlines p-8 md:p-12">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="lens-flare">
                <h2 className="text-5xl md:text-8xl font-anton uppercase text-white mb-4 tracking-tight leading-tight">
                  LET'S
                  <br />
                  CONNECT
                </h2>
                <div className="text-sm font-bebas-neue tracking-[0.3em] text-white/80">
                  REACH OUT FOR COLLABORATIONS
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/redomar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black/80 px-6 py-4 hover:bg-black transition-colors border-2 border-white group"
                >
                  <Github className="w-6 h-6 text-white group-hover:text-[#00d4ff] transition-colors" />
                  <span className="text-xl font-bebas-neue tracking-wide text-white">
                    GITHUB
                  </span>
                </a>
                <a
                  href="https://linkedin.com/in/redomar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black/80 px-6 py-4 hover:bg-black transition-colors border-2 border-white group"
                >
                  <Linkedin className="w-6 h-6 text-white group-hover:text-[#00d4ff] transition-colors" />
                  <span className="text-xl font-bebas-neue tracking-wide text-white">
                    LINKEDIN
                  </span>
                </a>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-4 border-white/10 rounded-full"></div>
          </div>

          {/* Decorative Image Card */}
          <div className="md:col-span-4 md:row-span-2 bg-white dark:bg-[#1a1a1f] relative overflow-hidden retro-border transition-colors duration-300">
            {/* Unsplash retro neon image */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80"
                alt="Neon retro aesthetic"
                fill
                className="object-cover opacity-60"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 holographic-gradient opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 h-full flex items-center justify-center p-8">
              <div className="text-center bg-black/60 dark:bg-black/60 p-8 border-4 border-white/20">
                <div className="text-5xl md:text-7xl font-anton uppercase text-white">
                  REDOMAR
                </div>
                <div
                  className="text-xl font-bebas-neue tracking-[0.5em]"
                  style={{
                    background: "linear-gradient(90deg, #ff0080, #00d4ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Mohamed Omar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
