import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http :  HttpClient) { }

  async login(user : any){
    const params = {
      'username' : user.username,
      'password' : user.password,
      'grant_type': environment.grant_type,
      'client_id': environment.client_id,
      'client_secret': environment.client_secret
    }
    const result = await this.http.post<any>(`${environment.api}/oauth/token`,params).toPromise();
    if(result && result.access_token){
      window.localStorage.setItem('access_token',result.access_token);
      window.localStorage.setItem('refresh_token',result.refresh_token);
      return true;
    }
    return false;
  }
  async createAccount(account : any) {
    let http_headers = new HttpHeaders();
    http_headers.set('Content-Type','application/x-www-form-urlencoded');
    http_headers.set('Accept','application/json');
    const result = await this.http.post<any>(`${environment.api}/api/users`,account,{headers: http_headers}).toPromise();
    return result;
  }
  getAuthorizationToken(){
    const token = window.localStorage.getItem('access_token');
    return token;
  }
  getTokenExpirationDate(token: string): Date {
    const decoded: any =  jwt_decode.default(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
}
