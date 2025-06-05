export type RecipeProps = {
  id: number;
  name: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  description: string;
  createdAt: string;
  userId: number;
  imageUrl?: string;
};
