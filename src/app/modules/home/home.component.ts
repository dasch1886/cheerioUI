import { Component, OnInit, AfterViewInit } from '@angular/core';
import AOS from 'aos';
import { Observable, from, Subject } from 'rxjs';
import { RecipeService } from './../../core/http/recipe/recipe.service';
import { RecipesListModel } from '../../shared/models/recipe-list.model';
import { RecipeModel } from 'src/app/shared/models/recipe.model';
import { pluck } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IngredientService } from 'src/app/core/http/ingredient/ingredient.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private recipeService: RecipeService,
    private fb: FormBuilder,
    private ingredientService: IngredientService) { }

  eventsSubject: Subject<string> = new Subject<string>();

  recipes$: Observable<RecipesListModel>;
  recipesListSize$: Observable<number>;
  recipesArray$: Observable<Array<RecipeModel>>;
  authors: Array<string> = [];
  ingredients: Array<string> = [];
  private filterGroup: FormGroup;

  ingrdeintsToFilter: Array<string> = [];

  ngOnInit() {
    this.filterGroupInit();
    this.getRecipes();
  }

  getRecipes() {
    this.recipes$ = from(this.recipeService.findAll());
    this.recipesArray$ = this.recipes$.pipe(pluck('recipes'));
    this.recipesListSize$ = this.recipes$.pipe(pluck('listSize'));
    this.setAuthors();
    this.setIngredietns();
  }

  setAuthors() {
    this.recipeService.getAuthors().toPromise().then(res => {
      this.authors = res.map(author => author.name);
    })
  }

  setIngredietns() {
    this.ingredientService.findAll().toPromise().then(res => {
      this.ingredients = res.map(ingredient => ingredient.name);
    });
  }

  ngAfterViewInit() {
    AOS.init({
      delay: 100,
      duration: 1000,
      easing: 'ease-out',
      mirror: true
    });
  }

  filterGroupInit() {
    this.filterGroup = this.fb.group({
      text: '',
    });
  }

  filterRecipes() {
    this.recipesArray$ = this.recipeService.filterByText(
      this.filterGroup.get('text').value
    );
  }

  emitEventToChild() {
    this.eventsSubject.next();
  }

  getValue(data: any) {
    console.log(data);
    if (data.name = 'ingredient' &&
     this.ingrdeintsToFilter.indexOf(data.value) === -1) {
      this.ingrdeintsToFilter.push(data.value);
    }
    console.log(this.ingrdeintsToFilter);
  }

  getIngredient() {
    this.eventsSubject.next('ingredient');
  }
}
