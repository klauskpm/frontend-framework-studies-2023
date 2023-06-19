export type SelectOptions =
  | {
      head?: boolean | undefined;
      count?: "exact" | "planned" | "estimated" | undefined;
    }
  | undefined;
