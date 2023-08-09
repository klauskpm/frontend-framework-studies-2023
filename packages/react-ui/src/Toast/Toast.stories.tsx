import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ToastProvider from "./ToastProvider";
import ToastSuccess from "./ToastSuccess";
import ToastError from "./ToastError";

type StoryDef = Meta<typeof ToastSuccess>;
type Story = StoryObj<typeof ToastSuccess>;

const meta: StoryDef = {
  title: "Toast",
};

export default meta;

export const Success: Story = {
  render: (args) => (
    <ToastProvider>
      <ToastSuccess {...args} />
    </ToastProvider>
  ),
  args: {
    open: true,
    message: "This is a success message",
    onClose: () => action("onClose")(),
  },
};

export const Error: Story = {
  render: (args) => (
    <ToastProvider>
      <ToastError {...args} />
    </ToastProvider>
  ),
  args: {
    open: true,
    message: "This is an error message",
    onClose: () => action("onClose")(),
  },
};
