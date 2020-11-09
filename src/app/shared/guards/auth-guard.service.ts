import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';
import {UsersService} from '../../services/users.service';
import {TOKEN_NAME} from '../../services/auth.constant';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private usersService: UsersService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.usersService.accessToken) {
      if (tokenNotExpired(TOKEN_NAME, this.usersService.accessToken)) {
        return true;
      } else {
        localStorage.removeItem(TOKEN_NAME);
        this.router.navigate(['home/welcome'], {queryParams: {redirectTo: state.url}});
        return false;
      }
    }
  }
}
