import { Meta, StoryObj } from "@storybook/react";
import VirtualList from "./VirtualList.tsx";
import { BrowserRouter } from "react-router-dom";

type StoryDef = Meta<typeof VirtualList>;
type Story = StoryObj<typeof VirtualList>;

const meta: StoryDef = {
  component: VirtualList,
  tags: ["autodocs"],
};

export default meta;

export const Default: Story = {
  render: (args) => (
    <BrowserRouter>
      <VirtualList {...args} />
    </BrowserRouter>
  ),
  args: {
    items: [
      { id: 1, title: "Item 1" },
      { id: 2, title: "Item 2" },
      { id: 3, title: "Item 3" },
    ],
  },
};
