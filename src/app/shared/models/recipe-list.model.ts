import { RecipeModel } from "./recipe.model";

export interface RecipesListModel {
  listSize: number,
  recipes: Array<RecipeModel>
}
