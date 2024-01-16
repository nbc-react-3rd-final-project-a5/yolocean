import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        black: "#262626",
        line: "#E5E5E5",
        tc: {
          light: "#999999",
          middle: "#595959",
          base: "#262626"
        },
        point: "#3074F0",
        white: "#FFFFFF",
        bg: "#F5F5F5"
      }
    }
  },
  plugins: []
};
export default config;
