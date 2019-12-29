import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ErrorService } from './sevices/errors/error.service';
import { UnitService } from '../../../../core/http/unit/unit.service';
import { UnitModel } from '../../../../shared/models/unit.model';
import { Observable } from 'rxjs';
import { IngredientModel } from '../../../../shared/models/ingredient.model';
import { IngredientService } from '../../../../core/http/ingredient/ingredient.service';
import { map } from 'rxjs/operators';
import { RecipeService } from '../../../../core/http/recipe/recipe.service';
import { ingredients } from '../../../../core/http/api-routes';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  recipeGroup: FormGroup;
  ingredientsGroup: FormGroup;
  ingredientGroup: FormGroup;

  realNumbersRegExp: RegExp = /(\d+(\.\d+)?)/;

  desc: string;
  title: string;

  nameIngredientsAdded: Array<string> = [];
  ingredientsAdded: FormArray = this.fb.array([]);
  unitsMeasure$: Observable<UnitModel[]>;
  ingredients$: Observable<IngredientModel[]>;

  constructor(private fb: FormBuilder,
    public errorService: ErrorService,
    private unitService: UnitService,
    private ingredientService: IngredientService,
    private r2: Renderer2,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.initRecipeGroup();
    this.initIngredientsGroup();
    this.initIngredientGroup();
    this.unitsMeasure$ = this.unitService.findAll();
    this.ingredients$ = this.ingredientService.findAll();
  }

  private initRecipeGroup() {
    this.recipeGroup = this.fb.group({
      title: ['', [Validators.required]],
      author: [''],
      desc: ['', [Validators.required]],
      ingredients: this.ingredientsAdded,
    });
  }

  private initIngredientsGroup() {
    this.ingredientsGroup = this.fb.group({
      ingredientId: ['', [Validators.required]],
      quantity: [, [Validators.required, Validators.pattern(this.realNumbersRegExp)]],
      unitId: ['', [Validators.required]],
    });
  }

  private initIngredientGroup() {
    this.ingredientGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]]
    });
  }

  private setNameIngredient(id: string) {
    this.ingredients$.pipe(map(arrayIngredients => {
      return arrayIngredients.find(ingredient => {
        return ingredient.id === id;
      });
    })).subscribe(res => {
      this.nameIngredientsAdded.push(res.name);
    });
  }

  private setIngredient() {
    const ingredientId = this.ingredientsGroup.controls['ingredientId'].value;
    const quantity = this.ingredientsGroup.controls['quantity'].value;
    const unitId = this.ingredientsGroup.controls['unitId'].value;
    this.setNameIngredient(ingredientId);

    return new FormControl({
      ingredientId: ingredientId,
      quantity: quantity,
      unitId: unitId
    });
  }

  addIngredientToArray() {
    if (this.ingredientsGroup.valid) {
      this.ingredientsAdded.push(this.setIngredient());
      this.ingredientsGroup.reset();
      this.errorService.clearErrors(this.errorService.errorsIngredientForm);
    } else {
      this.errorService.controlValueChangedIngredient(this.ingredientsGroup);
    }
    console.log(this.recipeGroup);
  }

  removeIngredientFromArray(element: HTMLElement) {
    if (element.className === 'fas fa-times-circle') {
      this.ingredientsAdded.removeAt(parseInt(element.dataset.index, 10));
      this.nameIngredientsAdded.splice(parseInt(element.dataset.index, 10), 1);
    }
  }

  addNewIngredient() {
    if (this.ingredientGroup.valid) {
      const modal = document.querySelector('.modal.fade.show');
      this.r2.removeClass(modal, 'show');
      this.r2.setStyle(modal, 'display', 'none');
      this.r2.removeStyle(modal, 'padding-right');
      this.r2.removeAttribute(modal, 'aria-modal');
      this.r2.setAttribute(modal, 'aria-hidden', 'true');

      const body = document.body;
      const backgroundModal = document.querySelector('.modal-backdrop.fade.show');

      this.r2.removeStyle(body, 'padding-right');
      this.r2.removeClass(body, 'modal-open');
      this.r2.removeChild(body, backgroundModal);
      this.ingredientGroup.reset();


      this.ingredientService.create(this.ingredientGroup.value).subscribe(res => {
        console.log(res);
        this.ingredients$ = this.ingredientService.findAll();
      });

    }
  }

  renderView() {
    this.title = this.recipeGroup.get('title').value;
    this.desc = this.recipeGroup.get('desc').value;
  }

  addRecipe() {
    const recipe = {
      name: this.recipeGroup.get('title').value,
      author: '',
      description: this.recipeGroup.get('desc').value,
      recipeIngredientSet: this.recipeGroup.get('ingredients').value
    };
    // this.recipeService.create(recipe).subscribe(res => {
    //   console.log(res);
    //   alert('Recipe has been added');
    // });
    // console.log(this.recipeGroup.value);

  }
}
