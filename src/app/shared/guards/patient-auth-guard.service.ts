import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '../../services/users.service';


@Injectable()
export class PatientAuthGuard implements CanActivate {
  constructor(private router: Router, private usersService: UsersService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isPatient = this.usersService.isPatientUser();
    if (isPatient) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
