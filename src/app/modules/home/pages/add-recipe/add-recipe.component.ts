import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorService } from './sevices/errors/error.service';
import { UnitService } from '../../../../core/http/unit/unit.service';
import { UnitModel } from '../../../../shared/models/unit.model';
import { Observable, Subject } from 'rxjs';
import { IngredientModel } from '../../../../shared/models/ingredient.model';
import { IngredientService } from '../../../../core/http/ingredient/ingredient.service';
import { map } from 'rxjs/operators';
import { RecipeService } from '../../../../core/http/recipe/recipe.service';
import { ingredients } from '../../../../core/http/api-routes';
import { minLengthArray } from './validator/minLengthArray.validator';
import { SessionService } from 'src/app/core/services/session.service';
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
  executionTime: number = null;
  degree: string = null;
  fileName: string = null;

  eventsSubject: Subject<string> = new Subject<string>();

  nameIngredientsAdded: Array<string> = [];
  ingredientsAdded: FormArray = this.fb.array([]);
  unitsMeasure$: Observable<UnitModel[]>;
  ingredients: Array<string>;
  units: Array<string>;
  difficultyLeves: Array<string>;

  constructor(private fb: FormBuilder,
    public errorService: ErrorService,
    private unitService: UnitService,
    private ingredientService: IngredientService,
    private r2: Renderer2,
    private recipeService: RecipeService,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.initRecipeGroup();
    this.initIngredientsGroup();
    this.initIngredientGroup();
    this.unitService.findAll().toPromise().then(res => {
      this.units = res.map(unit => unit.name);
    });;
    this.ingredientService.findAll().toPromise().then(res => {
      this.ingredients = res.map(ingredient => ingredient.name);
    });
    this.difficultyLeves = this.recipeService.getDiffucultyLevels();
  }

  private initRecipeGroup() {
    this.recipeGroup = this.fb.group({
      title: ['', [Validators.required]],
      author: [''],
      desc: ['', [Validators.required]],
      ingredients: [this.ingredientsAdded, [minLengthArray(3)]],
      difficultyLvel: [''],
      executionTime: [],
      image: ['', [Validators.required]],
    });
  }

  private initIngredientsGroup() {
    this.ingredientsGroup = this.fb.group({
      name: ['', [Validators.required]],
      amount: [, [Validators.required, Validators.pattern(this.realNumbersRegExp)]],
      unitName: ['', [Validators.required]],
    });
  }

  private initIngredientGroup() {
    this.ingredientGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]]
    });
  }

  private setIngredient() {
    this.ingredientsGroup.controls['amount'].updateValueAndValidity();
    const name = this.ingredientsGroup.controls['name'].value;
    const amount = this.ingredientsGroup.controls['amount'].value;
    const unitName = this.ingredientsGroup.controls['unitName'].value;


    return new FormControl({
      name: name,
      amount: amount,
      unitName: unitName
    });
  }

  addIngredientToArray() {
    this.getIngredient();
    this.getUnit();
    this.getDifficultyLevel();
    if (this.ingredientsGroup.valid) {
      this.ingredientsAdded.push(this.setIngredient());
      this.ingredientsGroup.reset();
      this.recipeGroup.controls['ingredients'].updateValueAndValidity();
      this.errorService.clearErrors(this.errorService.errorsIngredientForm);
    }
  }

  removeIngredientFromArray(element: HTMLElement) {
    if (element.className === 'fas fa-times-circle') {
      this.ingredientsAdded.removeAt(parseInt(element.dataset.index, 10));
      this.nameIngredientsAdded.splice(parseInt(element.dataset.index, 10), 1);
      this.recipeGroup.controls['ingredients'].updateValueAndValidity();
    }
  }

  addNewIngredient() {
    this.ingredientGroup.controls['name'].updateValueAndValidity();
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
      this.ingredientService.create({ name: this.ingredientGroup.controls['name'].value }).subscribe(res => {
        console.log(res);
        alert('Ingredient has been added');
        this.ingredientService.findAll().toPromise().then(res => {
          this.ingredients = res.map(ingredient => ingredient.name);
        });
      },
        (err) => {
          alert('Ingredient with that name already exist');
        });
      this.ingredientGroup.reset();

    }
  }

  renderView() {
    this.title = this.recipeGroup.get('title').value;
    this.desc = this.recipeGroup.get('desc').value;
    this.executionTime = this.recipeGroup.get('executionTime').value;
    this.degree = this.recipeGroup.get('difficultyLvel').value;
    console.log(this.degree);
  }

  addRecipe() {
    const recipe = {
      name: this.recipeGroup.get('title').value,
      author: this.sessionService.getUserNickname(),
      desc: this.recipeGroup.get('desc').value,
      ingredients: this.recipeGroup.get('ingredients').value.value,
      difficultyLvel: this.recipeGroup.get('difficultyLvel').value,
      executionTime:  this.recipeGroup.get('executionTime').value,
      image: this.recipeGroup.get('image').value
    };

    console.log(recipe);
    this.recipeService.create(recipe).subscribe(res => {
      console.log(res);
      alert('Recipe has been added');
    },
      (err) => {
        console.log(err);
        alert('Recipe with that title already exist');
      });
  }

  getIngredient() {
    this.eventsSubject.next('ingredient');
  }

  getUnit() {
    this.eventsSubject.next('unit');
  }

  getDifficultyLevel() {
    this.eventsSubject.next('degree');
  }

  getValue(data: any) {
    if (data.name === 'ingredient') {
      this.ingredientsGroup.controls['name'].patchValue(data.value);
    }

    if (data.name === 'unit') {
      this.ingredientsGroup.controls['unitName'].patchValue(data.value);
    }

    if(data.name === 'degree') {
      this.recipeGroup.controls['difficultyLvel'].patchValue(data.value);
      this.renderView();
    }
  }

  setImage($event) {
    const reader = new FileReader();

    if($event.target.files[0] && $event.target.files.length > 0) {
      reader.readAsDataURL($event.target.files[0]);
    }

    reader.onload = () => {
      this.recipeGroup.controls['image'].patchValue(reader.result);
      this.recipeGroup.controls['image'].updateValueAndValidity();
      this.fileName = $event.target.files[0].name;

    };
    console.log($event);
  }
}
