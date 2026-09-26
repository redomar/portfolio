import type { SiteContent } from "./profile.types";

/**
 * Site content, built from the CV content bank (cv/cvgen/seed.sql) and
 * cross-checked against the 2026 and 2025 rendered CVs.
 */
export const content: SiteContent = {
  profile: {
    name: "Mohamed Omar",
    handle: "Redomar",
    headline: "Senior Software Engineer",
    location: "Birmingham, United Kingdom",
    tagline:
      "Senior software engineer shipping production systems across cloud, frontend and platform engineering, now building with generative AI and agentic tooling.",
    summary: [
      "Senior software engineer with six years delivering production systems across cloud, frontend and platform engineering. Track record of owning delivery end to end: leading frontend and CMS workstreams for a global in-flight entertainment platform, building secure cloud infrastructure for financial services, and shipping microservices in **Java**, **TypeScript** and **Python** across **AWS** and **Azure**. Comfortable setting engineering standards, mentoring engineers, and taking accountability for security, observability and release quality.",
      "On the AI side, I combine production cloud and full-stack delivery with hands-on generative AI engineering. I built and secured GenAI applications for financial services clients at PwC, and now work daily with agentic development tooling, the **Model Context Protocol** and the **Claude API**. Certified across Anthropic’s MCP, agent skills, Claude Code and Claude API tracks, and preparing for the Claude Certified Architect (Foundations) exam. I bring the engineering discipline – observability, security, testing – that turns AI prototypes into systems that survive production.",
    ],
    highlights: [
      { value: "6+", label: "years building production software" },
      { value: "6", label: "airline brands shipped on one Next.js platform" },
      { value: "3", label: "GenAI MVPs delivered for financial services" },
      { value: "10", label: "locales, including right-to-left Arabic" },
      { value: "4", label: "Anthropic certifications, 6 in total" },
    ],
    links: [
      { label: "Website", url: "https://redomar.co.uk", kind: "website" },
      { label: "GitHub", url: "https://github.com/redomar", kind: "github" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/redomar",
        kind: "linkedin",
      },
    ],
    openToWork: true,
  },

  experience: [
    {
      id: "econify",
      company: "Econify",
      shortName: "Econify",
      url: "https://www.econify.com",
      color: "#257209",
      product: {
        name: "Anuvu",
        url: "https://www.anuvu.com",
        blurb:
          "In-flight entertainment and connectivity provider serving 150+ airlines and 30+ cruise lines worldwide; engagement delivered through partner consultancy DNA.",
      },
      roles: [
        {
          title: "Senior Software Engineer",
          start: "2025-12",
          end: "2026-07",
          location: "Birmingham, United Kingdom",
          highlights: [
            "Held a **lead advisory role** at partner consultancy DNA, owning frontend and CMS delivery for Anuvu’s airline microsite platform as the **top contributor** across both codebases (125 and 42 commits).",
            "Shipped white-label entertainment microsites for airlines including **British Airways**, **Cathay Pacific**, **Saudia**, **Ethiopian**, **Fiji Airways** and **Gulf Air** from a shared **Next.js** and **TypeScript** platform with per-brand theming.",
            "Identified and fixed a **cache-poisoning vulnerability** raised by an airline’s security team, where a forwarded prefetch header let empty responses be cached at the **CloudFront** edge and locked real users out of every microsite.",
            "Built full **right-to-left layout support** for Arabic across grid, carousel and navigation components using logical CSS, resolving server/client hydration mismatches, and localised the platform across **10 locales**.",
            "Designed a **content-cycle system** threading a cycle header through page layout, search, detail and recommendation fetches so passengers always see the correct monthly entertainment catalogue.",
            "Authored the canonical **export validator** as sole engineer, then vendored it into the **Strapi** CMS behind a server-side validation endpoint so malformed airline content is rejected before import rather than after.",
            "Delivered throughout using **agentic AI tooling** (Claude Code) for implementation and review.",
            "**Mentored two engineers** through pairing and code review.",
            "Published [Extending Expo Prebuild to Support Amazon Vega](https://www.econify.com/news/extending-expo-prebuild-to-support-amazon-vega) for Econify, showing how to target **Amazon Fire TV** alongside iOS and Android from a single **Expo** codebase.",
          ],
        },
      ],
      tech: [
        "Next.js",
        "TypeScript",
        "React",
        "AWS CloudFront",
        "Strapi CMS",
        "i18n / RTL",
        "Expo",
        "Amazon Fire TV",
        "Claude Code",
      ],
    },
    {
      id: "pwc",
      company: "PricewaterhouseCoopers (PwC UK)",
      shortName: "PwC UK",
      color: "#FD5105",
      roles: [
        {
          title: "Senior Cloud Engineer",
          start: "2024-07",
          end: "2025-08",
          location: "Birmingham, United Kingdom",
          highlights: [
            "Led development of enterprise **React.js** applications for **Generative AI** tools, collaborating with technical and non-technical stakeholders across the financial services sector to deliver 3 MVP applications.",
            "Set engineering standards for secure API integration, implementing **OAuth 2.0** and **JWT** authentication for Generative AI solutions to meet **GDPR** and financial services regulatory requirements.",
            "Drove adoption of best practices for real-time streaming data, contributing to architectural decisions for high-performance exchange between **AI agents** and client systems.",
            "On an AI tool for compliance checks, led the **React** and **TypeScript** front end with secure coding practices, unit testing in CI/CD pipelines and clean REST interfaces, integrating **Azure AI** services with logging and monitoring hooks throughout.",
          ],
        },
        {
          title: "Cloud Engineer",
          start: "2023-07",
          end: "2024-06",
          location: "Birmingham, United Kingdom",
          highlights: [
            "Managed infrastructure deployments using **Terraform** and **GitHub Actions**, establishing Policy as Code to hold **SOC 2** and **ISO 27001** compliance across **Azure** architectures spanning 50+ cloud resources.",
            "Supported cloud migration of on-premises services to Azure with **Kubernetes** containerisation, achieving 99.9% uptime while keeping infrastructure costs low.",
            "Implemented **Grafana** and **Prometheus** monitoring for cloud-native applications in **Python** and **React.js**, integrating with **Vertex AI** and Azure services to track system health and performance.",
          ],
        },
        {
          title: "Cloud Delivery Consultant",
          start: "2023-01",
          end: "2023-06",
          location: "Birmingham & London, United Kingdom",
          highlights: [
            "Integrated **ServiceNow** with GitHub and Azure, designing custom catalogue items for automated Azure resource deployment over REST API connections.",
            "Implemented **CI/CD pipelines** with **GitHub Actions** and **Terraform**, ensuring consistent infrastructure provisioning across environments.",
            "Developed ServiceNow workflows and custom Script Includes in **JavaScript**, managing mid-server deployments for secure connectivity between cloud and on-premises resources.",
          ],
        },
      ],
      tech: [
        "React.js",
        "TypeScript",
        "JavaScript",
        "Python",
        "Generative AI",
        "Azure AI",
        "Vertex AI",
        "OAuth 2.0",
        "JWT",
        "Azure",
        "Terraform",
        "GitHub Actions",
        "Kubernetes",
        "Grafana",
        "Prometheus",
        "ServiceNow",
        "SOC 2",
        "ISO 27001",
        "GDPR",
      ],
    },
    {
      id: "ogl",
      company: "OGL Computer",
      shortName: "OGL",
      url: "https://www.ogl.co.uk",
      color: "#2D2F7A",
      product: {
        name: "Profit4",
        url: "https://www.ogl.co.uk",
        blurb:
          "OGL’s cloud-based ERP platform for UK merchants, distributors and wholesalers, covering stock, orders, warehouse, CRM and finance in one system.",
      },
      roles: [
        {
          title: "Integration Engineer",
          start: "2021-10",
          end: "2022-12",
          location: "Stourport-on-Severn, United Kingdom",
          highlights: [
            "Led a development team implementing **Java Spring Boot** microservices, processing **GraphQL** and **REST API** data transfers for CRM integrations with external services.",
            "Managed **CI/CD** using **Jenkins** and **Bitbucket**, implementing automated testing with **Selenium** and **JUnit** for continuous integration.",
            "Coordinated client data integration projects, ensuring robust API connectivity and monitoring while meeting delivery timelines and budget constraints.",
            "Developed integration solutions handling message buses and **event-driven architectures** for real-time data synchronisation.",
          ],
        },
        {
          title: "Full Stack Software Engineer",
          start: "2021-04",
          end: "2021-10",
          location: "Stourport-on-Severn, United Kingdom",
          highlights: [
            "Developed full-stack applications with a **Java Spring Boot** microservices backend and **React.js** frontend in **TypeScript**, influencing best practices for code quality and testing.",
            "Implemented unit and integration testing with **JUnit**, following **Test Driven Development** to keep the codebase maintainable.",
            "Contributed to architectural decisions for containerised applications, supporting deployment automation and infrastructure as code.",
          ],
        },
      ],
      tech: [
        "Java Spring Boot",
        "React.js",
        "TypeScript",
        "GraphQL",
        "REST API",
        "Jenkins",
        "Bitbucket",
        "Selenium",
        "JUnit",
        "Test Driven Development",
        "Event-driven architecture",
      ],
    },
    {
      id: "provision",
      company: "Provision Technologies",
      shortName: "Provision",
      roles: [
        {
          title: "Full Stack Software Engineer",
          start: "2020-04",
          end: "2021-03",
          location: "Birmingham, United Kingdom",
          highlights: [
            "Cofounded a telecommunications startup, architecting a scalable scheduling system on **Docker** containerised infrastructure with **Node.js** backend services.",
            "Managed complete server infrastructure including **WebRTC** servers and **Nginx** reverse proxy configuration, gaining hands-on experience in cloud networking, security and performance optimisation.",
          ],
        },
      ],
      tech: ["Node.js", "Docker", "WebRTC", "Nginx"],
    },
  ],

  projects: [
    {
      id: "syphon",
      title: "Syphon",
      start: "2024-09",
      end: null,
      description:
        "A budget tracking application built in **Next.js** and **TypeScript**, used as a proving ground for production observability: **OpenTelemetry** tracing, authentication and a microservice-based deployment architecture.",
      highlights: [
        "Building a budget tracking application in **Next.js** and **TypeScript**, applying production observability practices with **OpenTelemetry**, **Prometheus** and **Loki** for distributed tracing, metrics and log aggregation.",
        "Self-directed project focused on the cloud-native monitoring tooling production systems depend on, with a security-first approach and thorough documentation.",
        "Containerised deployment with **Docker** and CI/CD automation for consistent releases.",
        "Backed by **PostgreSQL** with **Prisma**, **Clerk** authentication and **Jaeger** for trace visualisation.",
      ],
      tech: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Clerk",
        "OpenTelemetry",
        "Jaeger",
        "Prometheus",
        "Loki",
        "Docker",
      ],
      links: [
        {
          label: "Source on GitHub",
          url: "https://github.com/redomar/syphon",
          kind: "repo",
        },
        { label: "Live site", url: "https://syphon.uk", kind: "website" },
      ],
      featured: true,
    },
    {
      id: "full-stack-web-app",
      title: "Full Stack Web Application",
      start: "2019-10",
      end: "2020-04",
      description:
        "A complete web application with a **Node.js/Express.js** REST API backed by **MongoDB**, a separate frontend, and containerised CI/CD.",
      highlights: [
        "Architected a complete web application using **Node.js/Express.js** with a **REST API** and **JWT authentication**, following microservices principles.",
        "Implemented a full **CI/CD pipeline** with **GitHub Actions** and **Docker** for automated, reliable deployments.",
      ],
      tech: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "REST API",
        "GitHub Actions",
        "Docker",
      ],
      links: [
        {
          label: "Backend on GitHub",
          url: "https://github.com/redomar/backend-redomar",
          kind: "repo",
        },
        {
          label: "Frontend on GitHub",
          url: "https://github.com/redomar/frontend-redomar",
          kind: "repo",
        },
      ],
      featured: false,
    },
    {
      id: "javagame",
      title: "JavaGame – Java Game Engine",
      start: "2013-03",
      end: "2016-03",
      description:
        "A 2D game and engine written from scratch in pure **Java**. My longest-running open-source project, with 59 stars and 63 forks on GitHub.",
      highlights: [
        "Designed a game engine from scratch in pure **Java**, demonstrating object-oriented design and algorithm optimisation.",
      ],
      tech: ["Java"],
      links: [
        {
          label: "Source on GitHub",
          url: "https://github.com/redomar/JavaGame",
          kind: "repo",
        },
      ],
      featured: true,
    },
  ],

  skills: [
    {
      name: "Programming Languages",
      skills: [
        "TypeScript",
        "JavaScript",
        "Java",
        "Python",
        "Node.js",
        "Go (learning)",
      ],
    },
    {
      name: "Frontend Development",
      skills: [
        "React.js",
        "Next.js",
        "Vue.js",
        "HTML/CSS",
        "TailwindCSS",
        "TanStack Query",
        "Vite",
        "Internationalisation (i18n/RTL)",
      ],
    },
    {
      name: "Backend & Microservices",
      skills: [
        "Java Spring Boot",
        "Python Django",
        "Express.js",
        "REST API",
        "GraphQL",
        "Strapi CMS",
      ],
    },
    {
      name: "Cloud Platforms",
      skills: [
        "AWS",
        "Azure",
        "Google Cloud Platform",
        "Serverless Architecture",
        "CloudFront/CDN",
        "Hybrid Cloud",
      ],
    },
    {
      name: "DevOps & Infrastructure",
      skills: [
        "Docker",
        "Kubernetes",
        "Terraform",
        "Jenkins",
        "GitHub Actions",
        "GitLab CI/CD",
        "Infrastructure as Code",
      ],
    },
    {
      name: "Data & Databases",
      skills: [
        "SQL",
        "PostgreSQL",
        "MongoDB",
        "SQLite",
        "Event Bus",
        "Message Queues",
      ],
    },
    {
      name: "Observability",
      skills: [
        "Grafana",
        "Prometheus",
        "Loki",
        "OpenTelemetry",
        "Distributed Tracing",
        "Log Aggregation",
        "APM",
      ],
    },
    {
      name: "Security & Testing",
      skills: [
        "OAuth 2.0",
        "JWT",
        "IAM",
        "Container Security",
        "Unit & Integration Testing",
        "Selenium",
        "Test Driven Development",
      ],
    },
    {
      name: "AI & Agentic Engineering",
      skills: [
        "Model Context Protocol (MCP)",
        "Claude API",
        "Claude Code / agentic workflows",
        "Agent Skills",
        "Generative AI",
        "Azure OpenAI",
        "Vertex AI",
        "LLM Integration",
        "Retrieval-Augmented Generation",
      ],
    },
    {
      name: "Leadership & Delivery",
      skills: [
        "Agile Methodologies",
        "Technical Mentorship",
        "Stakeholder Management",
        "Technical Writing",
      ],
    },
  ],

  education: [
    {
      qualification: "BSc (Hons) Biochemistry",
      institution: "University of Liverpool",
      url: "https://www.liverpool.ac.uk",
      location: "Liverpool, United Kingdom",
      period: "Sep 2015 – Jul 2019",
    },
    {
      qualification: "Extended Diploma in Applied Science",
      institution: "South & City College",
      url: "https://www.sccb.ac.uk",
      location: "Birmingham, United Kingdom",
      period: "Sep 2013 – Jul 2015",
    },
    {
      qualification: "Extended Diploma in Software Engineering",
      institution: "South & City College",
      url: "https://www.sccb.ac.uk",
      location: "Birmingham, United Kingdom",
      period: "Sep 2011 – Jul 2013",
    },
  ],

  certifications: [
    {
      name: "Building with the Claude API",
      issuer: "Anthropic",
      awarded: "May 2026",
      inProgress: false,
      url: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
    },
    {
      name: "Claude Code in Action",
      issuer: "Anthropic",
      awarded: "May 2026",
      inProgress: false,
      url: "https://anthropic.skilljar.com/claude-code-in-action",
    },
    {
      name: "Introduction to Model Context Protocol",
      issuer: "Anthropic",
      awarded: "May 2026",
      inProgress: false,
      url: "https://anthropic.skilljar.com/introduction-to-model-context-protocol",
    },
    {
      name: "Introduction to Agent Skills",
      issuer: "Anthropic",
      awarded: "May 2026",
      inProgress: false,
      url: "https://anthropic.skilljar.com/introduction-to-agent-skills",
    },
    {
      name: "Azure Fundamentals",
      issuer: "Microsoft",
      awarded: "Mar 2023",
      inProgress: false,
      url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    },
    {
      name: "CompTIA IT Fundamentals+ (ITF+)",
      issuer: "CompTIA",
      awarded: "May 2021",
      inProgress: false,
      url: "https://www.comptia.org/certifications/it-fundamentals",
    },
    {
      name: "Claude Certified Architect, Foundations (CCA-F)",
      issuer: "Anthropic",
      awarded: "",
      inProgress: true,
    },
  ],

  leadership: [
    {
      role: "Tech Lead for Muslim Network",
      org: "PwC",
      location: "Birmingham & London, United Kingdom",
      period: "2023 – 2025",
    },
    {
      role: "Vice President of Somali Society",
      org: "University of Liverpool",
      url: "https://www.liverpool.ac.uk",
      location: "Liverpool, United Kingdom",
      period: "2016 – 2017",
    },
  ],

  writing: [
    {
      title: "Extending Expo Prebuild to Support Amazon Vega",
      publisher: "Econify",
      url: "https://www.econify.com/news/extending-expo-prebuild-to-support-amazon-vega",
      date: "2025-12",
      summary:
        "How to extend **Expo** prebuild with custom templates to target **Amazon Fire TV** (Vega) alongside iOS and Android, sharing one React Native codebase across all three platforms.",
    },
  ],

  additional: [
    "Active contributor to engineering communities, mentoring engineers in cloud-native practices.",
    "Published technical writing on cross-platform mobile tooling; regularly experimenting with agentic AI and cloud-native systems.",
  ],
};
