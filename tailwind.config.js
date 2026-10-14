/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Fira Code"', "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"]
      },
      colors: {
        "dark-background": "#020617",
        "dark-panel": "#020617",
        "electric-blue": "#7DD3FC",
        "python-orange": "#FFD43B"
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(125, 211, 252, 0.4)",
        "glow-orange": "0 0 30px rgba(255, 212, 59, 0.4)"
      },
      animation: {
        "cursor-blink": "cursor-blink 1s steps(2, start) infinite",
        "grid-move": "grid-move 20s linear infinite",
        "float-slow": "float-slow 10s ease-in-out infinite"
      },
      keyframes: {
        "cursor-blink": {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" }
        },
        "grid-move": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50px,-50px,0)" }
        },
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" }
        }
      }
    }
  },
  plugins: []
};

