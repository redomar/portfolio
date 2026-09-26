import { execSync } from "node:child_process";
import packageJson from "../../package.json";

export type BuildInfo = {
  version: string;
  commit: string | null;
  commitUrl: string | null;
  branch: string | null;
  dirty: boolean;
  builtAt: Date;
  environment: string;
};

function git(args: string): string | null {
  try {
    return execSync(`git ${args}`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

// Read at render time: once at build for the static production page, on every
// request under `next dev`, so a local server always shows its working-tree state.
export function getBuildInfo(): BuildInfo {
  const commit = git("rev-parse --short HEAD");
  // Nixpacks writes an untracked .nixpacks/ into the build context; don't count it.
  const status = git("status --porcelain -- . ':!.nixpacks'");

  return {
    version: packageJson.version,
    commit,
    commitUrl: commit
      ? `https://github.com/redomar/portfolio/commit/${commit}`
      : null,
    branch: git("rev-parse --abbrev-ref HEAD"),
    dirty: Boolean(status),
    builtAt: new Date(),
    environment: process.env.NODE_ENV ?? "unknown",
  };
}
