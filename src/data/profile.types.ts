/**
 * Shared content contract for the site. `profile.ts` fills these types from the
 * CV content bank; pages and components only ever read them.
 *
 * `RichText` fields use a small markdown subset rendered by <RichText>:
 * **bold**, *italic* and [label](https://url). Nothing else is interpreted.
 */
export type RichText = string;

/** Year-month, e.g. "2024-07". Used for sorting, durations and <time dateTime>. */
export type YearMonth = `${number}-${number}`;

export type Link = {
  label: string;
  url: string;
  kind:
    | "website"
    | "github"
    | "linkedin"
    | "article"
    | "repo"
    | "company"
    | "other";
};

export type Profile = {
  name: string;
  /** Short handle used in the design, e.g. "Redomar". */
  handle: string;
  headline: string;
  /** City and country only. Never a street address. */
  location: string;
  /** One or two sentences for hero/meta description. */
  tagline: string;
  /** Longer intro paragraph(s). */
  summary: RichText[];
  /** Short, scannable facts for recruiters, e.g. "6+ years in production". */
  highlights: { value: string; label: string }[];
  links: Link[];
  /** Whether the person is currently open to new roles. */
  openToWork: boolean;
};

export type Role = {
  title: string;
  start: YearMonth;
  /** null = current role. */
  end: YearMonth | null;
  location: string;
  highlights: RichText[];
};

/** One employer; several roles when promoted within the same company. */
export type Employer = {
  id: string;
  company: string;
  /** Short display name, e.g. "PwC UK". */
  shortName: string;
  url?: string;
  /** Brand accent from the CV, hex. */
  color?: string;
  /** The product or client worked on, if any. */
  product?: { name: string; url?: string; blurb: RichText };
  /** Newest first. */
  roles: Role[];
  /** Technologies used, for tag chips. */
  tech: string[];
};

export type Project = {
  id: string;
  title: string;
  start?: YearMonth;
  end?: YearMonth | null;
  description: RichText;
  highlights: RichText[];
  tech: string[];
  links: Link[];
  /** Show on the home page. */
  featured: boolean;
};

export type SkillGroup = {
  name: string;
  skills: string[];
};

export type Education = {
  qualification: string;
  institution: string;
  url?: string;
  location: string;
  period: string;
};

export type Certification = {
  name: string;
  issuer: string;
  /** Display date; empty when in progress. */
  awarded: string;
  inProgress: boolean;
  /** Public verification or course page. Never a credential ID. */
  url?: string;
};

export type Leadership = {
  role: string;
  org: string;
  url?: string;
  location: string;
  period: string;
  description?: RichText;
};

export type Writing = {
  title: string;
  publisher: string;
  url: string;
  date?: YearMonth;
  summary: RichText;
};

export type SiteContent = {
  profile: Profile;
  experience: Employer[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  certifications: Certification[];
  leadership: Leadership[];
  writing: Writing[];
  /** Other facts from "Additional Information" (languages, interests, etc.). */
  additional: RichText[];
};
