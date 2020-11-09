import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {isRequestSuccess} from '../../shared/http/request-status';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {SocialUser} from 'angular5-social-login';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  LOGIN_SUCCESS_MSG = 'You have been logged in';
  LOGIN_ERROR_MSG = 'You have not been logged in';

  form: FormGroup;

  isFormVisible = true;
  isSpinnerVisible = false;

  invalidLogin = false;
  validLogin = false;

  private redirectUrlAdminSuccess = 'doctor/visits';
  private redirectUrlUserSuccess = 'patient/dashboard';

  constructor(public snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private usersService: UsersService,
              private fb: FormBuilder) {
    this.redirectIfLogged();
    this._initForm();
  }

  private _initForm() {
    this.form = this.fb.group({
      email: ['email@email.com', Validators.compose([Validators.required, Validators.email])],
      password: ['12345', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])]
    });
  }

  login() {
    this.authenticationService.login(this.form.controls.email.value, this.form.controls.password.value).subscribe(data => {
      console.log(data);
      const result = isRequestSuccess(data);
      const msg = result ? this.LOGIN_SUCCESS_MSG : this.LOGIN_ERROR_MSG;
      this.openSnackBar(msg);
      if (result) {
        console.log(result);
        this.usersService.login(data.body);
        // this.isFormVisible = false;
        // this.isSpinnerVisible = true;
        this.validLogin = true;
        setTimeout(() => this.navigateAfterSuccess(), 6000);
      } else {
        this.invalidLogin = true;
      }
    }, error => this.invalidLogin = true);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 5000,
    });
  }

  private navigateAfterSuccess() {
    this.redirectIfLogged();
  }

  private redirectIfLogged() {
    if (this.usersService.isLogged()) {
      if (this.usersService.isDoctorUser()) {
        this.router.navigate([this.redirectUrlAdminSuccess]);
      } else if (this.usersService.isPatientUser()) {
        this.router.navigate([this.redirectUrlUserSuccess]);
      }
    }
  }

  gmailLogin() {
    this.usersService.gmailLogin().then((user: SocialUser) => {
      this.authenticationService.login(user.email, user.id)
        .subscribe(data => {
          console.log(data);
          const result = isRequestSuccess(data);
          const msg = result ? this.LOGIN_SUCCESS_MSG : this.LOGIN_ERROR_MSG;
          this.openSnackBar(msg);
          console.log(msg);
          if (result) {
            console.log(result);
            this.usersService.login(data.body);
            // this.isFormVisible = false;
            // this.isSpinnerVisible = true;
            this.validLogin = true;
            setTimeout(() => this.navigateAfterSuccess(), 6000);
          } else {
            this.invalidLogin = true;
          }
        })
    }, error => this.invalidLogin = true);

  }
}
