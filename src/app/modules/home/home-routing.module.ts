import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeRoute} from './home.route';
import {AddRecipeComponent} from './pages/add-recipe/add-recipe.component';
import {RecipeDetailsComponent} from './pages/recipe-details/recipe-details.component';
import { RoleGuardService } from 'src/app/core/guards/role-guard.service';

const homeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: HomeRoute.ADD,
    component: AddRecipeComponent,
    canActivate: [RoleGuardService]
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
