import { Meta, StoryObj } from "@storybook/react";
import LoginPage from "./LoginPage.tsx";

type StoryDef = Meta<typeof LoginPage>;
type Story = StoryObj<typeof LoginPage>;

const meta: StoryDef = {
  component: LoginPage,
};

export default meta;

export const Default: Story = {};

export const Sent: Story = {
  args: {
    sent: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
