export type RecipeProps = {
  id: number;
  name: string;
  steps: string[];
  tags: string[];
  createdAt: string;
  userId: number;
  imageUrl?: string;
};
