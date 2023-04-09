/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/simple/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("./tailwind.base.js")],
};
