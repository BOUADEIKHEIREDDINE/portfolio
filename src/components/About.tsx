import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-dark-panel pt-10 pb-20"
      aria-labelledby="about-title"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 md:px-8 lg:px-12">
        <h2
          id="about-title"
          className="text-center text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl"
        >
          About
        </h2>

        <div className="terminal-window">
          <div className="terminal-bar">
            <div className="terminal-button red" />
            <div className="terminal-button yellow" />
            <div className="terminal-button green" />
            <span className="ml-3 text-xs text-slate-400">
              /usr/bin/ai-dev — zsh
            </span>
          </div>
          <div className="terminal-content">
            <p className="text-electric-blue">
              <span className="text-python-orange">guest</span>
              <span className="text-slate-400">@portfolio</span>
              <span className="text-slate-500">:~$</span>{" "}
              <span className="text-slate-100">cat bio.txt</span>
            </p>
            <p className="mt-3 text-slate-100">
              I&apos;m an AI &amp; Data Science student at{" "}
              <span className="text-python-orange">aivancity</span> (Paris),
              specialising in automated data pipelines and scalable AI
              solutions (NLP, RAG) that meet strong technical and regulatory
              requirements.
            </p>
            <p className="mt-3 text-slate-100">
              My main language is{" "}
              <span className="text-python-orange">Python</span>, and I also
              build native Android apps in{" "}
              <span className="text-electric-blue">Kotlin &amp; Jetpack Compose</span>.
            </p>
            <p className="mt-3 text-slate-100">
              Languages: Arabic (C2) · French (C2) · English (C1) · Spanish (B2).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

