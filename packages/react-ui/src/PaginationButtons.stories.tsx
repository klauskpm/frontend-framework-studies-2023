import { action } from "@storybook/addon-actions";
import PaginationButtons from "./PaginationButtons.tsx";

export default {
  component: PaginationButtons,
};

export const Default = {
  args: {
    count: 100,
    currentPage: 0,
    itemsPerPage: 10,
    onClick: (i: number) => action("clicked")(i),
  },
};

export const DifferentCurrentPage = {
  args: {
    count: 100,
    itemsPerPage: 10,
    currentPage: 5,
    onClick: (i: number) => action("clicked")(i),
  },
};
