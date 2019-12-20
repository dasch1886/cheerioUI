import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponseModel } from 'src/app/shared/models/login-response.model';
import { Router } from '@angular/router';
import { AppRoute } from 'src/app/app.route';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private isLogged$ = new BehaviorSubject<boolean>(false);
  private jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private router: Router) { }

  setIsLogged(value: boolean) {
    this.isLogged$.next(value);
  }

  isAuthenticated(): boolean {
    const token: LoginResponseModel = JSON.parse(localStorage.getItem('token'));
    return token != null && !this.jwtHelper.isTokenExpired(token.access_token);
  }

  getIsLogged(): Observable<boolean> {
    this.setIsLogged(this.isAuthenticated());
    return this.isLogged$.asObservable();
  }

  logOut() {
    localStorage.removeItem('token');
    this.setIsLogged(false);
  }

  getUserNickname(): string {
    const token: LoginResponseModel = JSON.parse(localStorage.getItem('token'));
    if (token !== null) {
      return token.nickname;
    } else {
      this.router.navigateByUrl(AppRoute.LOGIN);
      return undefined;
    }
  }
}
