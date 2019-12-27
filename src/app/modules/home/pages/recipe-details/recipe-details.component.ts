import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeModel} from '../../../../shared/models/recipe.model';
import {RecipeService} from '../../../../core/http/recipe/recipe.service';
import {Observable} from 'rxjs';
import {server} from '../../../../../environments/api-environment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  private imgPrefix = `${server.address}/public/`;
  private id: string = this.route.snapshot.paramMap.get('id');
  private recipe$: Observable<RecipeModel>;

  ngOnInit() {
    this.setRecipe();
  }

  setRecipe() {
    this.recipe$ = this.recipeService.getDetails(this.id);
  }

}
