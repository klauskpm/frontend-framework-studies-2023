/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("./base.js")],
};
