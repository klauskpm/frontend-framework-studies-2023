import Avatar from "./Avatar";

export default {
  title: "Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select", options: ["small", "medium", "big"] },
    },
  },
};

export const WithImage = {
  args: {
    avatarUrl: "https://avatars.githubusercontent.com/u/9525299?v=4",
    size: "medium",
  },
};

export const WithoutImage = {
  args: {
    size: "medium",
  },
};
