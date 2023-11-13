import { Food, getFood } from "./database";

export const foodLoader = async ({ params }: any): Promise<Food | null> => {
  const { id } = params;
  const { data } = await getFood(Number(id));

  return data;
};
