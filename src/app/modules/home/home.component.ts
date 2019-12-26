import { Component, OnInit, AfterViewInit } from '@angular/core';
import AOS from 'aos';
import { Observable, from } from 'rxjs';
import { RecipeService } from './../../core/http/recipe/recipe.service';
import { RecipesListModel } from '../../shared/models/recipe-list.model';
import { RecipeModel } from 'src/app/shared/models/recipe.model';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private recipeService: RecipeService) { }

  recipes$: Observable<RecipesListModel>
  recipesListSize$: Observable<number>;
  recipesArray$: Observable<Array<RecipeModel>>;

  ngOnInit() {
    this.recipes$ = from(this.recipeService.findAll());
    this.recipesArray$ = this.recipes$.pipe(pluck('recipes'));
    this.recipesListSize$ = this.recipes$.pipe(pluck('listSize'));
  }

  ngAfterViewInit() {
    AOS.init({
      delay: 500,
      duration: 1000,
      easing: 'ease-out',
      mirror: true
    });
  }
}
