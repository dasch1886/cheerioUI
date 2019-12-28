import {RecipeIngredientModel} from './recipe-ingredient.model';
import {CommentModel} from './comment.model';

export interface RecipeModel {
  _id?: string;
  name: string;
  author: string;
  desc: string;
  ingredients: Array<RecipeIngredientModel>;
  imgPath: string;
  comments: Array<CommentModel>;
}
