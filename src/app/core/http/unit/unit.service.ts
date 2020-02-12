import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { server } from '../../../../environments/api-environment';
import { UnitModel } from '../../../shared/models/unit.model';
import { units } from '../api-routes';
import { HeadersService } from '../headers/headers.service';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient,
    private headers: HeadersService) {
  }

  findAll(): Observable<Array<UnitModel>> {
    return this.http.get<Array<UnitModel>>(
      server.address + units.uri,
      {
        headers: this.headers.getContentType('application/json', true),
        params: {
          nickname: this.headers.getNickname()
        }
      },
    );
  }

  create(unit: UnitModel): Observable<HttpResponse<UnitModel>> {
    return this.http.post<UnitModel>(
      server.address + units.uri,
      unit,
      {
        headers: this.headers.getContentType('application/json'),
        observe: 'response'
      }
    );
  }

}
