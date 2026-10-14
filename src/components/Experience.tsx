import React from "react";

type ExperienceItem = {
  title: string;
  company: string;
  date: string;
  description: string;
};

const experiences: ExperienceItem[] = [
  {
    title: "Android Developer Intern",
    company: "Relaxo Algérie · Algeria",
    date: "2026",
    description:
      "Developed the native Android app of Relaxo, a multi-tenant HR platform, in Kotlin & Jetpack Compose (MVVM, REST API): dashboard, time-off approvals, team chat, documents, calendar and analytics with role-based access, encrypted session storage, EN/FR/AR (RTL) localisation and light/dark theming."
  },
  {
    title: "AI & Data Science Intern",
    company: "Naimrod · Paris",
    date: "2025",
    description:
      "Designed a modular Python pipeline that automatically generates quiz distractors via the Gemini API, with NLP analysis and textual validation."
  },
  {
    title: "AI Pipeline Development",
    company: "Wellpack · Paris",
    date: "2025",
    description:
      "Built a fully automated data processing and analysis pipeline with optimised workflow orchestration."
  },
  {
    title: "Data Analysis",
    company: "Égérine · Paris",
    date: "2024 – 2025",
    description:
      "Designed recommendation systems and advertising-targeting algorithms focused on relevance and performance."
  }
];

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-20"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
        <h2
          id="experience-title"
          className="mb-10 text-center text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl"
        >
          Experience
        </h2>
        <div className="space-y-6">
          {experiences.map((exp) => (
            <article
              key={`${exp.company}-${exp.title}`}
              className="rounded-xl border border-slate-800 bg-slate-950/70 px-5 py-4 text-sm shadow-md"
            >
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-slate-50">
                  {exp.title}
                </h3>
                <p className="text-xs text-slate-400">{exp.date}</p>
              </header>
              <p className="mt-1 text-xs text-slate-400">{exp.company}</p>
              <p className="mt-2 text-sm text-slate-200">{exp.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

