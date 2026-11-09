// Single source of truth for the portfolio. Mirrors the ATS CV (source/cv_ats.html).

export const profile = {
  firstName: "Kheireddine",
  lastName: "Bouadi",
  role: "AI & Data Science Student",
  location: "Paris, France",
  school: "aivancity Paris",
  email: "bouadikheireddine@gmail.com",
  linkedin: "https://linkedin.com/in/bouadikheireddine",
  github: "https://github.com/BOUADEIKHEIREDDINE",
  intro:
    "I build automated Python data pipelines, LLM-powered NLP tools and RAG systems that meet strict technical and regulatory requirements, and I ship production-grade native Android apps in Kotlin.",
  summary:
    "AI & Data Science student at aivancity Paris with two internships, in AI and in mobile development, and industry projects delivered for real companies. I like work where the data is messy, the rules are strict, and the result has to be traceable.",
};

export const stats = [
  { value: 2, label: "Internships" },
  { value: 4, label: "Industry projects" },
  { value: 66, label: "Financial ratios in one engine" },
  { value: 4, label: "Languages spoken" },
];

export type DemoKind = "phone" | "quiz" | "ratios" | "rag" | "weather" | "market";

export type Entry = {
  id: string;
  title: string;
  org: string;
  kind: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
  link?: { href: string; label: string };
  demo: DemoKind;
  tint: string;
};

export const experience: Entry[] = [
  {
    id: "relaxo",
    title: "Android Developer Intern",
    org: "Relaxo Algérie",
    kind: "Internship",
    location: "Algeria",
    period: "2026",
    summary: "A native Android app for a multi-tenant HR platform.",
    bullets: [
      "Developed the native Android app for Relaxo, a multi-tenant HR platform, in Kotlin and Jetpack Compose using MVVM architecture and REST APIs.",
      "Delivered 6 core modules (dashboard, time-off approvals, team chat, documents, calendar, analytics) with role-based access for 3 user roles: Admin, Manager and Employee.",
      "Localised the app in 3 languages (English, French, Arabic with RTL) with Material 3 light/dark theming.",
      "Secured user sessions with encrypted on-device storage, protecting authentication data across all tenants.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "MVVM", "REST APIs", "Material 3", "Gradle"],
    demo: "phone",
    tint: "#dde7ff",
  },
  {
    id: "naimrod",
    title: "AI & Data Science Intern",
    org: "Naimrod",
    kind: "Internship",
    location: "Paris, France",
    period: "2025",
    summary: "A TOEIC-grade multiple-choice question generator, from source to exam-ready output.",
    bullets: [
      "Engineered a full TOEIC-grade multiple-choice question generator in Python, from source ingestion to exam-ready output.",
      "Turned user-chosen videos or texts into structured content and TOEIC-format questions with plausible distractors.",
      "Built NLP analysis and validation stages to filter low-quality, duplicate or ambiguous questions; integrated the Gemini API.",
    ],
    stack: ["Python", "NLP", "Gemini API", "LLM"],
    demo: "quiz",
    tint: "#fff0b8",
  },
];

export const projects: Entry[] = [
  {
    id: "valexia",
    title: "Financial Analysis & Scoring Engine",
    org: "VALEXIA",
    kind: "Company project",
    location: "Paris, France",
    period: "2026",
    summary: "The core engine of an M&A startup: French tax returns in, traceable analysis of acquisition targets out.",
    bullets: [
      "Built the core engine of an M&A startup, turning French tax returns into a traceable analysis of acquisition targets.",
      "Developed a PDF extractor for DGFiP tax forms (2050–2059) that works regardless of the accounting software.",
      "Implemented 66 deterministic financial ratios in Python with data provenance, formula versioning and 44 unit tests.",
    ],
    stack: ["Python", "PDF extraction", "Finance", "Unit testing"],
    demo: "ratios",
    tint: "#d4f0de",
  },
  {
    id: "cerc",
    title: "RAG System for Clinical Documents",
    org: "CERC",
    kind: "Company project",
    location: "Paris, France",
    period: "2026",
    summary: "A fully local assistant that answers questions on clinical regulations and SOPs, with sources.",
    bullets: [
      "Built a fully local RAG assistant answering questions on clinical regulations and SOPs, keeping sensitive data on-premise with Mistral via Ollama.",
      "Ingested PDF, DOCX and XLSX files with structure-aware chunking (15% overlap), BGE-M3 embeddings and ChromaDB vector search.",
      "Shipped a FastAPI backend and React/Vite interface with document/category filtering and cited sources for every answer.",
    ],
    stack: ["RAG", "Mistral", "Ollama", "BGE-M3", "ChromaDB", "FastAPI", "React", "Vite"],
    link: { href: "https://github.com/BOUADEIKHEIREDDINE/CERC-RAG", label: "Source on GitHub" },
    demo: "rag",
    tint: "#ffdde4",
  },
  {
    id: "wellpack",
    title: "AI Pipeline Development",
    org: "Wellpack",
    kind: "Company project",
    location: "Paris, France",
    period: "2025",
    summary: "A weather-alert pipeline that watches forecasts for every branch and emails when thresholds are met.",
    bullets: [
      "Developed a Flask weather-alert application monitoring Open-Meteo forecasts across multiple company branches and emailing alerts when configured thresholds are met.",
      "Automated branch configuration through Excel import (pandas, openpyxl) and scheduled daily execution with APScheduler, requiring zero manual intervention.",
    ],
    stack: ["Flask", "Open-Meteo", "pandas", "openpyxl", "APScheduler"],
    link: { href: "https://github.com/BOUADEIKHEIREDDINE/Wellpack-Trigger-Meteo", label: "Source on GitHub" },
    demo: "weather",
    tint: "#d6eefc",
  },
  {
    id: "egerine",
    title: "Data Analysis",
    org: "Égérine",
    kind: "Company project",
    location: "Paris, France",
    period: "2024–2025",
    summary: "Recommendation systems, ad targeting and a competitive analysis tool with dashboards.",
    bullets: [
      "Designed recommendation systems and ad-targeting algorithms to improve ad relevance and performance.",
      "Built a competitive analysis tool combining web scraping (BeautifulSoup), keyword analysis and offer comparison to generate strategic recommendations.",
      "Delivered interactive Streamlit and Plotly dashboards that let non-technical stakeholders explore market data and insights.",
    ],
    stack: ["Recommender systems", "BeautifulSoup", "Streamlit", "Plotly", "pandas"],
    link: { href: "https://github.com/BOUADEIKHEIREDDINE/egerine-recommandations", label: "Source on GitHub" },
    demo: "market",
    tint: "#ebe1ff",
  },
];

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  { title: "Programming & Mobile", items: ["Python", "SQL", "Kotlin", "Android SDK", "Jetpack Compose", "Material 3", "MVVM", "Gradle"] },
  {
    title: "AI & Data",
    items: ["Machine Learning", "NLP", "RAG", "Gemini API", "Mistral (Ollama)", "Sentence-Transformers", "ChromaDB", "OpenCV", "Video Stream Processing"],
  },
  { title: "Data Engineering", items: ["Data Pipelines", "ETL", "Workflow Automation", "Orchestration", "pandas", "APScheduler", "Power BI"] },
  { title: "Web & APIs", items: ["REST APIs", "FastAPI", "Flask", "Streamlit", "BeautifulSoup", "Plotly", "React", "Vite"] },
];

