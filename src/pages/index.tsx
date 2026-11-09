import Head from "next/head";
import { Nav, Hero } from "@/components/Hero";
import { Ticker, About, Experience, Projects, Skills, Credentials, Hobbies, Contact } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kheireddine Bouadi | AI & Data Science</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-paper focus:p-2">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Credentials />
        <Hobbies />
        <Contact />
      </main>
    </>
  );
}
