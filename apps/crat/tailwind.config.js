const commonConfig = require("../../tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...commonConfig,
  plugins: [require("daisyui")],
};
