import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TOKEN_NAME} from '../../services/auth.constant';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          if (event.status == 401) {
            localStorage.removeItem(TOKEN_NAME);
            this.router.navigate(['home/welcome']);
            return false;
          }
        }
      });
  }
}
