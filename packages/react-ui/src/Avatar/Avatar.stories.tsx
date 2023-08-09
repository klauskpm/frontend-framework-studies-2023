import Avatar from "./Avatar.tsx";
import { Meta, StoryObj } from "@storybook/react";

type StoryDef = Meta<typeof Avatar>;
type Story = StoryObj<typeof Avatar>;

const meta: StoryDef = {
  title: "Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select", options: ["small", "medium", "big"] },
    },
  },
};

export default meta;

export const WithImage: Story = {
  args: {
    avatarUrl: "https://avatars.githubusercontent.com/u/9525299?v=4",
    size: "medium",
  },
};

export const WithoutImage: Story = {
  args: {
    size: "medium",
  },
};
