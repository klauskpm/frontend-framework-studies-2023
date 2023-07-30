import type { Preview } from "@storybook/react";

import "../src/index.css";
import { withThemeByDataAttribute } from "@storybook/addon-styling";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        dracula: "dracula",
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dracula",
    }),
  ],
};

export default preview;
