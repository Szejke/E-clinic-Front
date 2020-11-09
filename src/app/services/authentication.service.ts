import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment.prod';
import {AUTH_API_URL} from '../app.consts';
import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from './auth.constant';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Observable<any> {
    const body = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&grant_type=password`;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));
    return this.http.post<any>(AUTH_API_URL, body, {headers: headers, observe: 'response'});
  }

  register(formValue: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/users/register', formValue, {observe: 'response'})
  }
}
