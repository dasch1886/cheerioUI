import { RecipeWithIngredientsService } from './http/recipe-with-ingredients/recipe-with-ingredients.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { IngredientService } from './http/ingredient/ingredient.service';
import { RecipeService } from './http/recipe/recipe.service';
import { UnitService } from './http/unit/unit.service';
import { UserService } from './http/user/user.service';
import { HeadersService } from './http/headers/headers.service';
import { SessionService } from './services/session.service';
import { SpinnerService } from './services/spinner.service';
@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    IngredientService,
    RecipeService,
    UnitService,
    UserService,
    RecipeWithIngredientsService,
    HeadersService,
    SessionService,
    SpinnerService,
  ]
})
export class CoreModule { }
