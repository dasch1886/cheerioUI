import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { server } from "../../../../environments/api-environment";
import { RecipeModel } from "../../../shared/models/recipe.model";
import { recipes, filter } from "../api-routes";
import { HeadersService } from '../headers/headers.service';
import { RecipesListModel } from '../../../shared/models/recipe-list.model';

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

  create(recipe: RecipeModel): Observable<HttpResponse<RecipeModel>> {
    return this.http.post<RecipeModel>(
      server.address + recipes.uri,
      recipe,
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
}
