const commonConfig = require("../../tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...commonConfig,
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["dracula", "light", "dark"],
  },
};
