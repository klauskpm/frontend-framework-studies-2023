import { action } from "@storybook/addon-actions";
import PaginationButtons from "./PaginationButtons";
import { Meta, StoryObj } from "@storybook/react";

type StoryDef = Meta<typeof PaginationButtons>;
type Story = StoryObj<typeof PaginationButtons>;

const meta: StoryDef = {
  component: PaginationButtons,
  tags: ["autodocs"],
  args: {
    onClick: (i: number) => action("clicked")(i),
  },
};

export default meta;

export const Default: Story = {
  args: {
    count: 100,
    currentPage: 0,
    itemsPerPage: 10,
  },
};

export const DifferentCurrentPage: Story = {
  args: {
    count: 100,
    itemsPerPage: 10,
    currentPage: 5,
  },
};
