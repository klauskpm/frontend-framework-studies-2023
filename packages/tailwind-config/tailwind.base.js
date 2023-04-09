// const colors = require("tailwindcss/colors");

// module.exports = {
//   content: [
//     // app content
//     `src/**/*.{js,ts,jsx,tsx}`,
//     // include packages if not transpiling
//     // "../../packages/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         brandblue: colors.blue[500],
//         brandred: colors.red[500],
//       },
//     },
//   },
//   plugins: [],
// };

// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    // "../../packages/simple/src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["dracula", "light", "dark"],
  },
};
