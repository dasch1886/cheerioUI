import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from '../../../../shared/models/recipe.model';
import { RecipeService } from '../../../../core/http/recipe/recipe.service';
import { Observable } from 'rxjs';
import { server } from '../../../../../environments/api-environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/core/services/session.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private sessionService: SessionService,
    private fb: FormBuilder) {
  }

  private imgPrefix = `${server.address}/public/`;
  private id: string = this.route.snapshot.paramMap.get('id');
  private recipe$: Observable<RecipeModel>;
  private commentGroup: FormGroup;

  private commentValid: boolean = true;

  ngOnInit() {
    this.setRecipe();
    this.initCommentGroup();
  }

  setRecipe() {
    this.recipe$ = this.recipeService.getDetails(this.id);
  }

  initCommentGroup() {
    this.commentGroup = this.fb.group({
      id: [this.id],
      author: [''],
      value: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  addComment() {
    if (this.sessionService.isAuthenticated()) {

      this.commentGroup.patchValue({ author: this.sessionService.getUserNickname() });

      if (this.commentGroup.dirty && this.commentGroup.valid) {
        this.commentValid = true;

        this.recipeService.setComment({
          _id: this.commentGroup.get('id').value,
          author: this.commentGroup.get('author').value,
          value: this.commentGroup.get('value').value
        }).subscribe(res => {
          if (res.body.success) {
            alert('Comment added');
            this.updateComments();
          } else {
            alert('Try comment again');
          }
        });
      } else {
        this.commentValid = false;
      }

    } else {
      console.log(this.sessionService.getUserNickname());
    }
  }

  updateComments() {
    this.recipeService.getComments(this.id).subscribe(res => {
      this.recipe$ = this.recipe$.pipe(map(value => {
        value.comments = res;
        return value;
      }))
    });
  }
}
