import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TOKEN_NAME} from '../../services/auth.constant';
import {AUTH_API_URL} from '../../app.consts';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url !== AUTH_API_URL && request.url !== (environment.apiUrl + '/users/register')) {
      const token = JSON.parse(localStorage.getItem(TOKEN_NAME));

      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token.access_token
        }
      });
    }
    return next.handle(request);
  }


}
