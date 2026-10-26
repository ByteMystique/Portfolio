export const profile = {
  name: "Jayadev Narayanan",
  first: "Jayadev",
  last: "Narayanan",
  role: "Full-Stack Developer",
  // Cycled by the hero typewriter; the first one is also the static fallback
  titles: ["Full-Stack Developer", "AI Engineer", "RAG Pipeline Developer", "Systems Thinker"],
  location: "Kochi, Kerala",
  email: "jayadevnarayanan0214@gmail.com",
  github: "https://github.com/ByteMystique",
  linkedin: "https://linkedin.com/in/jayadev-narayanan",
  resume: "/resume.pdf",
  // TODO: add your photo to /public and set the path here, e.g. "/me.jpg". It fills the empty hexagon in the hero.
  photo: null as string | null,
  tagline: "Python on the backend, Next.js up front, and a soft spot for AI that actually works.",
  // TODO: tweak or extend the bio
  about:
    "I study computer science at CUSAT in Kochi and spend most of my spare time building. I'm happiest when one project covers everything: the Python service, the database design and the screen people actually touch. This year that meant an internship on an AI chatbot platform, plus a few hackathon trophies.",
};

export const stats = [
  { value: 4, suffix: "", label: "Hackathon podiums" },
  { value: 3, suffix: "", label: "Projects built" },
  { value: 1, suffix: "", label: "Internship" },
  { value: 2027, suffix: "", label: "Graduating" },
];

export const marquee = [
  "FastAPI",
  "Next.js",
  "TypeScript",
  "RAG",
  "Qdrant",
  "LangGraph",
  "Supabase",
  "PostgreSQL",
  "Docker",
  "Redis",
];

export const experience = [
  {
    period: "June 2026",
    role: "SDE Intern",
    org: "LogAI",
    place: "Kochi, India",
    points: [
      "Backend work on an AI chatbot platform used by multiple tenants, in async Python with FastAPI.",
      "Built the pipeline that turns uploaded documents into searchable vectors for RAG.",
      "Got hands-on with agent orchestration, clean architecture and getting code deployed.",
    ],
  },
  {
    period: "Freelance",
    role: "Web Developer",
    org: "Light Crescent Hardwares",
    place: "Coimbatore, India",
    points: [
      "Built the business's website with a friend, splitting the work across frontend, database wiring and everything in between.",
      // TODO: add specifics of your part
    ],
  },
  // TODO: add clubs / communities / other roles here if any
];

export const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "C++", "SQL"] },
  { group: "Backend", items: ["FastAPI", "Flask", "PostgreSQL", "MongoDB", "Redis"] },
  { group: "Frontend", items: ["React", "Next.js"] },
  { group: "AI / ML", items: ["scikit-learn", "Qdrant", "LangGraph"] },
  { group: "Infrastructure", items: ["Docker", "Linux", "Git"] },
];

export const awards = [
  { place: "1st", title: "Hack for Tomorrow", org: "Model Engineering College, Kochi" },
  { place: "1st", title: "HackTillDawn", org: "Mar Athanasius College of Engineering" },
  { place: "3rd", title: "Code Kalari National Hackathon", org: "IIIT Kottayam" },
  { place: "3rd", title: "Asian School of Business Hackathon", org: "Asian School of Business" },
];

export type Project = {
  slug: string;
  title: string;
  kind: string;
  year?: string;
  featured?: boolean;
  summary: string;
  role?: string;
  stack: string[];
  highlights: string[];
  live: string | null; // null renders a "coming soon" state
  code: string | null;
  hue: number; // drives the generated preview gradient
};

export const projects: Project[] = [
  {
    slug: "havenly",
    title: "Havenly",
    kind: "Hostel recommendation platform",
    featured: true,
    summary: "A hostel finder that understands what you ask for. Tell it what you want in plain English and it suggests places that fit.",
    stack: ["Next.js", "React", "TypeScript", "FastAPI", "Supabase", "Python", "scikit-learn"],
    highlights: [
      "Three parts: a Next.js app, a FastAPI backend and a separate ML service.",
      "Recommendations come from a KNN model fed by preferences pulled out of natural language.",
      "I designed the Supabase database behind sign-in, bookings, reviews and notifications.",
    ],
    // TODO: set live URL once Havenly is hosted
    live: null,
    code: "https://github.com/ByteMystique",
    hue: 85,
  },
  {
    slug: "lc-hardwares",
    title: "Light Crescent Hardwares",
    kind: "Freelance business website",
    summary:
      "Website for a Coimbatore hardware retailer selling power tools and hand tools, with brand sections, store info and WhatsApp/phone contact. Built with a friend for the client.",
    role: "Frontend and database wiring (shared with a friend)",
    stack: ["Frontend", "Database", "Freelance"],
    highlights: [
      "Built for a real client, from brief to launch.",
      "Work split with a friend across frontend, database wiring and the rest.",
      // TODO: add specifics (stack, what you wired up, results)
    ],
    live: "https://lchardwares.com/",
    code: null,
    hue: 30,
  },
  {
    slug: "ev-optimizer",
    title: "Kerala EV Charging Optimizer",
    kind: "Geospatial decision-support platform",
    summary: "A map-based tool that shows where new EV chargers would help most across Kerala.",
    stack: ["Next.js", "Flask", "Leaflet.js", "SQLite", "SciPy"],
    highlights: [
      "Draw an area on the map and get an instant analysis, with heatmaps and live navigation.",
      "A Flask backend with fast spatial lookups does the heavy lifting.",
      "Built on EV adoption, population and power grid data that I collected and cleaned myself.",
    ],
    // TODO: add live / code links if available
    live: null,
    code: "https://github.com/ByteMystique",
    hue: 200,
  },
];
