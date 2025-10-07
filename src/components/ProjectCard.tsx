import { Star, GitCommit } from 'lucide-react'
import type { GitHubRepo } from '../lib/github'

interface ProjectCardProps {
  repo: GitHubRepo
  commits?: number
}

export function ProjectCard({ repo, commits }: ProjectCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
    >
      <div className="relative overflow-hidden border border-border bg-card/40 backdrop-blur-md p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50">
        {/* Glassy refraction effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {repo.name}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {repo.description || 'No description available'}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs bg-secondary/30 border border-secondary/50 text-secondary-foreground"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {repo.language && (
              <span className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: getLanguageColor(repo.language),
                  }}
                />
                {repo.language}
              </span>
            )}

            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {repo.stargazers_count}
            </span>

            {commits !== undefined && commits > 0 && (
              <span className="flex items-center gap-1">
                <GitCommit className="w-4 h-4" />
                {commits}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Java: '#b07219',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    HTML: '#e34c26',
    CSS: '#563d7c',
  }
  return colors[language] || '#8257e5'
}
