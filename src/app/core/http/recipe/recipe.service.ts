import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { server } from "../../../../environments/api-environment";
import { RecipeModel } from "../../../shared/models/recipe.model";
import { recipes, recipe, filter, comment, authors } from "../api-routes";
import { HeadersService } from '../headers/headers.service';
import { RecipesListModel } from '../../../shared/models/recipe-list.model';
import { CommentModel } from "src/app/shared/models/comment.model";
import { CommentResponseModel } from "src/app/shared/models/comment-response.model";
import { AuthorModel } from "src/app/shared/models/author.model";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient,
    private headers: HeadersService) {
  }

  findAll(): Observable<RecipesListModel> {
    return this.http.get<RecipesListModel>(
      server.address + recipes.uri
    );
  }

  create(recipeData: RecipeModel): Observable<HttpResponse<RecipeModel>> {
    return this.http.post<RecipeModel>(
      server.address + recipes.uri,
      recipeData,
      {
        headers: this.headers.getContentType('application/json'),
        observe: 'response'
      }
    );
  }

  filterByText(text: string): Observable<Array<RecipeModel>> {
    return this.http.get<Array<RecipeModel>>(
      server.address + recipes.uri + filter.uri, {
      params: {
        text: text
      }
    });
  }

  getDetails(id: string): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(
      server.address + recipe.uri,
      {
        params: {
          'id': id
        }
      }
    );
  }

  setComment(data: CommentModel): Observable<HttpResponse<CommentResponseModel>> {
    return this.http.post<CommentResponseModel>(
      server.address + recipe.uri + comment.uri,
      data,
      {
        headers: this.headers.getContentType('application/json'),
        observe: 'response'
      }
    );
  }

  getComments(id: string): Observable<Array<CommentModel>> {
    return this.http.get<Array<CommentModel>>(
      server.address + recipe.uri + comment.uri,
      {
        params: {
          'id': id
        }
      }
    );
  }

  getAuthors(): Observable<Array<AuthorModel>> {
    return this.http.get<Array<AuthorModel>>(
      server.address + recipes.uri + authors.uri,
    );
  }
}
