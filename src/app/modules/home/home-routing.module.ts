import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeRoute} from './home.route';
import {AddRecipeComponent} from './pages/add-recipe/add-recipe.component';
import {RecipeDetailsComponent} from './pages/recipe-details/recipe-details.component';

const homeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: HomeRoute.ADD,
    component: AddRecipeComponent
  },
  {
    path: `${HomeRoute.RECIPE_DETAILS}/:id`,
    component: RecipeDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