export const languages = [
  { name: "Arabic", level: "C2" },
  { name: "French", level: "C2" },
  { name: "English", level: "C1" },
  { name: "Spanish", level: "B2" },
];

export const education = [
  {
    degree: "Master's in Artificial Intelligence & Data Science",
    note: "In progress",
    school: "aivancity",
    location: "Paris, France",
    period: "2024–2029",
  },
  {
    degree: "French Baccalaureate",
    note: "",
    school: "Lycée Français International d'Oujda",
    location: "Oujda, Morocco",
    period: "2022–2024",
  },
];

export const certifications = [
  {
    code: "PL-300",
    name: "Microsoft Power BI Data Analyst",
    issuer: "Microsoft",
    year: "2026",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/KheireddineBOUADI-6152/C39D5E53F915852F?sharingId=54BD619D0E6337AE",
  },
  {
    code: "PL-900",
    name: "Microsoft Power Platform Fundamentals",
    issuer: "Microsoft",
    year: "2025",
    href: "https://drive.google.com/file/d/1mVpHS-ykkLV9mZb99ZbFr70cYKydrQZ3/view?usp=drivesdk",
  },
  { code: "AZURE", name: "Microsoft Certification, Azure / AI", issuer: "Microsoft", year: "2025", href: "" },
  { code: "DELF", name: "Diplôme d'études en langue française", issuer: "France Éducation international", year: "2020", href: "" },
];

export const hobbies = [
  {
    id: "fitness",
    title: "Fitness",
    line: "Proof of extreme discipline.",
    tint: "#ffdcd0",
    links: [] as { label: string; note: string; href: string }[],
  },
  {
    id: "building",
    title: "Building side projects",
    line: "",
    tint: "#dde7ff",
    links: [] as { label: string; note: string; href: string }[],
  },
];
