import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {UsersService} from '../../services/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {DetailsSnackBarComponent} from '../../doctor/visits/visits-list/visits-list.component';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular5-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  hidePassword = false;
  matcher: any;
  invalidLogin = false;
  validLogin = false;

  constructor(public snackBar: MatSnackBar,
              private authenticationService: AuthenticationService,
              private usersService: UsersService,
              private socialAuthService: AuthService,
              private router: Router,
              private changeDetectorRefs: ChangeDetectorRef,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['email@email.com', Validators.compose([Validators.required, Validators.email])],
      password: ['12345', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
      name: ['Test', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      surname: ['Test', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      pesel: ['66666666666', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      address: ['Testowa 11 Kielce', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      postalCode: ['25-110', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
    });
  }

  register() {
    this.authenticationService.register(this.form.value).subscribe(result => {
      if (result.status === 201) {
        this.validLogin = true;
        this.snackBar.openFromComponent(DetailsSnackBarComponent, {
          duration: 5000,
          data: 'Zarejestrowano'
        });
        setTimeout(() => this.router.navigate(['/login']), 6000);
      } else {
        this.invalidLogin = true;
        this.snackBar.openFromComponent(DetailsSnackBarComponent, {
          duration: 5000,
          data: 'Błąd podczas rejestracji'
        });
      }
    }, error => this.invalidLogin = true);
  }

  registerWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log(userData);
        this.form.controls.email.setValue(userData.email);
        this.form.controls.name.setValue(userData.name);
        this.form.controls.password.setValue(userData.id);
        this.hidePassword = true;
        this.changeDetectorRefs.detectChanges();
      }
    );
  }
}
