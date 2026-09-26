import {
  Github,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Star,
  LucideIcon,
} from "lucide-react";

interface ProjectCardProps {
  icon: LucideIcon;
  iconColor: string;
  repoName: string;
  displayName: string;
  branches: number;
  commits: number;
  pullRequests: number;
  stars: number;
}

export function ProjectCard({
  icon: Icon,
  iconColor,
  repoName,
  displayName,
  branches,
  commits,
  pullRequests,
  stars,
}: ProjectCardProps) {
  return (
    <div className="bg-slate-950 flex">
      <div className={`size-32 ${iconColor}`}>
        <Icon className="size-32 p-4 text-white" />
      </div>
      <div className="w-full border-l border-white flex flex-col">
        <div className="w-full h-20 flex flex-row text-3xl font-bebas-neue tracking-wide items-center">
          <Github className="size-20 p-4 text-white" /> {repoName}
          <GitBranch className="size-20 p-4 text-white" />
          {branches}
          <GitCommit className="size-20 p-4 text-white" />
          {commits}
          <GitPullRequest className="size-20 p-4 text-white" />
          {pullRequests}
          <Star className="size-20 p-4 text-white" /> {stars}
        </div>
        <div className="w-full h-12 border-t font-bold border-white text-amber-400 flex items-center pl-3">
          {displayName}
        </div>
      </div>
    </div>
  );
}
