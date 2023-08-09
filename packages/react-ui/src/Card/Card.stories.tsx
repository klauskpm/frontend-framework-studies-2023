import Card from "./Card";
import { Meta, StoryObj } from "@storybook/react";

type StoryDef = Meta<typeof Card>;
type Story = StoryObj<typeof Card>;

const meta: StoryDef = {
  title: "Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;

export const JustText: Story = {
  args: {
    children: "Just text",
  },
};

export const ContentWithPadding: Story = {
  args: {
    children: (
      <div className="p-4">
        Just text, but a div with padding is surrounding it
      </div>
    ),
  },
};
