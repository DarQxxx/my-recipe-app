import { RecipeProps } from "@/src/types/RecipeProps";

export type RecipeElementProps = Omit<RecipeProps, "id" | "steps" | "userId">;
