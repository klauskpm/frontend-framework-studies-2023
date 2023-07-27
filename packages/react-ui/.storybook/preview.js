import "../src/index.css";
import { withThemeByClassName } from "@storybook/addon-styling";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      dracula: "dracula",
      light: "light",
      dark: "dark",
    },
    defaultTheme: "dracula",
    attributeName: "data-mode",
  }),
];

export default preview;
