import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import AvatarInput from "./AvatarInput.tsx";

type StoryDef = Meta<typeof AvatarInput>;
type Story = StoryObj<typeof AvatarInput>;

const meta: StoryDef = {
  component: AvatarInput,
  tags: ["autodocs"],
  args: {
    onChange: (file: File) => action("onChange file name:")(file.name),
  },
};

export const WithImage: Story = {
  args: {
    avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  },
};

export default meta;

export const WithoutImage: Story = {};

export const Uploading: Story = {
  name: "Uploading (disabled)",
  args: {
    avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
    isUploading: true,
  },
};
