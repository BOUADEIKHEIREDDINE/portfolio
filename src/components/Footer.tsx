import React from "react";
import { Link as ScrollLink } from "react-scroll";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 py-5 text-xs text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-8 lg:px-12">
        <p className="text-[11px]">
          &copy; {new Date().getFullYear()} Kheireddine Bouadi
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ScrollLink
            to="hero"
            smooth
            duration={500}
            offset={-80}
            className="cursor-pointer text-[11px] uppercase tracking-wide text-electric-blue hover:text-python-orange"
          >
            Back to top
          </ScrollLink>
          <span className="text-[11px] text-slate-500">
            &gt; rendered in a dark Python workspace
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

