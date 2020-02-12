import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LoginResponseModel } from 'src/app/shared/models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor() { }

  private getToken(): string {
    const token: LoginResponseModel = JSON.parse(localStorage.getItem('token'));
    return `${token.token_type} ${token.access_token}`;
  }

  getNickname(): string {
    const token: LoginResponseModel = JSON.parse(localStorage.getItem('token'));
    return token.nickname;
  }

  getContentType(content: string, withToken?: boolean): HttpHeaders {
    if(!withToken) {
      return new HttpHeaders({
        'Content-Type': content,
      });
    } else {
      return new HttpHeaders({
        'Content-Type': content,
        'authorization': this.getToken()
      });
    }
  }
}
