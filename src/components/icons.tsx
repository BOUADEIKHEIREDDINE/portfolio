import type { IconType } from "react-icons";
import {
  SiPython, SiKotlin, SiAndroid, SiJetpackcompose, SiFastapi, SiFlask, SiStreamlit, SiPandas, SiReact, SiVite,
  SiPlotly, SiOpencv, SiGradle, SiOllama, SiGooglegemini, SiHuggingface, SiMaterialdesign, SiScikitlearn, SiGithub, SiLinkedin,
} from "react-icons/si";

const map: Record<string, IconType> = {
  Python: SiPython,
  Kotlin: SiKotlin,
  "Android SDK": SiAndroid,
  "Jetpack Compose": SiJetpackcompose,
  "Material 3": SiMaterialdesign,
  Gradle: SiGradle,
  FastAPI: SiFastapi,
  Flask: SiFlask,
  Streamlit: SiStreamlit,
  pandas: SiPandas,
  React: SiReact,
  Vite: SiVite,
  Plotly: SiPlotly,
  OpenCV: SiOpencv,
  "Mistral (Ollama)": SiOllama,
  "Gemini API": SiGooglegemini,
  "Sentence-Transformers": SiHuggingface,
  "Machine Learning": SiScikitlearn,
};

export function SkillIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const I = map[name];
  if (I) return <I className={className} aria-hidden />;
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <rect x="4" y="4" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export const tickerIcons: [string, IconType][] = [
  ["Python", SiPython],
  ["Kotlin", SiKotlin],
  ["Jetpack Compose", SiJetpackcompose],
  ["FastAPI", SiFastapi],
  ["Ollama", SiOllama],
  ["Gemini", SiGooglegemini],
  ["Hugging Face", SiHuggingface],
  ["pandas", SiPandas],
  ["Streamlit", SiStreamlit],
  ["React", SiReact],
  ["Flask", SiFlask],
  ["OpenCV", SiOpencv],
  ["Plotly", SiPlotly],
  ["Android", SiAndroid],
];

export { SiGithub, SiLinkedin };
