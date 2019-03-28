import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormControl, FormGroupDirective, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { CookieService } from 'ngx-cookie-service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    './login.theme.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  // Properties
  loginForm: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();


  constructor(
    private authService: AuthService,
    private navCtrl: NgxNavigationWithDataComponent,
    private cookie: CookieService
    ) { }

  ngOnInit() {
    if (this.cookie.check('userId')) {
      this.navCtrl.navigate('profile');
    }

    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.hitLogin(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (response: { data: { user_id: string} }) => {
            const userId = response.data.user_id;
            this.cookie.set('userId', userId);
            this.navCtrl.navigate('profile');
          },
          (error) => console.log(error)
        );
    }
  }
}
