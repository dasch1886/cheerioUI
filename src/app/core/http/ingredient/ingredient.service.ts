import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredientModel } from '../../../shared/models/ingredient.model';
import { server } from '../../../../environments/api-environment';
import { ingredients } from '../api-routes';
import { HeadersService } from '../headers/headers.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient,
    private headers: HeadersService) {
  }

  findAll(): Observable<Array<IngredientModel>> {
    return this.http.get<Array<IngredientModel>>(
      server.address + ingredients.uri
    );
  }

  create(ingredient: IngredientModel): Observable<HttpResponse<IngredientModel>> {
    return this.http.post<IngredientModel>(
      server.address + ingredients.uri,
      ingredient,
      {
        headers: this.headers.getContentType('application/json'),
        observe: 'response'
      }
    );
  }

}
