import { RecipeProps } from "./RecipeProps";

export type AddRecipeProps = Pick<
  RecipeProps,
  "name" | "description" | "createdAt" | "imageUrl"
> & {
  ingredients: { value: string }[];
  steps: { value: string }[];
  tags: { value: string }[];
};
