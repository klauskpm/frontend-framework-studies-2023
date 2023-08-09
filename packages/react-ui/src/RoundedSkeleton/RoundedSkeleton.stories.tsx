import RoundedSkeleton from "./RoundedSkeleton.tsx";
import { Meta, StoryObj } from "@storybook/react";

type StoryDef = Meta<typeof RoundedSkeleton>;
type Story = StoryObj<typeof RoundedSkeleton>;

const meta: StoryDef = {
  component: RoundedSkeleton,
};

export default meta;

export const WithForcedSizes: Story = {
  args: {
    className: "w-10 h-10",
  },
};
