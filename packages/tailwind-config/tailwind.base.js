module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/simple/src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["dracula", "light", "dark"],
  },
};
