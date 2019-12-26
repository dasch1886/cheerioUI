import { Injectable } from '@angular/core';
import { RecipeService } from './../recipe/recipe.service';
import { IngredientService } from './../ingredient/ingredient.service';
import { RecipeModel } from 'src/app/shared/models/recipe.model';
@Injectable({
    providedIn: 'root'
})
export class RecipeWithIngredientsService {
    constructor(private ingredientService: IngredientService, private recipeService: RecipeService) {
    }
    // async findAll(): Promise<RecipeModel[]> {
    //     const ingredients = await this.ingredientService.findAll().toPromise();
    //     const recipes = await this.recipeService.findAll().toPromise();
    //     return recipes.map(recipe => {
    //         recipe.recipeIngredientSet = recipe.recipeIngredientSet.map(ingredient => {
    //             ingredient.ingredient = ingredients.find(ing => ing.id === ingredient.ingredientId);
    //             return ingredient;
    //         })
    //         return recipe;
    //     });
    // }
}
