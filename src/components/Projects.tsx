import React from "react";
import CodeWindow, { Project } from "./CodeWindow";

const projects: Project[] = [
  {
    title: "CERC RAG Document Search",
    description:
      "RAG system for the European Cardiovascular Research Centre to query regulatory documents and SOPs using ChromaDB, Sentence-Transformers and a local Mistral LLM (FastAPI, React/Vite, Ollama).",
    codeLink: "https://github.com/BOUADEIKHEIREDDINE/CERC-RAG",
    language: "python"
  },
  {
    title: "Wellpack Weather Trigger Alert",
    description:
      "Flask app monitoring branch weather forecasts and emailing alerts when thresholds are met, with Excel import and scheduled execution (Open-Meteo API, pandas, APScheduler).",
    codeLink: "https://github.com/BOUADEIKHEIREDDINE/Wellpack-Trigger-Meteo",
    language: "python"
  },
  {
    title: "Intelligent Advertising Recommendations",
    description:
      "Ad-targeting optimisation plus a competitive-analysis tool for Égérine: web scraping, keyword analysis, offer comparison and strategic recommendations (Streamlit, BeautifulSoup, Plotly).",
    codeLink: "https://github.com/BOUADEIKHEIREDDINE/egerine-recommandations",
    language: "python"
  },
  {
    title: "Relaxo Android App",
    description:
      "Native Android client for the Relaxo HR platform built in Kotlin & Jetpack Compose, with role-based screens, team chat, time-off workflows and EN/FR/AR support.",
    language: "kotlin"
  },
  {
    title: "Energy Efficiency Optimisation in France",
    description:
      "aivancity project: energy analysis, opportunity detection and automated diagnostics.",
    language: "python"
  }
];

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="bg-dark-panel py-20"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-12">
        <h2
          id="projects-title"
          className="mb-10 text-center text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl"
        >
          Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <CodeWindow key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

