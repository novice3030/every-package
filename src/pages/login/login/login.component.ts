import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from 'src/api/api.service';
import {catchError, of} from 'rxjs';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showLoginError = false;
  loginForm = new FormGroup({
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    passwordInput: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  constructor(
    private api: ApiService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {}

  onLoginButtonClicked() {
    this.showLoginError = false;
    this.api
      .login(
        this.loginForm.controls['emailInput'].value,
        this.loginForm.controls['passwordInput'].value,
      )
      .pipe(
        catchError(error => {
          this.showLoginError = true;
          throw error;
        }),
      )
      .subscribe(result => {
        this.cookieService.set('token', result.token, moment().add(1, 'days').toDate());
        this.router.navigate(['create']);
      });
  }
}
