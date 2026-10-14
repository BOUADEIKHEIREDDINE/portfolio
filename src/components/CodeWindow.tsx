import React from "react";

type Project = {
  title: string;
  description: string;
  codeLink?: string;
  liveLink?: string;
  language: "python" | "javascript" | "typescript" | "kotlin";
};

interface Props {
  project: Project;
}

const languageComment = (language: Project["language"]) => {
  switch (language) {
    case "python":
      return "# AI pipeline snippet";
    case "javascript":
      return "// React integration snippet";
    case "typescript":
      return "// Type-safe API client";
    case "kotlin":
      return "// Jetpack Compose screen";
  }
};

const CodeWindow: React.FC<Props> = ({ project }) => {
  const { title, description, codeLink, liveLink, language } = project;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 shadow-md shadow-black/60 transition-transform transition-shadow hover:-translate-y-1 hover:shadow-glow-blue">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="terminal-button red" />
          <span className="terminal-button yellow" />
          <span className="terminal-button green" />
          <span className="ml-2 text-slate-200">{title}</span>
        </div>
        <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-400">
          {language}
        </span>
      </header>
      <div className="flex flex-1 flex-col justify-between">
        <div className="px-4 pb-3 pt-3 text-xs text-slate-300">
          {description}
        </div>
        <pre className="mx-4 mb-4 flex-1 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-[12px] leading-relaxed text-slate-100">
          <code>
            <span className="text-slate-500">{languageComment(language)}</span>
            <br />
            {language === "kotlin" && (
              <>
                <span className="text-electric-blue">@Composable</span>
                <br />
                <span className="text-electric-blue">fun</span>{" "}
                <span className="text-python-orange">DashboardScreen</span>
                <span className="text-slate-100">(vm: DashboardViewModel) {"{"}</span>
                <br />
                <span className="text-slate-100">
                  &nbsp;&nbsp;val state by vm.state.collectAsState()
                </span>
                <br />
                <span className="text-slate-100">{"}"}</span>
              </>
            )}
            {(language === "javascript" || language === "typescript") && (
              <>
                <span className="text-electric-blue">const</span>{" "}
                <span className="text-python-orange">endpoint</span>{" "}
                <span className="text-slate-100">
                  = &quot;/api/{title.toLowerCase().replace(/\s+/g, "-")}&quot;
                  ;
                </span>
                <br />
                <span className="text-electric-blue">async function</span>{" "}
                <span className="text-slate-100">invoke()</span>{" "}
                <span className="text-slate-100">
                  {"{"}
                </span>
                <br />
                <span className="text-slate-100">
                  &nbsp;&nbsp;const res = await fetch(endpoint);
                </span>
                <br />
                <span className="text-slate-100">
                  &nbsp;&nbsp;return res.json();
                </span>
                <br />
                <span className="text-slate-100">
                  {"}"}
                </span>
              </>
            )}
            {language === "python" && (
              <>
                <span className="text-electric-blue">def</span>{" "}
                <span className="text-python-orange">
                  run_{title.toLowerCase().replace(/\s+/g, "_")}
                </span>
                <span className="text-slate-100">():</span>
                <br />
                <span className="text-slate-100">
                  &nbsp;&nbsp;model = load_model()
                </span>
                <br />
                <span className="text-slate-100">
                  &nbsp;&nbsp;return model.predict(data)
                </span>
              </>
            )}
          </code>
        </pre>
      </div>
      <footer className="flex items-center justify-between border-t border-slate-800 bg-slate-900/80 px-4 py-2 text-xs">
        <div className="flex gap-2">
          {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-python-orange px-3 py-1 font-semibold text-slate-950 transition hover:bg-electric-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-python-orange focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Live
          </a>
          )}
          {codeLink && (
          <a
            href={codeLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-electric-blue px-3 py-1 font-semibold text-electric-blue transition hover:bg-electric-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Code
          </a>
          )}
        </div>
        <span className="text-[10px] text-slate-500">
          {codeLink ? "> open source" : "> private repo"}
        </span>
      </footer>
    </article>
  );
};

export type { Project };
export default CodeWindow;

