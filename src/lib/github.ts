export interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  topics: string[]
}

export interface RepoStats {
  commits: number
  linesOfCode: number
}

export async function fetchPinnedRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    if (!response.ok) {
      throw new Error('Failed to fetch repos')
    }
    const repos: GitHubRepo[] = await response.json()

    // GitHub doesn't have a direct pinned repos API, so we'll filter by stars and recent activity
    return repos
      .filter(repo => !repo.name.includes('dotfiles'))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

export async function fetchRepoStats(username: string, repo: string): Promise<RepoStats> {
  try {
    // Fetch commit count
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits?per_page=1`
    )

    let commits = 0
    if (commitsResponse.ok) {
      const linkHeader = commitsResponse.headers.get('Link')
      if (linkHeader) {
        const match = linkHeader.match(/page=(\d+)>; rel="last"/)
        commits = match ? parseInt(match[1]) : 1
      } else {
        commits = 1
      }
    }

    // For lines of code, we'll use a placeholder since the API doesn't provide this directly
    // In a real implementation, you'd need to use the GitHub GraphQL API or clone the repo
    const linesOfCode = 0

    return { commits, linesOfCode }
  } catch (error) {
    console.error(`Error fetching stats for ${repo}:`, error)
    return { commits: 0, linesOfCode: 0 }
  }
}
