import React from "react";

const links = [
  { label: "email", value: "bouadikheireddine@gmail.com", href: "mailto:bouadikheireddine@gmail.com" },
  { label: "linkedin", value: "linkedin.com/in/bouadikheireddine", href: "https://www.linkedin.com/in/bouadikheireddine" },
  { label: "github", value: "github.com/BOUADEIKHEIREDDINE", href: "https://github.com/BOUADEIKHEIREDDINE" }
];

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="bg-dark-panel py-20"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
        <h2
          id="contact-title"
          className="mb-10 text-center text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl"
        >
          Contact
        </h2>

        <div className="terminal-window">
          <div className="terminal-bar">
            <div className="terminal-button red" />
            <div className="terminal-button yellow" />
            <div className="terminal-button green" />
            <span className="ml-3 text-xs text-slate-400">contact.sh</span>
          </div>
          <div className="terminal-content space-y-2">
            <p className="mb-4 text-slate-200">
              <span className="text-python-orange">guest</span>
              <span className="text-slate-400">@portfolio</span>
              <span className="text-slate-500">:~$</span>{" "}
              <span className="text-electric-blue">cat contact.txt</span>
            </p>
            {links.map((link) => (
              <p key={link.label} className="break-all text-slate-100">
                <span className="text-slate-500">{link.label.padEnd(9, " ")}</span>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="text-electric-blue underline-offset-4 hover:text-python-orange hover:underline"
                >
                  {link.value}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
