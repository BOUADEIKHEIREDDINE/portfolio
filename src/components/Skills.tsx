import React from "react";

const Skills: React.FC = () => {
  const groups = [
    {
      title: "python.py",
      lines: [
        "import pandas as pd",
        "import cv2  # OpenCV",
        "from fastapi import FastAPI",
        "from flask import Flask"
      ]
    },
    {
      title: "ai_nlp.py",
      lines: [
        "from sentence_transformers import SentenceTransformer",
        "import chromadb  # RAG",
        "import ollama  # local Mistral LLM",
        "import google.generativeai  # Gemini API"
      ]
    },
    {
      title: "pipelines.py",
      lines: [
        "def etl(df):",
        "    return (df",
        "        .pipe(clean)",
        "        .pipe(validate))"
      ]
    },
    {
      title: "android.kt",
      lines: [
        "Kotlin",
        "Jetpack Compose · Material 3",
        "MVVM · REST APIs",
        "Gradle"
      ]
    },
    {
      title: "data.json",
      lines: [
        '"sql": true,',
        '"apis": "REST",',
        '"viz": ["Streamlit", "Plotly"],',
        '"ml": "Machine Learning"'
      ]
    },
    {
      title: "certifications.txt",
      lines: [
        "2025  Microsoft Certification (Azure / AI)",
        "2020  DELF",
        "Master AI & Data Science (in progress)"
      ]
    }
  ];

  return (
    <section
      id="skills"
      className="py-20"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-12">
        <h2
          id="skills-title"
          className="mb-10 text-center text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl"
        >
          Skills
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="code-block">
              <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric-blue" />
                  <span>{group.title}</span>
                </span>
                <span className="text-[10px] uppercase tracking-wide text-slate-500">
                  read-only
                </span>
              </div>
              <pre className="overflow-x-auto text-[13px] leading-relaxed">
                <code>
                  {group.lines.map((line, idx) => (
                    <div key={idx}>
                      <span className="mr-3 select-none text-xs text-slate-600">
                        {idx + 1}
                      </span>
                      <span className="text-electric-blue">
                        {line.startsWith("import") || line.startsWith("from")
                          ? line.split(" ")[0]
                          : ""}
                      </span>
                      {line.startsWith("import") || line.startsWith("from") ? (
                        <>
                          <span className="text-slate-100">
                            {" " + line.split(" ").slice(1).join(" ")}
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-100">{line}</span>
                      )}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

