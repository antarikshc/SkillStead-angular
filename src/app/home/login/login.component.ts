import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormControl, FormGroupDirective, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

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
    private navCtrl: NgxNavigationWithDataComponent
    ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.hitLogin(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (response) => {
            this.navCtrl.navigate('profile', {user_id: response.data.user_id});
          },
          (error) => console.log(error)
        );
    }
  }
}
