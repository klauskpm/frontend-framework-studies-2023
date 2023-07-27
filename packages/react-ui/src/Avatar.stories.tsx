import Avatar from "./Avatar";

export default {
  title: "Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: { type: "select", options: ["small", "medium", "big"] },
    },
  },
};

export const Default = {
  args: {
    // @klauskpm GitBub's photo
    avatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
    size: "medium",
  },
};
