import {Component, OnInit, AfterViewInit} from '@angular/core';
import AOS from 'aos';
import {Observable, from, Subject} from 'rxjs';
import {RecipeService} from './../../core/http/recipe/recipe.service';
import {RecipesListModel} from '../../shared/models/recipe-list.model';
import {RecipeModel} from 'src/app/shared/models/recipe.model';
import {pluck} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IngredientService} from 'src/app/core/http/ingredient/ingredient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private recipeService: RecipeService,
              private fb: FormBuilder,
              private ingredientService: IngredientService) {
  }

  eventsSubject: Subject<string> = new Subject<string>();

  recipes$: Observable<RecipesListModel>;
  recipesListSize$: Observable<number>;
  recipesArray$: Observable<Array<RecipeModel>>;
  authors: Array<string> = [];
  ingredients: Array<string> = [];
  private filterGroup: FormGroup;

  ingredientsToFilter: Array<string> = [];
  authorToFilter: string;

  ngOnInit() {
    this.filterGroupInit();
    this.getRecipes();
  }

  getRecipes() {
    this.recipes$ = from(this.recipeService.findAll());
    this.recipesArray$ = this.recipes$.pipe(pluck('recipes'));
    this.recipesListSize$ = this.recipes$.pipe(pluck('listSize'));
    this.setAuthors();
    this.setIngredients();
  }

  setAuthors() {
    this.recipeService.getAuthors().toPromise().then(res => {
      this.authors = res.map(author => author.name);
    });
  }

  setIngredients() {
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

  getValue(data: any) {
    if (data.name === 'ingredient' &&
      this.ingredientsToFilter.indexOf(data.value) === -1
      && data.value !== '' ) {
      this.ingredientsToFilter.push(data.value);
    }

    if (data.name === 'author') {
      this.authorToFilter = data.value;
    }
  }

  getIngredient() {
    this.eventsSubject.next('ingredient');
  }

  getAuthor() {
    this.eventsSubject.next('author');
  }

  removeIngredient(ingredient: string) {
    this.ingredientsToFilter = this.ingredientsToFilter.filter(el => el !== ingredient);
  }

  searchingAdvanced() {
    this.getIngredient();
    this.getAuthor();
    this.recipesArray$ = this.recipeService.filterAdvanced(this.authorToFilter, this.ingredientsToFilter);
  }
}
