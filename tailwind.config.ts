import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary': '#FFCE00',
        'secondary': '#FE4880',
        'dark': '#212121',
        'light': '#F3F3F3',
      },
      
    },
  },
  plugins: [],
} satisfies Config;
