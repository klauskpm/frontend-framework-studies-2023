import Card from "./Card.tsx";

export default {
  title: "Card",
  component: Card,
  tags: ["autodocs"],
};

export const JustText = {
  args: {
    children: "Just text",
  },
};

export const ContentWithPadding = {
  args: {
    children: (
      <div className="p-4">
        Just text, but a div with padding is surrounding it
      </div>
    ),
  },
};
