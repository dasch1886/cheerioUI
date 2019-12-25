import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { server } from '../../../../environments/api-environment';
import { user } from '../api-routes';
import { LoginResponseModel } from '../../../shared/models/login-response.model';
import { RegisterRequestModel } from '../../../shared/models/register-request.model';
import { SessionService } from '../../services/session.service';
import { RegisterResponseModel } from 'src/app/shared/models/register-response.model';
import { HeadersService } from '../headers/headers.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private sessionService: SessionService,
    private headers: HeadersService) {
  }

  login(login: string, password: string): Observable<LoginResponseModel> {
    return this.http.get<LoginResponseModel>(
      server.address + user.uri,
      {
        params: {
          "login": login,
          "password": password
        }
      }
    ).pipe(tap(token => {
      this.store(token);
      return token;
    }));
  }

  register(data: RegisterRequestModel): Observable<HttpResponse<RegisterResponseModel>> {
    return this.http.post<RegisterResponseModel>(
      server.address + user.uri,
      data,
      {
        headers: this.headers.getContentType('application/json'),
        observe: 'response'
      }
    );
  }

  store(token: LoginResponseModel) {
    localStorage.setItem('token', JSON.stringify(token));
    this.sessionService.setIsLogged(true);
  }
}
